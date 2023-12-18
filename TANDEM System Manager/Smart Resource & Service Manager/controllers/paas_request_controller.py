import random
from flask import Flask, request
import json
import re
from pathlib import Path
import requests
from controllers.request_controller import location_score, latency_score, duplication_score, \
    prioritize_underloaded_clusters_score, prioritize_full_score, prioritize_empty_score, minimize_energy

app = Flask(__name__)
local_path = Path(__file__).parent


@app.route('/paas_request', methods=['POST'])
def paas_node_mapping():
    req = request.get_json()
    nodes_added_memory = {}
    nodes_added_cpu = {}

    # Find the requested PaaS service in the catalogue and store the service functions
    auth_url = "http://146.124.106.209/piedge-connector/2.0.0/authentication"
    auth_payload = {
        "username": "admin_system_manager",
        "password": "admin_system_manager!@!"
    }

    auth_response = requests.post(auth_url, json=auth_payload)
    token = auth_response.json().get('token')
    headers = {
        'Authorization': f'Bearer {token}'
    }
    data_url = "http://146.124.106.209/piedge-connector/2.0.0/paasServices"
    paas_services = requests.get(data_url, headers=headers).json()

    flag = False
    requested_paas_service = ""

    for paas_service in paas_services:
        if flag:
            break
        if req["paas_service_name"] == paas_service["name"]:
            flag = True
            requested_paas_service = paas_service

    # Create a list with all the services that should be deployed and their requirements based on the scaling policy
    services_to_deploy = []

    for service_to_deploy in requested_paas_service['service_functions']:
        # Find the requested service function in the catalogue and store the requirements
        data_url = "http://146.124.106.209/piedge-connector/2.0.0/serviceFunctions"
        services = requests.get(data_url, headers=headers).json()
        flag = False

        for service in services:
            if flag:
                break
            if service_to_deploy["service_function_identifier_name"] == service["name"]:
                flag = True
                for policy in service['autoscaling_policies']:
                    if policy["policy"] == req["autoscaling_type"]:
                        services_to_deploy.append((service["name"], policy["monitoring_metrics"]))
        if not flag:
            print("service was not found!")

    total_cpu = 0
    total_memory = 0
    for service in services_to_deploy:
        for monitoring_metric in service[1]:
            if monitoring_metric['metric'] == 'cpu':
                if 'm' in monitoring_metric["request"]:
                    total_cpu += float(re.sub("[^0-9.]", "", monitoring_metric["request"])) / 1000
                elif 'n' in monitoring_metric["request"]:
                    total_cpu += float(re.sub("[^0-9.]", "", monitoring_metric["request"])) / 1000000000
                else:
                    total_cpu += float(re.sub("[^0-9.]", "", monitoring_metric["request"]))

            elif monitoring_metric['metric'] == 'memory':
                if 'Gi' in monitoring_metric["request"]:
                    total_memory += float(re.sub("[^0-9.]", "", monitoring_metric["request"])) * 1000000
                elif 'M' in monitoring_metric["request"]:
                    total_memory += float(re.sub("[^0-9.]", "", monitoring_metric["request"])) * 1000
                else:
                    total_memory += float(re.sub("[^0-9.]", "", monitoring_metric["request"]))

    try:
        response = requests.get("http://infrastructurecatalogue.tandem-infra-user:8081/infrastructurecatalogue/get/infrastructure")
        response.raise_for_status()  # Check if the request was successful
        json_data = response.json()  # Convert the response to a JSON object
    except requests.exceptions.RequestException as e:
        return f"Error: {e}"

    # Read the evaluation metric
    with open(local_path / ("../resources/eval_metrics/" + req['eval_metric_name'] + ".json"), "r") as read_file:
        evaluation_metric = json.load(read_file)

    same_node_bias = evaluation_metric["requirements"]['same_node_bias']['value'] + 1

    cluster_load = []
    cluster_latencies = []

    clusters = []
    cluster_dictionary = {}
    # node dictionary not in use at the moment
    node_dictionary = {}
    for cluster in json_data:
        clusters.append((cluster['edgeCloudId'], cluster['edgeCloudName'], cluster['piEdgeIP']))
        cluster_dictionary[cluster['edgeCloudId']] = (cluster['piEdgeIP'], cluster['piEdgePort'])
        for node in cluster["nodes"]:
            node_dictionary[cluster['edgeCloudId'] + node["nodeId"]] = node

    for cluster in clusters:
        cluster_load.append((cluster[0], 0, 0, 0))
        # mock
        cluster_latencies.append((cluster[0], [], random.randint(10, 20)))

    predictions = {}

    for cluster in json_data:
        for node in cluster['nodes']:
            regex_pattern = r'([\d]+\.[\d]+\.[\d]+\.[\d]+)'
            if isinstance(node['nodeUsageMonitoringURL'], str):
                match = re.search(regex_pattern, node['nodeUsageMonitoringURL'])
                ip_address = match.group(1)
                try:
                    pred = requests.get(
                        "http://146.124.106.209/predict/" + ip_address + "/" + node[
                            'nodeId'] + "/15T/cpu+memory").json()
                    predictions[node['nodeId']] = pred
                except:
                    predictions[node['nodeId']] = {'cpu_prediction': float(node['nodeUsage']['nodeCPUUsage']) / 1000000,
                                                   'memory_prediction': float(node['nodeUsage']['nodeMemoryUsage'])}
            else:
                predictions[node['nodeId']] = {'cpu_prediction': float(node['nodeUsage']['nodeCPUUsage']) / 1000000,
                                               'memory_prediction': float(node['nodeUsage']['nodeMemoryUsage'])}
            for i in range(len(cluster_load)):
                if cluster_load[i][0] in cluster['edgeCloudId']:
                    cluster_load[i] = (cluster_load[i][0], cluster_load[i][1] + (
                            int(node['nodeUsage']['nodeCPUInUse']) / 1000000000) / int(
                        node['nodeAllocatableResources']['nodeCPUCap']), cluster_load[i][2] + int(
                        node['nodeUsage']['nodeMemoryInUse']) / int(
                        node['nodeAllocatableResources']['nodeMemoryCap']), cluster_load[i][3] + 1)
                    break

    for i in range(len(cluster_load)):
        cluster_load[i] = (
            cluster_load[i][0], (cluster_load[i][1] + cluster_load[i][2]) / (cluster_load[i][3] * 2 + 1e-20))

    # find a list of good candidate clusters (mock)
    best_cluster = 0
    candidate_clusters = []
    for i in range(1, len(cluster_latencies)):
        if cluster_latencies[i][2] < cluster_latencies[best_cluster][2]:
            best_cluster = i

    for i in range(len(cluster_latencies)):
        if cluster_latencies[i][2] <= cluster_latencies[best_cluster][2] * 1.2:
            candidate_clusters.append(cluster_latencies[i][0])

    # Evaluate each node and calculate its score based on the evaluation metrics
    evaluated = []
    cluster_score = []

    for candidate_cluster in candidate_clusters:
        current_cluster_score = {}
        previous_node = ''
        total_score = 0
        service_count = -1
        for current_service in services_to_deploy:
            node_counter = 0
            evaluated.append([])
            service_count += 1

            cpu_count = 0
            memory_count = 0

            for monitoring_metric in current_service[1]:
                if monitoring_metric['metric'] == 'cpu':
                    if 'm' in monitoring_metric["request"]:
                        cpu_count = float(re.sub("[^0-9.]", "", monitoring_metric["request"])) / 1000
                    elif 'n' in monitoring_metric["request"]:
                        cpu_count = float(re.sub("[^0-9.]", "", monitoring_metric["request"])) / 1000000000
                    else:
                        cpu_count = float(re.sub("[^0-9.]", "", monitoring_metric["request"]))

                elif monitoring_metric['metric'] == 'memory':
                    if 'Gi' in monitoring_metric["request"]:
                        memory_count = float(re.sub("[^0-9.]", "", monitoring_metric["request"])) * 1000000
                    elif 'M' in monitoring_metric["request"]:
                        memory_count = float(re.sub("[^0-9.]", "", monitoring_metric["request"])) * 1000
                    else:
                        memory_count = float(re.sub("[^0-9.]", "", monitoring_metric["request"]))

            for cur_cluster in json_data:
                if candidate_cluster not in cur_cluster['edgeCloudId']:
                    continue

                for node_stats in cur_cluster['nodes']:
                    score = 0

                    # Get the node's detailed information
                    # with open(local_path / ("../resources/" + candidate_node['name'] + ".json"), "r") as read_file:
                    #     node_stats = json.load(read_file)
                    node_cpu_cap = int(node_stats['nodeAllocatableResources']['nodeCPUCap'])
                    node_memory_cap = int(node_stats['nodeAllocatableResources']['nodeMemoryCap'])
                    cpu_in_use = float(node_stats['nodeUsage']['nodeCPUInUse']) / 1000000000 + nodes_added_cpu.get(
                        node_stats['nodeId'], 0)
                    memory_in_use = int(node_stats['nodeUsage']['nodeMemoryInUse']) + nodes_added_memory.get(
                        node_stats['nodeId'], 0)

                    # if the node can't satisfy the CPU or the Memory requirement, give it a negative score
                    if not (node_cpu_cap >= cpu_in_use + cpu_count * int(
                            req['count_min']) and node_memory_cap >= memory_in_use + memory_count * int(
                        req['count_min'])):
                        score = -1
                        evaluated[-1].append((node_stats, score))
                        continue

                    if service_count == 0:
                        forecast_importance = float(evaluation_metric["requirements"]["load_prediction"]["value"])
                        forecasted_cpu = predictions[node_stats['nodeId']]['cpu_prediction'] / 100 * node_cpu_cap
                        cpu_in_use = (cpu_in_use + forecasted_cpu * forecast_importance) / (1 + forecast_importance)

                        forecasted_memory = predictions[node_stats['nodeId']][
                                                'memory_prediction'] / 100 * node_memory_cap
                        memory_in_use = (memory_in_use + forecasted_memory * forecast_importance) / (
                                1 + forecast_importance)

                    # Check which nodes satisfy the location requirement and give them points
                    if evaluation_metric["requirements"]["location_requested"]["value"] > 0:
                        score += location_score(req, node_stats,
                                                evaluation_metric["requirements"]["location_requested"]["value"])

                    # Check which nodes satisfy the duplication requirement and give them points
                    if evaluation_metric["requirements"]['give_duplication_space']["value"] > 0:
                        score += duplication_score(node_cpu_cap, cpu_in_use, cpu_count, req, node_memory_cap,
                                                   memory_in_use, memory_count,
                                                   evaluation_metric["requirements"]['give_duplication_space']["value"])

                    # Prioritize nodes that have more resources committed
                    if evaluation_metric["requirements"]['prioritize_Full']["value"] > 0:
                        score += prioritize_full_score(evaluation_metric["requirements"]['prioritize_Full']["value"],
                                                       cpu_in_use, req, cpu_count, node_cpu_cap, memory_in_use,
                                                       memory_count, node_memory_cap,
                                                       evaluation_metric["requirements"]['prioritize_Full'][
                                                           "polynomial_degree"])

                    # Prioritize nodes that have less resources committed
                    if evaluation_metric["requirements"]['prioritize_empty']["value"] > 0:
                        score += prioritize_empty_score(evaluation_metric["requirements"]['prioritize_empty']["value"],
                                                        cpu_in_use, req, cpu_count, node_cpu_cap, memory_in_use,
                                                        memory_count, node_memory_cap,
                                                        evaluation_metric["requirements"]['prioritize_empty'][
                                                            "polynomial_degree"])

                    # Prioritize clusters that have less resources committed
                    if evaluation_metric["requirements"]['prioritize_underloaded_clusters']["value"] > 0:
                        score += prioritize_underloaded_clusters_score(cluster_load, cur_cluster,
                                                                       evaluation_metric["requirements"][
                                                                           'prioritize_underloaded_clusters']["value"],
                                                                       evaluation_metric["requirements"][
                                                                           'prioritize_underloaded_clusters'][
                                                                           "polynomial_degree"])

                    if evaluation_metric["requirements"]['energy']["value"] > 0:
                        score += minimize_energy(evaluation_metric["requirements"]['energy']["value"], cpu_in_use,
                                                 node_cpu_cap)

                    node_counter += 1
                    # add a same node bias
                    if node_stats['nodeId'] == previous_node:
                        score *= same_node_bias
                    evaluated[-1].append((node_stats, score))

            selected = 0
            counter = 0
            # Choose the best candidate node based on the score that each node got
            for evaluation in evaluated[-1]:
                if evaluation[1] > evaluated[-1][selected][1]:
                    selected = counter
                counter += 1

            if evaluated[-1][selected][1] < 0:
                total_score = -1
                break

            current_cluster_score[current_service[0]] = evaluated[-1][selected][0]

            # clear the same node bias bonus
            if evaluated[-1][selected][0]['nodeId'] == previous_node:
                total_score += evaluated[-1][selected][1] / same_node_bias
            else:
                total_score += evaluated[-1][selected][1]

            previous_node = evaluated[-1][selected][0]['nodeId']

            nodes_added_memory[evaluated[-1][selected][0]['nodeId']] = nodes_added_memory.get(
                evaluated[-1][selected][0]['nodeId'], memory_count * int(req['count_min'])) + memory_count * int(
                req['count_min'])
            nodes_added_cpu[evaluated[-1][selected][0]['nodeId']] = nodes_added_cpu.get(
                evaluated[-1][selected][0]['nodeId'], cpu_count * int(req['count_min'])) + cpu_count * int(
                req['count_min'])

        if candidate_cluster == cluster_latencies[best_cluster][0]:
            total_score *= (1 + evaluation_metric["requirements"]["latency"]["value"])
        cluster_score.append((current_cluster_score, total_score))

    selected_cluster = 0
    counter_cluster = 0
    # Choose the best cluster based on the score that each cluster got
    for evaluation_cluster in cluster_score:
        if evaluation_cluster[1] > cluster_score[selected_cluster][1]:
            selected_cluster = counter_cluster
        counter_cluster += 1

    if cluster_score[selected_cluster][1] < 0:
        return "No clusters can host your request at the moment"

    selected_data = {}  # Dictionary to store the selected keys and nodeIds

    for key, value in cluster_score[selected_cluster][0].items():
        if "nodeId" in value:
            selected_data[key] = value["nodeId"]

    return {
        "selected_cluster": candidate_clusters[selected_cluster],
        "piEdgeIP": cluster_dictionary[candidate_clusters[selected_cluster]][0],
        "piEdgePort": cluster_dictionary[candidate_clusters[selected_cluster]][1],
        "selected_nodes": selected_data
    }

from flask import Flask, request
import json
import re
from pathlib import Path
import requests

app = Flask(__name__)
local_path = Path(__file__).parent


def location_score(req, candidate_node, importance):
    if req['location'] in candidate_node['nodeLocation']:
        return importance * 100
    else:
        return 0


def latency_score(importance, max_latency, latencies, min_latency, node_counter, assignment):
    if assignment == "relative":
        return importance * (max_latency - latencies[node_counter]) / (max_latency - min_latency + 1e-20) * 100
    else:
        return importance * min_latency / (latencies[node_counter] + 1e-20) * 100


def duplication_score(node_cpu_cap, cpu_in_use, cpu_count, req, node_memory_cap, memory_in_use, memory_count,
                      importance):
    if node_cpu_cap >= cpu_in_use + cpu_count * int(
            req['count_max']) and node_memory_cap >= memory_in_use + memory_count * int(req['count_max']):
        return 100 * importance
    else:
        return 0


def prioritize_underloaded_clusters_score(cluster_load, cur_cluster, importance, degree):
    for i in range(len(cluster_load)):
        if cluster_load[i][0] in cur_cluster['edgeCloudId']:
            return (1 - cluster_load[i][1]) ** degree * 100 * importance


def prioritize_full_score(importance, cpu_in_use, req, cpu_count, node_cpu_cap, memory_in_use, memory_count,
                          node_memory_cap, degree):
    return importance * 50 * (((cpu_in_use + cpu_count * int(req['count_min'])) / node_cpu_cap) ** degree + (
            (memory_in_use + memory_count * int(req['count_min'])) / node_memory_cap) ** degree)


def prioritize_empty_score(importance, cpu_in_use, req, cpu_count, node_cpu_cap, memory_in_use, memory_count,
                           node_memory_cap, degree):
    return importance * 50 * ((1 - (cpu_in_use + cpu_count * int(req['count_min'])) / node_cpu_cap) ** degree + (
            1 - (memory_in_use + memory_count * int(req['count_min'])) / node_memory_cap) ** degree)


def minimize_energy(importance, cpu_in_use, node_cpu_cap):
    return importance * 100 * max(0, (1 - (cpu_in_use / node_cpu_cap - 1.01) ** 30))


def evaluate(json_data, request_metrics, evaluation_metric, req, max_latency, min_latency, latencies, cluster_load,
             predictions):
    evaluated = []
    node_counter = 0
    cpu_count = 0
    memory_count = 0

    for monitoring_metric in request_metrics:
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
        for node_stats in cur_cluster['nodes']:
            score = 0
            node_cpu_cap = int(node_stats['nodeAllocatableResources']['nodeCPUCap'])
            node_memory_cap = int(node_stats['nodeAllocatableResources']['nodeMemoryCap'])
            cpu_in_use = float(node_stats['nodeUsage']['nodeCPUInUse']) / 1000000000
            memory_in_use = int(node_stats['nodeUsage']['nodeMemoryInUse'])

            # if the node can't satisfy the CPU or the Memory requirement, give it a negative score
            if not (node_cpu_cap >= cpu_in_use + cpu_count * int(
                    req['count_min']) and node_memory_cap >= memory_in_use + memory_count * int(req['count_min'])):
                score = -1
                evaluated.append((node_stats, score))
                continue

            # give the CPU and memory a mix of their true values and their 15-min forecasted values
            forecast_importance = float(evaluation_metric["requirements"]["load_prediction"]["value"])
            forecasted_cpu = predictions[node_stats['nodeId']]['cpu_prediction']/100 * node_cpu_cap
            cpu_in_use = (cpu_in_use + forecasted_cpu * forecast_importance) / (1 + forecast_importance)

            forecasted_memory = predictions[node_stats['nodeId']]['memory_prediction'] / 100 * node_memory_cap
            memory_in_use = (memory_in_use + forecasted_memory * forecast_importance) / (1 + forecast_importance)

            # Check which nodes satisfy the location requirement and give them points
            if evaluation_metric["requirements"]["location_requested"]["value"] > 0:
                score += location_score(req, node_stats,
                                        evaluation_metric["requirements"]["location_requested"]["value"])

            # Check which nodes satisfy the duplication requirement and give them points
            if evaluation_metric["requirements"]['give_duplication_space']["value"] > 0:
                score += duplication_score(node_cpu_cap, cpu_in_use, cpu_count, req, node_memory_cap, memory_in_use,
                                           memory_count,
                                           evaluation_metric["requirements"]['give_duplication_space']["value"])

            # Prioritize nodes that have more resources committed
            if evaluation_metric["requirements"]['prioritize_Full']["value"] > 0:
                score += prioritize_full_score(evaluation_metric["requirements"]['prioritize_Full']["value"],
                                               cpu_in_use, req, cpu_count, node_cpu_cap, memory_in_use, memory_count,
                                               node_memory_cap, evaluation_metric["requirements"]['prioritize_Full'][
                                                   "polynomial_degree"])

            # Prioritize nodes that have less resources committed
            if evaluation_metric["requirements"]['prioritize_empty']["value"] > 0:
                score += prioritize_empty_score(evaluation_metric["requirements"]['prioritize_empty']["value"],
                                                cpu_in_use, req, cpu_count, node_cpu_cap, memory_in_use, memory_count,
                                                node_memory_cap, evaluation_metric["requirements"]['prioritize_empty'][
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
                score += minimize_energy(evaluation_metric["requirements"]['energy']["value"], cpu_in_use, node_cpu_cap)

            node_counter += 1
            evaluated.append((node_stats, score, cur_cluster))

    return evaluated


@app.route('/request', methods=['POST'])
def node_mapping():
    req = request.get_json()
    request_metrics = ''
    latencies = [14, 12, 11, 9, 14, 25, 28, 31, 35, 26]
    max_latency = float('-inf')
    min_latency = float('inf')

    # Find the requested service function in the catalogue and store the requirements
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
    data_url = "http://146.124.106.209/piedge-connector/2.0.0/serviceFunctions"
    services = requests.get(data_url, headers=headers).json()
    flag = False

    for service in services:
        if flag:
            break
        if req["service_function_name"] == service["name"]:
            flag = True
            for policy in service['autoscaling_policies']:
                if policy["policy"] == req["autoscaling_policy"]:
                    request_metrics = policy["monitoring_metrics"]

    # Read the evaluation metric
    with open(local_path / ("../resources/eval_metrics/" + req['eval_metric_name'] + ".json"), "r") as read_file:
        evaluation_metric = json.load(read_file)

    # Read the available nodes
    try:
        response = requests.get("http://infrastructurecatalogue.tandem-infra-user:8081/infrastructurecatalogue/get/infrastructure")
        response.raise_for_status()  # Check if the request was successful
        json_data = response.json()  # Convert the response to a JSON object
    except requests.exceptions.RequestException as e:
        return f"Error: {e}"

    cluster_load = []

    # Read the available clusters
    clusters = []
    for cluster in json_data:
        clusters.append((cluster['edgeCloudId'], cluster['edgeCloudName']))

    for cluster in clusters:
        cluster_load.append((cluster[0], 0, 0, 0))

    predictions = {}

    for cluster in json_data:
        for node in cluster['nodes']:
            regex_pattern = r'([\d]+\.[\d]+\.[\d]+\.[\d]+)'
            if isinstance(node['nodeUsageMonitoringURL'], str):
                match = re.search(regex_pattern, node['nodeUsageMonitoringURL'])
                ip_address = match.group(1)
                try:
                    pred = requests.get(
                      "http://146.124.106.209/predict/" + ip_address + "/" + node['nodeId'] + "/15T/cpu+memory").json()
                    predictions[node['nodeId']] = pred
                except:
                    predictions[node['nodeId']] = {'cpu_prediction': float(node['nodeUsage']['nodeCPUUsage']) / 1000000,
                                                   'memory_prediction': float(node['nodeUsage']['nodeMemoryUsage'])}
            else:
                predictions[node['nodeId']] = {'cpu_prediction': float(node['nodeUsage']['nodeCPUUsage'])/1000000, 'memory_prediction': float(node['nodeUsage']['nodeMemoryUsage'])}
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

    # Evaluate each node and calculate its score based on the evaluation metrics
    evaluated = evaluate(json_data, request_metrics, evaluation_metric, req, max_latency, min_latency, latencies,
                         cluster_load, predictions)

    selected = 0
    counter = 0
    # Choose the best candidate node based on the score that each node got
    for evaluation in evaluated:
        if evaluation[1] > evaluated[selected][1]:
            selected = counter
        counter += 1

    if evaluated[selected][1] >= 0:
        return {
            "selected_cluster": evaluated[selected][2]["edgeCloudId"],
            "piEdgeIP": evaluated[selected][2]["piEdgeIP"],
            "piEdgePort": evaluated[selected][2]["piEdgePort"],
            "selected_node": evaluated[selected][0]["nodeId"]
        }
    else:
        return "No nodes can host your request at the moment"

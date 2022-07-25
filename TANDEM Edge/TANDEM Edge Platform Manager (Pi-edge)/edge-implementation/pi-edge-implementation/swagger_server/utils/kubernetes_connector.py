from __future__ import print_function
import os
import time
from kubernetes import client, config
from kubernetes.client.rest import ApiException
from swagger_server.utils import auxiliary_functions
from pprint import pprint
from swagger_server.models import NodesResponse
from swagger_server.utils import connector_db
configuration = client.Configuration()
import requests
from requests.structures import CaseInsensitiveDict
# import traceback
# import logging
#scaling_type="minimize_cost"

#K8S AUTH



host=os.environ["KUBERNETES_MASTER_HOST"]
token_k8s=os.environ["KUBERNETES_MASTER_TOKEN"]
#!!!!!!!!!!!!!!!!
# Configure API key authorization: BearerToken
#configuration.api_key['authorization'] = token_k8s
configuration.api_key['authorization'] = os.environ["KUBERNETES_MASTER_TOKEN"]
#!!!!!!!!!!!!!!!!


# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
configuration.api_key_prefix['authorization'] = 'Bearer'


#!!!!!!!!!!!!!!!!
#configuration.host =  host
configuration.host =  os.environ["KUBERNETES_MASTER_HOST"]
#!!!!!!!!!!!!!!!!

configuration.username =  "admin"
configuration.verify_ssl=False
# Defining host is optional and default to http://localhost

#################### Works when we run the controller on the localhost!!!!!!!!###################
#config.load_kube_config()
#v1 = client.CoreV1Api()
#########################################################
#
# print("config!!!")
# print(config)
#
#

v1 = client.CoreV1Api(client.ApiClient(configuration))

# print("Listing pods with their IPs:")
# ret = v1.list_pod_for_all_namespaces(watch=False)
# for i in ret.items:
#     print("%s\t%s\t%s" % (i.status.pod_ip, i.metadata.namespace, i.metadata.name))

# config.lod

#client.Configuration.set_default(configuration)

# Defining host is optional and default to http://localhost
# Enter a context with an instance of the API kubernetes.client
with client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = client.AdmissionregistrationApi(api_client)
    api_instance_appsv1 = client.AppsV1Api(api_client)
    api_instance_apiregv1 = client.ApiregistrationV1beta1Api(api_client)
    api_instance_v1autoscale = client.AutoscalingV1Api(api_client)
    api_instance_v2beta1autoscale = client.AutoscalingV2beta1Api(api_client)
    api_instance_v2beta2autoscale = client.AutoscalingV2beta2Api(api_client)
    api_instance_corev1api = client.CoreV1Api(api_client)
    try:
        api_response = api_instance.get_api_group()
    except ApiException as e:
        print("Exception when calling AdmissionregistrationApi->get_api_group: %s\n" % e)


def get_PoPs():

    x1 = v1.list_node().to_dict()

    # client.models.v1_node_list.V1NodeList
    # kubernetes.client.models.v1_node_list.V1NodeList
    pops_= []
    for pop in x1['items']:
        name=pop['metadata']['name']
        #pop_..(name)
        uid = pop['metadata']['uid']
        #pop_.id(uid)
        location = pop['metadata']['labels']['location']
        #pop_.location(location)
        address = pop['status']['addresses'][0]['address']
        #pop_.serial(address)
        pop_= NodesResponse(id=uid,name=name,location=location,serial=address)
        pops_.append(pop_)
    return pops_
#


def delete_service_function(service_function_name):

    deleted_app = api_instance_appsv1.delete_namespaced_deployment(name=service_function_name, namespace="pi-edge")


    deleted_service = v1.delete_namespaced_service(name=service_function_name, namespace="pi-edge")



    hpa_list = api_instance_v1autoscale.list_namespaced_horizontal_pod_autoscaler("pi-edge")

    #hpas=hpa_list["items"]

    for hpa in hpa_list.items:
        if hpa.metadata.name==service_function_name:
            deleted_hpa = api_instance_v1autoscale.delete_namespaced_horizontal_pod_autoscaler(name=service_function_name, namespace="pi-edge")
            break
    #deletevolume
    volume_list = v1.list_namespaced_persistent_volume_claim("pi-edge")
    for volume in volume_list.items:
        name_v=service_function_name+str("-")
        if name_v in volume.metadata.name:
            deleted_hpa = v1.delete_namespaced_persistent_volume_claim(
                name=volume.metadata.name, namespace="pi-edge")
    #delete from catalogue
    doc={}
    doc["instance_name"]=service_function_name
    sf=connector_db.delete_document_deployed_service_functions(document=doc)



def delete_chain(chain_name):

    apps=get_deployed_service_functions()
    chain_found=False
    for app in apps:
        chain_app_names= app["appname"].split("-",1) #0 will be chain name
        if chain_app_names[0]==chain_name: #should delete the app
            try:
                delete_service_function(app["appname"])
                #chain_found = True
            except Exception as ce_:
                raise Exception("An exception occurred :", ce_)
    # if chain_found:
    #     return True
    # else:
    #     return False


def deploy_service_function(descriptor_service_function):
    #deploys a Deployment yaml file, a service, a pvc and a hpa
    if "volumes" in descriptor_service_function:
        for volume in descriptor_service_function["volumes"]:
            #first solution (not working)
            #body_volume = create_pvc(descriptor_service_function["name"], volume)
            #api_response_pvc = v1.create_namespaced_persistent_volume_claim("pi-edge", body_volume)

            #second solution!
            try:
                url = host+"/api/v1/namespaces/pi-edge/persistentvolumeclaims"
                body_volume = create_pvc_dict(descriptor_service_function["name"], volume)
                headers = {"Authorization": "Bearer "+token_k8s}
                x = requests.post(url, headers=headers, json=body_volume, verify=False)
            except requests.exceptions.HTTPError as e:
                # logging.error(traceback.format_exc())
                return ("Exception when calling CoreV1Api->/api/v1/namespaces/pi-edge/persistentvolumeclaims: %s\n" % e)

            #api_response_pvc = api_instance_corev1api.create_namespaced_persistent_volume_claim
    body_deployment = create_deployment(descriptor_service_function)
    body_service=create_service(descriptor_service_function)

    try:

        api_response_deployment = api_instance_appsv1.create_namespaced_deployment("pi-edge", body_deployment)
        #api_response_service = api_instance_apiregv1.create_api_service(body_service)
        api_response_service=v1.create_namespaced_service("pi-edge",body_service)
        if "autoscaling_policies" in descriptor_service_function:
            #V1 AUTOSCALER
            body_hpa = create_hpa(descriptor_service_function)
            api_instance_v1autoscale.create_namespaced_horizontal_pod_autoscaler("pi-edge",body_hpa)
            # V2beta1 AUTOSCALER
            #body_hpa = create_hpa(descriptor_paas)
            #api_instance_v2beta1autoscale.create_namespaced_horizontal_pod_autoscaler("pi-edge",body_hpa)
        body_r="PaaS service " + descriptor_service_function["name"] + " deployed successfully"
        return body_r
    except ApiException as e:
        #logging.error(traceback.format_exc())
        return ("Exception when calling AppsV1Api->create_namespaced_deployment or ApiregistrationV1Api->create_api_service: %s\n" % e)
       # Exception("An exception occurred : ", e)


def patch_service_function(descriptor_paas):

    #deploys a Deployment yaml file and a service node port

    body_deployment = create_deployment(descriptor_paas)
    body_service=create_service(descriptor_paas)

    if "autoscaling_policies" in descriptor_paas:
        body_hpa = create_hpa(descriptor_paas)

    try:

        api_response_deployment = api_instance_appsv1.patch_namespaced_deployment(namespace="pi-edge", name=descriptor_paas["name"], body=body_deployment)
        #api_response_service = api_instance_apiregv1.create_api_service(body_service)
        api_response_service=v1.patch_namespaced_service(namespace="pi-edge", name=descriptor_paas["name"], body=body_service)
        if "autoscaling_policies" in descriptor_paas:
            api_response_hpa = api_instance_v1autoscale.patch_namespaced_horizontal_pod_autoscaler(namespace="pi-edge", name=descriptor_paas["name"], body=body_hpa)

        body_r="PaaS service "+descriptor_paas["name"] +" updated successfuly"
        return body_r
    except ApiException as e:

        return ("Exception when calling AppsV1Api->create_namespaced_deployment or ApiregistrationV1Api->create_api_service: %s\n" % e)
       # Exception("An exception occurred : ", e)




def create_deployment(descriptor_service_function):


    metadata = client.V1ObjectMeta(name=descriptor_service_function["name"])
    # selector
    dict_label = {}
    dict_label['pi-edge'] = descriptor_service_function["name"]
    selector = client.V1LabelSelector(match_labels=dict_label)

    # create spec

    # spec.selector=selector
    # replicas
    # spec.replicas=descriptor_paas("count-min")
    # template

    metadata_spec = client.V1ObjectMeta(labels=dict_label)

    # template spec
    containers = []
    for container in descriptor_service_function["containers"]:

        ports = []
        for port_id in container["application_ports"]:
            port_ = client.V1ContainerPort(container_port=port_id)
            ports.append(port_)

        #check env_parameters
        envs = []

        if "env_parameters" in descriptor_service_function:
            if descriptor_service_function["env_parameters"] is not None:

                for env in descriptor_service_function["env_parameters"]:
                    if "value" in env:
                        env_=client.V1EnvVar(name=env["name"], value=env["value"])
                    elif "value_ref" in env:
                        #env_name_ should based on paas_instance_name
                        if "paas_name" in descriptor_service_function:
                            #check is value is something like:  http://edgex-core-data:48080

                            env_split = env["value_ref"].split(":")
                            if len(env_split) > 2: #case http://edgex-core-data:48080
                                prefix=env_split[0] #http
                                final_env = env_split[1] #//edgex-core-data or edgex-core-data
                                split2=final_env.split("//")
                                if len(split2)>=2:
                                    final_env=split2[1]
                                port_env = env_split[2] #48080
                                env_= auxiliary_functions.prepare_name_for_k8s(str(descriptor_service_function["paas_name"]+str("-")+final_env))

                                env_name_=prefix + ":" + "//"+ env_ + ":" + port_env

                            elif len(env_split)>1: #case edgex-core-data:48080
                                final_env = env_split[0]
                                port_env=env_split[1]
                                env_ = auxiliary_functions.prepare_name_for_k8s(str(descriptor_service_function["paas_name"] + str("-") + final_env))
                                env_name_ = env_ + ":" + port_env
                            else: #case edgex-core-data
                                final_env = env_split[0]
                                env_name_= auxiliary_functions.prepare_name_for_k8s(str(descriptor_service_function["paas_name"]+str("-")+final_env))
                            env_ = client.V1EnvVar(name=env["name"], value=env_name_)
                    envs.append(env_)

        #create volumes
        volumes=[]
        volume_mounts=[]
        if "volumes" in descriptor_service_function:
            if descriptor_service_function["volumes"] is not None:

                for volume in descriptor_service_function["volumes"]:
                    pvc=client.V1PersistentVolumeClaimVolumeSource(claim_name=str(descriptor_service_function["name"]+str("-")+volume["name"]))
                    #volume_=client.V1Volume(name=volume["name"], persistent_volume_claim=pvc)
                    volume_=client.V1Volume(name=str(descriptor_service_function["name"]+str("-")+volume["name"]), persistent_volume_claim=pvc)
                    volumes.append(volume_)
                    volume_mount=client.V1VolumeMount(name=str(descriptor_service_function["name"]+str("-")+volume["name"]), mount_path=volume["path"])
                    volume_mounts.append(volume_mount)
        if "autoscaling_policies" in descriptor_service_function:
            limits_dict = {}
            request_dict = {}
            for auto_scale_policy in descriptor_service_function["autoscaling_policies"]:
                limits_dict[auto_scale_policy["metric"]]=auto_scale_policy["limit"]
                request_dict[auto_scale_policy["metric"]]=auto_scale_policy["request"]


            resources= client.V1ResourceRequirements(limits=limits_dict, requests=request_dict)
            if not envs:
                con = client.V1Container(name=descriptor_service_function["name"], image=container["image"], ports=ports,
                                     resources=resources, volume_mounts=volume_mounts if volume_mounts else None)
            else:
                con = client.V1Container(name=descriptor_service_function["name"], image=container["image"],
                                         ports=ports,
                                         resources=resources, env=envs, volume_mounts=volume_mounts if volume_mounts else None)
        else:
            if not envs:
                con = client.V1Container(name=descriptor_service_function["name"], image=container["image"], ports=ports,
                                         volume_mounts=volume_mounts if volume_mounts else None)
            else:
                con = client.V1Container(name=descriptor_service_function["name"], image=container["image"],
                                         ports=ports, env=envs, volume_mounts=volume_mounts if volume_mounts else None)

        containers.append(con)


    node_selector_dict = {}
    node_selector_dict['location'] = descriptor_service_function["location"]

    template_spec_ = client.V1PodSpec(containers=containers, node_selector=node_selector_dict, hostname=descriptor_service_function["name"],
                                      volumes=None if not volumes else volumes)

    template = client.V1PodTemplateSpec(metadata=metadata_spec, spec=template_spec_)

    spec = client.V1DeploymentSpec(selector=selector, template=template, replicas=descriptor_service_function["count-min"])

    body = client.V1Deployment(api_version="apps/v1", kind="Deployment", metadata=metadata, spec=spec)
    return body


def create_service(descriptor_service_function):
    dict_label = {}
    dict_label['pi-edge'] = descriptor_service_function["name"]
    metadata = client.V1ObjectMeta(name=descriptor_service_function["name"], labels=dict_label)

    #  spec


    if "exposed_ports" in descriptor_service_function["containers"][0]: #create NodePort svc object
        ports=[]
        hepler=0
        for port_id in descriptor_service_function["containers"][0]["exposed_ports"]:

            if "grafana" in descriptor_service_function["name"]:
                ports_=client.V1ServicePort(port=port_id,
                                            node_port=31000,
                                            target_port=port_id, name=str(port_id))
            else:
                ports_ = client.V1ServicePort(port=port_id,
                                              # node_port=descriptor_paas["containers"][0]["exposed_ports"][hepler],
                                              target_port=port_id, name=str(port_id))
            ports.append(ports_)
            hepler=hepler+1
        spec=client.V1ServiceSpec(selector=dict_label, ports=ports, type="NodePort")
        #body = client.V1Service(api_version="v1", kind="Service", metadata=metadata, spec=spec)
    else: #create ClusterIP svc object
        ports = []
        for port_id in descriptor_service_function["containers"][0]["application_ports"]:
            ports_ = client.V1ServicePort(port=port_id,
                                          target_port=port_id, name=str(port_id))
            ports.append(ports_)
        spec = client.V1ServiceSpec(selector=dict_label, ports=ports, type="ClusterIP")
    body = client.V1Service(api_version="v1", kind="Service", metadata=metadata, spec=spec)

    return body


def create_pvc(name, volumes):
    dict_label = {}
    name_vol=name+str("-")+volumes["name"]
    dict_label['pi-edge'] = name_vol
    #metadata = client.V1ObjectMeta(name=name_vol)
    metadata = client.V1ObjectMeta(name=name_vol, labels=dict_label)
    api_version = 'v1',
    kind = 'PersistentVolumeClaim',
    spec = client.V1PersistentVolumeClaimSpec(
        access_modes=[
            'ReadWriteMany'
        ],
        resources=client.V1ResourceRequirements(
            requests={
                'storage': volumes["storage"]
            }
        )
    )
    body=client.V1PersistentVolumeClaim(api_version="v1", kind=kind, metadata=metadata, spec=spec)

    return body


def create_pvc_dict(name, volumes):
    name_vol = name + str("-") + volumes["name"]
    # body={}
    # body["api_version"]="v1"
    # body["kind"]="PersistentVolumeClaim"
    # metadata={}
    # labels={}
    body={"api_version": "v1",
     "kind": "PersistentVolumeClaim",
     "metadata": {
         "labels": {"pi-edge": name_vol},
         "name": name_vol},
     "spec": {
         "accessModes": ["ReadWriteMany"],
         "resources": {"requests": {"storage": volumes["storage"]}}
     }
     }

    return body

def check_for_update_hpas(deployed_hpas):

    for hpa in deployed_hpas:
        for catalogue_policy in hpa["catalogue_policy"]:
            if catalogue_policy["policy"]==hpa["deployed_scaling_type"]:
                for metrics in catalogue_policy["monitoring_metrics"]:

                    if metrics["metric_name"]== hpa["deployed_metric"]:

                        if metrics["catalogue_util"]!=hpa["deployed_util"]: #need to update hpa
                            desc_paas={}
                            desc_paas["name"]=hpa["name"]
                            desc_paas["count-max"]=hpa["max"]
                            desc_paas["count-min"]=hpa["min"]
                            policy={}
                            policy["limit"]=metrics["catalogue_limit"]
                            policy["request"]=metrics["catalogue_request"]
                            policy["util_percent"]=metrics["catalogue_util"]
                            policy["metric_name"]=metrics["metric_name"]
                            policies=[]
                            policies.append(policy)
                            desc_paas["autoscaling_policies"]=policies
                            body_hpa = create_hpa(desc_paas)
                            api_instance_v1autoscale.patch_namespaced_horizontal_pod_autoscaler(namespace="pi-edge",
                                                                                                name=desc_paas["name"],
                                                                                                body=body_hpa)
                        break
                break


def create_hpa(descriptor_service_function):


    #V1!!!!!!!

    dict_label = {}
    dict_label['name'] = descriptor_service_function["name"]
    metadata = client.V1ObjectMeta(name=descriptor_service_function["name"], labels=dict_label)


    #  spec

    scale_target=client.V1CrossVersionObjectReference(api_version="apps/v1", kind="Deployment", name= descriptor_service_function["name"])

    #todo!!!! check 0 gt an exoume kai cpu k ram auto dn tha einai auto to version!
    spec=client.V1HorizontalPodAutoscalerSpec(max_replicas=descriptor_service_function["count-max"],
                                              min_replicas=descriptor_service_function["count-min"],
                                              target_cpu_utilization_percentage=int(descriptor_service_function["autoscaling_policies"][0]["util_percent"]),
                                              scale_target_ref=scale_target)
    body = client.V1HorizontalPodAutoscaler(api_version="autoscaling/v1", kind="HorizontalPodAutoscaler", metadata=metadata, spec=spec)


    #V2BETA1!!!!

    # dict_label = {}
    # dict_label['name'] = descriptor_paas["name"]
    # metadata = client.V1ObjectMeta(name=descriptor_paas["name"], labels=dict_label)
    #
    # #  spec
    #
    # scale_target = client.V2beta1CrossVersionObjectReference(api_version="extensions/v1beta1", kind="Deployment",
    #                                                     name=descriptor_paas["name"])
    #
    # metrics=[]
    #
    # for metric in descriptor_paas["autoscaling_policies"]:
    #     print("METRIC")
    #     print(metric)
    #     resource_=client.V2beta1ResourceMetricSource(name=metric["metric"],target_average_utilization=int(metric["util_percent"]))
    #     metric_=client.V2beta1MetricSpec(type="Resource", resource=resource_)
    #     metrics.append(metric_)
    #
    #
    # spec = client.V2beta1HorizontalPodAutoscalerSpec(max_replicas=descriptor_paas["count-max"],
    #                                             min_replicas=descriptor_paas["count-min"],
    #                                             metrics=metrics,
    #                                             scale_target_ref=scale_target)
    # body = client.V2beta1HorizontalPodAutoscaler(api_version="autoscaling/v2beta1", kind="HorizontalPodAutoscaler",
    #                                         metadata=metadata, spec=spec)


    #V2BETA2!!!!

    # dict_label = {}
    # dict_label['name'] = descriptor_paas["name"]
    # metadata = client.V1ObjectMeta(name=descriptor_paas["name"], labels=dict_label)
    #
    # #  spec
    #
    # scale_target = client.V2beta2CrossVersionObjectReference(api_version="apps/v1", kind="Deployment",
    #                                                          name=descriptor_paas["name"])
    #
    # metrics = []
    #
    # for metric in descriptor_paas["autoscaling_policies"]:
    #     print("METRIC")
    #     print(metric)
    #
    #     target=client.V2beta2MetricTarget(average_utilization=int(metric["util_percent"]),type="Utilization")
    #     resource_ = client.V2beta2ResourceMetricSource(name=metric["metric"],
    #                                                   target=target)
    #     metric_ = client.V2beta2MetricSpec(type="Resource", resource=resource_)
    #     metrics.append(metric_)
    #
    # spec = client.V2beta2HorizontalPodAutoscalerSpec(max_replicas=descriptor_paas["count-max"],
    #                                                  min_replicas=descriptor_paas["count-min"],
    #                                                  metrics=metrics,
    #                                                  scale_target_ref=scale_target)
    # body = client.V2beta2HorizontalPodAutoscaler(api_version="autoscaling/v2beta2", kind="HorizontalPodAutoscaler",
    #                                              metadata=metadata, spec=spec)

    return body

def get_deployed_service_functions():
    label_selector={}
    deployed_hpas=get_deployed_hpas()
    # print("DEPLOYED HPAS")
    # print(deployed_hpas)

    #COMMENT IT FOR NOW!!!!!!!!!!!!!!!!!!!!!!!!!!! It is working when we need live update of a deployed Service Function/ PaaS!
    # if deployed_hpas:
    #     check_for_update_hpas(deployed_hpas)
    ##########
    api_response = api_instance_appsv1.list_namespaced_deployment("pi-edge")


    api_response_service= v1.list_namespaced_service("pi-edge")
    api_response_pvc= v1.list_namespaced_persistent_volume_claim("pi-edge")


    #print(api_response_pvc)
    #
    # hpa_list = api_instance_v1autoscale.list_namespaced_horizontal_pod_autoscaler("pi-edge")
    # print(hpa_list)
    # api_response_pod = v1.list_namespaced_pod("pi-edge")
    #
    apps=[]
    for app in api_response.items:
        metadata=app.metadata
        spec=app.spec
        status=app.status
        app_={}
        apps_col = connector_db.get_documents_from_collection(collection_input="service_functions")
        deployed_apps_col = connector_db.get_documents_from_collection(collection_input="deployed_service_functions")
        actual_name=None
        for app_col in deployed_apps_col:
            if  metadata.name == app_col["instance_name"]:
                app_["service_function_instance_name"] =app_col["instance_name"]
                actual_name =app_col["name"]
                #app_["appid"] = app_col["_id"]
                break
        for app_col in apps_col:
            if  actual_name == app_col["name"]:
                app_["service_function_catalogue_name"] =app_col["name"]
                #app_["appid"] = app_col["_id"]
                break

        #find volumes!
        for app_col in apps_col:
            if  app_col["required_volumes"] is not None:
                volumes_=[]
                for volume in app_col["required_volumes"]:
                    for item in api_response_pvc.items:
                        name_v=str("-")+volume["name"]
                        if name_v in item.metadata.name and metadata.name in item.metadata.name:
                            volumes_.append(item.metadata.name)
                            app_["volumes"] =volumes_
                            break
                break
        if app_: #if app_ is not empty

            if (status.available_replicas is not None) and (status.ready_replicas is not None):
                if status.available_replicas>=1 and status.ready_replicas>=1:
                    app_["status"]="running"
                    app_["replicas"] = status.ready_replicas
                else:
                    app_["status"] = "not_running"
                    app_["replicas"] = 0
            else:
                app_["status"] = "not_running"
                app_["replicas"] = 0


            #we need to find the compute node
            if spec.template.spec.node_selector is not None:  # giati kati mporei na min exei node selector
                if "location" in spec.template.spec.node_selector.keys():
                    location=spec.template.spec.node_selector["location"]
                    nodes=connector_db.get_documents_from_collection(collection_input="points_of_presence")
                    for node in nodes:
                        if location==node["location"]:
                            app_["node_name"] = node["name"]
                            app_["node_id"] = node["_id"]
                            app_["location"]=node["location"]
                            break

            #print(api_response_service)
            for app_service in api_response_service.items:

                metadata_svc=app_service.metadata
                spec_svc=app_service.spec
                svc_ports = []
                if metadata_svc.name == app_["service_function_instance_name"]:

                    for port in spec_svc.ports:
                        port_={}
                        if port.node_port is not None:

                            port_["exposed_port"]=port.node_port
                            port_["protocol"]=port.protocol
                            port_["application_port"]=port.port
                            svc_ports.append(port_)
                        else:
                            port_["protocol"] = port.protocol
                            port_["application_port"] = port.port
                            svc_ports.append(port_)
                    app_["ports"]=svc_ports
                    break




            apps.append(app_)

    return apps


def get_deployed_hpas():
    label_selector={}


    #APPV1 Implementation!
    api_response = api_instance_v1autoscale.list_namespaced_horizontal_pod_autoscaler("pi-edge")

    hpas=[]
    for hpa in api_response.items:
        metadata=hpa.metadata
        spec=hpa.spec
        hpa_={}

        deployed_hpas_col = connector_db.get_documents_from_collection(collection_input="deployed_apps")
        apps_col = connector_db.get_documents_from_collection(collection_input="paas_services")

        actual_name=None
        for hpa_col in deployed_hpas_col:
            if  metadata.name == hpa_col["deployed_name"]:
                hpa_["name"] = metadata.name
                if "scaling_type" in hpa_col:
                    hpa_["deployed_scaling_type"] =hpa_col["scaling_type"]

                actual_name= hpa_col["name"]
                break
        for app_col in apps_col:
            if  actual_name == app_col["name"]:
                hpa_["paascataloguename"] =app_col["name"]
                hpa_["appid"] = app_col["_id"]
                if "autoscaling_policies" in app_col:
                    pol = []
                    for autoscaling_ in app_col["autoscaling_policies"]:
                        # print("autoscaling_")
                        # print(autoscaling_)

                        metric_=[]
                        for auto_metric in autoscaling_["monitoring_metrics"]:
                            hpa__={}
                            #print(auto_metric)
                            # if auto_metric["metric_name"]=="cpu": #TODO!! CHANGE IT FOR v1beta2 etc.....!!!!! (only cpu wokrs now)
                            hpa__["catalogue_util"] = auto_metric["util_percent"]
                            hpa__["metric_name"] =  auto_metric["metric_name"]
                            hpa__["catalogue_limit"] = auto_metric["limit"]
                            hpa__["catalogue_request"] = auto_metric["request"]
                            metric_.append(hpa__)
                            #pol["monitoring_metrics"]=  metric_

                        polic={}
                        polic["policy"]=autoscaling_["policy"]
                        polic["monitoring_metrics"] = metric_
                        pol.append(polic)


                    hpa_["catalogue_policy"]=pol
                break

        if hpa_: #if hpa_ is empty
            hpa_["min"]=spec.min_replicas
            hpa_["max"] = spec.max_replicas
            hpa_["deployed_util"] = spec.target_cpu_utilization_percentage
            hpa_["deployed_metric"] = "cpu"

            hpas.append(hpa_)

    return hpas

'''
{'api_version': None,
 'kind': None,
 'metadata': {'annotations': {'deployment.kubernetes.io/revision': '1'},
              'cluster_name': None,
              'creation_timestamp': datetime.datetime(2021, 8, 25, 15, 55, 48, tzinfo=tzutc()),
              'deletion_grace_period_seconds': None,
              'deletion_timestamp': None,
              'finalizers': None,
              'generate_name': None,
              'generation': 1,
              'labels': None,
              'managed_fields': [{'api_version': 'apps/v1',
                                  'fields_type': 'FieldsV1',
                                  'fields_v1': {'f:spec': {'f:progressDeadlineSeconds': {},
                                                           'f:replicas': {},
                                                           'f:revisionHistoryLimit': {},
                                                           'f:selector': {},
                                                           'f:strategy': {'f:rollingUpdate': {'.': {},
                                                                                              'f:maxSurge': {},
                                                                                              'f:maxUnavailable': {}},
                                                                          'f:type': {}},
                                                           'f:template': {'f:metadata': {'f:labels': {'.': {},
                                                                                                      'f:run': {}}},
                                                                          'f:spec': {'f:containers': {'k:{"name":"php-apache"}': {'.': {},
                                                                                                                                  'f:image': {},
                                                                                                                                  'f:imagePullPolicy': {},
                                                                                                                                  'f:name': {},
                                                                                                                                  'f:ports': {'.': {},
                                                                                                                                              'k:{"containerPort":80,"protocol":"TCP"}': {'.': {},
                                                                                                                                                                                          'f:containerPort': {},
                                                                                                                                                                                          'f:protocol': {}}},
                                                                                                                                  'f:resources': {},
                                                                                                                                  'f:terminationMessagePath': {},
                                                                                                                                  'f:terminationMessagePolicy': {}}},
                                                                                     'f:dnsPolicy': {},
                                                                                     'f:nodeSelector': {'.': {},
                                                                                                        'f:location': {}},
                                                                                     'f:restartPolicy': {},
                                                                                     'f:schedulerName': {},
                                                                                     'f:securityContext': {},
                                                                                     'f:terminationGracePeriodSeconds': {}}}}},
                                  'manager': 'OpenAPI-Generator',
                                  'operation': 'Update',
                                  'time': datetime.datetime(2021, 8, 25, 15, 55, 48, tzinfo=tzutc())},
                                 {'api_version': 'apps/v1',
                                  'fields_type': 'FieldsV1',
                                  'fields_v1': {'f:metadata': {'f:annotations': {'.': {},
                                                                                 'f:deployment.kubernetes.io/revision': {}}},
                                                'f:status': {'f:availableReplicas': {},
                                                             'f:conditions': {'.': {},
                                                                              'k:{"type":"Available"}': {'.': {},
                                                                                                         'f:lastTransitionTime': {},
                                                                                                         'f:lastUpdateTime': {},
                                                                                                         'f:message': {},
                                                                                                         'f:reason': {},
                                                                                                         'f:status': {},
                                                                                                         'f:type': {}},
                                                                              'k:{"type":"Progressing"}': {'.': {},
                                                                                                           'f:lastTransitionTime': {},
                                                                                                           'f:lastUpdateTime': {},
                                                                                                           'f:message': {},
                                                                                                           'f:reason': {},
                                                                                                           'f:status': {},
                                                                                                           'f:type': {}}},
                                                             'f:observedGeneration': {},
                                                             'f:readyReplicas': {},
                                                             'f:replicas': {},
                                                             'f:updatedReplicas': {}}},
                                  'manager': 'kube-controller-manager',
                                  'operation': 'Update',
                                  'time': datetime.datetime(2021, 8, 25, 15, 55, 56, tzinfo=tzutc())}],
              'name': 'php-apache',
              'namespace': 'pi-edge',
              'owner_references': None,
              'resource_version': '5920555',
              'self_link': '/apis/apps/v1/namespaces/emp/deployments/php-apache',
              'uid': 'aa844bd4-23b7-4a79-8d85-47ed31bc0a07'},
 'spec': {'min_ready_seconds': None,
          'paused': None,
          'progress_deadline_seconds': 600,
          'replicas': 1,
          'revision_history_limit': 10,
          'selector': {'match_expressions': None,
                       'match_labels': {'run': 'php-apache'}},
          'strategy': {'rolling_update': {'max_surge': '25%',
                                          'max_unavailable': '25%'},
                       'type': 'RollingUpdate'},
          'template': {'metadata': {'annotations': None,
                                    'cluster_name': None,
                                    'creation_timestamp': None,
                                    'deletion_grace_period_seconds': None,
                                    'deletion_timestamp': None,
                                    'finalizers': None,
                                    'generate_name': None,
                                    'generation': None,
                                    'labels': {'run': 'php-apache'},
                                    'managed_fields': None,
                                    'name': None,
                                    'namespace': None,
                                    'owner_references': None,
                                    'resource_version': None,
                                    'self_link': None,
                                    'uid': None},
                       'spec': {'active_deadline_seconds': None,
                                'affinity': None,
                                'automount_service_account_token': None,
                                'containers': [{'args': None,
                                                'command': None,
                                                'env': None,
                                                'env_from': None,
                                                'image': 'k8s.gcr.io/hpa-example',
                                                'image_pull_policy': 'Always',
                                                'lifecycle': None,
                                                'liveness_probe': None,
                                                'name': 'php-apache',
                                                'ports': [{'container_port': 80,
                                                           'host_ip': None,
                                                           'host_port': None,
                                                           'name': None,
                                                           'protocol': 'TCP'}],
                                                'readiness_probe': None,
                                                'resources': {'limits': None,
                                                              'requests': None},
                                                'security_context': None,
                                                'startup_probe': None,
                                                'stdin': None,
                                                'stdin_once': None,
                                                'termination_message_path': '/dev/termination-log',
                                                'termination_message_policy': 'File',
                                                'tty': None,
                                                'volume_devices': None,
                                                'volume_mounts': None,
                                                'working_dir': None}],
                                'dns_config': None,
                                'dns_policy': 'ClusterFirst',
                                'enable_service_links': None,
                                'ephemeral_containers': None,
                                'host_aliases': None,
                                'host_ipc': None,
                                'host_network': None,
                                'host_pid': None,
                                'hostname': None,
                                'image_pull_secrets': None,
                                'init_containers': None,
                                'node_name': None,
                                'node_selector': {'location': 'Peania_19002_Athens'},
                                'overhead': None,
                                'preemption_policy': None,
                                'priority': None,
                                'priority_class_name': None,
                                'readiness_gates': None,
                                'restart_policy': 'Always',
                                'runtime_class_name': None,
                                'scheduler_name': 'default-scheduler',
                                'security_context': {'fs_group': None,
                                                     'run_as_group': None,
                                                     'run_as_non_root': None,
                                                     'run_as_user': None,
                                                     'se_linux_options': None,
                                                     'supplemental_groups': None,
                                                     'sysctls': None,
                                                     'windows_options': None},
                                'service_account': None,
                                'service_account_name': None,
                                'share_process_namespace': None,
                                'subdomain': None,
                                'termination_grace_period_seconds': 30,
                                'tolerations': None,
                                'topology_spread_constraints': None,
                                'volumes': None}}},
 'status': {'available_replicas': 1,
            'collision_count': None,
            'conditions': [{'last_transition_time': datetime.datetime(2021, 8, 25, 15, 55, 56, tzinfo=tzutc()),
                            'last_update_time': datetime.datetime(2021, 8, 25, 15, 55, 56, tzinfo=tzutc()),
                            'message': 'Deployment has minimum availability.',
                            'reason': 'MinimumReplicasAvailable',
                            'status': 'True',
                            'type': 'Available'},
                           {'last_transition_time': datetime.datetime(2021, 8, 25, 15, 55, 48, tzinfo=tzutc()),
                            'last_update_time': datetime.datetime(2021, 8, 25, 15, 55, 56, tzinfo=tzutc()),
                            'message': 'ReplicaSet "php-apache-75554b4495" has '
                                       'successfully progressed.',
                            'reason': 'NewReplicaSetAvailable',
                            'status': 'True',
                            'type': 'Progressing'}],
            'observed_generation': 1,
            'ready_replicas': 1,
            'replicas': 1,
            'unavailable_replicas': None,
            'updated_replicas': 1}}
'''
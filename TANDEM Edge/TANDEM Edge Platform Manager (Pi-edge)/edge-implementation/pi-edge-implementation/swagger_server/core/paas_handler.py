# from swagger_server.models.service_function_registration_request import ServiceFunctionRegistrationRequest  # noqa: E501

from swagger_server.utils import connector_db, auxiliary_functions, kubernetes_connector
from swagger_server.models import PaasRegistrationRequest
from swagger_server.models import DeployPaas
from swagger_server.core import piedge_encoder
from swagger_server.models import DeployServiceFunction
from swagger_server.models import VolumeMountDeploy
from swagger_server.models import EnvParameters


def check_paas_registration(paas_registration_input: PaasRegistrationRequest):

    paas_json={}
    if paas_registration_input.paas_service_name is not None:
        paas_json["name"]=paas_registration_input.paas_service_name
    else:
        return []

    if paas_registration_input.service_functions is None :
        return []
    if  not paas_registration_input.service_functions:
        return []

    service_functions=[]

    for service_function in paas_registration_input.service_functions:
        ser_fun={}
        # print(service_function.service_function_identifier_name)
        if service_function.service_function_identifier_name is not None:


            #check that service_function exists in the catalogue and if it needs volume
            try:
                service_function_catalogue_array = connector_db.get_documents_from_collection("service_functions", input_type="name",
                                                                input_value=service_function.service_function_identifier_name)
                if not service_function_catalogue_array:
                    return []
                #service_function found
                service_function_catalogue=service_function_catalogue_array[0]
                ser_fun["service_function_identifier_name"]=service_function.service_function_identifier_name


                if service_function.autoscaling_metric is not None:
                    ser_fun["autoscaling_metric"] = service_function.autoscaling_metric

                #check volumes
                req_volumes = []
                if "required_volumes" in service_function_catalogue:
                    if service_function_catalogue["required_volumes"] is not None:
                        for required_volumes in service_function_catalogue["required_volumes"]:
                            req_volumes.append(required_volumes["name"])
                vol_mount = []
                volume_input = []
                if service_function.volume_mounts is not None:

                    for volume_mounts in service_function.volume_mounts:
                        vo_in={}
                        vo_in["name"] = volume_mounts.name
                        vo_in["storage"] = volume_mounts.storage
                        volume_input.append(vo_in)
                        vol_mount.append(volume_mounts.name)

                if len(vol_mount) != len(req_volumes):
                    return []
                else:
                    result = auxiliary_functions.equal_ignore_order(req_volumes, vol_mount)
                    if result is False:
                        return []
                    else:
                        if (len(vol_mount)!=0 and len(req_volumes)!=0):
                            ser_fun["volume_mounts"] = volume_input

                # check env parameters
                req_env_parameters = []
                if "required_env_parameters" in service_function_catalogue:
                    if service_function_catalogue["required_env_parameters"] is not None:
                        for required_env_params in service_function_catalogue["required_env_parameters"]:
                            req_env_parameters.append(required_env_params["name"])
                env_names = []
                env_input = []
                if service_function.env_parameters is not None:

                    for env_parameters in service_function.env_parameters:
                        env_in = {}
                        env_in["name"] = env_parameters.name

                        if env_parameters.value is not None:
                            env_in["value"] = env_parameters.value
                        else:
                            env_in["value_ref"] = env_parameters.value_ref
                        env_input.append(env_in)
                        env_names.append(env_parameters.name)

                if len(env_names) != len(req_env_parameters):
                    return []
                else:
                    result = auxiliary_functions.equal_ignore_order(req_env_parameters, env_names)
                    if result is False:
                        return []
                    else:
                        if (len(env_names) != 0 and len(req_env_parameters) != 0):
                            ser_fun["env_parameters"] = env_input
                service_functions.append(ser_fun)

            except Exception as ce_:
                raise Exception("An exception occurred :", ce_)
    paas_json["service_functions"]=service_functions

    return paas_json




def get_deployed_paas_services(instance_paas_name=None):
    deployed_sfs=kubernetes_connector.get_deployed_service_functions()

    if instance_paas_name is None:
        deployed_paas_services=connector_db.get_documents_from_collection(collection_input="deployed_paas_services")
    else:
        deployed_paas_services=connector_db.get_documents_from_collection(collection_input="deployed_paas_services",input_type="instance_name",
                                                                          input_value=instance_paas_name)


    deployed_paas=[]

    for deployed_paas_service in deployed_paas_services:

        deployed_paas_={}
        deployed_paas_["paas_name"]=deployed_paas_service["name"]
        deployed_paas_["paas_instance_name"]=deployed_paas_service["instance_name"]
        if  "location" in deployed_paas_service:
            deployed_paas_["location"]=deployed_paas_service["location"]
        if  "autoscaling_type" in deployed_paas_service:
            deployed_paas_["autoscaling_type"]=deployed_paas_service["autoscaling_type"]
        deployed_sfs_=[]
        for dsf in deployed_paas_service["service_functions"]:
            for deployed_sf in deployed_sfs:
              if dsf["instance_name"]==deployed_sf["service_function_instance_name"]:
                  deployed_sfs_.append(deployed_sf)
        deployed_paas_["deployed_service_functions"]=deployed_sfs_
        deployed_paas.append(deployed_paas_)
    if instance_paas_name is None:
        return deployed_paas
    else:
        if not deployed_paas:
            return {}
        else:
            return deployed_paas[0]


def operate_paas_delete_deployment_request(paas_instance_name):
    paas_service=get_deployed_paas_services(paas_instance_name)
    if len(paas_service)==0:
         return "The given paas service is not deployed"

    for sf in paas_service["deployed_service_functions"]:
        try:
            kubernetes_connector.delete_service_function(sf["service_function_instance_name"])
        except Exception as ce_:
            return ("An exception occurred :", ce_)
    document={}
    document["instance_name"]=paas_instance_name
    connector_db.delete_document_deployed_paas_service(document)
    return "PaaS Service deployment deleted"

def operate_paas_deployment_request(paas_deploy_input: DeployPaas):
    paas_service = connector_db.get_documents_from_collection("paas_services", input_type="name",
                                                               input_value=paas_deploy_input.paas_service_name)
    if not paas_service:
        return "The given paas service does not exist in the catalogue"

    # search if node exists in the node catalogue
    node_ = connector_db.get_documents_from_collection("points_of_presence", input_type="location",
                                                       input_value=paas_deploy_input.location)
    if not node_:
        return "The given location does not exist in the node catalogue"


    general_sf_deploy_req=DeployServiceFunction(location=None,autoscaling_metric=None, autoscaling_policy=None, volume_mounts=None,all_node_ports=None, node_ports=None)

    if paas_deploy_input.count_max is not None:
        general_sf_deploy_req.count_max = paas_deploy_input.count_max
    else:
        general_sf_deploy_req.count_max=1

    if paas_deploy_input.count_min is not None:
        general_sf_deploy_req.count_min = paas_deploy_input.count_min
    else:
        general_sf_deploy_req.count_min=1
    if paas_deploy_input.location is not None:
        general_sf_deploy_req.location= paas_deploy_input.location

    if paas_deploy_input.all_node_ports is not None:
        general_sf_deploy_req.all_node_ports= paas_deploy_input.all_node_ports

    if paas_deploy_input.node_ports is not None:
        general_sf_deploy_req.all_node_ports = paas_deploy_input.node_ports
    result_deployment_ = ""
    paas_service_functions=[]

    #deployment starts
    #deployment starts
    for service_function in paas_service[0]["service_functions"]:
        #we need to deploy each Service functions of paas
        #create IM for each service functions

        service_function_object=DeployServiceFunction()
        service_function_object=DeployServiceFunction.from_dict(service_function)
        #deploy_req=DeployServiceFunction(location=None, autoscaling_metric=None, autoscaling_policy=None, volume_mounts=None,all_node_ports=None, node_ports=None)

        #deploy_req=DeployServiceFunction(location=None,autoscaling_metric=None, autoscaling_policy=None, volume_mounts=None,all_node_ports=None, node_ports=None)
        deploy_req=general_sf_deploy_req
        if "autoscaling_metric" in service_function and paas_deploy_input.autoscaling_type is not None:
            if service_function["autoscaling_metric"] is not None:
                deploy_req.autoscaling_metric=service_function["autoscaling_metric"]
                deploy_req.autoscaling_policy = paas_deploy_input.autoscaling_type
            else:
                 deploy_req.autoscaling_metric = None
        else:
            deploy_req.autoscaling_policy = None
        # else:
        #     deploy_req.autoscaling_metric = None
        #     deploy_req.autoscaling_policy = None
        if "volume_mounts" in service_function:
            if service_function["volume_mounts"] is not None:
                deploy_req.volume_mounts=service_function_object.volume_mounts
            else:
                deploy_req.volume_mounts=None
        else:
             deploy_req.volume_mounts = None

        #env_paremeters
        if "env_parameters" in service_function:
            if service_function["env_parameters"] is not None:

                # create a List[EnvParameters] for each env functions
                env_list=[]
                for env in service_function["env_parameters"]:
                    env_params = EnvParameters.from_dict(env)
                    env_list.append(env_params)


                deploy_req.env_parameters=env_list
        else:
            deploy_req.env_parameters = None

        deploy_req.service_function_name = service_function["service_function_identifier_name"]
        deploy_req.service_function_instance_name = paas_deploy_input.paas_instance_name + str("-") + service_function["service_function_identifier_name"]

        try:

            result_deployment = piedge_encoder.deploy_service_function(deploy_req, paas_name=paas_deploy_input.paas_instance_name)

            if "deployed successfully" in result_deployment:
                # sf={}
                # sf["name"]=deploy_req.service_function_name
                # sf["instance_name"]=deploy_req.service_function_instance_name
                # if deploy_req.location is not None:
                #     sf["location"]=deploy_req.service_function_instance_name
                #
                # if deploy_req.autoscaling_policy is not None:
                #     sf["autoscaling_policy"] = deploy_req.autoscaling_policy
                #
                # if "required_volumes" in final_deploy_descriptor:
                #     deployed_service_function_db["volumes"] = final_deploy_descriptor["volumes"]


                sf=connector_db.get_documents_from_collection(collection_input="deployed_service_functions", input_type="instance_name",
                                                              input_value=auxiliary_functions.prepare_name_for_k8s(deploy_req.service_function_instance_name))

                if sf:
                    paas_service_functions.append(sf[0])

            result_deployment_= result_deployment_ + str(" \n")  + result_deployment


        except Exception as ce_:
            return ("An exception occurred :", ce_)
            # write to database deployed_paas_services
    insert_doc = {}
    print(result_deployment_)
    insert_doc["name"] = paas_deploy_input.paas_service_name
    insert_doc["instance_name"] = auxiliary_functions.prepare_name_for_k8s(paas_deploy_input.paas_instance_name)
    if paas_deploy_input.location is not None:
        insert_doc["location"] = paas_deploy_input.location
    if paas_deploy_input.autoscaling_type is not None:
        insert_doc["autoscaling_type"] = paas_deploy_input.autoscaling_type
    insert_doc["service_functions"]=paas_service_functions
    connector_db.insert_document_deployed_paas(insert_doc)
    return result_deployment_
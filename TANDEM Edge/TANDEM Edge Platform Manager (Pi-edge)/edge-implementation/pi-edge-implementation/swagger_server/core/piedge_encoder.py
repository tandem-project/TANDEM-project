import logging
import traceback
import connexion
import six
import json
import sys
import os

# from swagger_server.models.service_function_registration_request import ServiceFunctionRegistrationRequest  # noqa: E501
from swagger_server.models.deploy_service_function import DeployServiceFunction  # noqa: E501
from swagger_server.core import paas_handler
##THA TOU ALLAXW POLLA MONO GIA TIS METRISEIS!!!
#from swagger_server.utils import connector_db
from swagger_server.utils import kubernetes_connector, connector_db, auxiliary_functions
def deploy_chain(chain_input):
    for app_ in chain_input["chain_paas_services_order"]:
        for app_details in chain_input["apps"]:
            if app_ == app_details["paas_input_name"]:

                app_details["paas_input_name"]= chain_input["chain_service_name"] + "-" + app_
                response = deploy_service_function(app_details)

                break
    return "Chain deployed successfully"


def deploy_service_function(service_function: DeployServiceFunction, paas_name=None):  # noqa: E501
    # descriptor_paas_input["scaling_type"]="minimize_cost"
    # print(descriptor_paas_input)
    # we need to create the descriptor_paas_ needed for deployment
    # search if app exists in the catalogue

    ser_function_ = connector_db.get_documents_from_collection("service_functions", input_type="name",
                                                      input_value=service_function.service_function_name)
    if not ser_function_:
        return "The given service function does not exist in the catalogue"


    # search if node exists in the node catalogye
    node_ = connector_db.get_documents_from_collection("points_of_presence", input_type="location",
                                                       input_value=service_function.location)
    if not node_:
        return "The given location does not exist in the node catalogue"

    final_deploy_descriptor = {}
    # final_deploy_descriptor["name"]=app_[0]["name"]
    # testtest

    # deployed_name= app_[0]["name"]  + "emp"+ descriptor_paas_input["paas_input_name"]
    if paas_name is not None:
        final_deploy_descriptor["paas_name"] = paas_name

    deployed_name = service_function.service_function_instance_name

    deployed_name_= auxiliary_functions.prepare_name_for_k8s(deployed_name)

    final_deploy_descriptor["name"] = deployed_name_

    final_deploy_descriptor["count-min"] = 1 if service_function.count_min is not None else service_function.count_min
    final_deploy_descriptor["count-max"] = 1 if service_function.count_max is not None else service_function.count_max
    final_deploy_descriptor["location"] = service_function.location


    containers = []
    con_ = {}
    con_["image"] = ser_function_[0]["image"]
    #ports
    application_ports = ser_function_[0]["application_ports"]
    con_["application_ports"] = application_ports

    if service_function.all_node_ports is not None:
        if service_function.all_node_ports:
            con_["exposed_ports"] = application_ports
        else:
            exposed_ports = auxiliary_functions.return_equal_ignore_order(application_ports,
                                                                          service_function.node_ports)
            if exposed_ports:
                con_["exposed_ports"] = exposed_ports
           # application_ports = ser_function_[0]["application_ports"]
            # con_["application_ports"] = application_ports
            # containers.append(con_)
    else:
        if service_function.node_ports is not None:
            exposed_ports = auxiliary_functions.return_equal_ignore_order(application_ports,
                                                                          service_function.node_ports)
            if exposed_ports:

                con_["exposed_ports"] = exposed_ports
    containers.append(con_)

    final_deploy_descriptor["containers"] = containers

   #check volumes!!
    req_volumes = []
    if "required_volumes" in ser_function_[0]:
        if ser_function_[0]["required_volumes"] is not None:
            for required_volumes in ser_function_[0]["required_volumes"]:
                req_volumes.append(required_volumes["name"])
    vol_mount = []
    volume_input = []

    if service_function.volume_mounts is not None:
        for volume_mounts in service_function.volume_mounts:

            vo_in = {}

            vo_in["name"] = volume_mounts.name
            vo_in["storage"] = volume_mounts.storage
            volume_input.append(vo_in)
            vol_mount.append(volume_mounts.name)

    if (len(vol_mount) != len(req_volumes)):
        return "The selected service function requires " + str(len(req_volumes)) +" volume/ volumes "
    else:
        if ser_function_[0]["required_volumes"] is not None:

            result = auxiliary_functions.equal_ignore_order(req_volumes, vol_mount)

            if result is False:
                return "The selected service function requires " + str(len(req_volumes)) +" volume/ volumes. Please check volume names"
            else:
                volumes=[]
                for vol in ser_function_[0]["required_volumes"]:
                    for vol_re in service_function.volume_mounts:
                        vol_={}
                        if vol["name"]==vol_re.name:
                            vol_["name"]=vol_re.name
                            vol_["storage"]=vol_re.storage
                            vol_["path"]=vol["path"]
                            volumes.append(vol_)
                final_deploy_descriptor["volumes"] = volumes

    #check env parameters:
    req_env_parameters = []
    if "required_env_parameters" in ser_function_[0]:
        if ser_function_[0]["required_env_parameters"] is not None:
            for required_env_parameters in ser_function_[0]["required_env_parameters"]:
                req_env_parameters.append(required_env_parameters["name"])
    env_names = []
    env_input = []
    if service_function.env_parameters is not None:
        for env_parameters in service_function.env_parameters:
            env_in = {}

            env_in["name"] = env_parameters.name
            if env_parameters.value is not None:
                env_in["value"] = env_parameters.value
            elif env_parameters.value_ref is not None:
                env_in["value_ref"] = env_parameters.value_ref
            env_input.append(env_in)
            env_names.append(env_parameters.name)
    if (len(env_names) != len(req_env_parameters)):
        return "The selected service function requires " + str(len(req_env_parameters)) + " env parameters"
    else:
        if ser_function_[0]["required_env_parameters"] is not None:

            result = auxiliary_functions.equgal_ignore_order(req_env_parameters, env_names)

            if result is False:
                return "The selected service function requires " + str(
                    len(req_env_parameters)) + " env parameters. Please check names of env parameters"
            else:
                #EnvParameters to dict
                paremeters = []
                for reqenv in ser_function_[0]["required_env_parameters"]:
                    for env_in in service_function.env_parameters:
                        reqenv_ = {}
                        if reqenv["name"] == env_in.name:
                            reqenv_["name"] = env_in.name
                            if env_in.value is not None:
                                reqenv_["value"] = env_in.value
                            elif env_in.value_ref is not None:
                                reqenv_["value_ref"] = env_in.value_ref
                            paremeters.append(reqenv_)
                final_deploy_descriptor["env_parameters"] = paremeters


    #check autoscaling policies
    if "autoscaling_policies" in ser_function_[0]:
        if ser_function_[0]["autoscaling_policies"] is not None:
            if service_function.autoscaling_metric is not None:
                for scaling_method in ser_function_[0]["autoscaling_policies"]:
                    if service_function.autoscaling_policy is not None:
                        if scaling_method["policy"] == service_function.autoscaling_policy:
                            for metric in scaling_method["monitoring_metrics"]:

                                if metric["metric"] == service_function.autoscaling_metric:
                                    scaling_metric_ = []
                                    scaling_metric_.append(metric)
                                    final_deploy_descriptor["autoscaling_policies"] = scaling_metric_
                                    break


    exists_flag=False
    try:
        if exists_flag:
            response = kubernetes_connector.patch_service_function(final_deploy_descriptor)
        else:

            response = kubernetes_connector.deploy_service_function(final_deploy_descriptor)
            # insert it to mongo db
            deployed_service_function_db = {}
            deployed_service_function_db["service_function_name"] = ser_function_[0]["name"]
            if service_function.location is not None:
                deployed_service_function_db["location"] = service_function.location
            deployed_service_function_db["instance_name"] = deployed_name_

            if  service_function.autoscaling_policy is not None:
                deployed_service_function_db["autoscaling_policy"] = service_function.autoscaling_policy

            if "volumes" in final_deploy_descriptor:
                    deployed_service_function_db["volumes"] = final_deploy_descriptor["volumes"]
            if "env_parameters" in final_deploy_descriptor:
                    deployed_service_function_db["env_parameters"] = final_deploy_descriptor["env_parameters"]

            connector_db.insert_document_deployed_service_function(document=deployed_service_function_db)

        return response
        # return "PaaS deployed successfully"
    except Exception as ce_:
        #exc_type, exc_obj, exc_tb = sys.exc_info()
        #fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        #print(exc_type, fname, exc_tb.tb_lineno)
        #logging.error("ERROR TYPE: ",exc_type, fname, exc_tb.tb_lineno)
        logging.error(traceback.format_exc())
        # logging.error("ERROR NAME: ", fname)
        # logging.error("ERROR INFO: ", exc_tb.tb_lineno)
        return ("An exception occurred :", ce_)


def initiliaze_edge_nodes():
    try:
        nodes = kubernetes_connector.get_PoPs()
        # write it to mongodb
        for node in nodes:
            node_ = {}
            node_["name"] = node.name
            node_["location"] = node.location
            node_["_id"] = node.id
            node_["serial"] = node.serial
            connector_db.insert_document_nodes(node_)
        return "Nodes initialized"
    except Exception as ce_:
        logging.error(traceback.format_exc())
        raise Exception("An exception occurred :", ce_)
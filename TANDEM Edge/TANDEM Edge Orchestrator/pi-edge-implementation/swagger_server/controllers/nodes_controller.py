import connexion
import six

from swagger_server.models.deploy_paa_s_node import DeployPaaSNode  # noqa: E501
from swagger_server.models.nodes_response import NodesResponse  # noqa: E501
from swagger_server import util
from swagger_server.utils import connector_db
from swagger_server.utils import kubernetes_connector
from swagger_server.utils import nodes_monitoring

from swagger_server.core import piedge_encoder

from swagger_server import util
from swagger_server.core import paas_node_handler
from swagger_server.utils import user_authentication
from swagger_server.controllers import service_functions_instances_controller


# mon_node_ip=os.environ["MONITORING_IP"]
# mon_node_port=os.environ["MONITORING_NODE_PORT"]
# mon_node_ip= "203.0.113.172"
# mon_node_port="3000"

def activate_paas_node(body=None):  # noqa: E501
    """Request to create a \&quot;PaaS-enabled\&quot; node.

     # noqa: E501

    :param body: Deploy chain.
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DeployPaaSNode.from_dict(connexion.request.get_json())  # noqa: E501
        try:
            response=paas_node_handler.activate_paas_node(body)
            return response
        except Exception as ce_:
            return ("An exception occurred :", ce_)




def get_node_info(node_name):  # noqa: E501
    """Returns info of a specific edge node.
    """
    role = user_authentication.check_role()
    if role is not None and role == "admin":
        try:
            # nodes = connector_db.get_documents_from_collection(collection_input="points_of_presence")
            # return nodes

            #get metrics per node


            #CONTINUE FROM HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            service_functions=service_functions_instances_controller.deployed_service_functions_status()
            node_stat= kubernetes_connector.get_PoP_statistics(node_name)

            if any(node_stat):
                service_url = nodes_monitoring.create_monitoring_for_all_service_functions(service_functions, node_name)
                node_stat["nodeServicesMonitoringURL"]=service_url
                node_in_db = connector_db.get_documents_from_collection(collection_input="points_of_presence",input_type="name", input_value=node_name)
                node_stat["nodeUsageMonitoringURL"] = node_in_db[0]["nodeUsageMonitoringURL"]
                return node_stat
            else:
                return "The given node doesn't exist in this Edge Cloud"
        except Exception as ce_:
            raise Exception("An exception occurred :", ce_)
    else:
        return "You are not authorized to access the URL requested", 401

def get_nodes():  # noqa: E501
    """Returns the edge nodes status.

     # noqa: E501

    :rtype: NodesResponse
    """
    # bearer=connexion.request.headers['Authorization']
    # token = bearer.split()[1]  # YourTokenHere
    # print(token)

    role=user_authentication.check_role()
    role="admin"
    if role is not None and role=="admin":
        try:
            nodes = connector_db.get_documents_from_collection(collection_input="points_of_presence")

            response_nodes={}
            response_nodes["numberofNodes"]=len(nodes)
            response_nodes["monitorNodesURL"]="http://"+nodes_monitoring.get_monitoring_ip()+":"+nodes_monitoring.get_monitoring_port()+"/d/pi-edge-basic-infra/infrastructure-metrics"
            for node in nodes:
                del node["nodeUsageMonitoringURL"]
            response_nodes["nodes"]=nodes
            return response_nodes

        except Exception as ce_:
            raise Exception("An exception occurred :", ce_)
    else:
        return "You are not authorized to access the URL requested", 401


def init_nodes():  # noqa: E501
    """Initiliaze nodes. Scan nodes in the edge cluster.

     # noqa: E501


    :rtype: None
    """
    role = user_authentication.check_role()

    if role is not None and role == "admin":
        try:
            response=piedge_encoder.initiliaze_edge_nodes()
            return response
        except Exception as ce_:
            raise Exception("An exception occurred :", ce_)
    else:
        return "You are not authorized to access the URL requested", 401
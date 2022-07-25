import connexion
import six

from swagger_server.models.deploy_paa_s_node import DeployPaaSNode  # noqa: E501
from swagger_server.models.nodes_response import NodesResponse  # noqa: E501
from swagger_server import util
from swagger_server.utils import connector_db
from swagger_server.utils import kubernetes_connector

from swagger_server.core import piedge_encoder

from swagger_server import util
from swagger_server.core import paas_node_handler

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


def get_nodes():  # noqa: E501
    """Returns the edge nodes status.

     # noqa: E501


    :rtype: NodesResponse
    """
    try:
        nodes = connector_db.get_documents_from_collection(collection_input="points_of_presence")
        return nodes
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def init_nodes():  # noqa: E501
    """Initiliaze nodes. Scan nodes in the edge cluster.

     # noqa: E501


    :rtype: None
    """
    try:
        response=piedge_encoder.initiliaze_edge_nodes()
        return response
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)

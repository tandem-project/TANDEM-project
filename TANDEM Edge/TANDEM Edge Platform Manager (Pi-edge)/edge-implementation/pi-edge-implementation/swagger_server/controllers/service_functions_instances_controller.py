import connexion
import six

from swagger_server.models.deploy_chain import DeployChain  # noqa: E501
from swagger_server.models.deploy_service_function import DeployServiceFunction  # noqa: E501
from swagger_server.models.deployedapps_response import DeployedappsResponse  # noqa: E501
from swagger_server import util
from swagger_server.core import piedge_encoder
from swagger_server.utils import connector_db
from swagger_server.utils import kubernetes_connector,auxiliary_functions

def delete_chain(chain_service_name):  # noqa: E501
    """Deletes a deployed chain.

     # noqa: E501

    :param chain_service_name: Represents a chain Service  from the running deployments.
    :type chain_service_name: str

    :rtype: None
    """
    return 'do some magic!'


def delete_deployed_service_function(deployed_service_function_name):  # noqa: E501
    """Deletes a deployed Service function.

     # noqa: E501

    :param deployed_service_function_name: Represents a service function from the running deployments.
    :type deployed_service_function_name: str

    :rtype: None
    """
    try:
        deployed_service_function_name_=auxiliary_functions.prepare_name_for_k8s(deployed_service_function_name)
        kubernetes_connector.delete_service_function(deployed_service_function_name_)
        return "Service function deployment deleted"
    except Exception as ce_:
        return ("An exception occurred :", ce_)



def deploy_chain(body=None):  # noqa: E501
    """Request to deploy a chain of function services.

     # noqa: E501

    :param body: Deploy chain.
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DeployChain.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def deploy_service_function(body=None):  # noqa: E501
    """Request to deploy a Service function (from the catalogue) to an edge node.

     # noqa: E501

    :param body: Deploy Service Function.
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DeployServiceFunction.from_dict(connexion.request.get_json())  # noqa: E501
        descriptor_service_function = body.to_dict()

        try:
            response = piedge_encoder.deploy_service_function(body)
            return response
        except Exception as ce_:
            return ("An exception occurred :", ce_)


def deployed_service_function_status(deployed_service_function_name):  # noqa: E501
    """Returns the requested edge service status per node.

     # noqa: E501

    :param deployed_service_function_name: Represents a  service function  from the running deployments
    :type deployed_service_function_name: str

    :rtype: DeployedappsResponse
    """
    try:
        response = kubernetes_connector.get_deployed_service_functions()
        final_response = {}
        if response:
            for sf in response:
                if sf["service_function_instance_name"] == deployed_service_function_name:
                    final_response = sf
                    break

                if sf["service_function_instance_name"] == deployed_service_function_name.lower():
                    final_response = sf
                    break
        return final_response
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def deployed_service_functions_status():  # noqa: E501
    """Returns the edge service functions status per node.

     # noqa: E501


    :rtype: DeployedappsResponse
    """
    try:
        response = kubernetes_connector.get_deployed_service_functions()
        return response
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def update_chain(body=None):  # noqa: E501
    """Request to update a chain of function services.

     # noqa: E501

    :param body: Deploy chain.
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DeployChain.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def update_deployed_service_function(body=None):  # noqa: E501
    """Request to update the status of a service.

     # noqa: E501

    :param body: update a running service function.
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DeployServiceFunction.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'

import connexion
import six

from swagger_server.models.deploy_chain import DeployChain  # noqa: E501
from swagger_server.models.deploy_paas import DeployPaas  # noqa: E501
from swagger_server.models.deployedapps_response import DeployedappsResponse  # noqa: E501
from swagger_server import util
from swagger_server.core import paas_handler


def delete_deployed_paas_service(deployed_paas_service_name):  # noqa: E501
    """Deletes a deployed PaaS service.

     # noqa: E501

    :param deployed_paas_service_name: Represents a paas  from the running deployments.
    :type deployed_paas_service_name: str

    :rtype: None
    """
    try:
        response=paas_handler.operate_paas_delete_deployment_request(deployed_paas_service_name)
        return response
    except Exception as ce_:
        return ("An exception occurred :", ce_)


def deploy_paas(body=None):  # noqa: E501
    """Request to deploy a PaaS (from the catalogue) to an edge node.

     # noqa: E501

    :param body: Deploy PaaS.
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DeployPaas.from_dict(connexion.request.get_json())  # noqa: E501
        try:
            response = paas_handler.operate_paas_deployment_request(body)
            return response
        except Exception as ce_:
            return ("An exception occurred :", ce_)




def deployed_paas_service_status(deployed_paas_service_name):  # noqa: E501
    """Returns the requested edge paas service status.

     # noqa: E501

    :param deployed_paas_service_name: Represents a paas  from the running deployments.
    :type deployed_paas_service_name: str

    :rtype: DeployedappsResponse
    """
    try:
        response = paas_handler.get_deployed_paas_services(deployed_paas_service_name)
        # response = kubernetes_connector.get_deployed_service_functions()
        return response
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def deployed_paas_services_status():  # noqa: E501
    """Returns edge paas services status.

     # noqa: E501


    :rtype: DeployedappsResponse
    """
    try:
        response = paas_handler.get_deployed_paas_services()
        #response = kubernetes_connector.get_deployed_service_functions()
        return response
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def update_deployed_paas(body=None):  # noqa: E501
    """Request to update the status of a deployed PaaS.

     # noqa: E501

    :param body: update a running paas.
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DeployChain.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'

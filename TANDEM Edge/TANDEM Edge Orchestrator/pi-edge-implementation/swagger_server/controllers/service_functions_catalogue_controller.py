import connexion
import six
from swagger_server.models.apps_response import AppsResponse  # noqa: E501
from swagger_server.models.apps_response_apps import AppsResponseApps  # noqa: E501
from swagger_server.models.service_function_registration_request import ServiceFunctionRegistrationRequest  # noqa: E501
from swagger_server import util
from swagger_server.utils import connector_db
from swagger_server.utils import kubernetes_connector, user_authentication

def deregister_service_function(service_function_name):  # noqa: E501
    """Deregister service.

     # noqa: E501

    :param service_function_name: Returns a  specific service function from the catalogue.
    :type service_function_name: str

    :rtype: None


    """
    role = user_authentication.check_role()
    if role is not None and role == "admin":
        try:

            status_deregistration=connector_db.delete_document_service_function(service_function_name)

            return status_deregistration
        except Exception as ce_:
            raise Exception("An exception occurred :", ce_)

    else:
        return "You are not authorized to access the URL requested", 401


def get_service_function(service_function_id):  # noqa: E501
    """Returns a specific service function from the catalogue.

     # noqa: E501

    :param service_function_id: Returns a  specific service function from the catalogue.
    :type service_function_id: str

    :rtype: AppsResponseApps
    """

    try:
        service_function = connector_db.get_documents_from_collection("service_functions", input_type="_id", input_value=service_function_id)
        if not service_function:
            return service_function
        else:
            return service_function[0]
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def get_service_functions():  # noqa: E501
    """Returns service functions from the catalogue.

     # noqa: E501


    :rtype: AppsResponse
    """
    try:
        service_functions = connector_db.get_documents_from_collection(collection_input="service_functions")
        return service_functions
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)



def register_service_function(body=None):  # noqa: E501
    """Register Service.

     # noqa: E501

    :param body: Registration method to save service function into database
    :type body: dict | bytes

    :rtype: None
    """

    role = user_authentication.check_role()
    if role is not None and role == "admin":
        if connexion.request.is_json:
            body = ServiceFunctionRegistrationRequest.from_dict(connexion.request.get_json())  # noqa: E501
            insert_doc = body.to_dict()
            #print(body)
            try:
                registration_status=connector_db.insert_document_service_function(insert_doc)
                return registration_status
            except Exception as ce_:
                raise Exception("An exception occurred :", ce_)
    else:
        return "You are not authorized to access the URL requested", 401

#TODO!!!!
def update_service_function(body=None):  # noqa: E501
    """Update Service registration.

     # noqa: E501

    :param body: Registration method to update service function into database
    :type body: dict | bytes

    :rtype: None
    """
    role = user_authentication.check_role()
    if role is not None and role == "admin":
        if connexion.request.is_json:
            body = ServiceFunctionRegistrationRequest.from_dict(connexion.request.get_json())  # noqa: E501

            insert_doc = body.to_dict()
            # insert_doc["kubernetesPlatformName"] = body.kubernetes_platform_name
            # insert_doc["kubernetesAuthCredentials"] = body.kubernetes_auth_credentials.to_dict()
            try:
                response_status = connector_db.update_document_service_function(insert_doc)
                return response_status
            except Exception as ce_:
                raise Exception("An exception occurred :", ce_)
    else:
        return "You are not authorized to access the URL requested", 401

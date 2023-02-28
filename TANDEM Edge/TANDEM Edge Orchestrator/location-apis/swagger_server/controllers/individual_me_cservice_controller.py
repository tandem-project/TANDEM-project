import connexion
import six

from swagger_server.models.problem_details import ProblemDetails  # noqa: E501
from swagger_server.models.service_liveness_info import ServiceLivenessInfo  # noqa: E501
from swagger_server.models.service_liveness_update import ServiceLivenessUpdate  # noqa: E501
from swagger_server import util


def get_individual_mec_service():  # noqa: E501
    """get mecServiceLiveness

    This method retrieves information about an \&quot;Individual mecServiceLiveness\&quot; resource # noqa: E501


    :rtype: ServiceLivenessInfo
    """
    return 'do some magic!'


def patch_individual_mec_service(body):  # noqa: E501
    """Update mecServiceLiveness

    This method updates a resource on top of the existing resource state with partial changes described by the client. # noqa: E501

    :param body: It contains an update of the liveness state.
    :type body: dict | bytes

    :rtype: ServiceLivenessInfo
    """
    if connexion.request.is_json:
        body = ServiceLivenessUpdate.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'

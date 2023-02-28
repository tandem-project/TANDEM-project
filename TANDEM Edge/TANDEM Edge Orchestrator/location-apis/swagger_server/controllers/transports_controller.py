import connexion
import six

from swagger_server.models.problem_details import ProblemDetails  # noqa: E501
from swagger_server.models.transport_info import TransportInfo  # noqa: E501
from swagger_server import util


def transports_get():  # noqa: E501
    """Get transports

    This method retrieves information about a list of available transports. This method is typically used by a service-producing application to discover transports provided by the MEC platform in the \&quot;transport information query\&quot; procedure # noqa: E501


    :rtype: List[TransportInfo]
    """
    return 'do some magic!'

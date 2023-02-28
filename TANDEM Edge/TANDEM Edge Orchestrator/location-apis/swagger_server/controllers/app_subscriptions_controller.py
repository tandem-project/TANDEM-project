import connexion
import six

from swagger_server.models.mec_service_mgmt_api_subscription_link_list import MecServiceMgmtApiSubscriptionLinkList  # noqa: E501
from swagger_server.models.problem_details import ProblemDetails  # noqa: E501
from swagger_server.models.ser_availability_notification_subscription import SerAvailabilityNotificationSubscription  # noqa: E501
from swagger_server import util


def applications_subscription_delete(app_instance_id, subscription_id):  # noqa: E501
    """delete subscription

    This method deletes a mecSrvMgmtSubscription. This method is typically used in \&quot;Unsubscribing from service availability event notifications\&quot; procedure. # noqa: E501

    :param app_instance_id: Represents a MEC application instance. Note that the appInstanceId is allocated by the MEC platform manager.
    :type app_instance_id: str
    :param subscription_id: Represents a subscription to the notifications from the MEC platform.
    :type subscription_id: str

    :rtype: None
    """
    return 'do some magic!'


def applications_subscription_get(app_instance_id, subscription_id):  # noqa: E501
    """Get subscription

    The GET method requests information about a subscription for this requestor. Upon success, the response contains entity body with the subscription for the requestor. # noqa: E501

    :param app_instance_id: Represents a MEC application instance. Note that the appInstanceId is allocated by the MEC platform manager.
    :type app_instance_id: str
    :param subscription_id: Represents a subscription to the notifications from the MEC platform.
    :type subscription_id: str

    :rtype: SerAvailabilityNotificationSubscription
    """
    return 'do some magic!'


def applications_subscriptions_get(app_instance_id):  # noqa: E501
    """Get subscriptions

    The GET method may be used to request information about all subscriptions for this requestor. Upon success, the response contains entity body with all the subscriptions for the requestor. # noqa: E501

    :param app_instance_id: Represents a MEC application instance. Note that the appInstanceId is allocated by the MEC platform manager.
    :type app_instance_id: str

    :rtype: MecServiceMgmtApiSubscriptionLinkList
    """
    return 'do some magic!'


def applications_subscriptions_post(body, app_instance_id):  # noqa: E501
    """Create subscription

    The POST method may be used to create a new subscription. One example use case is to create a new subscription to the MEC service availability notifications. Upon success, the response contains entity body describing the created subscription. # noqa: E501

    :param body: Entity body in the request contains a subscription to the MEC application termination notifications that is to be created.
    :type body: dict | bytes
    :param app_instance_id: Represents a MEC application instance. Note that the appInstanceId is allocated by the MEC platform manager.
    :type app_instance_id: str

    :rtype: SerAvailabilityNotificationSubscription
    """
    if connexion.request.is_json:
        body = SerAvailabilityNotificationSubscription.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
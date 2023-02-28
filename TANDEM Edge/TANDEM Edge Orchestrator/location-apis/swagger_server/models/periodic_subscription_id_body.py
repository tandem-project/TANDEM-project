# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.periodic_notification_subscription import PeriodicNotificationSubscription  # noqa: F401,E501
from swagger_server import util


class PeriodicSubscriptionIdBody(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, periodic_notification_subscription: PeriodicNotificationSubscription=None):  # noqa: E501
        """PeriodicSubscriptionIdBody - a model defined in Swagger

        :param periodic_notification_subscription: The periodic_notification_subscription of this PeriodicSubscriptionIdBody.  # noqa: E501
        :type periodic_notification_subscription: PeriodicNotificationSubscription
        """
        self.swagger_types = {
            'periodic_notification_subscription': PeriodicNotificationSubscription
        }

        self.attribute_map = {
            'periodic_notification_subscription': 'periodicNotificationSubscription'
        }
        self._periodic_notification_subscription = periodic_notification_subscription

    @classmethod
    def from_dict(cls, dikt) -> 'PeriodicSubscriptionIdBody':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The periodic_subscriptionId_body of this PeriodicSubscriptionIdBody.  # noqa: E501
        :rtype: PeriodicSubscriptionIdBody
        """
        return util.deserialize_model(dikt, cls)

    @property
    def periodic_notification_subscription(self) -> PeriodicNotificationSubscription:
        """Gets the periodic_notification_subscription of this PeriodicSubscriptionIdBody.


        :return: The periodic_notification_subscription of this PeriodicSubscriptionIdBody.
        :rtype: PeriodicNotificationSubscription
        """
        return self._periodic_notification_subscription

    @periodic_notification_subscription.setter
    def periodic_notification_subscription(self, periodic_notification_subscription: PeriodicNotificationSubscription):
        """Sets the periodic_notification_subscription of this PeriodicSubscriptionIdBody.


        :param periodic_notification_subscription: The periodic_notification_subscription of this PeriodicSubscriptionIdBody.
        :type periodic_notification_subscription: PeriodicNotificationSubscription
        """

        self._periodic_notification_subscription = periodic_notification_subscription
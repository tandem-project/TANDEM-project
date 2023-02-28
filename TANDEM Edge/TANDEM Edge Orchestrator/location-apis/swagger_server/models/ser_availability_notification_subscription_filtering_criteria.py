# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.category_ref import CategoryRef  # noqa: F401,E501
from swagger_server.models.service_state import ServiceState  # noqa: F401,E501
from swagger_server import util


class SerAvailabilityNotificationSubscriptionFilteringCriteria(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, ser_instance_ids: List[str]=None, ser_names: List[str]=None, ser_categories: List[CategoryRef]=None, states: List[ServiceState]=None, is_local: bool=None):  # noqa: E501
        """SerAvailabilityNotificationSubscriptionFilteringCriteria - a model defined in Swagger

        :param ser_instance_ids: The ser_instance_ids of this SerAvailabilityNotificationSubscriptionFilteringCriteria.  # noqa: E501
        :type ser_instance_ids: List[str]
        :param ser_names: The ser_names of this SerAvailabilityNotificationSubscriptionFilteringCriteria.  # noqa: E501
        :type ser_names: List[str]
        :param ser_categories: The ser_categories of this SerAvailabilityNotificationSubscriptionFilteringCriteria.  # noqa: E501
        :type ser_categories: List[CategoryRef]
        :param states: The states of this SerAvailabilityNotificationSubscriptionFilteringCriteria.  # noqa: E501
        :type states: List[ServiceState]
        :param is_local: The is_local of this SerAvailabilityNotificationSubscriptionFilteringCriteria.  # noqa: E501
        :type is_local: bool
        """
        self.swagger_types = {
            'ser_instance_ids': List[str],
            'ser_names': List[str],
            'ser_categories': List[CategoryRef],
            'states': List[ServiceState],
            'is_local': bool
        }

        self.attribute_map = {
            'ser_instance_ids': 'serInstanceIds',
            'ser_names': 'serNames',
            'ser_categories': 'serCategories',
            'states': 'states',
            'is_local': 'isLocal'
        }
        self._ser_instance_ids = ser_instance_ids
        self._ser_names = ser_names
        self._ser_categories = ser_categories
        self._states = states
        self._is_local = is_local

    @classmethod
    def from_dict(cls, dikt) -> 'SerAvailabilityNotificationSubscriptionFilteringCriteria':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The SerAvailabilityNotificationSubscription.FilteringCriteria of this SerAvailabilityNotificationSubscriptionFilteringCriteria.  # noqa: E501
        :rtype: SerAvailabilityNotificationSubscriptionFilteringCriteria
        """
        return util.deserialize_model(dikt, cls)

    @property
    def ser_instance_ids(self) -> List[str]:
        """Gets the ser_instance_ids of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        Identifiers of service instances about which to report events.  # noqa: E501

        :return: The ser_instance_ids of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :rtype: List[str]
        """
        return self._ser_instance_ids

    @ser_instance_ids.setter
    def ser_instance_ids(self, ser_instance_ids: List[str]):
        """Sets the ser_instance_ids of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        Identifiers of service instances about which to report events.  # noqa: E501

        :param ser_instance_ids: The ser_instance_ids of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :type ser_instance_ids: List[str]
        """

        self._ser_instance_ids = ser_instance_ids

    @property
    def ser_names(self) -> List[str]:
        """Gets the ser_names of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        Names of services about which to report events.  # noqa: E501

        :return: The ser_names of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :rtype: List[str]
        """
        return self._ser_names

    @ser_names.setter
    def ser_names(self, ser_names: List[str]):
        """Sets the ser_names of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        Names of services about which to report events.  # noqa: E501

        :param ser_names: The ser_names of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :type ser_names: List[str]
        """

        self._ser_names = ser_names

    @property
    def ser_categories(self) -> List[CategoryRef]:
        """Gets the ser_categories of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        Categories of services about which to report events.  # noqa: E501

        :return: The ser_categories of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :rtype: List[CategoryRef]
        """
        return self._ser_categories

    @ser_categories.setter
    def ser_categories(self, ser_categories: List[CategoryRef]):
        """Sets the ser_categories of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        Categories of services about which to report events.  # noqa: E501

        :param ser_categories: The ser_categories of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :type ser_categories: List[CategoryRef]
        """

        self._ser_categories = ser_categories

    @property
    def states(self) -> List[ServiceState]:
        """Gets the states of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        States of the services about which to report events. If the event is  a state change, this filter represents the state after the change.  # noqa: E501

        :return: The states of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :rtype: List[ServiceState]
        """
        return self._states

    @states.setter
    def states(self, states: List[ServiceState]):
        """Sets the states of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        States of the services about which to report events. If the event is  a state change, this filter represents the state after the change.  # noqa: E501

        :param states: The states of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :type states: List[ServiceState]
        """

        self._states = states

    @property
    def is_local(self) -> bool:
        """Gets the is_local of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        Indicate whether the service is located in the same locality (as defined by scopeOfLocality) as the consuming MEC application.  # noqa: E501

        :return: The is_local of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :rtype: bool
        """
        return self._is_local

    @is_local.setter
    def is_local(self, is_local: bool):
        """Sets the is_local of this SerAvailabilityNotificationSubscriptionFilteringCriteria.

        Indicate whether the service is located in the same locality (as defined by scopeOfLocality) as the consuming MEC application.  # noqa: E501

        :param is_local: The is_local of this SerAvailabilityNotificationSubscriptionFilteringCriteria.
        :type is_local: bool
        """

        self._is_local = is_local
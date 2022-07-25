# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class DeployPaas(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, paas_service_name: str=None, paas_instance_name: str=None, autoscaling_metric: str=None, autoscaling_type: str=None, count_min: int=None, count_max: int=None, location: str=None, all_node_ports: bool=None, node_ports: List[int]=None):  # noqa: E501
        """DeployPaas - a model defined in Swagger

        :param paas_service_name: The paas_service_name of this DeployPaas.  # noqa: E501
        :type paas_service_name: str
        :param paas_instance_name: The paas_instance_name of this DeployPaas.  # noqa: E501
        :type paas_instance_name: str
        :param autoscaling_metric: The autoscaling_metric of this DeployPaas.  # noqa: E501
        :type autoscaling_metric: str
        :param autoscaling_type: The autoscaling_type of this DeployPaas.  # noqa: E501
        :type autoscaling_type: str
        :param count_min: The count_min of this DeployPaas.  # noqa: E501
        :type count_min: int
        :param count_max: The count_max of this DeployPaas.  # noqa: E501
        :type count_max: int
        :param location: The location of this DeployPaas.  # noqa: E501
        :type location: str
        :param all_node_ports: The all_node_ports of this DeployPaas.  # noqa: E501
        :type all_node_ports: bool
        :param node_ports: The node_ports of this DeployPaas.  # noqa: E501
        :type node_ports: List[int]
        """
        self.swagger_types = {
            'paas_service_name': str,
            'paas_instance_name': str,
            'autoscaling_metric': str,
            'autoscaling_type': str,
            'count_min': int,
            'count_max': int,
            'location': str,
            'all_node_ports': bool,
            'node_ports': List[int]
        }

        self.attribute_map = {
            'paas_service_name': 'paas_service_name',
            'paas_instance_name': 'paas_instance_name',
            'autoscaling_metric': 'autoscaling_metric',
            'autoscaling_type': 'autoscaling_type',
            'count_min': 'count_min',
            'count_max': 'count_max',
            'location': 'location',
            'all_node_ports': 'all_node_ports',
            'node_ports': 'node_ports'
        }
        self._paas_service_name = paas_service_name
        self._paas_instance_name = paas_instance_name
        self._autoscaling_metric = autoscaling_metric
        self._autoscaling_type = autoscaling_type
        self._count_min = count_min
        self._count_max = count_max
        self._location = location
        self._all_node_ports = all_node_ports
        self._node_ports = node_ports

    @classmethod
    def from_dict(cls, dikt) -> 'DeployPaas':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The deployPaas of this DeployPaas.  # noqa: E501
        :rtype: DeployPaas
        """
        return util.deserialize_model(dikt, cls)

    @property
    def paas_service_name(self) -> str:
        """Gets the paas_service_name of this DeployPaas.


        :return: The paas_service_name of this DeployPaas.
        :rtype: str
        """
        return self._paas_service_name

    @paas_service_name.setter
    def paas_service_name(self, paas_service_name: str):
        """Sets the paas_service_name of this DeployPaas.


        :param paas_service_name: The paas_service_name of this DeployPaas.
        :type paas_service_name: str
        """

        self._paas_service_name = paas_service_name

    @property
    def paas_instance_name(self) -> str:
        """Gets the paas_instance_name of this DeployPaas.


        :return: The paas_instance_name of this DeployPaas.
        :rtype: str
        """
        return self._paas_instance_name

    @paas_instance_name.setter
    def paas_instance_name(self, paas_instance_name: str):
        """Sets the paas_instance_name of this DeployPaas.


        :param paas_instance_name: The paas_instance_name of this DeployPaas.
        :type paas_instance_name: str
        """

        self._paas_instance_name = paas_instance_name

    @property
    def autoscaling_metric(self) -> str:
        """Gets the autoscaling_metric of this DeployPaas.


        :return: The autoscaling_metric of this DeployPaas.
        :rtype: str
        """
        return self._autoscaling_metric

    @autoscaling_metric.setter
    def autoscaling_metric(self, autoscaling_metric: str):
        """Sets the autoscaling_metric of this DeployPaas.


        :param autoscaling_metric: The autoscaling_metric of this DeployPaas.
        :type autoscaling_metric: str
        """

        self._autoscaling_metric = autoscaling_metric

    @property
    def autoscaling_type(self) -> str:
        """Gets the autoscaling_type of this DeployPaas.


        :return: The autoscaling_type of this DeployPaas.
        :rtype: str
        """
        return self._autoscaling_type

    @autoscaling_type.setter
    def autoscaling_type(self, autoscaling_type: str):
        """Sets the autoscaling_type of this DeployPaas.


        :param autoscaling_type: The autoscaling_type of this DeployPaas.
        :type autoscaling_type: str
        """

        self._autoscaling_type = autoscaling_type

    @property
    def count_min(self) -> int:
        """Gets the count_min of this DeployPaas.


        :return: The count_min of this DeployPaas.
        :rtype: int
        """
        return self._count_min

    @count_min.setter
    def count_min(self, count_min: int):
        """Sets the count_min of this DeployPaas.


        :param count_min: The count_min of this DeployPaas.
        :type count_min: int
        """

        self._count_min = count_min

    @property
    def count_max(self) -> int:
        """Gets the count_max of this DeployPaas.


        :return: The count_max of this DeployPaas.
        :rtype: int
        """
        return self._count_max

    @count_max.setter
    def count_max(self, count_max: int):
        """Sets the count_max of this DeployPaas.


        :param count_max: The count_max of this DeployPaas.
        :type count_max: int
        """

        self._count_max = count_max

    @property
    def location(self) -> str:
        """Gets the location of this DeployPaas.


        :return: The location of this DeployPaas.
        :rtype: str
        """
        return self._location

    @location.setter
    def location(self, location: str):
        """Sets the location of this DeployPaas.


        :param location: The location of this DeployPaas.
        :type location: str
        """

        self._location = location

    @property
    def all_node_ports(self) -> bool:
        """Gets the all_node_ports of this DeployPaas.


        :return: The all_node_ports of this DeployPaas.
        :rtype: bool
        """
        return self._all_node_ports

    @all_node_ports.setter
    def all_node_ports(self, all_node_ports: bool):
        """Sets the all_node_ports of this DeployPaas.


        :param all_node_ports: The all_node_ports of this DeployPaas.
        :type all_node_ports: bool
        """

        self._all_node_ports = all_node_ports

    @property
    def node_ports(self) -> List[int]:
        """Gets the node_ports of this DeployPaas.


        :return: The node_ports of this DeployPaas.
        :rtype: List[int]
        """
        return self._node_ports

    @node_ports.setter
    def node_ports(self, node_ports: List[int]):
        """Sets the node_ports of this DeployPaas.


        :param node_ports: The node_ports of this DeployPaas.
        :type node_ports: List[int]
        """

        self._node_ports = node_ports

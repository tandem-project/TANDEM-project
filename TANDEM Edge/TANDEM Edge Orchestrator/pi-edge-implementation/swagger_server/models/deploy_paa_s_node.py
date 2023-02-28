# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.deploy_paas import DeployPaas  # noqa: F401,E501
from swagger_server import util


class DeployPaaSNode(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, node_name: str=None, location: str=None, paas_services: List[DeployPaas]=None):  # noqa: E501
        """DeployPaaSNode - a model defined in Swagger

        :param node_name: The node_name of this DeployPaaSNode.  # noqa: E501
        :type node_name: str
        :param location: The location of this DeployPaaSNode.  # noqa: E501
        :type location: str
        :param paas_services: The paas_services of this DeployPaaSNode.  # noqa: E501
        :type paas_services: List[DeployPaas]
        """
        self.swagger_types = {
            'node_name': str,
            'location': str,
            'paas_services': List[DeployPaas]
        }

        self.attribute_map = {
            'node_name': 'node_name',
            'location': 'location',
            'paas_services': 'paas_services'
        }
        self._node_name = node_name
        self._location = location
        self._paas_services = paas_services

    @classmethod
    def from_dict(cls, dikt) -> 'DeployPaaSNode':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The deployPaaSNode of this DeployPaaSNode.  # noqa: E501
        :rtype: DeployPaaSNode
        """
        return util.deserialize_model(dikt, cls)

    @property
    def node_name(self) -> str:
        """Gets the node_name of this DeployPaaSNode.


        :return: The node_name of this DeployPaaSNode.
        :rtype: str
        """
        return self._node_name

    @node_name.setter
    def node_name(self, node_name: str):
        """Sets the node_name of this DeployPaaSNode.


        :param node_name: The node_name of this DeployPaaSNode.
        :type node_name: str
        """

        self._node_name = node_name

    @property
    def location(self) -> str:
        """Gets the location of this DeployPaaSNode.


        :return: The location of this DeployPaaSNode.
        :rtype: str
        """
        return self._location

    @location.setter
    def location(self, location: str):
        """Sets the location of this DeployPaaSNode.


        :param location: The location of this DeployPaaSNode.
        :type location: str
        """

        self._location = location

    @property
    def paas_services(self) -> List[DeployPaas]:
        """Gets the paas_services of this DeployPaaSNode.


        :return: The paas_services of this DeployPaaSNode.
        :rtype: List[DeployPaas]
        """
        return self._paas_services

    @paas_services.setter
    def paas_services(self, paas_services: List[DeployPaas]):
        """Sets the paas_services of this DeployPaaSNode.


        :param paas_services: The paas_services of this DeployPaaSNode.
        :type paas_services: List[DeployPaas]
        """

        self._paas_services = paas_services
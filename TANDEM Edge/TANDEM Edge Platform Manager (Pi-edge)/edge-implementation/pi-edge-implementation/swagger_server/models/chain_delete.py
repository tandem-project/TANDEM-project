# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class ChainDelete(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, chain_service_name: str=None):  # noqa: E501
        """ChainDelete - a model defined in Swagger

        :param chain_service_name: The chain_service_name of this ChainDelete.  # noqa: E501
        :type chain_service_name: str
        """
        self.swagger_types = {
            'chain_service_name': str
        }

        self.attribute_map = {
            'chain_service_name': 'chain_service_name'
        }
        self._chain_service_name = chain_service_name

    @classmethod
    def from_dict(cls, dikt) -> 'ChainDelete':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The chainDelete of this ChainDelete.  # noqa: E501
        :rtype: ChainDelete
        """
        return util.deserialize_model(dikt, cls)

    @property
    def chain_service_name(self) -> str:
        """Gets the chain_service_name of this ChainDelete.


        :return: The chain_service_name of this ChainDelete.
        :rtype: str
        """
        return self._chain_service_name

    @chain_service_name.setter
    def chain_service_name(self, chain_service_name: str):
        """Sets the chain_service_name of this ChainDelete.


        :param chain_service_name: The chain_service_name of this ChainDelete.
        :type chain_service_name: str
        """

        self._chain_service_name = chain_service_name

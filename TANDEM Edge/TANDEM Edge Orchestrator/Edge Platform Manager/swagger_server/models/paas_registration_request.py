# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.service_functioninto_paa_s import ServiceFunctionintoPaaS  # noqa: F401,E501
from swagger_server import util


class PaasRegistrationRequest(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, paas_service_name: str=None, service_functions: List[ServiceFunctionintoPaaS]=None):  # noqa: E501
        """PaasRegistrationRequest - a model defined in Swagger

        :param paas_service_name: The paas_service_name of this PaasRegistrationRequest.  # noqa: E501
        :type paas_service_name: str
        :param service_functions: The service_functions of this PaasRegistrationRequest.  # noqa: E501
        :type service_functions: List[ServiceFunctionintoPaaS]
        """
        self.swagger_types = {
            'paas_service_name': str,
            'service_functions': List[ServiceFunctionintoPaaS]
        }

        self.attribute_map = {
            'paas_service_name': 'paas_service_name',
            'service_functions': 'service_functions'
        }
        self._paas_service_name = paas_service_name
        self._service_functions = service_functions

    @classmethod
    def from_dict(cls, dikt) -> 'PaasRegistrationRequest':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The PaasRegistrationRequest of this PaasRegistrationRequest.  # noqa: E501
        :rtype: PaasRegistrationRequest
        """
        return util.deserialize_model(dikt, cls)

    @property
    def paas_service_name(self) -> str:
        """Gets the paas_service_name of this PaasRegistrationRequest.


        :return: The paas_service_name of this PaasRegistrationRequest.
        :rtype: str
        """
        return self._paas_service_name

    @paas_service_name.setter
    def paas_service_name(self, paas_service_name: str):
        """Sets the paas_service_name of this PaasRegistrationRequest.


        :param paas_service_name: The paas_service_name of this PaasRegistrationRequest.
        :type paas_service_name: str
        """

        self._paas_service_name = paas_service_name

    @property
    def service_functions(self) -> List[ServiceFunctionintoPaaS]:
        """Gets the service_functions of this PaasRegistrationRequest.


        :return: The service_functions of this PaasRegistrationRequest.
        :rtype: List[ServiceFunctionintoPaaS]
        """
        return self._service_functions

    @service_functions.setter
    def service_functions(self, service_functions: List[ServiceFunctionintoPaaS]):
        """Sets the service_functions of this PaasRegistrationRequest.


        :param service_functions: The service_functions of this PaasRegistrationRequest.
        :type service_functions: List[ServiceFunctionintoPaaS]
        """

        self._service_functions = service_functions
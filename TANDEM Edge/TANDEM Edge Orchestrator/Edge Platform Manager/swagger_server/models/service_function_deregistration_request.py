# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class ServiceFunctionDeregistrationRequest(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, service_function_name: str=None):  # noqa: E501
        """ServiceFunctionDeregistrationRequest - a model defined in Swagger

        :param service_function_name: The service_function_name of this ServiceFunctionDeregistrationRequest.  # noqa: E501
        :type service_function_name: str
        """
        self.swagger_types = {
            'service_function_name': str
        }

        self.attribute_map = {
            'service_function_name': 'service_function_name'
        }
        self._service_function_name = service_function_name

    @classmethod
    def from_dict(cls, dikt) -> 'ServiceFunctionDeregistrationRequest':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The ServiceFunctionDeregistrationRequest of this ServiceFunctionDeregistrationRequest.  # noqa: E501
        :rtype: ServiceFunctionDeregistrationRequest
        """
        return util.deserialize_model(dikt, cls)

    @property
    def service_function_name(self) -> str:
        """Gets the service_function_name of this ServiceFunctionDeregistrationRequest.


        :return: The service_function_name of this ServiceFunctionDeregistrationRequest.
        :rtype: str
        """
        return self._service_function_name

    @service_function_name.setter
    def service_function_name(self, service_function_name: str):
        """Sets the service_function_name of this ServiceFunctionDeregistrationRequest.


        :param service_function_name: The service_function_name of this ServiceFunctionDeregistrationRequest.
        :type service_function_name: str
        """

        self._service_function_name = service_function_name
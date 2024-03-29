# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.time_stamp import TimeStamp  # noqa: F401,E501
from swagger_server import util


class TerminalDistance(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, accuracy: int=None, distance: int=None, timestamp: TimeStamp=None):  # noqa: E501
        """TerminalDistance - a model defined in Swagger

        :param accuracy: The accuracy of this TerminalDistance.  # noqa: E501
        :type accuracy: int
        :param distance: The distance of this TerminalDistance.  # noqa: E501
        :type distance: int
        :param timestamp: The timestamp of this TerminalDistance.  # noqa: E501
        :type timestamp: TimeStamp
        """
        self.swagger_types = {
            'accuracy': int,
            'distance': int,
            'timestamp': TimeStamp
        }

        self.attribute_map = {
            'accuracy': 'accuracy',
            'distance': 'distance',
            'timestamp': 'timestamp'
        }
        self._accuracy = accuracy
        self._distance = distance
        self._timestamp = timestamp

    @classmethod
    def from_dict(cls, dikt) -> 'TerminalDistance':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The TerminalDistance of this TerminalDistance.  # noqa: E501
        :rtype: TerminalDistance
        """
        return util.deserialize_model(dikt, cls)

    @property
    def accuracy(self) -> int:
        """Gets the accuracy of this TerminalDistance.

        Accuracy of the provided distance in meters  # noqa: E501

        :return: The accuracy of this TerminalDistance.
        :rtype: int
        """
        return self._accuracy

    @accuracy.setter
    def accuracy(self, accuracy: int):
        """Sets the accuracy of this TerminalDistance.

        Accuracy of the provided distance in meters  # noqa: E501

        :param accuracy: The accuracy of this TerminalDistance.
        :type accuracy: int
        """

        self._accuracy = accuracy

    @property
    def distance(self) -> int:
        """Gets the distance of this TerminalDistance.

        Distance from terminal to a location or between two terminals specified in meters  # noqa: E501

        :return: The distance of this TerminalDistance.
        :rtype: int
        """
        return self._distance

    @distance.setter
    def distance(self, distance: int):
        """Sets the distance of this TerminalDistance.

        Distance from terminal to a location or between two terminals specified in meters  # noqa: E501

        :param distance: The distance of this TerminalDistance.
        :type distance: int
        """
        if distance is None:
            raise ValueError("Invalid value for `distance`, must not be `None`")  # noqa: E501

        self._distance = distance

    @property
    def timestamp(self) -> TimeStamp:
        """Gets the timestamp of this TerminalDistance.


        :return: The timestamp of this TerminalDistance.
        :rtype: TimeStamp
        """
        return self._timestamp

    @timestamp.setter
    def timestamp(self, timestamp: TimeStamp):
        """Sets the timestamp of this TerminalDistance.


        :param timestamp: The timestamp of this TerminalDistance.
        :type timestamp: TimeStamp
        """

        self._timestamp = timestamp

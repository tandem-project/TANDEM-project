# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.autoscaling_policy_metric import AutoscalingPolicyMetric  # noqa: F401,E501
from swagger_server import util


class AutoscalingPolicy(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, policy: str=None, monitoring_metrics: List[AutoscalingPolicyMetric]=None):  # noqa: E501
        """AutoscalingPolicy - a model defined in Swagger

        :param policy: The policy of this AutoscalingPolicy.  # noqa: E501
        :type policy: str
        :param monitoring_metrics: The monitoring_metrics of this AutoscalingPolicy.  # noqa: E501
        :type monitoring_metrics: List[AutoscalingPolicyMetric]
        """
        self.swagger_types = {
            'policy': str,
            'monitoring_metrics': List[AutoscalingPolicyMetric]
        }

        self.attribute_map = {
            'policy': 'policy',
            'monitoring_metrics': 'monitoring_metrics'
        }
        self._policy = policy
        self._monitoring_metrics = monitoring_metrics

    @classmethod
    def from_dict(cls, dikt) -> 'AutoscalingPolicy':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The autoscaling_policy of this AutoscalingPolicy.  # noqa: E501
        :rtype: AutoscalingPolicy
        """
        return util.deserialize_model(dikt, cls)

    @property
    def policy(self) -> str:
        """Gets the policy of this AutoscalingPolicy.


        :return: The policy of this AutoscalingPolicy.
        :rtype: str
        """
        return self._policy

    @policy.setter
    def policy(self, policy: str):
        """Sets the policy of this AutoscalingPolicy.


        :param policy: The policy of this AutoscalingPolicy.
        :type policy: str
        """

        self._policy = policy

    @property
    def monitoring_metrics(self) -> List[AutoscalingPolicyMetric]:
        """Gets the monitoring_metrics of this AutoscalingPolicy.


        :return: The monitoring_metrics of this AutoscalingPolicy.
        :rtype: List[AutoscalingPolicyMetric]
        """
        return self._monitoring_metrics

    @monitoring_metrics.setter
    def monitoring_metrics(self, monitoring_metrics: List[AutoscalingPolicyMetric]):
        """Sets the monitoring_metrics of this AutoscalingPolicy.


        :param monitoring_metrics: The monitoring_metrics of this AutoscalingPolicy.
        :type monitoring_metrics: List[AutoscalingPolicyMetric]
        """

        self._monitoring_metrics = monitoring_metrics

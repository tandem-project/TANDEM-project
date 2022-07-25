import connexion
import six

from swagger_server.models.login_registration_request import LoginRegistrationRequest  # noqa: E501
from swagger_server import util


def authentication_login(body=None):  # noqa: E501
    """Login with a username and password.

     # noqa: E501

    :param body: Registration method to login
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = LoginRegistrationRequest.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'

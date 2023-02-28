import connexion
import six

from swagger_server.models.login_registration_request import LoginRegistrationRequest  # noqa: E501
from swagger_server.utils import user_authentication
from swagger_server.controllers import authorization_controller
def authentication_login(body=None):  # noqa: E501
    """Login with a username and password.

     # noqa: E501

    :param body: Registration method to login
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = LoginRegistrationRequest.from_dict(connexion.request.get_json())  # noqa: E501
        if body.username is not None and body.password is not None:
            user = body.to_dict()
            try:
                user_id=user_authentication.validate_user(user["username"], user["password"])
                if user_id is not None:

                    #should generate and store the token!
                    token=authorization_controller.generate_token(str(user_id)+"_/_"+user["username"])

                    user_authentication.update_user_info(identifier="username",value_id=user["username"],
                                                         type_input="token", value_input=token)


                    #should register this token to database!
                    auth_response={}
                    auth_response["info"]="User authorized (for the next 10 minutes)"
                    auth_response["token"]=token
                    #return "User authorized (for the next 10 minutes), Token: " + token
                    return auth_response
                else:
                    return "User not authorized"

            except Exception as ce_:
                raise Exception("An exception occurred :", ce_)
        else:
            return "Wrong request. Please provide the required info for logging"


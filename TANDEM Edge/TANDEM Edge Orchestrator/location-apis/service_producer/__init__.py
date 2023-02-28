import os

from flask import Flask
from service_producer.MEC_APP import MECApplication
from flask import request

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev'
    )

    MEC_APP = MECApplication()

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return {
            'text':'Hello, World! This is the service producer!',
            'title': 'Dummy Service'
        }

    # register service
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        MEC_APP.register_service(ServiceInfo=data)
        return "OK"


    return app


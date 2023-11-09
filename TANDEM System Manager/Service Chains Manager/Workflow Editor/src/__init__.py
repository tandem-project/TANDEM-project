import os
import requests

from flask import Flask, request

from .convert import convert

def create_app(test_config=None):

    app = Flask(__name__)


    # endpoint for accessing the convert
    @app.route('/convert', methods=['POST'])
    def my_convert():
        f = request.get_json(force=True)
        r = convert(f)
        return r

    return app
import os
import requests
from flask import Flask, request
from flask_api import status
from collections import defaultdict
import json 

MEC_PLATFORM_URL='http://127.0.0.1:8080/mec_platform/'

available_services = defaultdict(lambda: defaultdict(dict))

class bcolors:
    OKCYAN = '\033[96m'
    ENDC = '\033[0m'


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    @app.route('/get_subs_area_circle', methods=['GET', 'POST'])
    def get_subs_area_circle():
        url = MEC_PLATFORM_URL+'subscriptions/area/circle'
        try:
            r = requests.get(url)
        except Exception as e:
            raise Exception("An exception occurred :", e)
        return r.text

    @app.route('/get_distance', methods=['GET'])
    def get_distance():
        try:
            addresses =  request.args.getlist('address')
            
            args = request.args
            args = args.to_dict()
            args['address'] = addresses
            
            url = MEC_PLATFORM_URL+'queries/distance'
            r = requests.get(url, args)
            return r.text
        except Exception as e:
            raise Exception("An exception occurred :", e)

    @app.route('/service_notification', methods=['POST'])
    def receiveServiceInfo():
        """
        Receive notification from MEC Platform regarding 
        relevant services.
        """
        try:
            data = request.get_json()

            available_services[data['app_instance_id']][data['service']['service_id']] ={
                "service_name": data['service']['service_name']

            }

            print('Received notification about available_service withd id: ',bcolors.OKCYAN, data['service']['service_id'],bcolors.ENDC, ' and name: ',bcolors.OKCYAN,  data['service']['service_name'],bcolors.ENDC)
            return 'OK'
        except Exception as e:
            raise Exception("An exception occurred :", e)

    @app.route('/service_availability/<appInstanceId>/services/<serviceId>', methods=['GET'])
    def serviceAvailabilityByServiceId(appInstanceId, serviceId):
        """
        Get the available services from MEC Platform
        based on appInstanceId and serviceId
        """
        try:
            url = MEC_PLATFORM_URL + "applications/" + appInstanceId + "/services/" + serviceId

            r = requests.get(url)
            if r.status_code != 200:
                return r.text, r.status_code
            r = r.json()
            available_services[appInstanceId][serviceId]['service_name'] = r['ser_name']
            available_services[appInstanceId][serviceId]['url'] = r['links']['_self']['href']
            return r

        except Exception as e:
            raise Exception("An exception occurred :", e)   


    @app.route('/service_availability/<appInstanceId>', methods=['GET'])
    def serviceAvailability(appInstanceId):
        """
        Get the available services from MEC Platform
        based on appInstanceId and query parameters.
        """
        try:
            url = MEC_PLATFORM_URL + "applications/" + appInstanceId + "/services"
            params = request.args
            r = requests.get(url, params=params)
            if r.status_code != 200:
                return r.text, r.status_code
            r = r.json()
            for service in r:
                serviceId = service['ser_instance_id']
                available_services[appInstanceId][serviceId]['service_name'] = service['ser_name']
                available_services[appInstanceId][serviceId]['url'] = service['links']['_self']['href']

            return json.dumps(r)
        except Exception as e:
            raise Exception("An exception occurred :", e)   


    @app.route('/consume_service/<appInstanceId>/<serviceId>', methods=['GET'])
    def consumeService(appInstanceId, serviceId):
        """
        Get the available services from MEC Platform
        based on appInstanceId and serviceId
        """
        try:
            if appInstanceId not in available_services or serviceId not in available_services[appInstanceId]:
                return "There are no registered services with the given parameters.", status.HTTP_404_NOT_FOUND
            url = available_services[appInstanceId][serviceId]['url']
            # params = request.args
            r = requests.get(url)

            return r.text
        except Exception as e:
            raise Exception("An exception occurred :", e)   


    @app.route('/get_list', methods=['GET'])
    def getList():
    #     """
    #     Get the available services from MEC Platform
    #     """
        return available_services

    return app

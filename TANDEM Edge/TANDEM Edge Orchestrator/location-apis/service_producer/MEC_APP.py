import requests

sample_service = {
    "serInstanceId": "service0X",
    "serName": "A Sample Service",
    "AppInstanceId": "producer0",
    "serCategory": {
        "href": "string",
        "id": "1",
        "name": "very_interesting_category",
        "version": "string"
    },
    "version": "1.0",
    "state": "ACTIVE",
    "transportInfo": {
        "id": "string",
        "name": "string",
        "description": "string",
        "type": "REST_HTTP",
        "protocol": "string",
        "version": "string",
        "security": {
        "oAuth2Info": {
            "grantTypes": [
            "OAUTH2_AUTHORIZATION_CODE"
            ],
            "tokenEndpoint": "string"
        }
        },
        "implSpecificInfo": {}
    },
    "serializer": "JSON",
    "scopeOfLocality": "MEC_SYSTEM",
    "consumedLocalOnly": True,
    "isLocal": True,
    "livenessInterval": 0,
    "_links": {
        "self": {
        "href": "http://127.0.0.1:5000/hello"
        },
        "liveness": {
        "href": "string"
        }
    }
}

class MECApplication():


    def __init__(self) -> None:
        self._newService = sample_service

        self.ServiceList = []
    
        self._service_url = 'http://127.0.0.1:5000/'

        self._appInstanceId = 'producer1'

    def get_service_url(self) -> str:
        """
        Gets the service url.
        """
        return self._service_url
    
    def service_url(self, url):
        self._service_url = url
    
    def get_newService(self) -> str:
        """
        Gets the new ServiceInfo.
        """
        return self._newService
    
    def newService(self, ServiceInfo: dict):
        self._newService = ServiceInfo
    

    def get_appInstanceId(self) -> str:
        """
        Gets the service url.
        """
        return self._appInstanceId
    
    def appInstanceId(self, url):
        self._appInstanceId = url
        
    def register_service(self, MEC_url: str = 'http://127.0.0.1:8080/mec_platform/applications/', ServiceInfo = None):
        
        ServiceInfo = ServiceInfo if ServiceInfo is not None else self.get_newService()
        url = MEC_url+ self.get_appInstanceId() + '/services'
        r = requests.post(url, json=ServiceInfo)
        
        
if __name__ == "__main__":

    app = MECApplication()
    print('I am the service producer.\nMy service url is ', app.service_url,'.\nI will register the service:\n', app.get_newService())
    app.register_service()


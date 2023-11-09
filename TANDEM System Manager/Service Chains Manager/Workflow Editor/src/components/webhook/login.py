import requests
import json

# login to piedge
def login():
    AUTH_API = "http://piedgecontroller.pi-edge-system:8080/piedge-connector/2.0.0/authentication"

    credentials = json.dumps({
        "username":"admin_system_manager", 
        "password":"admin_system_manager!@!"
    })

    headers = {
    'Content-Type': 'application/json'
    }
    response = requests.request("POST", AUTH_API, headers=headers, data=credentials)


    
    if response.status_code == 200:
        return response.json()['token']
    else:
        return response.status_code

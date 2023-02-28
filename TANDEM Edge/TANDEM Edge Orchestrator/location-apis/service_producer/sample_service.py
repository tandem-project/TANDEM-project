sample_service = {
    "serInstanceId": "service02",
    "serName": "string",
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
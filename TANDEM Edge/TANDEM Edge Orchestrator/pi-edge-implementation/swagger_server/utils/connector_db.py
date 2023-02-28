import json
import string

import yaml
import pymongo
from bson import json_util

from os import environ

#!!!!!!!!!!!!!!!!!!!!
storage_url=environ.get("EMP_STORAGE_URI")
#storage_url="mongodb://146.124.106.179:32411"

mydb_mongo='pi-edge'

def insert_document_k8s_platform(document=None, _id=None):
    collection = "kubernetes_platforms"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection
    #mydoc_num = mycol.find().count()
    # mydoc = None

    # if mydoc_num>0:
    myquery = {"name": document["kubernetes_platform_name"]}
    mydoc = mycol.find_one(myquery)
    # keeps the last record (contains registrationStatus)
    if mydoc is not None:
        raise Exception("Already Registered: Platform name", document["kubernetes_platform_name"])
    try:
        insert_doc={}
        insert_doc["name"]=document["kubernetes_platform_name"]
        insert_doc["auth_credentials"]=document["kubernetes_auth_credentials"]
        mycol.insert_one(insert_doc)
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)



def delete_document_k8s_platform( document=None, _id=None):
    collection = "kubernetes_platforms"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection
    #mydoc_num = mycol.find().count()
    # mydoc = None

    # if mydoc_num>0:
    myquery = {"name": document["kubernetes_platform_name"]}
    mydoc = mycol.find_one(myquery)

    # keeps the last record (contains registrationStatus)
    if mydoc is None:
        raise Exception("Not found: Platform name", document["kubernetes_platform_name"])
    try:
        delete_doc = {}
        delete_doc["name"] = document["kubernetes_platform_name"]
        mycol.delete_one(delete_doc)
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def insert_document_deployed_paas(document=None, _id=None):

    collection = "deployed_paas_services"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection
    #mydoc_num = mycol.find().count()


    # mydoc = None

    # if mydoc_num>0:
    myquery = {"name": document["name"],  "location": document["location"], "instance_name":document["instance_name"]}
    mydoc = mycol.find_one(myquery)
    # keeps the last record (contains registrationStatus)
    if mydoc is not None:
        return "Requested paas service (with this name) already deployed and exists in deployed_paas_services database"
        #raise Exception("Already Registered: PaaS name", document["paas_name"])
    try:
        insert_doc = {}

        insert_doc["name"] = document["name"]
        #insert_doc["type"] = document["paas_type"]
        if "location" in insert_doc:
            insert_doc["location"] = document["location"]
        insert_doc["instance_name"] = document["instance_name"]
        insert_doc["service_functions"]=document["service_functions"]

        if "autoscaling_type" in document:
            insert_doc["autoscaling_type"] = document["autoscaling_type"]

        mycol.insert_one(insert_doc)
        return "Deployed paas service registered successfully"
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def insert_document_deployed_service_function(document=None, _id=None):


    collection = "deployed_service_functions"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection

    # if mydoc_num>0:
    myquery = {"name": document["service_function_name"], "location": document["location"], "instance_name":document["instance_name"]}
    mydoc = mycol.find_one(myquery)
    # keeps the last record (contains registrationStatus)
    if mydoc is not None:
        return "Requested service function (with this name) already deployed and exists in deployed_apps database"
        #raise Exception("Already Registered: PaaS name", document["paas_name"])
    try:
        insert_doc = {}

        insert_doc["name"] = document["service_function_name"]
        #insert_doc["type"] = document["paas_type"]
        insert_doc["location"] = document["location"]
        insert_doc["instance_name"] = document["instance_name"]

        if "scaling_type" in document:
            insert_doc["scaling_type"] = document["scaling_type"]
        #

        #TODO: IT IS NEEDED?
        # if "volumes" in document:
        #     insert_doc["volumes"] = document["volumes"]



        mycol.insert_one(insert_doc)
        return "Deployed service function registered successfully"
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def delete_document_deployed_service_functions(document=None, _id=None):
    collection = "deployed_service_functions"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection

    myquery = {"instance_name": document["instance_name"]}
    mydoc = mycol.find_one(myquery)

    # keeps the last record (contains registrationStatus)
    if mydoc is None:
        return "Deployed Service function not found in the database"
        #raise Exception("Not found: PaaS name", document["paas_name"])
    try:
        delete_doc = {}
        delete_doc["instance_name"] = document["instance_name"]
        mycol.delete_one(delete_doc)
        return "Deployed Service function deleted successfully"
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)



def insert_document_service_function(document=None, _id=None):
    collection = "service_functions"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection

    myquery = {"name": document["service_function_name"]}
    mydoc = mycol.find_one(myquery)
    # keeps the last record (contains registrationStatus)

    if mydoc is not None:
        return "Service function already exists in the catalogue"
    try:
        insert_doc = {}
        insert_doc["name"] = document["service_function_name"]
        insert_doc["type"] = document["service_function_type"]
        insert_doc["image"] = document["service_function_image"]
        insert_doc["application_ports"] = document["application_ports"]
        insert_doc["autoscaling_policies"] = document["autoscaling_policies"]
        if "required_volumes" in document:
            insert_doc["required_volumes"] = document["required_volumes"]
        insert_doc["required_env_parameters"] = document["required_env_parameters"]
        mycol.insert_one(insert_doc)
        return "Service function registered successfully"
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)




def insert_document_paas(document=None, _id=None):
    #print(document)
    collection = "paas_services"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection

    myquery = {"name": document["name"]}
    mydoc = mycol.find_one(myquery)
    print(mydoc)
    # keeps the last record (contains registrationStatus)

    #print(document)
    if mydoc is not None:
        return "PaaS Service already exists in the catalogue"
    try:
        mycol.insert_one(document)
        return "PaaS Service registered successfully"
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)

#TODO
def update_document_paas_service(document=None, _id=None):

    collection = "paas_services"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection

    myquery = {"name": document["name"]}
    mydoc = mycol.find_one(myquery)
    # keeps the last record (contains registrationStatus)

    if mydoc is not None:
       # "PaaS service already exists in the database"
        #raise Exception("Already Registered: PaaS name", document["paas_name"])
        #print(mydoc)
        try:
            myquery = {"name": document["name"]}
            newvalues = {"$set": {"service_functions": document["service_functions"]}}
            mycol.update_one(myquery,newvalues)
            return "PaaS Service updated successfully"
        except Exception as ce_:
            raise Exception("An exception occurred :", ce_)
    else:
        return "PaaS Service not found in the catalogue"


##TODO!!!!!
def update_document_service_function(document=None, _id=None):

    collection = "service_functions"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection
    #mydoc_num = mycol.find().count()
    # mydoc = None

    # if mydoc_num>0:
    myquery = {"name": document["service_function_name"]}
    mydoc = mycol.find_one(myquery)
    # keeps the last record (contains registrationStatus)

    if mydoc is not None:
       # "PaaS service already exists in the database"
        #raise Exception("Already Registered: PaaS name", document["paas_name"])
        #print(mydoc)
        try:
            myquery = {"name": document["service_function_name"]}
            newvalues = {"$set": {"autoscaling_policies": document["autoscaling_policies"]}}
            mycol.update_one(myquery,newvalues)
            return "Service function updated successfully"
        except Exception as ce_:
            raise Exception("An exception occurred :", ce_)
    else:
        return "Service function not found in the catalogue"

def delete_document_service_function(service_function_input_name=None, _id=None):


    collection = "service_functions"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection
    #mydoc_num = mycol.find().count()
    # mydoc = None
    # if mydoc_num>0:

    myquery = {"name": service_function_input_name}
    mydoc = mycol.find_one(myquery)

    # keeps the last record (contains registrationStatus)
    if mydoc is None:
        return "Service function not found in the database"
        #raise Exception("Not found: PaaS name", document["paas_name"])
    try:
        delete_doc = {}
        delete_doc["name"] = service_function_input_name
        mycol.delete_one(delete_doc)
        return "Service function deregistered successfully"
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)



def delete_document_paas_service(paas_service_input_name=None, _id=None):
    collection = "paas_services"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection
    #mydoc_num = mycol.find().count()
    # mydoc = None
    # if mydoc_num>0:
    myquery = {"name": paas_service_input_name}
    mydoc = mycol.find_one(myquery)

    # keeps the last record (contains registrationStatus)
    if mydoc is None:
        return "PaaS Service not found in the database"
        #raise Exception("Not found: PaaS name", document["paas_name"])
    try:
        delete_doc = {}
        delete_doc["name"] = paas_service_input_name
        mycol.delete_one(delete_doc)
        return "PaaS Service deregistered successfully"
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)

def delete_document_deployed_paas_service(document=None, _id=None):
    collection = "deployed_paas_services"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection
    #mydoc_num = mycol.find().count()
    # mydoc = None

    # if mydoc_num>0:
    myquery = {"instance_name": document["instance_name"]}
    mydoc = mycol.find_one(myquery)

    # keeps the last record (contains registrationStatus)
    if mydoc is None:
        return "Deployed PaaS service not found in the database"
        #raise Exception("Not found: PaaS name", document["paas_name"])
    try:
        delete_doc = {}
        delete_doc["instance_name"] = document["instance_name"]
        mycol.delete_one(delete_doc)
        return "Deployed PaaS Service deleted successfully"
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def insert_document_nodes(document=None, _id=None):
    collection = "points_of_presence"
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]
    # number of documents in the collection
    #mydoc_num = mycol.find().count()
    # mydoc = None

    # if mydoc_num>0:
    myquery = {"name": document["name"]}
    mydoc = mycol.find_one(myquery)
    # keeps the last record (contains registrationStatus)
    if mydoc is not None:
        return ("Already Registered: Node name", document["name"])
       # raise Exception("Already Registered: Node name", document["name"])
    try:
        mycol.insert_one(document)
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)


def get_documents_from_collection(collection_input, input_type=None, input_value=None):
    collection = collection_input
    myclient = pymongo.MongoClient(storage_url)
    mydbmongo = myclient[mydb_mongo]
    mycol = mydbmongo[collection]

    try:
        mydoc_=[]
        for x in mycol.find():
            x['_id']=str(x['_id'])
            if input_type is not None:
                if input_value==x[input_type]:
                    mydoc_.append(x)
                    break
            else:
                mydoc_.append(x)

        return mydoc_
    except Exception as ce_:
        raise Exception("An exception occurred :", ce_)

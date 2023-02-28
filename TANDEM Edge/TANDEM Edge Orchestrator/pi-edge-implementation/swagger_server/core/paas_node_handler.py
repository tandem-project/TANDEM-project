from swagger_server.utils import connector_db, auxiliary_functions, kubernetes_connector
from swagger_server.models import PaasRegistrationRequest
from swagger_server.models import DeployPaas
from swagger_server.models import DeployPaaSNode
from swagger_server.core import piedge_encoder
from swagger_server.models import DeployServiceFunction
from swagger_server.models import VolumeMountDeploy
from swagger_server.models import EnvParameters
from swagger_server.core import paas_handler



def activate_paas_node(deploy_paas_node: DeployPaaSNode):


    #First check if node exists (using name and location)
    node_loc = connector_db.get_documents_from_collection("points_of_presence", input_type="location",
                                                       input_value=deploy_paas_node.location)



    if node_loc:
        node_location_ = deploy_paas_node.location
    else:
        return "The selected node location didn't found"





    if deploy_paas_node.paas_services:
        result_deployment_ = ""
        for paas_service in deploy_paas_node.paas_services:
            try:
                paas_service.location=node_location_
                result_deployment = paas_handler.operate_paas_deployment_request(paas_service)
                result_deployment_ = result_deployment_ + str(" \n") + result_deployment

            except Exception as ce_:
                raise Exception("An exception occurred :", ce_)

        return result_deployment_
    else:
        return "Paas enabled node didn't activated. No PaaS services found!"
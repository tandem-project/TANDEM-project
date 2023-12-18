package TANDEM.icomtelecom.system_manager.Controllers;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.MonitoringURLRetrievalInfo;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceDeletionRequestInfo;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceInstantiationRequestInfo;
import TANDEM.icomtelecom.system_manager.Utilites.Utilities;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@RestController
@RequestMapping("systemmanager")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class SystemManagerRESTController {
 
        public static Map<String, String> cloudsTokens = new HashMap<>();
        private String token = null;
        private Utilities utilities = new Utilities();

    
    //create a service

     //get monitoring URL of an instance
    @PostMapping("/run/workflow")
    String runWorkflow(@RequestBody String workflowExecutionInfo) {
        String body = "";
        ObjectMapper objectMapper =new ObjectMapper().configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        ObjectWriter objectWriter = objectMapper.writer().withDefaultPrettyPrinter();
            try {
                body = objectWriter.writeValueAsString(workflowExecutionInfo);
                
            } catch (JsonProcessingException ex) {
                Logger.getLogger(SystemManagerRESTController.class.getName()).log(Level.SEVERE, null, ex);
            }
            body = body.replace("\\r\\n", "");
            body = body.replace("\\", "");
            body = body.replace(" ", "");
            body = body.substring(1, body.length() - 1);
        if (body != ""){
            String workflowExecutionResponse = utilities.sendPOSTHTTPRequest("http://workfloweditor-service.admin:5000/convert", null, body);
            System.out.println(workflowExecutionResponse);
            return workflowExecutionResponse;
        }
        return null;
    }
    
    
    //get monitoring URL of an instance
    @PostMapping("/get/monitoringurl/instance")
    String getInstanceMonitoringUrl(@RequestBody MonitoringURLRetrievalInfo monitoringURLRetrievalInfo) {
        
        if (token == null){
            System.out.println("First time requesting authentication from PiEdge...");
            token = utilities.getPiEdgeAuthentication(monitoringURLRetrievalInfo.getPiEdgeIP(), monitoringURLRetrievalInfo.getPiEdgePort());
            System.out.println("Token received from PiEdge: " + token);
        }
                
        String urlToRequest = "http://" + monitoringURLRetrievalInfo.getPiEdgeIP() + ":" + monitoringURLRetrievalInfo.getPiEdgePort() + "/piedge-connector/2.0.0/deployedPaas/" + monitoringURLRetrievalInfo.getInstance_id();
        String monitoringURLRetrievalResponse = utilities.sendGETHTTPRequest(urlToRequest, token);
        System.out.println("Monitoring URL Retrieval Response from PiEdge: " + monitoringURLRetrievalResponse);
        
        if (monitoringURLRetrievalResponse.equals("401")){
                System.out.println("Need a new token");
                token = utilities.getPiEdgeAuthentication(monitoringURLRetrievalInfo.getPiEdgeIP(), monitoringURLRetrievalInfo.getPiEdgePort());
                monitoringURLRetrievalResponse = utilities.sendGETHTTPRequest(urlToRequest, token);
                System.out.println("Monitoring URL Retrieval Response from PiEdge: " + monitoringURLRetrievalResponse);
            }
     
        return monitoringURLRetrievalResponse;
    }
    
    //create a service
    @PostMapping(path = "/instantiate/service",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<?> instantiateService(@RequestBody ServiceInstantiationRequestInfo serviceInstantiationInfo) {
        
        if (serviceInstantiationInfo.getPaas_service_name() == null || 
                serviceInstantiationInfo.getPaas_instance_name() == null ||
                serviceInstantiationInfo.getAutoscaling_type() == null || 
                serviceInstantiationInfo.getCount_min() == null ||
                serviceInstantiationInfo.getCount_max() == null || 
                serviceInstantiationInfo.getAll_node_ports() == null || 
                serviceInstantiationInfo.getMonitoring_services() == null)
        {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        String placementOptimizerURL = "http://optimizationalgorithm.pi-edge-system:5000/paas_request";        
        String placementOptimizationbody = "{\"paas_service_name\":\"" + serviceInstantiationInfo.getPaas_service_name() 
                + "\",\"autoscaling_type\":\"" + serviceInstantiationInfo.getAutoscaling_type() 
                + "\",\"count_min\":" + serviceInstantiationInfo.getCount_min() 
                + ",\"count_max\":" + serviceInstantiationInfo.getCount_max() 
                + ",\"location\":\"" + serviceInstantiationInfo.getLocation()
                + "\",\"data_space_enabled\":" + serviceInstantiationInfo.getData_space_enabled()
                + ",\"eval_metric_name\":\"" + serviceInstantiationInfo.getEval_metric_name() + "\"}"; 
        
  
        System.out.println(placementOptimizerURL);
        System.out.println(placementOptimizationbody);

        String placementOptimizationResponse = utilities.sendPOSTHTTPRequest(placementOptimizerURL, null, placementOptimizationbody);
        System.out.println();
        System.out.println("ANSWER FROM DEPLOYMENT OPTIMIZER:");
        System.out.println(placementOptimizationResponse);
        System.out.println();

        if (placementOptimizationResponse.contains("at the moment")){
            return new ResponseEntity<>("No clusters can host your request at the moment", HttpStatus.OK);
        }
        String cluster = "";
        String piEdgeIP = "";
        String piEdgePort = "";
        HashMap<String, String> selectedNodes = new HashMap<>();

        try {
            JSONObject jsonObject = new JSONObject(placementOptimizationResponse.trim());
            cluster = jsonObject.getString("selected_cluster");
            piEdgeIP = jsonObject.getString("piEdgeIP");
            piEdgePort = jsonObject.getString("piEdgePort");

            JSONObject nodes = jsonObject.getJSONObject("selected_nodes");
            Iterator<String> keys = nodes.keys();
            while(keys.hasNext()) {
                String key = keys.next();
                    selectedNodes.put(key, nodes.get(key).toString());
            }
        } catch (JSONException err){
            err.printStackTrace();
        }
        
        System.out.println("Will deploy services in cluster " + cluster + " with IP " + piEdgeIP + ", and specifically: " + selectedNodes);

        String token = "";
        //check if pi-edge token exists for specific cluster
        if (cloudsTokens.containsKey(cluster)){
            token = cloudsTokens.get(cluster);
        }
        else{
            token = utilities.getPiEdgeAuthentication(piEdgeIP, piEdgePort);
            cloudsTokens.put(cluster, token);
        }
        
        
        
        HashMap<String, String> nodesLocationsMap = new HashMap();
        String nodesResponse = utilities.sendGETHTTPRequest("http://" + piEdgeIP + ":" + piEdgePort + "/piedge-connector/2.0.0/nodes", token);         
        if (nodesResponse.equals("401")){
            token = utilities.getPiEdgeAuthentication(piEdgeIP, piEdgePort);
            cloudsTokens.put(cluster, token);
            System.out.println("TOKEN WAS EXPIRED FOR EDGE CLOUD " + cluster + " AND GOT A NEW ONE FROM PI-EDGE: " + token);
            nodesResponse = utilities.sendGETHTTPRequest("http://" + piEdgeIP + ":" + piEdgePort + "/piedge-connector/2.0.0/nodes", token);
        }
        
        System.out.println();
        System.out.println("NODES RECEIVED FROM PI-EDGE:");
        System.out.println(nodesResponse);
        System.out.println();
        
        JSONArray nodes = new JSONObject(nodesResponse.trim()).getJSONArray("nodes");
        for (int i = 0; i < nodes.length(); i++){
            JSONObject nodeObject = nodes.getJSONObject(i);
            String nodeName = nodeObject.getString("name");
            String nodeLocation = nodeObject.getString("location");
            nodesLocationsMap.put(nodeName, nodeLocation);
        }
        String locations = "[";
        for (Map.Entry<String, String> entry : selectedNodes.entrySet()) {
            locations = locations.concat("{\"service_function_name\":\"");
            locations = locations.concat(entry.getKey());
            locations = locations.concat("\",\"location\":\"");
            String loc = "";
            //find location for each node name
            for (Map.Entry<String, String> nodesLocationsEntry : nodesLocationsMap.entrySet()) {
                if (nodesLocationsEntry.getKey().equals(entry.getValue())){
                    loc = nodesLocationsEntry.getValue();
                    break;
                }
            }
            locations = locations.concat(loc + "\"},");
        }
        //remove last character
        locations = locations.substring(0, locations.length() - 1);
        locations = locations.concat("]");
        System.out.println(locations);

        try{
            String body = "{\"paas_service_name\":\"" + serviceInstantiationInfo.getPaas_service_name() 
                + "\",\"paas_instance_name\":\"" + serviceInstantiationInfo.getPaas_instance_name() 
                + "\",\"autoscaling_type\":\"" + serviceInstantiationInfo.getAutoscaling_type() 
                + "\",\"count_min\":" + serviceInstantiationInfo.getCount_min() 
                + ",\"count_max\":" + serviceInstantiationInfo.getCount_max() 
                + ",\"locations\":" + locations  
                + ",\"all_node_ports\":" + serviceInstantiationInfo.getAll_node_ports() 
                + ",\"monitoring_services\":" + serviceInstantiationInfo.getMonitoring_services() + "}";                 
                     
            System.out.println();
            System.out.println("Body sent to PiEdge request: " + body);
            System.out.println();

            String serviceInstantiationURL = "http://" + piEdgeIP + ":" + piEdgePort + "/piedge-connector/2.0.0/deployPaas";
            String serviceInstantiationResponse = utilities.sendPOSTHTTPRequest(serviceInstantiationURL, token, body);
            System.out.println();
            System.out.println("Service instantiation response from PiEdge: " + serviceInstantiationResponse);
            System.out.println();
            
            if (serviceInstantiationResponse.contains("does not exist in the catalogue")){
                return new ResponseEntity<>("The given paas service does not exist in the catalogue", HttpStatus.OK);
            }
            
            if (serviceInstantiationResponse.equals("401")){
                System.out.println("Need a new token");
                token = utilities.getPiEdgeAuthentication(piEdgeIP, piEdgePort);
                cloudsTokens.put(cluster, token);
                serviceInstantiationResponse = utilities.sendPOSTHTTPRequest(serviceInstantiationURL, token, body);
                System.out.println("Service instantiation response from PiEdge: " + serviceInstantiationResponse);
            }
          
            
            if (serviceInstantiationResponse.equals("400")){
               return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            if (serviceInstantiationResponse.equals("500")){
               return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (serviceInstantiationResponse.equals("504")){
               return new ResponseEntity<>(HttpStatus.GATEWAY_TIMEOUT);
            }     
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
  
    return new ResponseEntity<>(HttpStatus.OK);

    }
    
    
    
    
    //Get running services
    @GetMapping("/get/service/{paas_name}")
    @ResponseBody
    public ResponseEntity<?> getServiceInstance(@PathVariable String paas_name){
        Map<String, List<JSONObject>> serviceInstancesPerCluster = new HashMap<>();
        String edgeCloudsResponse = utilities.sendGETHTTPRequest("http://localhost:80/infrastructurecatalogue/get/infrastructure", null);
        JSONArray edgeCloudsArray = new JSONArray(edgeCloudsResponse);
        for (int i = 0; i < edgeCloudsArray.length(); i++){
            List<JSONObject> serviceInstances = new ArrayList<>();
            
            JSONObject edgeCloud = edgeCloudsArray.getJSONObject(i);
            String piEdgeIP = edgeCloud.getString("piEdgeIP");
            String piEdgePort = edgeCloud.getString("piEdgePort");
            String edgeCloudId = edgeCloud.getString("edgeCloudId");
            String token = "";
            if (cloudsTokens.containsKey(edgeCloudId)){
                token = cloudsTokens.get(edgeCloudId);
            }
            else{
                token = utilities.getPiEdgeAuthentication(piEdgeIP, piEdgePort);
            }
            
            String serviceInstancesURL = "http://" + piEdgeIP + ":" + piEdgePort + "/piedge-connector/2.0.0/deployedPaas";
            String serviceInstancesResponse = utilities.sendGETHTTPRequest(serviceInstancesURL, token);
            System.out.println("Service instances response from PiEdge: " + serviceInstancesResponse);
            if (serviceInstancesResponse.equals("401")){
                System.out.println("Need a new token");
                token = utilities.getPiEdgeAuthentication(piEdgeIP, piEdgePort);
                cloudsTokens.put(edgeCloudId, token);
                serviceInstancesResponse = utilities.sendGETHTTPRequest(serviceInstancesURL, token);
                System.out.println("Service instances response from PiEdge: " + serviceInstancesResponse);
            }
          
            JSONArray serviceInstancesArray = new JSONArray(serviceInstancesResponse);
            for (int j = 0; j < serviceInstancesArray.length(); j++){
                JSONObject serviceInstance = serviceInstancesArray.getJSONObject(j);
                String serviceInstance_paas_name = serviceInstance.getString("paas_name");
                if (serviceInstance_paas_name.equals(paas_name)){
                    System.out.println("Found service with paas_name: " + serviceInstance_paas_name + " in cluster: " + edgeCloudId + " and has paas_instance_name: " + serviceInstance.getString("paas_instance_name"));
                    serviceInstances.add(serviceInstance);
                }
            }
            
            serviceInstancesPerCluster.put(edgeCloudId, serviceInstances);
            System.out.println("PRINTING SERVICE INSTANCES TO BE RETURNED PER CLUSTER:");
            for (Map.Entry<String, List<JSONObject>> entry : serviceInstancesPerCluster.entrySet()) {
                System.out.println("CLUSTER " + entry.getKey() + ":");
                for (int k = 0; k < entry.getValue().size(); k++){
                    System.out.println(entry.getValue().get(k));
                }
            }
        }
        
        
        JSONObject serviceInstances_json_object = new JSONObject();
        for (Map.Entry<String, List<JSONObject>> entry : serviceInstancesPerCluster.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            try {
                serviceInstances_json_object.put(key, value);
            } catch (JSONException e) {
                e.printStackTrace();
            }                           
        }
        
        return new ResponseEntity<>(serviceInstances_json_object.toString(), HttpStatus.OK) ;

    }
    
    
    //Delete a running service
    @PostMapping("/delete/service")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteServiceInstance(@RequestBody ServiceDeletionRequestInfo serviceDeletionInfo){
        
        if (token == null){
            System.out.println("First time requesting authentication from PiEdge...");
            token = utilities.getPiEdgeAuthentication(serviceDeletionInfo.getPiEdgeIP(), serviceDeletionInfo.getPiEdgePort());
            System.out.println("Token received from PiEdge: " + token);
        }
        
        String urlToRequest = "http://" + serviceDeletionInfo.getPiEdgeIP() + ":" + serviceDeletionInfo.getPiEdgePort() + "/piedge-connector/2.0.0/deployedPaas/" + serviceDeletionInfo.getServiceName();
        System.out.println(urlToRequest);
        String serviceDeletionResponse = utilities.sendDELETEHTTPRequest(urlToRequest, token);
        System.out.println("Service deletion response from PiEdge: " + serviceDeletionResponse);
        
        if (serviceDeletionResponse.equals("401")){
           System.out.println("Need a new token");
            token = utilities.getPiEdgeAuthentication(serviceDeletionInfo.getPiEdgeIP(), serviceDeletionInfo.getPiEdgePort());
            serviceDeletionResponse = utilities.sendDELETEHTTPRequest(urlToRequest, token);
            System.out.println("Service deletion response from PiEdge: " + serviceDeletionResponse);
        }
        return ResponseEntity.ok().build();
    }
    
}

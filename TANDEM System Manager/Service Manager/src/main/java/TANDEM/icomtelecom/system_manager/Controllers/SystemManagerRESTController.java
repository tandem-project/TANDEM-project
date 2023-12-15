package TANDEM.icomtelecom.system_manager.Controllers;

import TANDEM.icomtelecom.system_manager.Model.Exceptions.UserNotFoundException;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceDeletionRequestInfo;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceInstantiationInfo;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceInstantiationRequestInfo;
import TANDEM.icomtelecom.system_manager.Utilites.Utilities;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;
import org.json.JSONObject;

@RestController
@RequestMapping("systemmanager")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class SystemManagerRESTController {
 
    
        private String token = null;
        private Utilities utilities = new Utilities();
    
    //create a service
 /*   @PostMapping(path = "/instantiate/service",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<?> instantiateService(@RequestBody @Valid ServiceInstantiationInfo serviceInstantiationInfo) throws Exception {
        String serviceId = serviceInstantiationInfo.getServiceId();
        String edgeCloudId = serviceInstantiationInfo.getEdgeCloudId();
        
        //request edge cloud by id from Infrastructure catalogue
        HttpURLConnection connection = null;

        try {
            String urlToRequest = "http://localhost:8081/infrastructurecatalogue/get/infrastructure/" + edgeCloudId;
            URL url = new URL(urlToRequest);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Content-Language", "en-US");  
            connection.setUseCaches(false);
            connection.setDoOutput(true);
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            StringBuilder edgeCloud = new StringBuilder(); 
            String line;
            while ((line = rd.readLine()) != null) {
                edgeCloud.append(line);
                edgeCloud.append('\r');
            }
            rd.close();
            System.out.println(edgeCloud.toString());
             
 //           String edgeCloud = "{\"edgeCloudId\":\"EC1\",\"edgeCloudName\":\"EdgeCloud1\",\"edgeCloudAvailabilityZone\":\"Zone21\",\"edgeCloudNumberofNodes\":\"20\",\"edgeCloudNumberofIoTDevices\":\"10\",\"edgeCloudProvider\":\"INTRACOMS.A.TelecomSolutions\",\"piEdgeIP\":\"146.10.124.200\",\"monitorNodesURL\":\"http://146.124.106.209:3000/d/qgmX-lqnz/infrastructure-metrics?orgId=1&refresh=1m&from=now-3h&to=now\",\"nodes\":[{\"nodeId\":\"Node1\",\"nodeName\":\"Peania1\",\"nodeType\":\"MasterKubernetesNode\",\"nodeProvider\":\"INTRACOMTELECOMS.A\",\"nodeAddresses\":{\"nodeHostName\":\"Peania1_master\",\"nodeExternalIP\":\"146.124.114.147\",\"nodeInternalIP\":\"192.168.1.5\"},\"nodeConditions\":{\"nodeReady\":\"True\",\"nodeDiskPressure\":\"True\",\"nodeMemoryPressure\":\"True\",\"nodePIDPressure\":\"False\",\"nodeNetworkUnavailabilty\":\"False\"},\"nodeCapacity\":{\"nodeCPUCap\":\"16\",\"nodeMemoryCap\":\"32\",\"nodeMemoryCapMU\":\"Gi\",\"nodeStorageCap\":\"100\",\"nodeStorageCapMU\":\"Gi\",\"nodeMaxNoofPods\":\"5\"},\"nodeAllocatableResources\":{\"nodeCPUAllocatable\":\"14.5\",\"nodeMemoryAllocatable\":\"28.5\",\"nodeMemoryAllocatableMU\":\"Gi\",\"nodeStorageAllocatable\":\"88.8\",\"nodeStorageAllocatableMU\":\"Gi\"},\"eviction-hard\":\"memory.available<500Mi,nodefs.available<10%\",\"nodeGeneralInfo\":{\"nodeOS\":\"Ubuntu20.04LTS\",\"nodeKubernetesVersion\":\"1.24.2\",\"nodeKernelVersion\":\"Ubuntu22.04\"},\"nodeUsageMonitoringURL\":\"http://146.124.106.209:3000/d/qgmX-lqnb/tandem-node-1?orgId=1&refresh=1m&from=now-3h&to=now\",\"nodeServicesMonitoringURL\":\"http://146.124.106.209:3000/d/Q5Tyu93na/tandem-node-1-services?orgId=1&refresh=1m&from=now-3h&to=now\"},{\"nodeId\":\"Node2\",\"nodeName\":\"Peania2\",\"nodeType\":\"WorkerKubernetesNode\",\"nodeProvider\":\"INTRACOMTELECOMS.A\",\"nodeAddresses\":{\"nodeHostName\":\"Peania1_worker1\",\"nodeExternalIP\":\"146.124.114.148\",\"nodeInernalIP\":\"192.168.1.6\"},\"nodeConditions\":{\"nodeReady\":\"True\",\"nodeDiskPressure\":\"True\",\"nodeMemoryPressure\":\"True\",\"nodePIDPressure\":\"True\",\"nodeNetworkUnavailabilty\":\"False\"},\"nodeCapacity\":{\"nodeCPUCap\":\"32\",\"nodeMemoryCap\":\"64\",\"nodeMemoryCapMU\":\"Gi\",\"nodeStorageCap\":\"500\",\"nodeStorageCapMU\":\"Gi\",\"nodeMaxNoofPods\":\"15\"},\"nodeAllocatableResources\":{\"nodeCPUAllocatable\":\"39\",\"nodeMemoryAllocatable\":\"58.5\",\"nodeMemoryAllocatableMU\":\"Gi\",\"nodeStorageAllocatable\":\"488.5\",\"nodeStorageAllocatableMU\":\"Gi\"},\"eviction-hard\":\"memory.available<1500Mi,nodefs.available<10%\",\"nodeGeneralInfo\":{\"nodeOS\":\"Ubuntu20.04LTS\",\"nodeKubernetesVersion\":\"1.24.2\",\"nodeKernelVersion\":\"Ubuntu22.04\"},\"nodeUsageMonitoringURL\":\"http://146.124.106.209:3000/d/qgmX-lqna/tandem-node-2?orgId=1&refresh=1m&from=now-3h&to=now\",\"nodeServicesMonitoringURL\":\"http://146.124.106.209:3000/d/Q5Tyu66nk/tandem-node-2-services?orgId=1&refresh=1m&from=now-3h&to=now\"}]}";
            //parse response and find its IP
            JSONObject jsonObject = new JSONObject(edgeCloud.toString());
            String piEdgeIP = jsonObject.getString("piEdgeIP");
            System.out.println(piEdgeIP);
            //send request to Pi Edge
            
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

  */
    
    
    
    //create a service
    @PostMapping(path = "/instantiate/service",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<?> instantiateService(@RequestBody ServiceInstantiationRequestInfo serviceInstantiationInfo) throws Exception {
        
        if (token == null){
            System.out.println("First time requesting authentication from PiEdge...");
            token = utilities.getPiEdgeAuthentication(serviceInstantiationInfo.getPiEdgeIP(), serviceInstantiationInfo.getPiEdgePort());
            System.out.println("Token received from PiEdge: " + token);
        }
        
        String urlToRequest = "http://" + serviceInstantiationInfo.getPiEdgeIP() + ":" + serviceInstantiationInfo.getPiEdgePort() + "/piedge-connector/2.0.0/deployPaas";
        String body = "{\"paas_service_name\":\"" + serviceInstantiationInfo.getPaas_service_name() 
                + "\",\"paas_instance_name\":\"" + serviceInstantiationInfo.getPaas_instance_name() 
                + "\",\"autoscaling_type\":\"" + serviceInstantiationInfo.getAutoscaling_type() 
                + "\",\"count_min\":" + serviceInstantiationInfo.getCount_min() 
                + ",\"count_max\":" + serviceInstantiationInfo.getCount_max() 
                + ",\"location\":\"" + serviceInstantiationInfo.getLocation() 
                + "\",\"all_node_ports\":" + serviceInstantiationInfo.getAll_node_ports() + "}"; 
        String serviceInstantiationResponse = utilities.sendPOSTHTTPRequest(urlToRequest, token, body);
        System.out.println("Service instantiation response from PiEdge: " + serviceInstantiationResponse);
        
        if (serviceInstantiationResponse.equals("401")){
           System.out.println("Need a new token");
            token = utilities.getPiEdgeAuthentication(serviceInstantiationInfo.getPiEdgeIP(), serviceInstantiationInfo.getPiEdgePort());
            serviceInstantiationResponse = utilities.sendPOSTHTTPRequest(urlToRequest, token, body);
            System.out.println("Service instantiation response from PiEdge: " + serviceInstantiationResponse);
        }
   /*     try {
           // String urlToRequest = "http://" + serviceInstantiationInfo.getPiEdgeIP() + ":" + serviceInstantiationInfo.getPiEdgePort() + "/piedge-connector/2.0.0/deployPaas";
            //String urlToRequest = "http://www.google.com";
            URL url = new URL(urlToRequest);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Content-Language", "en-US"); 
            connection.setRequestProperty("Authorization", "Bearer " + token);
            connection.setRequestProperty("Accept", "application/json");
            connection.setUseCaches(false);
            connection.setDoOutput(true);
            String body = "{\"paas_service_name\":\"iotmonitoring\",\"paas_instance_name\":\"iotmonitoring\",\"autoscaling_type\":\"minimize_cost\",\"count_min\":1,\"count_max\":2,\"location\":\"Peania_19002_Athens\",\"all_node_ports\":true}"; 
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = body.getBytes("utf-8");
                os.write(input, 0, input.length);			
            }
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            StringBuilder serviceInstantiationResponse = new StringBuilder(); 
            String line;
            while ((line = rd.readLine()) != null) {
                serviceInstantiationResponse.append(line);
                serviceInstantiationResponse.append('\r');
            }
            rd.close();
            System.out.println(serviceInstantiationResponse.toString());

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
*/
        return new ResponseEntity<>(HttpStatus.OK);
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
    
    
//    //------------------Security----------------------//
//    @GetMapping("/getToken")
//    String GetToken(@RequestParam(required = true) String username,
//                    @RequestParam(required = true) String password){
//        String urlParameters  = "client_id=data1&username=data2&password=data3&grant_type=";
//    }
}

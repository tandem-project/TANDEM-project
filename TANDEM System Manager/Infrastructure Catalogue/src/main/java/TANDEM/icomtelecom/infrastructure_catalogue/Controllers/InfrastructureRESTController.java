package TANDEM.icomtelecom.infrastructure_catalogue.Controllers;

import TANDEM.icomtelecom.infrastructure_catalogue.Model.Exceptions.InfrastructureNotFoundException;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.Infrastructure;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.InfrastructureCloud;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.InfrastructureNode;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.InfrastructureNodeInfo;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeAddresses;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeAllocatableResources;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeCapacity;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeConditions;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeGeneralInfo;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeUsage;
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
import TANDEM.icomtelecom.infrastructure_catalogue.Repositories.InfrastructureRepository;
import TANDEM.icomtelecom.infrastructure_catalogue.Utilities.Utilities;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import static org.springframework.http.converter.json.Jackson2ObjectMapperBuilder.json;
import org.springframework.web.client.HttpStatusCodeException;

@RestController
@RequestMapping("infrastructurecatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class InfrastructureRESTController {

    private String token = null;
    private Utilities utilities = new Utilities();
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    @Autowired
    InfrastructureRepository infrastructureRepository;
    // All services
    @GetMapping("/get/infrastructure")
    public List<Infrastructure> getAllInfrastructure(){
        //get all edge clouds from database
        List<Infrastructure> edgeClouds = infrastructureRepository.findAll();
        //for each node of each edge cloud, ask its updated values from PiEdge

        for (Infrastructure edgeCloud : edgeClouds){
            List<InfrastructureNode> updatedNodes = new ArrayList<>();
            for (InfrastructureNode node: edgeCloud.getNodes()){
                InfrastructureNode updatedEdgeCloudNode = utilities.getUpdatedEdgeNode(edgeCloud.getPiEdgeIP(), edgeCloud.getPiEdgePort(), node.getNodeName(), token);
                updatedNodes.add(updatedEdgeCloudNode);
            }
            
            edgeCloud.setNodes(updatedNodes);
            try {
                updateInfrastructure(edgeCloud.getEdgeCloudId(), edgeCloud);
            } catch (Exception ex) {
                Logger.getLogger(InfrastructureRESTController.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }

        return infrastructureRepository.findAll();
    }
  
    ///////////////////////////////////////////////////////////////////////////////////////

    
    //find specific service by id
    @GetMapping("/get/infrastructure/{id}")
    Infrastructure getInfrastructureById(@PathVariable String id) throws InfrastructureNotFoundException {
        return infrastructureRepository.findById(id)
                .orElseThrow(() -> new InfrastructureNotFoundException(id));
        //need to implement nodes update from PiEdge!
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////


    //search for services
    @GetMapping("/search")
    public ResponseEntity<?> getInfrastructureByProperties(@RequestParam(required = false) String edgeCloudName,
                                                     @RequestParam(required = false) String edgeCloudAvailabilityZone, 
                                                     @RequestParam(required = false) String edgeCloudProvider,
                                                     @RequestParam Integer page) {
        List<Infrastructure> infrastructures = infrastructureRepository.findinfrastructuresByProperties(edgeCloudName, edgeCloudAvailabilityZone, edgeCloudProvider, PageRequest.of(page, 15));
        return ResponseEntity.ok().body(infrastructures);
    }

    
    ///////////////////////////////////////////////////////////////////////////////////////

    
    //create a service
    @PostMapping(path = "/create/infrastructure",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Infrastructure> createInfrastructure(@RequestBody InfrastructureCloud newEdgeCloud) throws Exception {
            
        //get edge nodes from PiEdge
        List<InfrastructureNode> newEdgeCloudNodes = new ArrayList<>();
        if (token == null){
            System.out.println("First time requesting authentication from PiEdge...");
            token = utilities.getPiEdgeAuthentication(newEdgeCloud.getPiEdgeIP(), newEdgeCloud.getPiEdgePort());
            System.out.println("Token received from PiEdge: " + token);
        }
        
        String urlToRequest = "http://" + newEdgeCloud.getPiEdgeIP() + ":" + newEdgeCloud.getPiEdgePort() + "/piedge-connector/2.0.0/nodes";
        String nodes = utilities.sendGETHTTPRequest(urlToRequest, token);

        if (nodes.equals("401")){
           System.out.println("Token expired, need a new token");
            token = utilities.getPiEdgeAuthentication(newEdgeCloud.getPiEdgeIP(), newEdgeCloud.getPiEdgePort());
            nodes = utilities.sendGETHTTPRequest(urlToRequest, token);

        }
        
      //  String nodes = "{\"monitorNodesURL\":\"http://146.124.106.209:3000/d/qgmX-lqnz/infrastructure-metrics?orgId=1&refresh=1m&from=now-3h&to=now\",\"numberofNodes\":2,\"nodes\":[{\"_id\":\"584a1b1e-6638-4be1-98fe-6d243e54d2ab\",\"location\":\"Peania_Athens_19002\",\"name\":\"k8smaster\",\"serial\":\"146.124.106.209\",},{\"_id\":\"a032be27-bbc4-4d17-be4e-2fcd2080d883\",\"location\":\"Peania_Athens_19002\",\"name\":\"k8ssecondary\",\"serial\":\"146.124.106.210\",}]}";
        JSONObject nodesInfoJSON = new JSONObject(nodes);

       // String mockStr =  "[{\"_id\":\"584a1b1e-6638-4be1-98fe-6d243e54d2ab\",\"location\":\"Peania_Athens_19002\",\"name\":\"k8smaster\",\"serial\":\"146.124.106.209\",\"stats_url\":\"http://146.124.106.230:3000/d/piedge-k8smaster/k8smaster-node?orgId=1&refresh=1m\"},{\"_id\":\"a032be27-bbc4-4d17-be4e-2fcd2080d883\",\"location\":\"Peania_Athens_19002\",\"name\":\"k8ssecondary\",\"serial\":\"146.124.106.210\",\"stats_url\":\"http://146.124.106.230:3000/d/piedge-k8ssecondary/k8ssecondary-node?orgId=1&refresh=1m\"}]";
        final ObjectMapper objectMapper = new ObjectMapper();
        List<InfrastructureNodeInfo> nodesInfo = objectMapper.readValue(nodesInfoJSON.getJSONArray("nodes").toString(), new TypeReference<List<InfrastructureNodeInfo>>(){});
        for (InfrastructureNodeInfo nodeInfo :nodesInfo){
            //for each node of the edge cloud, get its stats, create an Infrastructure Node and add it to the Edge Cloud
            InfrastructureNode updatedEdgeNode = utilities.getUpdatedEdgeNode(newEdgeCloud.getPiEdgeIP(), newEdgeCloud.getPiEdgePort(), nodeInfo.getName(), token);
            newEdgeCloudNodes.add(updatedEdgeNode);
        }

        Infrastructure newInfrastructure = new Infrastructure();
        newInfrastructure.setEdgeCloudId(newEdgeCloud.getEdgeCloudId());
        newInfrastructure.setEdgeCloudName(newEdgeCloud.getEdgeCloudName());
        newInfrastructure.setEdgeCloudAvailabilityZone(newEdgeCloud.getEdgeCloudAvailabilityZone());
        newInfrastructure.setEdgeCloudProvider(newEdgeCloud.getEdgeCloudProvider());
        newInfrastructure.setEdgeCloudNumberofNodes(nodesInfoJSON.getInt("numberofNodes"));
  //      newInfrastructure.setEdgeCloudNumberofIoTDevices(newEdgeCloud.getEdgeCloudNumberofIoTDevices());
        newInfrastructure.setMonitorNodesURL(nodesInfoJSON.getString("monitorNodesURL"));
        newInfrastructure.setPiEdgeIP(newEdgeCloud.getPiEdgeIP());
        newInfrastructure.setPiEdgePort(newEdgeCloud.getPiEdgePort());
        newInfrastructure.setNodes(newEdgeCloudNodes);
        //check if all fields are completed!

     //   return null;

        Infrastructure infrastructure = infrastructureRepository.save(newInfrastructure);
        if (infrastructure == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(infrastructure, HttpStatus.CREATED);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////

    
    //update an edge cloud
    @PutMapping(path = "/update/infrastructure/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
 //   @RolesAllowed({"platinum","gold"})
    public Infrastructure updateInfrastructure(@PathVariable String id, @RequestBody Infrastructure newInfrastructure) throws Exception{
        return infrastructureRepository.findById(id)
                .map(infrastructure -> {
                    infrastructure.setEdgeCloudName(newInfrastructure.getEdgeCloudName());
                    infrastructure.setEdgeCloudAvailabilityZone(newInfrastructure.getEdgeCloudAvailabilityZone());
                    infrastructure.setEdgeCloudNumberofNodes(newInfrastructure.getEdgeCloudNumberofNodes());
                //    infrastructure.setEdgeCloudNumberofIoTDevices(newInfrastructure.getEdgeCloudNumberofIoTDevices());
                    infrastructure.setEdgeCloudProvider(newInfrastructure.getEdgeCloudProvider());
                    infrastructure.setPiEdgeIP(newInfrastructure.getPiEdgeIP());
                    infrastructure.setPiEdgePort(newInfrastructure.getPiEdgePort());
               //     infrastructure.setMonitorNodesURL(newInfrastructure.getMonitorNodesURL());
                    infrastructure.setNodes(newInfrastructure.getNodes());
//                    service.setVersion(newService.getVersion());
                    return infrastructureRepository.save(infrastructure);
                }).orElseThrow(() -> new javax.management.ServiceNotFoundException(id));
    }

    
   /////////////////////////////////////////////////////////////////////////////////////// 
    
    //Delete a service
    @DeleteMapping("/delete/infrastructure/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteInfrastructureById(@PathVariable String id){
        infrastructureRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


    ///////////////////////////////////////////////////////////////////////////////////////
    
  /*  public String getPiEdgeAuthentication(String piEdgeIP, String piEdgePort){
        String urlToRequest = "http://" + piEdgeIP + ":" + piEdgePort + "/piedge-connector/2.0.0/authentication";
        String body = "{\"username\":\"admin_system_manager\",\"password\":\"admin_system_manager!@!\"}";
        return utilities.sendPOSTHTTPRequest(urlToRequest, null, body);
    }*/
    
    
    
    
    
    
    //    //------------------Security----------------------//
//    @GetMapping("/getToken")
//    String GetToken(@RequestParam(required = true) String username,
//                    @RequestParam(required = true) String password){
//        String urlParameters  = "client_id=data1&username=data2&password=data3&grant_type=";
//    }
    
    
    /*  public InfrastructureNode getUpdatedEdgeNode(String ip, String port, String nodeName){
        InfrastructureNode updatedEdgeCloudNode = new InfrastructureNode();
        String urlToRequest = "http://" + ip + ":" + port + "/piedge-connector/2.0.0/nodes/" + nodeName;
        
        if (token == null)
            token = getPiEdgeAuthentication(ip, port);
            
        String edgeCloudNode = sendGETHTTPRequest(urlToRequest, token);

        if (edgeCloudNode.equals("401")){
           System.out.println("Need a new token");
            token = getPiEdgeAuthentication(ip, port);
            edgeCloudNode = sendGETHTTPRequest(urlToRequest, token);
        }
        
         //   String edgeCloudNode = "{\"nodeId\":\"Node1\",\"nodeName\":\"Peania1\",\"nodeType\":\"MasterKubernetesNode\",\"nodeLocation\":\"Peania_19002_Athens\",\"nodeAddresses\":{\"nodeHostName\":\"-\",\"nodeExternalIP\":\"-\",\"nodeInternalIP\":\"-\"},\"nodeConditions\":{\"nodeReady\":\"False\",\"nodeDiskPressure\":\"False\",\"nodeMemoryPressure\":\"False\",\"nodePIDPressure\":\"False\",\"nodeNetworkUnavailable\":\"False\"},\"nodeCapacity\":{\"nodeCPUCap\":\"0\",\"nodeMemoryCap\":\"0\",\"nodeMemoryCapMU\":\"-\",\"nodeStorageCap\":\"0\",\"nodeStorageCapMU\":\"-\",\"nodeMaxNoofPods\":\"0\"},\"nodeAllocatableResources\":{\"nodeCPUAllocatable\":\"0\",\"nodeMemoryAllocatable\":\"0\",\"nodeMemoryAllocatableMU\":\"-\",\"nodeStorageAllocatable\":\"0\",\"nodeStorageAllocatableMU\":\"-\"},\"nodeGeneralInfo\":{\"nodeArchitecture\":\"-\",\"nodeOS\":\"-\",\"nodeKubernetesVersion\":\"-\",\"nodeKernelVersion\":\"-\",\"nodecontainerRuntimeVersion\":\"-\"},\"nodeUsage\":{\"nodeCPUInUse\":\"0\",\"nodeCPUInUseMU\":\"-\",\"nodeCPUUsage\":\"0\",\"nodeMemoryInUse\":\"0\",\"nodeMemoryInUseMU\":\"-\",\"nodeMemoryUsage\":\"0\"},\"nodeUsageMonitoringURL\":\"http://146.124.106.209:3000/d/qgmX-lqnb/tandem-node-1?orgId=1&refresh=1m&from=now-3h&to=now\",\"nodeServicesMonitoringURL\":\"http://146.124.106.209:3000/d/Q5Tyu93na/tandem-node-1-services?orgId=1&refresh=1m&from=now-3h&to=now\"}";
            JSONObject jsonObject = new JSONObject(edgeCloudNode.toString());
                    
            updatedEdgeCloudNode.setNodeId(jsonObject.getString("nodeName"));
            updatedEdgeCloudNode.setNodeName(jsonObject.getString("nodeName"));
          //  updatedEdgeCloudNode.setNodeType(jsonObject.getString("nodeType"));
            //    updatedEdgeCloudNode.setNodeProvider(jsonObject.getString("nodeProvider"));
                    
            NodeAddresses nodeAddresses = new Gson().fromJson(jsonObject.getJSONObject("nodeAddresses").toString(), NodeAddresses.class);
            updatedEdgeCloudNode.setNodeAddresses(nodeAddresses);
            
            NodeAllocatableResources nodeAllocatableResources = new Gson().fromJson(jsonObject.getJSONObject("nodeAllocatableResources").toString(), NodeAllocatableResources.class);
            updatedEdgeCloudNode.setNodeAllocatableResources(nodeAllocatableResources);
              
            NodeCapacity nodeCapacity = new Gson().fromJson(jsonObject.getJSONObject("nodeCapacity").toString(), NodeCapacity.class);
            updatedEdgeCloudNode.setNodeCapacity(nodeCapacity);
                    
            NodeConditions nodeConditions = new Gson().fromJson(jsonObject.getJSONObject("nodeConditions").toString(), NodeConditions.class);
            updatedEdgeCloudNode.setNodeConditions(nodeConditions);
                    
            NodeGeneralInfo nodeGeneralInfo = new Gson().fromJson(jsonObject.getJSONObject("nodeGeneralInfo").toString(), NodeGeneralInfo.class);
            updatedEdgeCloudNode.setNodeGeneralInfo(nodeGeneralInfo);
                    
            NodeUsage nodeUsage = new Gson().fromJson(jsonObject.getJSONObject("nodeUsage").toString(), NodeUsage.class);
            updatedEdgeCloudNode.setNodeUsage(nodeUsage);
                
        return updatedEdgeCloudNode;
    } */
     
    
        
   /* public String sendGETHTTPRequest(String urlToRequest, String tokenHeader){
        HttpURLConnection connection = null;
        StringBuilder response = new StringBuilder(); 
        try {
            URL url = new URL(urlToRequest);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Content-Language", "en-US");  
            connection.setRequestProperty("Accept", "application/json");
            
            if (tokenHeader != null)
                connection.setRequestProperty("Authorization", "Bearer " + tokenHeader);

            connection.setUseCaches(false);
            connection.setDoOutput(true);
            
            InputStream is = connection.getInputStream();

            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            if (connection != null) {
                connection.disconnect();
            }
        } catch (IOException e) {
            e.printStackTrace();
            if (connection != null) {
                connection.disconnect();
            }
            if (e.getMessage().contains("HTTP")){
                String[] errorCodeParts = e.getMessage().split("HTTP response code: ");
                System.out.println("HTTP Response code: " + errorCodeParts[1]);
                return String.valueOf(errorCodeParts[1].substring(0, 3));
            }
        } 
        return response.toString();
    }*/
    
    
     /*   public String sendPOSTHTTPRequest(String urlToRequest, String tokenHeader){
        HttpURLConnection connection = null;
        StringBuilder response = new StringBuilder(); 
        try {
            URL url = new URL(urlToRequest);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Content-Language", "en-US");  
            connection.setRequestProperty("Accept", "application/json");
            
            if (tokenHeader != null)
                connection.setRequestProperty("Authorization", "Bearer " + tokenHeader);

            connection.setUseCaches(false);
            connection.setDoOutput(true);
            
            InputStream is = connection.getInputStream();

            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            if (connection != null) {
                connection.disconnect();
            }
        } catch (IOException e) {
            e.printStackTrace();
            if (connection != null) {
                connection.disconnect();
            }
            if (e.getMessage().contains("HTTP")){
                String[] errorCodeParts = e.getMessage().split("HTTP response code: ");
                System.out.println("HTTP Response code: " + errorCodeParts[1]);
                return String.valueOf(errorCodeParts[1].substring(0, 3));
            }
        } 
        return response.toString();
    }
*/
    
    
}

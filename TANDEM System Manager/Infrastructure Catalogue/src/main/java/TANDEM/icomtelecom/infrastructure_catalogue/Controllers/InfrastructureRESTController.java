package TANDEM.icomtelecom.infrastructure_catalogue.Controllers;

import TANDEM.icomtelecom.infrastructure_catalogue.Model.Exceptions.InfrastructureNotFoundException;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.Infrastructure;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.InfrastructureCloud;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.InfrastructureNode;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.InfrastructureNodeInfo;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeToAdd;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeToRemove;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import TANDEM.icomtelecom.infrastructure_catalogue.Repositories.InfrastructureRepository;
import TANDEM.icomtelecom.infrastructure_catalogue.Utilities.Utilities;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;

@RestController
@RequestMapping("infrastructurecatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class InfrastructureRESTController {

  //  private String token = null;
    public static Map<String, String> cloudsTokens = new HashMap<>();
    private Utilities utilities = new Utilities();
    private static boolean running = false;
    ///////////////////////////////////////////////////////////////////////////////////////
    
    @Autowired
    InfrastructureRepository infrastructureRepository;
    // All services
    @GetMapping("/get/infrastructure")
    public List<Infrastructure> getAllInfrastructure(HttpServletRequest request){
        //get all edge clouds from database
        System.out.println();
        System.out.println("########################################################################");
        System.out.println("--------------- GOT REQUEST TO RETURN ALL INFRASTRUCTURE ---------------");
        System.out.println("########################################################################");
        System.out.println();
                
        List<Infrastructure> edgeClouds = infrastructureRepository.findAll();
        //for each node of each edge cloud, ask its updated values from PiEdge
        for (Infrastructure edgeCloud : edgeClouds){
            List<InfrastructureNode> currentNodes = edgeCloud.getNodes();
            List<InfrastructureNode> updatedNodes = new ArrayList<>();
            if (cloudsTokens.get(edgeCloud.getEdgeCloudId()) == null){
                String token = utilities.getPiEdgeAuthentication(edgeCloud.getPiEdgeIP(), edgeCloud.getPiEdgePort());
                System.out.println("Token received from PiEdge: " + token);
                cloudsTokens.put(edgeCloud.getEdgeCloudId(), token);
            }  
                    
            System.out.println("GETTING UPDATED EDGE NODES FOR CLOUD " + edgeCloud.getEdgeCloudName());
            for (InfrastructureNode node: currentNodes){
                InfrastructureNode updatedEdgeCloudNode = utilities.getUpdatedEdgeNode(edgeCloud.getPiEdgeIP(), edgeCloud.getPiEdgePort(), node.getNodeName(), cloudsTokens.get(edgeCloud.getEdgeCloudId()), edgeCloud.getEdgeCloudId());
                System.out.println(updatedEdgeCloudNode);

                updatedEdgeCloudNode.setNodeType(node.getNodeType());
                updatedEdgeCloudNode.setNodeDescription(node.getNodeDescription());
                updatedEdgeCloudNode.setNodeServices(node.getNodeServices());
                updatedNodes.add(updatedEdgeCloudNode);
            }
            
            edgeCloud.setNodes(updatedNodes);
            try {
                System.out.println(updatedNodes);
                updateInfrastructureAndItsNodes(edgeCloud.getEdgeCloudId(), edgeCloud);
            } catch (Exception ex) {
                Logger.getLogger(InfrastructureRESTController.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }
        running = false;
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
    //    if (token == null){
            System.out.println("First time requesting authentication from PiEdge for Edge Cloud " + newEdgeCloud.getEdgeCloudId());
            String token = utilities.getPiEdgeAuthentication(newEdgeCloud.getPiEdgeIP(), newEdgeCloud.getPiEdgePort());
            cloudsTokens.put(newEdgeCloud.getEdgeCloudId(), token);
            System.out.println("Token received from PiEdge: " + token);
  //      }

        Map<String, String> nodesNamesToTypes = new HashMap<>();
        Map<String, String> nodesNamesToDescriptions = new HashMap<>();
        Map<String, List<String>> nodesNamesToServices = new HashMap<>();
        
        List<InfrastructureNode> newNodes = newEdgeCloud.getNodes();
        for (InfrastructureNode node : newNodes){
            nodesNamesToTypes.put(node.getNodeName(), node.getNodeType());
            nodesNamesToDescriptions.put(node.getNodeName(), node.getNodeDescription());
            nodesNamesToServices.put(node.getNodeName(), node.getNodeServices());
        }
        String urlToRequest = "http://" + newEdgeCloud.getPiEdgeIP() + ":" + newEdgeCloud.getPiEdgePort() + "/piedge-connector/2.0.0/nodes";
        String nodes = utilities.sendGETHTTPRequest(urlToRequest, token);
        
        JSONObject nodesInfoJSON = new JSONObject(nodes);

        final ObjectMapper objectMapper = new ObjectMapper();
        List<InfrastructureNodeInfo> nodesInfo = objectMapper.readValue(nodesInfoJSON.getJSONArray("nodes").toString(), new TypeReference<List<InfrastructureNodeInfo>>(){});
        for (InfrastructureNodeInfo nodeInfo :nodesInfo){
            //for each node of the edge cloud, get its stats, create an Infrastructure Node and add it to the Edge Cloud
            InfrastructureNode updatedEdgeNode = utilities.getUpdatedEdgeNode(newEdgeCloud.getPiEdgeIP(), newEdgeCloud.getPiEdgePort(), nodeInfo.getName(), token, newEdgeCloud.getEdgeCloudId());
            updatedEdgeNode.setNodeType(nodesNamesToTypes.get(nodeInfo.getName()));
            updatedEdgeNode.setNodeDescription(nodesNamesToDescriptions.get(nodeInfo.getName()));
            updatedEdgeNode.setNodeServices(nodesNamesToServices.get(nodeInfo.getName()));
            newEdgeCloudNodes.add(updatedEdgeNode);
        }

        Infrastructure newInfrastructure = new Infrastructure();
        newInfrastructure.setEdgeCloudId(newEdgeCloud.getEdgeCloudId());
        newInfrastructure.setEdgeCloudName(newEdgeCloud.getEdgeCloudName());
        newInfrastructure.setEdgeCloudAvailabilityZone(newEdgeCloud.getEdgeCloudAvailabilityZone());
        newInfrastructure.setEdgeCloudProvider(newEdgeCloud.getEdgeCloudProvider());
        newInfrastructure.setEdgeCloudNumberofNodes(nodesInfoJSON.getInt("numberofNodes"));
        newInfrastructure.setMonitorNodesURL(nodesInfoJSON.getString("monitorNodesURL"));
        newInfrastructure.setPiEdgeIP(newEdgeCloud.getPiEdgeIP());
        newInfrastructure.setPiEdgePort(newEdgeCloud.getPiEdgePort());
        newInfrastructure.setNodes(newEdgeCloudNodes);
        newInfrastructure.setServices(newEdgeCloud.getServices());
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
                    infrastructure.setEdgeCloudProvider(newInfrastructure.getEdgeCloudProvider());
                    infrastructure.setPiEdgeIP(newInfrastructure.getPiEdgeIP());
                    infrastructure.setPiEdgePort(newInfrastructure.getPiEdgePort());
                    infrastructure.setServices(newInfrastructure.getServices());
                    return infrastructureRepository.save(infrastructure);
                }).orElseThrow(() -> new javax.management.ServiceNotFoundException(id));
    }

    
    
    
    public Infrastructure updateInfrastructureAndItsNodes(@PathVariable String id, @RequestBody Infrastructure newInfrastructure) throws Exception{
        return infrastructureRepository.findById(id)
                .map(infrastructure -> {
                    infrastructure.setEdgeCloudName(newInfrastructure.getEdgeCloudName());
                    infrastructure.setEdgeCloudAvailabilityZone(newInfrastructure.getEdgeCloudAvailabilityZone());
                    infrastructure.setEdgeCloudNumberofNodes(newInfrastructure.getEdgeCloudNumberofNodes());
                    infrastructure.setEdgeCloudProvider(newInfrastructure.getEdgeCloudProvider());
                    infrastructure.setPiEdgeIP(newInfrastructure.getPiEdgeIP());
                    infrastructure.setPiEdgePort(newInfrastructure.getPiEdgePort());
                    infrastructure.setNodes(newInfrastructure.getNodes());
                    infrastructure.setServices(newInfrastructure.getServices());
                    return infrastructureRepository.save(infrastructure);
                }).orElseThrow(() -> new javax.management.ServiceNotFoundException(id));
    }


   /////////////////////////////////////////////////////////////////////////////////////// 
   
        @PostMapping(path = "/addnode/infrastructure/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Infrastructure> addNode(@PathVariable String id, @RequestBody NodeToAdd newNode) throws Exception {
            
        System.out.println("Adding node to edge cloud " + id);
        Infrastructure infrastructure = getInfrastructureById(id);
        boolean nodeExists = false;
        
        if (infrastructure != null){
            
            List<InfrastructureNode> existingNodes = infrastructure.getNodes();
            InfrastructureNode nodeToUpdate = new InfrastructureNode();
            for (InfrastructureNode node: existingNodes){
                if (node.getNodeId().equals(newNode.getNodeId())){
                    nodeExists = true;
                    nodeToUpdate = node;
                    System.out.println("Node " + newNode.getNodeId() + " already exists, will update it.");
                    break;
                }
            }
        
            if (nodeExists){
                //update in DB
                List<InfrastructureNode> nodes = infrastructure.getNodes();
                nodes.remove(nodeToUpdate);
                nodeToUpdate.setNodeId(newNode.getNodeId());
                nodeToUpdate.setNodeName(newNode.getNodeName());
                nodeToUpdate.setNodeLocation(newNode.getNodeLocation());
                nodeToUpdate.setNodeAddresses(newNode.getNodeAddresses());
                nodeToUpdate.setNodeConditions(newNode.getNodeConditions());
                nodeToUpdate.setNodeCapacity(newNode.getNodeCapacity());
                nodeToUpdate.setNodeAllocatableResources(newNode.getNodeAllocatableResources());
                nodeToUpdate.setNodeGeneralInfo(newNode.getNodeGeneralInfo());
                nodeToUpdate.setNodeUsage(newNode.getNodeUsage());
                nodeToUpdate.setNodeUsageMonitoringURL(newNode.getNodeUsageMonitoringURL());
                nodeToUpdate.setNodeServicesMonitoringURL(newNode.getNodeServicesMonitoringURL());
                nodeToUpdate.setNodePassword(newNode.getNodePassword());
                nodeToUpdate.setNodeType(newNode.getNodeType());
                nodeToUpdate.setNodeDescription(newNode.getNodeDescription());
                nodeToUpdate.setNodeServices(newNode.getNodeServices());
                nodes.add(nodeToUpdate);
                infrastructure.setNodes(nodes);
        //        updateInfrastructure(id, infrastructure);
                Infrastructure savedInfrastructure = addOrUpdateNodesToDB(id, infrastructure);
                return new ResponseEntity<>(savedInfrastructure, HttpStatus.CREATED); 
            }
            
            //else, create node in PiEdge and then in DB
            String nodeAdditionResponse = addNodeToPiEdge(id, infrastructure, newNode);
      //      if (nodeAdditionResponse.contains("200") || nodeAdditionResponse.contains("added successfully")){
                InfrastructureNode newInfrastructureNode = new InfrastructureNode();
                newInfrastructureNode.setNodeId(newNode.getNodeId());
                newInfrastructureNode.setNodeName(newNode.getNodeName());
                newInfrastructureNode.setNodeLocation(newNode.getNodeLocation());
                newInfrastructureNode.setNodeAddresses(newNode.getNodeAddresses());
                newInfrastructureNode.setNodeConditions(newNode.getNodeConditions());
                newInfrastructureNode.setNodeCapacity(newNode.getNodeCapacity());
                newInfrastructureNode.setNodeAllocatableResources(newNode.getNodeAllocatableResources());
                newInfrastructureNode.setNodeGeneralInfo(newNode.getNodeGeneralInfo());
                newInfrastructureNode.setNodeUsage(newNode.getNodeUsage());
                newInfrastructureNode.setNodeUsageMonitoringURL(newNode.getNodeUsageMonitoringURL());
                newInfrastructureNode.setNodeServicesMonitoringURL(newNode.getNodeServicesMonitoringURL());
                newInfrastructureNode.setNodePassword(newNode.getNodePassword());
                newInfrastructureNode.setNodeType(newNode.getNodeType());
                newInfrastructureNode.setNodeDescription(newNode.getNodeDescription());
                newInfrastructureNode.setNodeServices(newNode.getNodeServices());
                List<InfrastructureNode> nodes = infrastructure.getNodes();
                nodes.add(newInfrastructureNode);
                infrastructure.setNodes(nodes);
                
             
            //    updateInfrastructure(id, infrastructure);
                Infrastructure savedInfrastructure = addOrUpdateNodesToDB(id, infrastructure);
                return new ResponseEntity<>(savedInfrastructure, HttpStatus.OK);
     //       }
    //        else{
                //node could not be added to PiEdge so it will not be added to the dataabase either
   //             return new ResponseEntity<>(infrastructure, HttpStatus.INTERNAL_SERVER_ERROR);
   //         }
        }
        else{
            System.out.println("No such infrastructure found");
            return new ResponseEntity<>(infrastructure, HttpStatus.NOT_FOUND);
        }
        
    }
    
    
        public Infrastructure addOrUpdateNodesToDB(String id, Infrastructure newInfrastructure) throws Exception{
        return infrastructureRepository.findById(id)
                .map(infrastructure -> {
                    infrastructure.setEdgeCloudName(newInfrastructure.getEdgeCloudName());
                    infrastructure.setEdgeCloudAvailabilityZone(newInfrastructure.getEdgeCloudAvailabilityZone());
                    infrastructure.setEdgeCloudNumberofNodes(newInfrastructure.getEdgeCloudNumberofNodes());
                    infrastructure.setEdgeCloudProvider(newInfrastructure.getEdgeCloudProvider());
                    infrastructure.setPiEdgeIP(newInfrastructure.getPiEdgeIP());
                    infrastructure.setPiEdgePort(newInfrastructure.getPiEdgePort());
                    infrastructure.setNodes(newInfrastructure.getNodes());
                    infrastructure.setServices(newInfrastructure.getServices());
                    return infrastructureRepository.save(infrastructure);
                }).orElseThrow(() -> new javax.management.ServiceNotFoundException(id));
    }

     
    ///////////////////////////////////////////////////////////////////////////////////////

    
    public String addNodeToPiEdge(String id, Infrastructure infrastructure, NodeToAdd newNode){
        //add node to piedge
        //request token
        if (cloudsTokens.get(id) == null){
      //   if (token == null){
       //     System.out.println("First time requesting authentication from PiEdge for edge cloud " + id);
            String token = utilities.getPiEdgeAuthentication(infrastructure.getPiEdgeIP(), infrastructure.getPiEdgePort());
            cloudsTokens.put(id, token);
            System.out.println("Token received from PiEdge: " + token);
        }
        else{
     //       System.out.println("Already have token for Edge Cloud " + id + " and it is " + cloudsTokens.get(id)); 
        }
         
         
        String urlToRequest = "http://" + infrastructure.getPiEdgeIP() + ":" + infrastructure.getPiEdgePort() + "/piedge-connector/2.0.0/addNode";
        //body
        String body = "{\"name\":\"" + newNode.getNodeName()
                + "\",\"hostname\":\"" + newNode.getNodeAddresses().getNodeHostName()
                + "\",\"ip\":\"" + newNode.getNodeAddresses().getNodeExternalIP()
                + "\",\"password\":\"" + newNode.getNodePassword()
                + "\",\"location\":\"" + newNode.getNodeLocation()  + "\"}"; 
            
        System.out.println("Body sent to PiEdge request: " + body);
        String nodeAdditionResponse = utilities.sendPOSTHTTPRequest(urlToRequest, cloudsTokens.get(id), body);
        System.out.println("Node addition response from PiEdge: " + nodeAdditionResponse);
            
     //   String nodes = utilities.sendGETHTTPRequest(urlToRequest, token);

        if (nodeAdditionResponse.equals("401")){
            String token = utilities.getPiEdgeAuthentication(infrastructure.getPiEdgeIP(), infrastructure.getPiEdgePort());
            cloudsTokens.put(id, token);
            System.out.println("TOKEN WAS EXPIRED FOR EDGE CLOUD " + id + " AND GOT A NEW ONE FROM PI-EDGE: " + token);
            nodeAdditionResponse = utilities.sendPOSTHTTPRequest(urlToRequest, token, body);
        }
        
        return nodeAdditionResponse;
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
   @PostMapping(path = "/removenode/infrastructure/{id}",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Infrastructure> removeNode(@PathVariable String id, @RequestBody NodeToRemove nodeToDelete) throws Exception {
            
        System.out.println("Removing node from edge cloud " + id);
        Infrastructure infrastructure = getInfrastructureById(id);
        if (infrastructure != null)
        {
            List<InfrastructureNode> nodes = infrastructure.getNodes();
            InfrastructureNode infrastructureNodeToDelete = null;
            for (InfrastructureNode node : nodes){
                if (node.getNodeName().equals(nodeToDelete.getNodeName())){
                    infrastructureNodeToDelete = node;
                }
            }
            if (infrastructureNodeToDelete != null)
            {    
                //first delete node from PiEdge
                String nodeRemovalResponse = removeNodeFromPiEdge(infrastructure, nodeToDelete, id);
             //   if (nodeRemovalResponse.contains("200") || nodeRemovalResponse.contains("???????????")){
                    // then remove node from database
                    nodes.remove(infrastructureNodeToDelete);
                    infrastructure.setNodes(nodes);
                    updateInfrastructureAndItsNodes(id, infrastructure);
             //   }
            //    else{
                    //node could not be removed from PiEdge so it will not be removed from the dataabase either
             //       return new ResponseEntity<>(infrastructure, HttpStatus.INTERNAL_SERVER_ERROR);
            //    }
               
            }
            else{
                System.out.println("No such node found");
                return new ResponseEntity<>(infrastructure, HttpStatus.NOT_FOUND);
            }
        }
        else{
            System.out.println("No such infrastructure found");
            return new ResponseEntity<>(infrastructure, HttpStatus.NOT_FOUND);
        }
  
        return new ResponseEntity<>(infrastructure, HttpStatus.OK);
        
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    
    
    public String removeNodeFromPiEdge(Infrastructure infrastructure, NodeToRemove nodeToDelete, String id){
        String urlToRequest = "http://" + infrastructure.getPiEdgeIP() + ":" + infrastructure.getPiEdgePort() + "/piedge-connector/2.0.0/removeNode";
        //body
        String body = "{\"name\":\"" + nodeToDelete.getNodeName()
                + "\",\"hostname\":\"" + nodeToDelete.getNodeHostname()
                + "\",\"ip\":\"" + nodeToDelete.getNodeIP()
                + "\",\"password\":\"" + nodeToDelete.getNodePassword() + "\"}"; 
            
        System.out.println("Body sent to PiEdge request: " + body);
        String nodeRemovalResponse = utilities.sendPOSTHTTPRequest(urlToRequest, cloudsTokens.get(id), body);
        System.out.println("Node removal response from PiEdge: " + nodeRemovalResponse);
            
        if (nodeRemovalResponse.equals("401")){
            System.out.println("Token expired, need a new token");
            String token = utilities.getPiEdgeAuthentication(infrastructure.getPiEdgeIP(), infrastructure.getPiEdgePort());
            cloudsTokens.put(id, token);
            nodeRemovalResponse = utilities.sendPOSTHTTPRequest(urlToRequest, cloudsTokens.get(id), body);
        }
        
        return nodeRemovalResponse; 
    }
    
    //Delete a service
    @DeleteMapping("/delete/infrastructure/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteInfrastructureById(@PathVariable String id){
        infrastructureRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

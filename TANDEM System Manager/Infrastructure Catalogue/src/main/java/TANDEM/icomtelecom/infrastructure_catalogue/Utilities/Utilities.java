package TANDEM.icomtelecom.infrastructure_catalogue.Utilities;

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
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import TANDEM.icomtelecom.infrastructure_catalogue.Repositories.InfrastructureRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONObject;



public class Utilities {

   // private String token = null;

    public String sendPOSTHTTPRequest(String urlToRequest, String tokenHeader, String body){
        HttpURLConnection connection = null;
        StringBuilder response = new StringBuilder(); 
        try {
            URL url = new URL(urlToRequest);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Content-Language", "en-US");  
            connection.setRequestProperty("Accept", "application/json");
           
            if (tokenHeader != null){
                System.out.println("Setting authorization token for POST request to: " + tokenHeader);
                connection.setRequestProperty("Authorization", "Bearer " + tokenHeader);
            }
            
            connection.setUseCaches(false);
            connection.setDoOutput(true);
            
            if (body != null){
                try (OutputStream os = connection.getOutputStream()) {
                    byte[] input = body.getBytes("utf-8");
                    os.write(input, 0, input.length);			
                }
            }
            
            InputStream is = connection.getInputStream();
            BufferedReader rd;
            rd = new BufferedReader(new InputStreamReader(is));
            String line;            
            while ((line = rd.readLine()) != null) {
                response.append(line + "\n");
            }
            rd.close();
            System.out.println("Response: " + response);
           
        //    if (connection != null) {
            connection.disconnect();
       //    }
        } catch (IOException e) {
           System.out.println("Exception message: " + e.getMessage());
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
    
    
    
    public String sendGETHTTPRequest(String urlToRequest, String tokenHeader){
        HttpURLConnection connection = null;
        StringBuilder response = new StringBuilder(); 
        try {
            URL url = new URL(urlToRequest);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Content-Language", "en-US");  
            connection.setRequestProperty("Accept", "application/json");
            
            
            if (tokenHeader != null){
                System.out.println("Setting authorization token for GET request to: " + tokenHeader);                
                connection.setRequestProperty("Authorization", "Bearer " + tokenHeader);
            }
                

            connection.setUseCaches(false);
            connection.setDoOutput(true);

            
            InputStream is = connection.getInputStream();
            BufferedReader rd;
            rd = new BufferedReader(new InputStreamReader(is));            
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line + "\n");
            }
            rd.close();
            System.out.println("Response: " + response);
      //       if (connection != null) {
            connection.disconnect();
      //      }
        } catch (Exception e) {
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
    
    public InfrastructureNode getUpdatedEdgeNode(String ip, String port, String nodeName, String token){
        InfrastructureNode updatedEdgeCloudNode = new InfrastructureNode();
        String urlToRequest = "http://" + ip + ":" + port + "/piedge-connector/2.0.0/nodes/" + nodeName;
        
        if (token == null)
            token = getPiEdgeAuthentication(ip, port);
            
        String edgeCloudNode = sendGETHTTPRequest(urlToRequest, token);

        if (edgeCloudNode.equals("401")){
           System.out.println("Token expired, need a new token");
            token = getPiEdgeAuthentication(ip, port);
            edgeCloudNode = sendGETHTTPRequest(urlToRequest, token);
        }
        
         //   String edgeCloudNode = "{\"nodeId\":\"Node1\",\"nodeName\":\"Peania1\",\"nodeType\":\"MasterKubernetesNode\",\"nodeLocation\":\"Peania_19002_Athens\",\"nodeAddresses\":{\"nodeHostName\":\"-\",\"nodeExternalIP\":\"-\",\"nodeInternalIP\":\"-\"},\"nodeConditions\":{\"nodeReady\":\"False\",\"nodeDiskPressure\":\"False\",\"nodeMemoryPressure\":\"False\",\"nodePIDPressure\":\"False\",\"nodeNetworkUnavailable\":\"False\"},\"nodeCapacity\":{\"nodeCPUCap\":\"0\",\"nodeMemoryCap\":\"0\",\"nodeMemoryCapMU\":\"-\",\"nodeStorageCap\":\"0\",\"nodeStorageCapMU\":\"-\",\"nodeMaxNoofPods\":\"0\"},\"nodeAllocatableResources\":{\"nodeCPUAllocatable\":\"0\",\"nodeMemoryAllocatable\":\"0\",\"nodeMemoryAllocatableMU\":\"-\",\"nodeStorageAllocatable\":\"0\",\"nodeStorageAllocatableMU\":\"-\"},\"nodeGeneralInfo\":{\"nodeArchitecture\":\"-\",\"nodeOS\":\"-\",\"nodeKubernetesVersion\":\"-\",\"nodeKernelVersion\":\"-\",\"nodecontainerRuntimeVersion\":\"-\"},\"nodeUsage\":{\"nodeCPUInUse\":\"0\",\"nodeCPUInUseMU\":\"-\",\"nodeCPUUsage\":\"0\",\"nodeMemoryInUse\":\"0\",\"nodeMemoryInUseMU\":\"-\",\"nodeMemoryUsage\":\"0\"},\"nodeUsageMonitoringURL\":\"http://146.124.106.209:3000/d/qgmX-lqnb/tandem-node-1?orgId=1&refresh=1m&from=now-3h&to=now\",\"nodeServicesMonitoringURL\":\"http://146.124.106.209:3000/d/Q5Tyu93na/tandem-node-1-services?orgId=1&refresh=1m&from=now-3h&to=now\"}";
            JSONObject jsonObject = new JSONObject(edgeCloudNode);
                    
            updatedEdgeCloudNode.setNodeId(jsonObject.getString("nodeName"));
            updatedEdgeCloudNode.setNodeName(jsonObject.getString("nodeName"));
          //  updatedEdgeCloudNode.setNodeType(jsonObject.getString("nodeType"));
            //    updatedEdgeCloudNode.setNodeProvider(jsonObject.getString("nodeProvider"));
            updatedEdgeCloudNode.setNodeLocation(jsonObject.getString("nodeLocation"));
 
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
              
            updatedEdgeCloudNode.setNodeUsageMonitoringURL(jsonObject.getString("nodeUsageMonitoringURL"));
            updatedEdgeCloudNode.setNodeServicesMonitoringURL(jsonObject.getString("nodeServicesMonitoringURL"));
        return updatedEdgeCloudNode;
    } 
     

    public String getPiEdgeAuthentication(String piEdgeIP, String piEdgePort){
        String urlToRequest = "http://" + piEdgeIP + ":" + piEdgePort + "/piedge-connector/2.0.0/authentication";
    //    System.out.println("Will request authentication from URL: " + urlToRequest);
        String body = "{\"username\":\"admin_system_manager\",\"password\":\"admin_system_manager!@!\"}";
        String tokenResponse = sendPOSTHTTPRequest(urlToRequest, null, body);
        
        JSONObject tokenObject = new JSONObject(tokenResponse);
        String token = tokenObject.getString("token");
        return token;
    }
}

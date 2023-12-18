package TANDEM.icomtelecom.infrastructure_catalogue.Utilities;

import TANDEM.icomtelecom.infrastructure_catalogue.Controllers.InfrastructureRESTController;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.InfrastructureNode;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeAddresses;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeAllocatableResources;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeCapacity;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeConditions;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeGeneralInfo;
import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.NodeUsage;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONObject;



public class Utilities {

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
            connection.disconnect();
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
            connection.disconnect();
        } catch (Exception e) {
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
    
    public InfrastructureNode getUpdatedEdgeNode(String ip, String port, String nodeName, String token, String edgeCloudId){
        InfrastructureNode updatedEdgeCloudNode = new InfrastructureNode();
        String urlToRequest = "http://" + ip + ":" + port + "/piedge-connector/2.0.0/nodes/" + nodeName;
        String edgeCloudNode = sendGETHTTPRequest(urlToRequest, token);
            
        if (edgeCloudNode.equals("401")){
            token = getPiEdgeAuthentication(ip, port);
            InfrastructureRESTController.cloudsTokens.put(edgeCloudId, token);
            edgeCloudNode = sendGETHTTPRequest(urlToRequest, token);
        }
        
            JSONObject jsonObject = new JSONObject(edgeCloudNode);
                    
            System.out.println("UPDATED NODE FROM PIEDGE: " + jsonObject);
            updatedEdgeCloudNode.setNodeId(jsonObject.getString("nodeName"));
            updatedEdgeCloudNode.setNodeName(jsonObject.getString("nodeName"));
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
        String body = "{\"username\":\"USERNAME\",\"password\":\"PASSWORD\"}";
        String tokenResponse = sendPOSTHTTPRequest(urlToRequest, null, body);
        
        JSONObject tokenObject = new JSONObject(tokenResponse);
        String token = tokenObject.getString("token");
        return token;
    }
}

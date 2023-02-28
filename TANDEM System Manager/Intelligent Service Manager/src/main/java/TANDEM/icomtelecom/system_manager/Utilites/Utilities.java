package TANDEM.icomtelecom.system_manager.Utilites;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
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
                System.out.println("Setting token header to: " + tokenHeader);
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
            if (e.getMessage().contains("HTTP")){
               String[] errorCodeParts = e.getMessage().split("HTTP response code: ");
               System.out.println("HTTP Response code: " + errorCodeParts[1]);
               return String.valueOf(errorCodeParts[1].substring(0, 3));
            }
            else{
                System.out.println("Exception message: " + e.getMessage());
                e.printStackTrace();
            }
            if (connection != null) {
                connection.disconnect();
            }
        } 
        return response.toString();
    }
    
    
    
    public String sendGETHTTPRequest(String urlToRequest, String tokenHeader){
        HttpURLConnection connection = null;
        StringBuilder response = new StringBuilder(); 
        try {
            System.out.println("Now sending GET request to URL: " + urlToRequest);
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
            if (connection != null) {
                connection.disconnect();
            }
            if (e.getMessage().contains("HTTP")){
                String[] errorCodeParts = e.getMessage().split("HTTP response code: ");
                System.out.println("HTTP Response code: " + errorCodeParts[1]);
                return String.valueOf(errorCodeParts[1].substring(0, 3));
            }
            else{
                e.printStackTrace();
            }
        } 
        return response.toString();
    }
     

    
    
    public String sendDELETEHTTPRequest(String urlToRequest, String tokenHeader){
        HttpURLConnection connection = null;
        StringBuilder response = new StringBuilder(); 
        try {
            URL url = new URL(urlToRequest);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("DELETE");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Content-Language", "en-US");  
            connection.setRequestProperty("Accept", "application/json");
           
            if (tokenHeader != null){
                System.out.println("Setting token header to: " + tokenHeader);
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
           
        //    if (connection != null) {
            connection.disconnect();
       //    }
        } catch (IOException e) {
            if (e.getMessage().contains("HTTP")){
               String[] errorCodeParts = e.getMessage().split("HTTP response code: ");
               System.out.println("HTTP Response code: " + errorCodeParts[1]);
               return String.valueOf(errorCodeParts[1].substring(0, 3));
            }
            else{
                System.out.println("Exception message: " + e.getMessage());
                e.printStackTrace();
            }
            if (connection != null) {
                connection.disconnect();
            }
        } 
        return response.toString();
    }
    
    
    public String getPiEdgeAuthentication(String piEdgeIP, String piEdgePort){
        String urlToRequest = "http://" + piEdgeIP + ":" + piEdgePort + "/piedge-connector/2.0.0/authentication";
        String body = "{\"username\":\"admin_system_manager\",\"password\":\"admin_system_manager!@!\"}";
        String tokenResponse = sendPOSTHTTPRequest(urlToRequest, null, body);
        
        JSONObject tokenObject = new JSONObject(tokenResponse);
        String token = tokenObject.getString("token");
        System.out.println("Returning token: " + token);
        return token;
    }
}

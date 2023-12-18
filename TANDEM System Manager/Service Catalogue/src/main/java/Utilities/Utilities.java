package Utilities;


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
     

    public String getPiEdgeAuthentication(String piEdgeIP, String piEdgePort){
        String urlToRequest = "http://" + piEdgeIP + ":" + piEdgePort + "/piedge-connector/2.0.0/authentication";
        String body = "{\"username\":\"USERNAME\",\"password\":\"PASSWORD\"}";
        String tokenResponse = sendPOSTHTTPRequest(urlToRequest, null, body);
        
        JSONObject tokenObject = new JSONObject(tokenResponse);
        String token = tokenObject.getString("token");
        return token;
    }
}

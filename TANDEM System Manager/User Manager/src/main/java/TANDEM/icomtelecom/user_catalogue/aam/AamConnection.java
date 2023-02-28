package TANDEM.icomtelecom.user_catalogue.aam;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class AamConnection {
    public static String checkAndRefresh(String token, String action){
        String ans = "";
        try{
            ans = callurl(AamConfig.getBackEndUrl()+"/aam/check/auth",
                    "POST",
                    "JSON",
                    null,
                    new JSONObject().put("token",token)
                            .put("actionname",action).toString());
            JSONObject jtmp1 = new JSONObject(ans);
            if (jtmp1.getInt("status")!=200) return ans;
            ans = callurl(AamConfig.getBackEndUrl()+"/aam/token/refresh",
                    "GET",
                    "JSON",
                    new JSONArray().put(new JSONObject().put("keystr","AAM-Authorization").put("valustr",token)),
                    null);
        }catch(Exception e){
            return new JSONObject().put("status", 500).put("result", e.getMessage()).toString();
        }
        return ans;
    }
    private static String callurl(String urlStr,
                          String postputdelete,
                          String jsonnot,
                          JSONArray jsa,
                          String data) {
        String retStr = "";
        HttpURLConnection conn = null;
        //proxy = null;
        try {
            if (urlStr.startsWith("https")) return callurlHttps(urlStr,postputdelete,jsonnot,jsa,data);

            URL url = new URL(urlStr);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod(postputdelete);
            if (jsonnot.equals("JSON"))
                conn.setRequestProperty("Content-Type", "application/json; utf-8");
            if (jsa!=null)
            for (int kl = 0; kl < jsa.length(); kl++){
                JSONObject jo = jsa.getJSONObject(kl);
                conn.setRequestProperty(jo.getString("keystr"), jo.getString("valuestr"));
            }

            OutputStreamWriter wr = null;
            if (data!=null){
                wr = new OutputStreamWriter(conn.getOutputStream());
                wr.write(data);
                wr.flush();
            }

            BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line;
            while ((line = rd.readLine()) != null) {
                retStr += line;
            }
            wr.close();
            rd.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return retStr;
    }
    private static String callurlHttps(String urlStr,
                                 String postputdelete,
                                 String jsonnot,
                                 JSONArray jsa,
                                 String data) {
        String retStr = "";
        HttpsURLConnection conn = null;
        //proxy = null;
        try {

            trustAllHttpsCertificates();
            HttpsURLConnection.setDefaultHostnameVerifier(hv);

            URL url = new URL(urlStr);
            conn = (HttpsURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod(postputdelete);
            if (jsonnot.equals("JSON"))
                conn.setRequestProperty("Content-Type", "application/json; utf-8");
            if (jsa!=null)
                for (int kl = 0; kl < jsa.length(); kl++){
                    JSONObject jo = jsa.getJSONObject(kl);
                    conn.setRequestProperty(jo.getString("keystr"), jo.getString("valuestr"));
                }
            OutputStreamWriter wr = null;
            if (data!=null){
                wr = new OutputStreamWriter(conn.getOutputStream());
                wr.write(data);
                wr.flush();
            }

            BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line;
            while ((line = rd.readLine()) != null) {
                retStr += line;
            }
            wr.close();
            rd.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return retStr;
    }

    public static HostnameVerifier hv = new HostnameVerifier() {

        public boolean verify(String urlHostName, SSLSession session) {
            //System.out.println("Warning: URL Host: " + urlHostName + " vs. " + session.getPeerHost());
            return true;
        }
    };

    public static void trustAllHttpsCertificates() throws Exception {
        javax.net.ssl.TrustManager[] trustAllCerts =
                new javax.net.ssl.TrustManager[1];
        javax.net.ssl.TrustManager tm = new miTM();
        trustAllCerts[0] = tm;
        javax.net.ssl.SSLContext sc =
                javax.net.ssl.SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, null);
        javax.net.ssl.HttpsURLConnection.setDefaultSSLSocketFactory(
                sc.getSocketFactory());
    }

    public static class miTM implements javax.net.ssl.TrustManager,
            javax.net.ssl.X509TrustManager {

        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
            return null;
        }

        public boolean isServerTrusted(
                java.security.cert.X509Certificate[] certs) {
            return true;
        }

        public boolean isClientTrusted(
                java.security.cert.X509Certificate[] certs) {
            return true;
        }

        public void checkServerTrusted(
                java.security.cert.X509Certificate[] certs, String authType)
                throws java.security.cert.CertificateException {
            return;
        }

        public void checkClientTrusted(
                java.security.cert.X509Certificate[] certs, String authType)
                throws java.security.cert.CertificateException {
            return;
        }
    }
}

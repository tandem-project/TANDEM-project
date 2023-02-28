package TANDEM.icomtelecom.user_catalogue.aam;

public class AamConfig {
    private static String backEndUrl = "http://localhost:8080";
    private static long exPeriod = 1000*60*60*20;
    public static String getBackEndUrl(){return backEndUrl;}
    public static void setBackEndUrl(String bcUrl){
        backEndUrl = bcUrl;
    }
    public static long getExPeriod(){return exPeriod;}
    public static void setExPeriod(long iexPeriod){
        exPeriod = iexPeriod;
    }
}

package TANDEM.icomtelecom.application_catalogue.Model.Application;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class SupportService {
    @JsonProperty("serID")
    private String serID;
    @JsonProperty("serName")
    private String serName;

    public String getSerID() {
        return serID;
    }

    public void setSerID(String serID) {
        this.serID = serID;
    }

    public String getSerName() {
        return serName;
    }

    public void setSerName(String serName) {
        this.serName = serName;
    }


  
}

package TANDEM.icomtelecom.user_catalogue.Model.User;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class UserInstantiatedService {
    @JsonProperty("instserID")
    private String instserID;
    @JsonProperty("instserName")
    private String instserName;

    public String getInstserID() {
        return instserID;
    }

    public void setInstserID(String instserID) {
        this.instserID = instserID;
    }

    public String getInstserName() {
        return instserName;
    }

    public void setInstserName(String instserName) {
        this.instserName = instserName;
    }

    
   
}

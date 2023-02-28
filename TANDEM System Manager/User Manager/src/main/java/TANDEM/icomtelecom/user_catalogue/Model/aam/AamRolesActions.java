package TANDEM.icomtelecom.user_catalogue.Model.aam;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

public class AamRolesActions {
    @Id
    @JsonProperty("guiId")
    private String guiId=null;
    @JsonProperty("userRole")
    private String userRole=null;
    @JsonProperty("actions")
    private String actions=null;
    @JsonProperty("services")
    private String services=null;

    public String getGuiId() {return guiId;}
    public void setGuiId(String guiId) {this.guiId = guiId;}
    public String getUserRole() {return userRole;}
    public void setUserRole(String userRole) {this.userRole = userRole;}
    public String getActions() {return actions;}
    public void setActions(String actions) {this.actions = actions;}
    public String getServices() {return services;}
    public void setServices(String services) {this.services = services;}
}

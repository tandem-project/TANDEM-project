package TANDEM.icomtelecom.user_catalogue.Model.aam;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

public class AamServices {
    @Id
    @JsonProperty("guiId")
    private String guiId=null;
    @JsonProperty("serviceName")
    private String serviceName=null;
    @JsonProperty("serviceUrl")
    private String serviceUrl=null;

    public String getGuiId() {return guiId;}
    public void setGuiId(String guiId) {this.guiId = guiId;}
    public String getServiceName() {return serviceName;}
    public void setServiceName(String serviceName) {this.serviceName = serviceName;}
    public String getServiceUrl() {return serviceUrl;}
    public void setServiceUrl(String serviceUrl) {this.serviceUrl = serviceUrl;}
}

package TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.validation.annotation.Validated;


/**
 * This type represents the general information of a MEC service.
 */
//@Schema(description = "This type represents the general information of a MEC service.")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class NodeToRemove {

  @JsonProperty("nodeName")
  private String nodeName = null;

  @JsonProperty("nodeHostname")
  private String nodeHostname = null;
  
  @JsonProperty("nodePassword")
  private String nodePassword = null;
   
  @JsonProperty("nodeIP")
  private String nodeIP = null;
  
    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getNodeHostname() {
        return nodeHostname;
    }

    public void setNodeHostname(String nodeHostname) {
        this.nodeHostname = nodeHostname;
    }

    public String getNodePassword() {
        return nodePassword;
    }

    public void setNodePassword(String nodePassword) {
        this.nodePassword = nodePassword;
    }

    public String getNodeIP() {
        return nodeIP;
    }

    public void setNodeIP(String nodeIP) {
        this.nodeIP = nodeIP;
    }

}

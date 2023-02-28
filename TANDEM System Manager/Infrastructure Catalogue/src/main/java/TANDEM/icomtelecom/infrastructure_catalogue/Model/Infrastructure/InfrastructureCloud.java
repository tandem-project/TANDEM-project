package TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.Id;
import org.springframework.validation.annotation.Validated;


import java.util.List;
import java.util.Objects;

/**
 * This type represents the general information of a MEC service.
 */
//@Schema(description = "This type represents the general information of a MEC service.")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class InfrastructureCloud {
  @Id
  @JsonProperty("edgeCloudId")
  private String edgeCloudId = null;

  @JsonProperty("edgeCloudName")
  private String edgeCloudName = null;

  @JsonProperty("edgeCloudAvailabilityZone")
  private String edgeCloudAvailabilityZone = null;
          
 // @JsonProperty("edgeCloudNumberofNodes")
 // private Integer edgeCloudNumberofNodes = null;

 // @JsonProperty("edgeCloudNumberofIoTDevices")
 // private Integer edgeCloudNumberofIoTDevices = null;

  @JsonProperty("edgeCloudProvider")
  private String edgeCloudProvider = null;

  @JsonProperty("piEdgeIP")
  private String piEdgeIP = null;
    
  @JsonProperty("piEdgePort")
  private String piEdgePort = null;
      
//  @JsonProperty("monitorNodesURL")
 // private String monitorNodesURL = null;

 // @JsonProperty("nodes")
 // private List<InfrastructureNode> nodes = null;
  
  
  
    public String getEdgeCloudId() {
        return edgeCloudId;
    }

    public void setEdgeCloudId(String edgeCloudId) {
        this.edgeCloudId = edgeCloudId;
    }

    public String getEdgeCloudName() {
        return edgeCloudName;
    }

    public void setEdgeCloudName(String edgeCloudName) {
        this.edgeCloudName = edgeCloudName;
    }
    
    public String getEdgeCloudAvailabilityZone() {
        return edgeCloudAvailabilityZone;
    }

    public void setEdgeCloudAvailabilityZone(String edgeCloudAvailabilityZone) {
        this.edgeCloudAvailabilityZone = edgeCloudAvailabilityZone;
    }

   /* public Integer getEdgeCloudNumberofNodes() {
        return edgeCloudNumberofNodes;
    }

    public void setEdgeCloudNumberofNodes(Integer edgeCloudNumberofNodes) {
        this.edgeCloudNumberofNodes = edgeCloudNumberofNodes;
    }*/

  /*  public Integer getEdgeCloudNumberofIoTDevices() {
        return edgeCloudNumberofIoTDevices;
    }

    public void setEdgeCloudNumberofIoTDevices(Integer edgeCloudNumberofIoTDevices) {
        this.edgeCloudNumberofIoTDevices = edgeCloudNumberofIoTDevices;
    }*/

    public String getEdgeCloudProvider() {
        return edgeCloudProvider;
    }

    public void setEdgeCloudProvider(String edgeCloudProvider) {
        this.edgeCloudProvider = edgeCloudProvider;
    }

    public String getPiEdgeIP() {
        return piEdgeIP;
    }

    public void setPiEdgeIP(String piEdgeIP) {
        this.piEdgeIP = piEdgeIP;
    }

    public String getPiEdgePort() {
        return piEdgePort;
    }

    public void setPiEdgePort(String piEdgePort) {
        this.piEdgePort = piEdgePort;
    }

    
  /*  public String getMonitorNodesURL() {
        return monitorNodesURL;
    }

    public void setMonitorNodesURL(String monitorNodesURL) {
        this.monitorNodesURL = monitorNodesURL;
    }*/

 /*   public List<InfrastructureNode> getNodes() {
        return nodes;
    }

    public void setNodes(List<InfrastructureNode> nodes) {
        this.nodes = nodes;
    }
*/


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InfrastructureCloud infrastructure = (InfrastructureCloud) o;
    return Objects.equals(this.edgeCloudId, infrastructure.edgeCloudId) &&
        Objects.equals(this.edgeCloudName, infrastructure.edgeCloudName) &&
        Objects.equals(this.edgeCloudAvailabilityZone, infrastructure.edgeCloudAvailabilityZone) &&
        Objects.equals(this.piEdgeIP, infrastructure.piEdgeIP) &&
        Objects.equals(this.piEdgePort, infrastructure.piEdgePort) &&

   //     Objects.equals(this.edgeCloudNumberofNodes, infrastructure.edgeCloudNumberofNodes) &&
   //     Objects.equals(this.edgeCloudNumberofIoTDevices, infrastructure.edgeCloudNumberofIoTDevices) &&
        Objects.equals(this.edgeCloudProvider, infrastructure.edgeCloudProvider) ;
     //   Objects.equals(this.monitorNodesURL, infrastructure.monitorNodesURL);
//        Objects.equals(this.transportInfo, service.transportInfo) &&
//        Objects.equals(this.serializer, service.serializer) &&
//        Objects.equals(this.scopeOfLocality, service.scopeOfLocality) &&
//        Objects.equals(this.consumedLocalOnly, service.consumedLocalOnly) &&
//        Objects.equals(this.isLocal, service.isLocal);
  }

//  @Override
//  public int hashCode() {
//    return Objects.hash(serInstanceId, serName, serCategory, version, state, transportInfo, serializer, scopeOfLocality, consumedLocalOnly, isLocal);
//  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InfrastructureInfo {\n");
    
    sb.append("    edgeCloudId: ").append(toIndentedString(edgeCloudId)).append("\n");
    sb.append("    edgeCloudName: ").append(toIndentedString(edgeCloudName)).append("\n");
    sb.append("    edgeCloudAvailabilityZone: ").append(toIndentedString(edgeCloudAvailabilityZone)).append("\n");
    sb.append("    piEdgeIP: ").append(toIndentedString(piEdgeIP)).append("\n");
    sb.append("    piEdgePort: ").append(toIndentedString(piEdgePort)).append("\n");

  //  sb.append("    edgeCloudNumberofNodes: ").append(toIndentedString(edgeCloudNumberofNodes)).append("\n");
 //   sb.append("    edgeCloudNumberofIoTDevices: ").append(toIndentedString(edgeCloudNumberofIoTDevices)).append("\n");
    sb.append("    edgeCloudProvider: ").append(toIndentedString(edgeCloudProvider)).append("\n");
//    sb.append("    monitorNodesURL: ").append(toIndentedString(monitorNodesURL)).append("\n");
//    sb.append("    transportInfo: ").append(toIndentedString(transportInfo)).append("\n");
//    sb.append("    serializer: ").append(toIndentedString(serializer)).append("\n");
//    sb.append("    scopeOfLocality: ").append(toIndentedString(scopeOfLocality)).append("\n");
//    sb.append("    consumedLocalOnly: ").append(toIndentedString(consumedLocalOnly)).append("\n");
//    sb.append("    isLocal: ").append(toIndentedString(isLocal)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
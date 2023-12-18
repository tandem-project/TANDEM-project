package TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.Id;
import org.springframework.validation.annotation.Validated;
import java.util.List;

/**
 * This type represents the general information of a MEC service.
 */
//@Schema(description = "This type represents the general information of a MEC service.")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class NodeToAdd {
  @Id
  @JsonProperty("nodeId")
  private String nodeId = null;

  @JsonProperty("nodeName")
  private String nodeName = null;

  @JsonProperty("nodeType")
  private String nodeType = null;
          
  @JsonProperty("nodeDescription")
  private String nodeDescription = null;

  @JsonProperty("nodeLocation")
  private String nodeLocation = null;
    
  @JsonProperty("nodeAddresses")
  private NodeAddresses nodeAddresses = null;

  @JsonProperty("nodeConditions")
  private NodeConditions nodeConditions = null;

  @JsonProperty("nodeCapacity")
  private NodeCapacity nodeCapacity = null;

  @JsonProperty("nodeAllocatableResources")
  private NodeAllocatableResources nodeAllocatableResources = null;
  
  @JsonProperty("nodeGeneralInfo")
  private NodeGeneralInfo nodeGeneralInfo = null;
  
  @JsonProperty("nodeUsage")
  private NodeUsage nodeUsage = null;
    
  @JsonProperty("nodeUsageMonitoringURL")
  private String nodeUsageMonitoringURL = null;
  
  @JsonProperty("nodeServicesMonitoringURL")
  private String nodeServicesMonitoringURL = null;
  
  @JsonProperty("nodePassword")
  private String nodePassword = null;  
  
  @JsonProperty("nodeServices")
  private List<String> nodeServices = null;
  

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getNodeType() {
        return nodeType;
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }

    public String getNodeDescription() {
        return nodeDescription;
    }

    public void setNodeDescription(String nodeDescription) {
        this.nodeDescription = nodeDescription;
    }

    public String getNodeLocation() {
        return nodeLocation;
    }

    public void setNodeLocation(String nodeLocation) {
        this.nodeLocation = nodeLocation;
    }
    

    public NodeAddresses getNodeAddresses() {
        return nodeAddresses;
    }

    public void setNodeAddresses(NodeAddresses nodeAddresses) {
        this.nodeAddresses = nodeAddresses;
    }

    public NodeConditions getNodeConditions() {
        return nodeConditions;
    }

    public void setNodeConditions(NodeConditions nodeConditions) {
        this.nodeConditions = nodeConditions;
    }

    public NodeCapacity getNodeCapacity() {
        return nodeCapacity;
    }

    public void setNodeCapacity(NodeCapacity nodeCapacity) {
        this.nodeCapacity = nodeCapacity;
    }

    public NodeAllocatableResources getNodeAllocatableResources() {
        return nodeAllocatableResources;
    }

    public void setNodeAllocatableResources(NodeAllocatableResources nodeAllocatableResources) {
        this.nodeAllocatableResources = nodeAllocatableResources;
    }

    public NodeGeneralInfo getNodeGeneralInfo() {
        return nodeGeneralInfo;
    }

    public void setNodeGeneralInfo(NodeGeneralInfo nodeGeneralInfo) {
        this.nodeGeneralInfo = nodeGeneralInfo;
    }

    public String getNodeUsageMonitoringURL() {
        return nodeUsageMonitoringURL;
    }

    public void setNodeUsageMonitoringURL(String nodeUsageMonitoringURL) {
        this.nodeUsageMonitoringURL = nodeUsageMonitoringURL;
    }

    public NodeUsage getNodeUsage() {
        return nodeUsage;
    }

    public void setNodeUsage(NodeUsage nodeUsage) {
        this.nodeUsage = nodeUsage;
    }

    public String getNodeServicesMonitoringURL() {
        return nodeServicesMonitoringURL;
    }

    public void setNodeServicesMonitoringURL(String nodeServicesMonitoringURL) {
        this.nodeServicesMonitoringURL = nodeServicesMonitoringURL;
    }

    public String getNodePassword() {
        return nodePassword;
    }

    public void setNodePassword(String nodePassword) {
        this.nodePassword = nodePassword;
    }

    public List<String> getNodeServices() {
        return nodeServices;
    }

    public void setNodeServices(List<String> nodeServices) {
        this.nodeServices = nodeServices;
    }
    
    
}

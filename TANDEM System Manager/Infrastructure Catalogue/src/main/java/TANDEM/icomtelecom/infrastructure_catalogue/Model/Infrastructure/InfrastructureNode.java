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


public class InfrastructureNode {
  @Id
  @JsonProperty("nodeId")
  private String nodeId = null;

  @JsonProperty("nodeName")
  private String nodeName = null;

//  @JsonProperty("nodeType")
//  private String nodeType = null;
          
 // @JsonProperty("nodeProvider")
 // private String nodeProvider = null;

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
  
 // @JsonProperty("eviction-hard")
 // private String eviction_hard = null;
  
  @JsonProperty("nodeGeneralInfo")
  private NodeGeneralInfo nodeGeneralInfo = null;
  
  @JsonProperty("nodeUsage")
  private NodeUsage nodeUsage = null;
    
  @JsonProperty("nodeUsageMonitoringURL")
  private String nodeUsageMonitoringURL = null;
  
  @JsonProperty("nodeServicesMonitoringURL")
  private String nodeServicesMonitoringURL = null;

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

 /*   public String getNodeType() {
        return nodeType;
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }*/

 /*   public String getNodeProvider() {
        return nodeProvider;
    }

    public void setNodeProvider(String nodeProvider) {
        this.nodeProvider = nodeProvider;
    }*/

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

  /*  public String getEviction_hard() {
        return eviction_hard;
    }

    public void setEviction_hard(String eviction_hard) {
        this.eviction_hard = eviction_hard;
    }*/

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
    
}

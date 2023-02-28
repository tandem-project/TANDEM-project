/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * @author maxez
 */
public class NodeConditions {
      
    @JsonProperty("nodeReady")
    private Boolean nodeReady = null;
    @JsonProperty("nodeDiskPressure")
    private Boolean nodeDiskPressure = null;
    @JsonProperty("nodeMemoryPressure")
    private Boolean nodeMemoryPressure = null;
    @JsonProperty("nodePIDPressure")
    private Boolean nodePIDPressure = null;
    @JsonProperty("nodeNetworkUnavailable")
    private Boolean nodeNetworkUnavailable = null;

    public Boolean getNodeReady() {
        return nodeReady;
    }

    public void setNodeReady(Boolean nodeReady) {
        this.nodeReady = nodeReady;
    }

    public Boolean getNodeDiskPressure() {
        return nodeDiskPressure;
    }

    public void setNodeDiskPressure(Boolean nodeDiskPressure) {
        this.nodeDiskPressure = nodeDiskPressure;
    }

    public Boolean getNodeMemoryPressure() {
        return nodeMemoryPressure;
    }

    public void setNodeMemoryPressure(Boolean nodeMemoryPressure) {
        this.nodeMemoryPressure = nodeMemoryPressure;
    }

    public Boolean getNodePIDPressure() {
        return nodePIDPressure;
    }

    public void setNodePIDPressure(Boolean nodePIDPressure) {
        this.nodePIDPressure = nodePIDPressure;
    }

    public Boolean getNodeNetworkUnavailable() {
        return nodeNetworkUnavailable;
    }

    public void setNodeNetworkUnavailable(Boolean nodeNetworkUnavailable) {
        this.nodeNetworkUnavailable = nodeNetworkUnavailable;
    }

    
}

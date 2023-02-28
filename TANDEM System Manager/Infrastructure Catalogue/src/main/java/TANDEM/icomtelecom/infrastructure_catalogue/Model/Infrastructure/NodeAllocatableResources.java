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
public class NodeAllocatableResources {
    
    @JsonProperty("nodeCPUCap")
    private Float nodeCPUCap = null;
    @JsonProperty("nodeMemoryCap")
    private Float nodeMemoryCap = null;
    @JsonProperty("nodeMemoryCapMU")
    private String nodeMemoryCapMU = null;
    @JsonProperty("nodeStorageCap")
    private Float nodeStorageCap = null;
    @JsonProperty("nodeStorageCapMU")
    private String nodeStorageCapMU = null;

    public Float getNodeCPUCap() {
        return nodeCPUCap;
    }

    public void setNodeCPUCap(Float nodeCPUCap) {
        this.nodeCPUCap = nodeCPUCap;
    }

    public Float getNodeMemoryCap() {
        return nodeMemoryCap;
    }

    public void setNodeMemoryCap(Float nodeMemoryCap) {
        this.nodeMemoryCap = nodeMemoryCap;
    }

    public String getNodeMemoryCapMU() {
        return nodeMemoryCapMU;
    }

    public void setNodeMemoryCapMU(String nodeMemoryCapMU) {
        this.nodeMemoryCapMU = nodeMemoryCapMU;
    }

    public Float getNodeStorageCap() {
        return nodeStorageCap;
    }

    public void setNodeStorageCap(Float nodeStorageCap) {
        this.nodeStorageCap = nodeStorageCap;
    }

    public String getNodeStorageCapMU() {
        return nodeStorageCapMU;
    }

    public void setNodeStorageCapMU(String nodeStorageCapMU) {
        this.nodeStorageCapMU = nodeStorageCapMU;
    }

}

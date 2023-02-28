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
public class NodeUsage {
           
    @JsonProperty("nodeCPUInUse")
    private String nodeCPUInUse = null;
    @JsonProperty("nodeCPUInUseMU")
    private String nodeCPUInUseMU = null;
    @JsonProperty("nodeCPUUsage")
    private String nodeCPUUsage = null;
    @JsonProperty("nodeMemoryInUse")
    private String nodeMemoryInUse = null;
    @JsonProperty("nodeMemoryInUseMU")
    private String nodeMemoryInUseMU = null;  
    @JsonProperty("nodeMemoryUsage")
    private String nodeMemoryUsage = null;  

    public NodeUsage() {
    }

    public String getNodeCPUInUse() {
        return nodeCPUInUse;
    }

    public void setNodeCPUInUse(String nodeCPUInUse) {
        this.nodeCPUInUse = nodeCPUInUse;
    }

    public String getNodeCPUInUseMU() {
        return nodeCPUInUseMU;
    }

    public void setNodeCPUInUseMU(String nodeCPUInUseMU) {
        this.nodeCPUInUseMU = nodeCPUInUseMU;
    }

    public String getNodeCPUUsage() {
        return nodeCPUUsage;
    }

    public void setNodeCPUUsage(String nodeCPUUsage) {
        this.nodeCPUUsage = nodeCPUUsage;
    }

    public String getNodeMemoryInUse() {
        return nodeMemoryInUse;
    }

    public void setNodeMemoryInUse(String nodeMemoryInUse) {
        this.nodeMemoryInUse = nodeMemoryInUse;
    }

    public String getNodeMemoryInUseMU() {
        return nodeMemoryInUseMU;
    }

    public void setNodeMemoryInUseMU(String nodeMemoryInUseMU) {
        this.nodeMemoryInUseMU = nodeMemoryInUseMU;
    }

    public String getNodeMemoryUsage() {
        return nodeMemoryUsage;
    }

    public void setNodeMemoryUsage(String nodeMemoryUsage) {
        this.nodeMemoryUsage = nodeMemoryUsage;
    }
    
}

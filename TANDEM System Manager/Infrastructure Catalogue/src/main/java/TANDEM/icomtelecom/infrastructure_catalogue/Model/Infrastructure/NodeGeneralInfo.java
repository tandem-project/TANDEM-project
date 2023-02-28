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
public class NodeGeneralInfo {
    
    @JsonProperty("nodeOS")
    private String nodeOS = null;
    @JsonProperty("nodeKubernetesVersion")
    private String nodeKubernetesVersion = null;
    @JsonProperty("nodeKernelVersion")
    private String nodeKernelVersion = null;
    @JsonProperty("nodeArchitecture")
    private String nodeArchitecture = null;
    @JsonProperty("nodecontainerRuntimeVersion")
    private String nodecontainerRuntimeVersion = null;  
    
    public String getNodeOS() {
        return nodeOS;
    }

    public void setNodeOS(String nodeOS) {
        this.nodeOS = nodeOS;
    }

    public String getNodeKubernetesVersion() {
        return nodeKubernetesVersion;
    }

    public void setNodeKubernetesVersion(String nodeKubernetesVersion) {
        this.nodeKubernetesVersion = nodeKubernetesVersion;
    }

    public String getNodeKernelVersion() {
        return nodeKernelVersion;
    }

    public void setNodeKernelVersion(String nodeKernelVersion) {
        this.nodeKernelVersion = nodeKernelVersion;
    }

    public String getNodeArchitecture() {
        return nodeArchitecture;
    }

    public void setNodeArchitecture(String nodeArchitecture) {
        this.nodeArchitecture = nodeArchitecture;
    }

    public String getNodecontainerRuntimeVersion() {
        return nodecontainerRuntimeVersion;
    }

    public void setNodecontainerRuntimeVersion(String nodecontainerRuntimeVersion) {
        this.nodecontainerRuntimeVersion = nodecontainerRuntimeVersion;
    }
    
}

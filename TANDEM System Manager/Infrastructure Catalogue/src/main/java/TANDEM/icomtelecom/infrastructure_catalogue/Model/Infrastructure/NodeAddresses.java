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
public class NodeAddresses {
 
    @JsonProperty("nodeHostName")
    private String nodeHostName = null;
    @JsonProperty("nodeExternalIP")
    private String nodeExternalIP = null;
    @JsonProperty("nodeInternalIP")
    private String nodeInternalIP = null;

    public String getNodeHostName() {
        return nodeHostName;
    }

    public void setNodeHostName(String nodeHostName) {
        this.nodeHostName = nodeHostName;
    }

    public String getNodeExternalIP() {
        return nodeExternalIP;
    }

    public void setNodeExternalIP(String nodeExternalIP) {
        this.nodeExternalIP = nodeExternalIP;
    }

    public String getNodeInternalIP() {
        return nodeInternalIP;
    }

    public void setNodeInternalIP(String nodeInternalIP) {
        this.nodeInternalIP = nodeInternalIP;
    }
                     
            
}

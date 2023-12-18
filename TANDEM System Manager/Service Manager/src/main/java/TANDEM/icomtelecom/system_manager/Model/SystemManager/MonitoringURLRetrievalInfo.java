/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TANDEM.icomtelecom.system_manager.Model.SystemManager;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * @author maxez
 */
public class MonitoringURLRetrievalInfo {
        
    @JsonProperty("piEdgeIP")
    private String piEdgeIP = null;
    
    @JsonProperty("piEdgePort")
    private String piEdgePort = null;
    

    @JsonProperty("instance_id")
    private String instance_id = null;
    

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

    public String getInstance_id() {
        return instance_id;
    }

    public void setInstance_id(String instance_id) {
        this.instance_id = instance_id;
    }
    
}

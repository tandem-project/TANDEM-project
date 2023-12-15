/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TANDEM.icomtelecom.system_manager.Model.SystemManager;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

/**
 *
 * @author maxez
 */
public class ServiceInstantiationRequestInfo {
        
    @JsonProperty("piEdgeIP")
    private String piEdgeIP = null;
    
    @JsonProperty("piEdgePort")
    private String piEdgePort = null;
    
    @JsonProperty("paas_service_name")
    private String paas_service_name = null;

    @JsonProperty("paas_instance_name")
    private String paas_instance_name = null;
    
    @JsonProperty("autoscaling_type")
    private String autoscaling_type = null;
    
    @JsonProperty("count_min")
    private String count_min = null;    
    
    @JsonProperty("count_max")
    private String count_max = null;   

    @JsonProperty("location")
    private String location = null; 

    @JsonProperty("all_node_ports")
    private String all_node_ports = null;
    
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

    public String getPaas_service_name() {
        return paas_service_name;
    }

    public void setPaas_service_name(String paas_service_name) {
        this.paas_service_name = paas_service_name;
    }

    public String getPaas_instance_name() {
        return paas_instance_name;
    }

    public void setPaas_instance_name(String paas_instance_name) {
        this.paas_instance_name = paas_instance_name;
    }

    public String getAutoscaling_type() {
        return autoscaling_type;
    }

    public void setAutoscaling_type(String autoscaling_type) {
        this.autoscaling_type = autoscaling_type;
    }

    public String getCount_min() {
        return count_min;
    }

    public void setCount_min(String count_min) {
        this.count_min = count_min;
    }

    public String getCount_max() {
        return count_max;
    }

    public void setCount_max(String count_max) {
        this.count_max = count_max;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAll_node_ports() {
        return all_node_ports;
    }

    public void setAll_node_ports(String all_node_ports) {
        this.all_node_ports = all_node_ports;
    }

    
    
}

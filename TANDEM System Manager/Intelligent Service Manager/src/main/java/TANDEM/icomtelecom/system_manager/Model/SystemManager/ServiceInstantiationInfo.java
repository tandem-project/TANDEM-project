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
public class ServiceInstantiationInfo {
  @JsonProperty("serviceId")
  private String serviceId = null;    
  
  @JsonProperty("edgeCloudId")
  private String edgeCloudId = null;    

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getEdgeCloudId() {
        return edgeCloudId;
    }

    public void setPiEdgeCloudId(String edgeCloudId) {
        this.edgeCloudId = edgeCloudId;
    }
    
    
}

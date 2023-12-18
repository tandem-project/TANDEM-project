/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * @author maxez
 */
public class RequiredVolume {
    
  @JsonProperty("name")
  private String name = null;
  
  @JsonProperty("path")
  private String path = null;
    
  @JsonProperty("hostpath")
  private String hostpath = null;

  @JsonProperty("storage")
  private String storage = null;
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getHostpath() {
        return hostpath;
    }

    public void setHostpath(String hostpath) {
        this.hostpath = hostpath;
    }

    public String getStorage() {
        return storage;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }
  
  
}

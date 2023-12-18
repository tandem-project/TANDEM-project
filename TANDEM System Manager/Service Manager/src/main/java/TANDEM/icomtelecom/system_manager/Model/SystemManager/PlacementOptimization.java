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
public class PlacementOptimization {
  @JsonProperty("selected_cluster")
  private String selected_cluster = null;    
  
  @JsonProperty("placementOptimizationNodesInfo")
  private PlacementOptimizationNodesInfo placementOptimizationNodesInfo = null;    

    public String getSelected_cluster() {
        return selected_cluster;
    }

    public void setSelected_cluster(String selected_cluster) {
        this.selected_cluster = selected_cluster;
    }

    public PlacementOptimizationNodesInfo getPlacementOptimizationNodesInfo() {
        return placementOptimizationNodesInfo;
    }

    public void setPlacementOptimizationNodesInfo(PlacementOptimizationNodesInfo placementOptimizationNodesInfo) {
        this.placementOptimizationNodesInfo = placementOptimizationNodesInfo;
    }


    
}

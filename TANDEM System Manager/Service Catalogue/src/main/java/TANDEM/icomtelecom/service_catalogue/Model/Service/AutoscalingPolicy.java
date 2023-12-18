/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class AutoscalingPolicy {

  @JsonProperty("policy")
  private String policy = null;

  @JsonProperty("monitoring_metrics")
  private List<MonitoringMetric> monitoring_metrics = null;

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public List<MonitoringMetric> getMonitoring_metrics() {
        return monitoring_metrics;
    }

    public void setMonitoring_metrics(List<MonitoringMetric> monitoring_metrics) {
        this.monitoring_metrics = monitoring_metrics;
    }

  


}



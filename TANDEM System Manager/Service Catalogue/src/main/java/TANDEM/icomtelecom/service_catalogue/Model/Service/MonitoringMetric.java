/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MonitoringMetric {

  @JsonProperty("metric")
  private String metric = null;

  @JsonProperty("limit")
  private String limit = null;
  
  @JsonProperty("request")
  private String request = null;
    
  @JsonProperty("util_percent")
  private Float util_percent = null;
      
  @JsonProperty("is_default")
  private Boolean is_default = null;

    public String getMetric() {
        return metric;
    }

    public void setMetric(String metric) {
        this.metric = metric;
    }

    public String getLimit() {
        return limit;
    }

    public void setLimit(String limit) {
        this.limit = limit;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public Float getUtil_percent() {
        return util_percent;
    }

    public void setUtil_percent(Float util_percent) {
        this.util_percent = util_percent;
    }

    public Boolean getIs_default() {
        return is_default;
    }

    public void setIs_default(Boolean is_default) {
        this.is_default = is_default;
    }

  

}



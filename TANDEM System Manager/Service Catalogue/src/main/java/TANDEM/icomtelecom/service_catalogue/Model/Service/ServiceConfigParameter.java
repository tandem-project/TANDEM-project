package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceConfigParameter {
    @JsonProperty("serParamName")
    private String serParamName;
    @JsonProperty("serParamType")
    private String serParamType;
    @JsonProperty("serParamValue")
    private String serParamValue;
    @JsonProperty("serParamDescr")
    private String serParamDescr;
    @JsonProperty("serParamTypicalValue")
    private String serParamTypicalValue;

    public String getSerParamName() {
        return serParamName;
    }

    public void setSerParamName(String serParamName) {
        this.serParamName = serParamName;
    }

    public String getSerParamType() {
        return serParamType;
    }

    public void setSerParamType(String serParamType) {
        this.serParamType = serParamType;
    }

    public String getSerParamValue() {
        return serParamValue;
    }

    public void setSerParamValue(String serParamValue) {
        this.serParamValue = serParamValue;
    }

    public String getSerParamDescr() {
        return serParamDescr;
    }

    public void setSerParamDescr(String serParamDescr) {
        this.serParamDescr = serParamDescr;
    }

    public String getSerParamTypicalValue() {
        return serParamTypicalValue;
    }

    public void setSerParamTypicalValue(String serParamTypicalValue) {
        this.serParamTypicalValue = serParamTypicalValue;
    }
}

package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ServiceOperation {
    @JsonProperty("serOperationName")
    private String serOperationName;
    @JsonProperty("serOperationEndPoint")
    private String serOperationEndPoint;
    @JsonProperty("serOperationDescription")
    private String serOperationDescription;
    @JsonProperty("serOperationType")
    private String serOperationType;
    @JsonProperty("serOperationInputParams")
    private List<ServiceOperationParameter> serOperationInputParams;
    @JsonProperty("serOperationOutputParams")
    private List<ServiceOperationParameter> serOperationOutputParams;

    public String getSerOperationName() {
        return serOperationName;
    }

    public void setSerOperationName(String serOperationName) {
        this.serOperationName = serOperationName;
    }

    public String getSerOperationEndPoint() {
        return serOperationEndPoint;
    }

    public void setSerOperationEndPoint(String serOperationEndPoint) {
        this.serOperationEndPoint = serOperationEndPoint;
    }

    public String getSerOperationDescription() {
        return serOperationDescription;
    }

    public void setSerOperationDescription(String serOperationDescription) {
        this.serOperationDescription = serOperationDescription;
    }

    public String getSerOperationType() {
        return serOperationType;
    }

    public void setSerOperationType(String serOperationType) {
        this.serOperationType = serOperationType;
    }

    public List<ServiceOperationParameter> getSerOperationInputParams() {
        return serOperationInputParams;
    }

    public void setSerOperationInputParams(List<ServiceOperationParameter> serOperationInputParams) {
        this.serOperationInputParams = serOperationInputParams;
    }

    public List<ServiceOperationParameter> getSerOperationOutputParams() {
        return serOperationOutputParams;
    }

    public void setSerOperationOutputParams(List<ServiceOperationParameter> serOperationOutputParams) {
        this.serOperationOutputParams = serOperationOutputParams;
    }

}

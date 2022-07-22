package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceThroughputRequirement {
    @JsonProperty("serThroughputMU")
    private String serThroughputMU;
    @JsonProperty("serThroughputValue")
    private String serThroughputValue;
}

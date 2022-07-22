package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceLatencyRequirement {
    @JsonProperty("serLatencyTimeUnit")
    private String serLatencyTimeUnit;
    @JsonProperty("serLatencyValue")
    private String serLatencyValue;
}

package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ServiceRequirement {
    @JsonProperty("serServiceId")
    private List<String> serServiceId;
}

package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceStorgeRequirement {
    @JsonProperty("serTypeOfStorage")
    private String serTypeOfStorage;
    @JsonProperty("serSizeOfStorage")
    private String serSizeOfStorage;
    @JsonProperty("serSizeOfStorageMU")
    private String serSizeOfStorageMU;
}

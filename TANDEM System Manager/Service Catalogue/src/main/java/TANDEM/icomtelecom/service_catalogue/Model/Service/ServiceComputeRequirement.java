package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ServiceComputeRequirement {
    @JsonProperty("serMemorySize")
    private String serMemorySize;
    @JsonProperty("serMemorySizeMU")
    private String serMemorySizeMU;
    @JsonProperty("serCPUArchitecture")
    private String serCPUArchitecture;
    @JsonProperty("serNumVirtualCPUs")
    private String serNumVirtualCPUs;
    @JsonProperty("serVirtualCPUClock")
    private String serVirtualCPUClock;
    @JsonProperty("serNumVirtualCPUsMU")
    private String serNumVirtualCPUsMU;
    @JsonProperty("serNumVirtualGPUs")
    private String serNumVirtualGPUs;
}

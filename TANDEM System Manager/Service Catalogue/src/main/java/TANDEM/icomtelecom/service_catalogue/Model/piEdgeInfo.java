package TANDEM.icomtelecom.service_catalogue.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class piEdgeInfo {
    @JsonProperty("paas_service_name")
    private String paas_service_name = null;

    @JsonProperty("paas_input_name")
    private String paas_input_name = null;

    @JsonProperty("scaling_metric")
    private String scaling_metric = null;

    @JsonProperty("count_min")
    private Integer count_min = 0;

    @JsonProperty("count_max")
    private Integer count_max = 0;

    @JsonProperty("location")
    private String location = null;

    @JsonProperty("ports")
    private List<String> ports = null;
}

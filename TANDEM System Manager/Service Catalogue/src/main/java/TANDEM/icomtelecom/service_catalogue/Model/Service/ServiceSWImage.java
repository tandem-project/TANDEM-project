package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceSWImage {
    @JsonProperty("serSWImageId")
    private String serSWImageId;
    @JsonProperty("serSWImageName")
    private String serSWImageName;
    @JsonProperty("serSWImageContainerFormat")
    private String serSWImageContainerFormat;
    @JsonProperty("serSWImageSizeinMBs")
    private String serSWImageSizeinMBs;
    @JsonProperty("serSWImageOS")
    private String serSWImageOS;
    @JsonProperty("serSWImageURL")
    private String serSWImageURL;
}

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

    public String getSerSWImageId() {
        return serSWImageId;
    }

    public void setSerSWImageId(String serSWImageId) {
        this.serSWImageId = serSWImageId;
    }

    public String getSerSWImageName() {
        return serSWImageName;
    }

    public void setSerSWImageName(String serSWImageName) {
        this.serSWImageName = serSWImageName;
    }

    public String getSerSWImageContainerFormat() {
        return serSWImageContainerFormat;
    }

    public void setSerSWImageContainerFormat(String serSWImageContainerFormat) {
        this.serSWImageContainerFormat = serSWImageContainerFormat;
    }

    public String getSerSWImageSizeinMBs() {
        return serSWImageSizeinMBs;
    }

    public void setSerSWImageSizeinMBs(String serSWImageSizeinMBs) {
        this.serSWImageSizeinMBs = serSWImageSizeinMBs;
    }

    public String getSerSWImageOS() {
        return serSWImageOS;
    }

    public void setSerSWImageOS(String serSWImageOS) {
        this.serSWImageOS = serSWImageOS;
    }

    public String getSerSWImageURL() {
        return serSWImageURL;
    }

    public void setSerSWImageURL(String serSWImageURL) {
        this.serSWImageURL = serSWImageURL;
    }
    
    
}

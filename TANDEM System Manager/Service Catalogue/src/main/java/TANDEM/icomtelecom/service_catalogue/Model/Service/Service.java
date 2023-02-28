package TANDEM.icomtelecom.service_catalogue.Model.Service;

import TANDEM.icomtelecom.service_catalogue.Model.CategoryRef;
import TANDEM.icomtelecom.service_catalogue.Model.piEdgeInfo;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.Id;
import org.springframework.validation.annotation.Validated;


import java.util.List;
import java.util.Objects;

/**
 * This type represents the general information of a MEC service.
 */
//@Schema(description = "This type represents the general information of a MEC service.")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class Service {
    
  @Id
  @JsonProperty("serId")
  private String serId = null;

  @JsonProperty("serName")
  private String serName = null;

  @JsonProperty("serType")
  private ServiceType serType = null;

  @JsonProperty("serProvider")
  private String serProvider = null;

  @JsonProperty("serDescription")
  private String serDescription = null;

  @JsonProperty("serCategory")
  private CategoryRef serCategory = null;

  @JsonProperty("serVersion")
  private String serVersion = null;

  @JsonProperty("state")
  private ServiceState state = null;
  
  @JsonProperty("serAPIDescriptionURL")
  private List<String> serAPIDescriptionURL = null;

  @JsonProperty("serConfigParams")
  private List<ServiceConfigParameter> serConfigParams = null;

  @JsonProperty("serOperations")
  private List<ServiceOperation> serOperations = null;

  @JsonProperty("serComputeReq")
  private ServiceComputeRequirement serComputeReq = null;

  @JsonProperty("serStorageReq")
  private ServiceStorgeRequirement serStorageReq = null;

  @JsonProperty("serLatencyReq")
  private ServiceLatencyRequirement serLatencyReq = null;

  @JsonProperty("serThroughputReq")
  private ServiceThroughputRequirement serThroughputReq = null;

  @JsonProperty("serServiceReq")
  private List<ServiceRequirement> serServiceReq = null;

  @JsonProperty("serServiceOptional")
  private List<ServiceOptional> serServiceOptional = null;

  @JsonProperty("serSwImage")
  private ServiceSWImage serSwImage = null;

  @JsonProperty("serializer")
  private String serializer = null;

  @JsonProperty("transportType")
  private String transportType = null;

  @JsonProperty("transportProtocol")
  private String transportProtocol = null;
////
  @JsonProperty("scopeOfLocality")
  private String scopeOfLocality = null;
//
  @JsonProperty("consumedLocalOnly")
  private Boolean consumedLocalOnly = null;
//
  @JsonProperty("isLocal")
  private Boolean isLocal = null;

 // @JsonProperty("piEdgeInfo")
//  private TANDEM.icomtelecom.service_catalogue.Model.piEdgeInfo piEdgeInfo = null;

    public Service(String serId, String serName, ServiceType serType, String serProvider,
            String serDescription, CategoryRef serCategory, String serVersion, ServiceState state,
            List<String> serAPIDescriptionURL, List<ServiceConfigParameter> serConfigParams,
            List<ServiceOperation> serOperations, ServiceComputeRequirement serComputeReq,
            ServiceStorgeRequirement serStorageReq, ServiceLatencyRequirement serLatencyReq,
            ServiceThroughputRequirement serThroughputReq, List<ServiceRequirement> serServiceReq,
            List<ServiceOptional> serServiceOptional, ServiceSWImage serSwImage, String serializer,
            String transportType, String transportProtocol, String scopeOfLocality, Boolean consumedLocalOnly,
            Boolean isLocal) {
        this.serId = serId;
        this.serName = serName;
        this.serType = serType;
        this.serProvider = serProvider;
        this.serDescription = serDescription;
        this.serCategory = serCategory;
        this.serVersion = serVersion;
        this.state = state;
        this.serAPIDescriptionURL = serAPIDescriptionURL;
        this.serConfigParams = serConfigParams;
        this.serOperations = serOperations;
        this.serComputeReq = serComputeReq;
        this.serStorageReq = serStorageReq;
        this.serLatencyReq = serLatencyReq;
        this.serThroughputReq = serThroughputReq;
        this.serServiceReq = serServiceReq;
        this.serServiceOptional = serServiceOptional;
        this.serSwImage = serSwImage;
        this.serializer = serializer;
        this.transportType = transportType;
        this.transportProtocol = transportProtocol;
        this.scopeOfLocality = scopeOfLocality;
        this.consumedLocalOnly = consumedLocalOnly;
        this.isLocal = isLocal;
    }

    public Service() {
    }

  
    
    
  
    public Service serType(ServiceType serType) {
        this.serType = serType;
        return this;
    }
      
      
    public String getSerId() {
        return serId;
    }

    public void setSerId(String serId) {
        this.serId = serId;
    }

    public String getSerName() {
        return serName;
    }

    public void setSerName(String serName) {
        this.serName = serName;
    }

    public ServiceType getSerType() {
        return serType;
    }

    public void setSerType(ServiceType serType) {
        this.serType = serType;
    }

    public String getSerProvider() {
        return serProvider;
    }

    public void setSerProvider(String serProvider) {
        this.serProvider = serProvider;
    }

    public String getSerDescription() {
        return serDescription;
    }

    public void setSerDescription(String serDescription) {
        this.serDescription = serDescription;
    }

    public CategoryRef getSerCategory() {
        return serCategory;
    }

    public void setSerCategory(CategoryRef serCategory) {
        this.serCategory = serCategory;
    }

    public String getSerVersion() {
        return serVersion;
    }

    public void setSerVersion(String serVersion) {
        this.serVersion = serVersion;
    }

    public ServiceState getState() {
        return state;
    }

    public void setState(ServiceState state) {
        this.state = state;
    }

    public List<String> getSerAPIDescriptionURL() {
        return serAPIDescriptionURL;
    }

    public void setSerAPIDescriptionURL(List<String> serAPIDescriptionURL) {
        this.serAPIDescriptionURL = serAPIDescriptionURL;
    }
    
    public List<ServiceConfigParameter> getSerConfigParams() {
        return serConfigParams;
    }

    public void setSerConfigParams(List<ServiceConfigParameter> serConfigParams) {
        this.serConfigParams = serConfigParams;
    }

    public List<ServiceOperation> getSerOperations() {
        return serOperations;
    }

    public void setSerOperations(List<ServiceOperation> serOperations) {
        this.serOperations = serOperations;
    }

    public ServiceComputeRequirement getSerComputeReq() {
        return serComputeReq;
    }

    public void setSerComputeReq(ServiceComputeRequirement serComputeReq) {
        this.serComputeReq = serComputeReq;
    }

    public ServiceStorgeRequirement getSerStorageReq() {
        return serStorageReq;
    }

    public void setSerStorageReq(ServiceStorgeRequirement serStorageReq) {
        this.serStorageReq = serStorageReq;
    }

    public ServiceLatencyRequirement getSerLatencyReq() {
        return serLatencyReq;
    }

    public void setSerLatencyReq(ServiceLatencyRequirement serLatencyReq) {
        this.serLatencyReq = serLatencyReq;
    }

    public ServiceThroughputRequirement getSerThroughputReq() {
        return serThroughputReq;
    }

    public void setSerThroughputReq(ServiceThroughputRequirement serThroughputReq) {
        this.serThroughputReq = serThroughputReq;
    }

    public List<ServiceRequirement> getSerServiceReq() {
        return serServiceReq;
    }

    public void setSerServiceReq(List<ServiceRequirement> serServiceReq) {
        this.serServiceReq = serServiceReq;
    }

    public List<ServiceOptional> getSerServiceOptional() {
        return serServiceOptional;
    }

    public void setSerServiceOptional(List<ServiceOptional> serServiceOptional) {
        this.serServiceOptional = serServiceOptional;
    }

    public ServiceSWImage getSerSwImage() {
        return serSwImage;
    }

    public void setSerSwImage(ServiceSWImage serSwImage) {
        this.serSwImage = serSwImage;
    }

    public String getSerializer() {
        return serializer;
    }

    public void setSerializer(String serializer) {
        this.serializer = serializer;
    }

    public String getTransportType() {
        return transportType;
    }

    public void setTransportType(String transportType) {
        this.transportType = transportType;
    }

    public String getTransportProtocol() {
        return transportProtocol;
    }

    public void setTransportProtocol(String transportProtocol) {
        this.transportProtocol = transportProtocol;
    }

    public String getScopeOfLocality() {
        return scopeOfLocality;
    }

    public void setScopeOfLocality(String scopeOfLocality) {
        this.scopeOfLocality = scopeOfLocality;
    }

    public Boolean getConsumedLocalOnly() {
        return consumedLocalOnly;
    }

    public void setConsumedLocalOnly(Boolean consumedLocalOnly) {
        this.consumedLocalOnly = consumedLocalOnly;
    }

    public Boolean getIsLocal() {
        return isLocal;
    }

    public void setIsLocal(Boolean isLocal) {
        this.isLocal = isLocal;
    }

  /*  public piEdgeInfo getPiEdgeInfo() {
        return piEdgeInfo;
    }

    public void setPiEdgeInfo(piEdgeInfo piEdgeInfo) {
        this.piEdgeInfo = piEdgeInfo;
    }*/
  



 

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Service service = (Service) o;
    return Objects.equals(this.serId, service.serId) &&
        Objects.equals(this.serName, service.serName) &&
        Objects.equals(this.serCategory, service.serCategory) &&
        Objects.equals(this.serVersion, service.serVersion) &&
        Objects.equals(this.state, service.state) &&
        Objects.equals(this.serType, service.serType) &&
        Objects.equals(this.serProvider, service.serProvider) &&
        Objects.equals(this.serDescription, service.serDescription) &&
        Objects.equals(this.serAPIDescriptionURL, service.serAPIDescriptionURL) &&
        Objects.equals(this.serConfigParams, service.serConfigParams) &&
        Objects.equals(this.serComputeReq, service.serComputeReq) &&
        Objects.equals(this.serStorageReq, service.serStorageReq) &&
        Objects.equals(this.serLatencyReq, service.serLatencyReq) &&
        Objects.equals(this.serThroughputReq, service.serThroughputReq) &&
        Objects.equals(this.serServiceReq, service.serServiceReq) &&
        Objects.equals(this.serServiceOptional, service.serServiceOptional) &&
        Objects.equals(this.serSwImage, service.serSwImage) &&
        Objects.equals(this.serializer, service.serializer) &&
        Objects.equals(this.transportType, service.transportType) &&
        Objects.equals(this.transportProtocol, service.transportProtocol) &&
        Objects.equals(this.scopeOfLocality, service.scopeOfLocality) &&
        Objects.equals(this.consumedLocalOnly, service.consumedLocalOnly) &&
        Objects.equals(this.isLocal, service.isLocal);
  }

//  @Override
//  public int hashCode() {
//    return Objects.hash(serInstanceId, serName, serCategory, version, state, transportInfo, serializer, scopeOfLocality, consumedLocalOnly, isLocal);
//  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ServiceInfo {\n");
    
    sb.append("    serInstanceId: ").append(toIndentedString(serId)).append("\n");
    sb.append("    serName: ").append(toIndentedString(serName)).append("\n");
    sb.append("    serCategory: ").append(toIndentedString(serCategory)).append("\n");
    sb.append("    version: ").append(toIndentedString(serVersion)).append("\n");
    sb.append("    state: ").append(toIndentedString(state)).append("\n");
    sb.append("    serType: ").append(toIndentedString(serType)).append("\n");
    sb.append("    serProvider: ").append(toIndentedString(serProvider)).append("\n");
    sb.append("    serDescription: ").append(toIndentedString(serDescription)).append("\n");
    sb.append("    serAPIDescriptionURL: ").append(toIndentedString(serAPIDescriptionURL)).append("\n");
    sb.append("    serConfigParams: ").append(toIndentedString(serConfigParams)).append("\n");
    sb.append("    serComputeReq: ").append(toIndentedString(serComputeReq)).append("\n");
    sb.append("    serStorageReq: ").append(toIndentedString(serStorageReq)).append("\n");
    sb.append("    serLatencyReq: ").append(toIndentedString(serLatencyReq)).append("\n");
    sb.append("    serThroughputReq: ").append(toIndentedString(serThroughputReq)).append("\n");
    sb.append("    serServiceReq: ").append(toIndentedString(serServiceReq)).append("\n");
    sb.append("    serServiceOptional: ").append(toIndentedString(serServiceOptional)).append("\n");
    sb.append("    serSwImage: ").append(toIndentedString(serSwImage)).append("\n");
    sb.append("    serializer: ").append(toIndentedString(serializer)).append("\n");
    sb.append("    transportType: ").append(toIndentedString(transportType)).append("\n");
    sb.append("    transportProtocol: ").append(toIndentedString(transportProtocol)).append("\n");
    sb.append("    scopeOfLocality: ").append(toIndentedString(scopeOfLocality)).append("\n");
    sb.append("    consumedLocalOnly: ").append(toIndentedString(consumedLocalOnly)).append("\n");
    sb.append("    isLocal: ").append(toIndentedString(isLocal)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

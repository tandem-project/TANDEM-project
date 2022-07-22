package TANDEM.icomtelecom.service_catalogue.Model.Service;

import TANDEM.icomtelecom.service_catalogue.Model.CategoryRef;
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

  @JsonProperty("serConfigParameters")
  private List<ServiceConfigParameter> serConfigParameters = null;

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
  private ServiceOptional serServiceOptional = null;

  @JsonProperty("serSwImage")
  private ServiceSWImage serSwImage = null;
//
//  @JsonProperty("transportInfo")
//  private TransportInfo transportInfo = null;
////
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

  @JsonProperty("piEdgeInfo")
  private TANDEM.icomtelecom.service_catalogue.Model.piEdgeInfo piEdgeInfo = null;

//  public Boolean getConsumedLocalOnly() {
//    return consumedLocalOnly;
//  }
//
//  public Boolean getLocal() {
//    return isLocal;
//  }
//
//  public void setLocal(Boolean local) {
//    isLocal = local;
//  }

  public TANDEM.icomtelecom.service_catalogue.Model.piEdgeInfo getPiEdgeInfo() {
    return piEdgeInfo;
  }

  public void setPiEdgeInfo(TANDEM.icomtelecom.service_catalogue.Model.piEdgeInfo piEdgeInfo) {
    this.piEdgeInfo = piEdgeInfo;
  }

  public Service serInstanceId(String serInstanceId) {
    this.serId = serInstanceId;
    return this;
  }

  /**
   * Identifier of the service instance assigned by the MEC platform.
   * @return serInstanceId
   **/
//  @Schema(description = "Identifier of the service instance assigned by the MEC platform.")
  
    public String getSerId() {
    return serId;
  }

  public void setSerId(String serId) {
    this.serId = serId;
  }

  public Service serName(String serName) {
    this.serName = serName;
    return this;
  }

  /**
   * The name of the service. This is how the service producing MEC application identifies the service instance it produces.
   * @return serName
   **/
//  @Schema(required = true, description = "The name of the service. This is how the service producing MEC application identifies the service instance it produces.")
//      @NotNull

    public String getSerName() {
    return serName;
  }

  public void setSerName(String serName) {
    this.serName = serName;
  }

  public ServiceType getSerType() {
    return serType;
  }

  public List<ServiceConfigParameter> getSerConfigParameters() {
    return serConfigParameters;
  }

  public void setSerConfigParameters(List<ServiceConfigParameter> serConfigParameters) {
    this.serConfigParameters = serConfigParameters;
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

  public ServiceOptional getSerServiceOptional() {
    return serServiceOptional;
  }

  public void setSerServiceOptional(ServiceOptional serServiceOptional) {
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

  public Boolean getLocal() {
    return isLocal;
  }

  public void setLocal(Boolean local) {
    isLocal = local;
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

//  public ServiceInfo serCategory(CategoryRef serCategory) {
//    this.serCategory = serCategory;
//    return this;
//  }

  /**
   * Get serCategory
   * @return serCategory
   **/
//  @Schema(description = "")
  
//    @Valid
    public CategoryRef getSerCategory() {
    return serCategory;
  }

  public void setSerCategory(CategoryRef serCategory) {
    this.serCategory = serCategory;
  }

  public Service version(String version) {
    this.serVersion = version;
    return this;
  }

  /**
   * Service version
   * @return version
   **/
//  @Schema(required = true, description = "Service version")
//      @NotNull

    public String getSerVersion() {
    return serVersion;
  }

  public void setSerVersion(String version) {
    this.serVersion = version;
  }

//  public ServiceInfo state(ServiceState state) {
//    this.state = state;
//    return this;
//  }

  /**
   * Get state
   * @return state
   **/
//  @Schema(required = true, description = "")
//      @NotNull
//
//    @Valid
    public ServiceState getState() {
    return state;
  }
//
  public void setState(ServiceState state) {
    this.state = state;
  }

//  public Service transportInfo(TransportInfo transportInfo) {
//    this.transportInfo = transportInfo;
//    return this;
//  }

  /**
   * Get transportInfo
   * @return transportInfo
   **/
//  @Schema(required = true, description = "")
//      @NotNull
//
//    @Valid
//    public TransportInfo getTransportInfo() {
//    return transportInfo;
//  }
////
//  public void setTransportInfo(TransportInfo transportInfo) {
//    this.transportInfo = transportInfo;
//  }
////
//  public Service serializer(SerializerType serializer) {
//    this.serializer = serializer;
//    return this;
//  }

  /**
   * Get serializer
   * @return serializer
   **/
//  @Schema(required = true, description = "")
//      @NotNull
//
//    @Valid
//    public SerializerType getSerializer() {
//    return serializer;
//  }
////
//  public void setSerializer(SerializerType serializer) {
//    this.serializer = serializer;
//  }
////
//  public Service scopeOfLocality(LocalityType scopeOfLocality) {
//    this.scopeOfLocality = scopeOfLocality;
//    return this;
//  }

  /**
   * Get scopeOfLocality
   * @return scopeOfLocality
   **/
//  @Schema(description = "")
//
//    @Valid
//    public LocalityType getScopeOfLocality() {
//    return scopeOfLocality;
//  }
////
//  public void setScopeOfLocality(LocalityType scopeOfLocality) {
//    this.scopeOfLocality = scopeOfLocality;
//  }
//
//  public Service consumedLocalOnly(Boolean consumedLocalOnly) {
//    this.consumedLocalOnly = consumedLocalOnly;
//    return this;
//  }

  /**
   * Indicate whether the service can only be consumed by the MEC applications located in the same locality (as defined by scopeOfLocality) as this  service instance.
   * @return consumedLocalOnly
   **/
//  @Schema(description = "Indicate whether the service can only be consumed by the MEC applications located in the same locality (as defined by scopeOfLocality) as this  service instance.")
  
//    public Boolean isConsumedLocalOnly() {
//    return consumedLocalOnly;
//  }
//
//  public void setConsumedLocalOnly(Boolean consumedLocalOnly) {
//    this.consumedLocalOnly = consumedLocalOnly;
//  }
//
//  public Service isLocal(Boolean isLocal) {
//    this.isLocal = isLocal;
//    return this;
//  }

  /**
   * Indicate whether the service is located in the same locality (as defined by scopeOfLocality) as the consuming MEC application.
   * @return isLocal
   **/
//  @Schema(description = "Indicate whether the service is located in the same locality (as defined by scopeOfLocality) as the consuming MEC application.")
  
//    public Boolean isIsLocal() {
//    return isLocal;
//  }
//
//  public void setIsLocal(Boolean isLocal) {
//    this.isLocal = isLocal;
//  }


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
        Objects.equals(this.piEdgeInfo, service.piEdgeInfo);
//        Objects.equals(this.transportInfo, service.transportInfo) &&
//        Objects.equals(this.serializer, service.serializer) &&
//        Objects.equals(this.scopeOfLocality, service.scopeOfLocality) &&
//        Objects.equals(this.consumedLocalOnly, service.consumedLocalOnly) &&
//        Objects.equals(this.isLocal, service.isLocal);
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
    sb.append("    piEdgeInfo: ").append(toIndentedString(piEdgeInfo)).append("\n");
//    sb.append("    transportInfo: ").append(toIndentedString(transportInfo)).append("\n");
//    sb.append("    serializer: ").append(toIndentedString(serializer)).append("\n");
//    sb.append("    scopeOfLocality: ").append(toIndentedString(scopeOfLocality)).append("\n");
//    sb.append("    consumedLocalOnly: ").append(toIndentedString(consumedLocalOnly)).append("\n");
//    sb.append("    isLocal: ").append(toIndentedString(isLocal)).append("\n");
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

package TANDEM.icomtelecom.service_catalogue.Model.Service;

import TANDEM.icomtelecom.service_catalogue.Model.CategoryRef;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.validation.annotation.Validated;
import java.util.List;

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
  private String serType = null;

  @JsonProperty("serProvider")
  private String serProvider = null;

  @JsonProperty("serDescription")
  private String serDescription = null;

  @JsonProperty("serCategory")
  private CategoryRef serCategory = null;

  @JsonProperty("serVersion")
  private String serVersion = null;

  @JsonProperty("state")
  private String state = null;
  
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

  @JsonProperty("scopeOfLocality")
  private String scopeOfLocality = null;

  @JsonProperty("consumedLocalOnly")
  private Boolean consumedLocalOnly = null;

  @JsonProperty("isLocal")
  private Boolean isLocal = null;

  @JsonProperty("serApplicationPorts")
  private List<Integer> serApplicationPorts = null;
    
  @JsonProperty("serAutoscalingPolicies")
  private List<AutoscalingPolicy> serAutoscalingPolicies = null;
  
  @JsonProperty("serRequiredVolumes")
  private List<RequiredVolume> serRequiredVolumes = null;
  
  @JsonProperty("serRequiredEnvParameters")
  private List<RequiredEnvParameter> serRequiredEnvParameters = null;
  
  @JsonProperty("serPrivileged")
  private Boolean serPrivileged = null;
    
  @JsonProperty("serPaasAutoscalingMetric")
  private String serPaasAutoscalingMetric = null;


    public Service(String serId, String serName, String serType, String serProvider,
            String serDescription, CategoryRef serCategory, String serVersion, String state,
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

  
    
    
  
    public Service serType(String serType) {
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

    public String getSerType() {
        return serType;
    }

    public void setSerType(String serType) {
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
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

    public List<Integer> getSerApplicationPorts() {
        return serApplicationPorts;
    }

    public void setSerApplicationPorts(List<Integer> serApplicationPorts) {
        this.serApplicationPorts = serApplicationPorts;
    }

    public List<AutoscalingPolicy> getSerAutoscalingPolicies() {
        return serAutoscalingPolicies;
    }

    public void setSerAutoscalingPolicies(List<AutoscalingPolicy> serAutoscalingPolicies) {
        this.serAutoscalingPolicies = serAutoscalingPolicies;
    }
    
    public List<RequiredVolume> getSerRequiredVolumes() {
        return serRequiredVolumes;
    }

    public void setSerRequiredVolumes(List<RequiredVolume> serRequiredVolumes) {
        this.serRequiredVolumes = serRequiredVolumes;
    }

    public List<RequiredEnvParameter> getSerRequiredEnvParameters() {
        return serRequiredEnvParameters;
    }

    public void setSerRequiredEnvParameters(List<RequiredEnvParameter> serRequiredEnvParameters) {
        this.serRequiredEnvParameters = serRequiredEnvParameters;
    }

    public Boolean getSerPrivileged() {
        return serPrivileged;
    }

    public void setSerPrivileged(Boolean serPrivileged) {
        this.serPrivileged = serPrivileged;
    }

    public String getSerPaasAutoscalingMetric() {
        return serPaasAutoscalingMetric;
    }

    public void setSerPaasAutoscalingMetric(String serPaasAutoscalingMetric) {
        this.serPaasAutoscalingMetric = serPaasAutoscalingMetric;
    }
  
}

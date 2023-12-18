package TANDEM.icomtelecom.application_catalogue.Model.Application;

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

public class Application {
  @Id
  @JsonProperty("id")
  private String id = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("category")
  private String category = null;
  
  @JsonProperty("description")
  private String description = null;
          
  @JsonProperty("provider")
  private String provider = null;

  @JsonProperty("applicationServices")
  private List<ApplicationService> applicationServices = null;
    
  @JsonProperty("supportServices")
  private List<SupportService> supportServices = null;

  @JsonProperty("serviceChain")
  private String serviceChain = null;
      
  @JsonProperty("state")
  private String state = null;

  @JsonProperty("AppURL")
  private String AppURL = null;
  
  @JsonProperty("monServicesURL")
  private String monServicesURL = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public List<ApplicationService> getApplicationServices() {
        return applicationServices;
    }

    public void setApplicationServices(List<ApplicationService> applicationServices) {
        this.applicationServices = applicationServices;
    }

    public List<SupportService> getSupportServices() {
        return supportServices;
    }

    public void setSupportServices(List<SupportService> supportServices) {
        this.supportServices = supportServices;
    }


    public String getServiceChain() {
        return serviceChain;
    }

    public void setServiceChain(String serviceChain) {
        this.serviceChain = serviceChain;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getAppURL() {
        return AppURL;
    }

    public void setAppURL(String AppURL) {
        this.AppURL = AppURL;
    }

    public String getMonServicesURL() {
        return monServicesURL;
    }

    public void setMonServicesURL(String monServicesURL) {
        this.monServicesURL = monServicesURL;
    }
    
    
  
  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
          
          
    Application application = (Application) o;
    return Objects.equals(this.id, application.id) &&
        Objects.equals(this.name, application.name) &&
        Objects.equals(this.category, application.category) &&
        Objects.equals(this.description, application.description) &&
        Objects.equals(this.provider, application.provider) &&
        Objects.equals(this.applicationServices, application.applicationServices) &&
        Objects.equals(this.supportServices, application.supportServices) &&
        Objects.equals(this.serviceChain, application.serviceChain) &&
        Objects.equals(this.state, application.state) &&
        Objects.equals(this.AppURL, application.AppURL) &&
        Objects.equals(this.monServicesURL, application.monServicesURL);
}

//  @Override
//  public int hashCode() {
//    return Objects.hash(serInstanceId, serName, serCategory, version, state, transportInfo, serializer, scopeOfLocality, consumedLocalOnly, isLocal);
//  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ApplicationInfo {\n");
    
  
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    category: ").append(toIndentedString(category)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    provider: ").append(toIndentedString(provider)).append("\n");
    sb.append("    applicationServices: ").append(toIndentedString(applicationServices)).append("\n");
    sb.append("    supportServices: ").append(toIndentedString(supportServices)).append("\n");
    sb.append("    serviceChain: ").append(toIndentedString(serviceChain)).append("\n");
    sb.append("    state: ").append(toIndentedString(state)).append("\n");
    sb.append("    AppURL: ").append(toIndentedString(AppURL)).append("\n");
    sb.append("    monServicesURL: ").append(toIndentedString(monServicesURL)).append("\n");
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

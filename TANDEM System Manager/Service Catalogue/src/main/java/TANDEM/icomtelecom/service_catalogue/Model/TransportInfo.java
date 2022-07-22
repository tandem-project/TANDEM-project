package TANDEM.icomtelecom.service_catalogue.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
//import io.swagger.model.SecurityInfo;
//import io.swagger.model.TransportType;
//import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;

//import javax.validation.Valid;
//import javax.validation.constraints.*;
import java.util.Objects;

/**
 * This type represents the general information of a MEC service.
 */
//@Schema(description = "This type represents the general information of a MEC service.")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class TransportInfo {
  @JsonProperty("id")
  private String id = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("description")
  private String description = null;

//  @JsonProperty("type")
//  private TransportType type = null;

  @JsonProperty("protocol")
  private String protocol = null;

  @JsonProperty("version")
  private String version = null;

//  @JsonProperty("endpoint")
//  private OneOfTransportInfoEndpoint endpoint = null;
//
//  @JsonProperty("security")
//  private SecurityInfo security = null;

  @JsonProperty("implSpecificInfo")
  private Object implSpecificInfo = null;

  public TransportInfo id(String id) {
    this.id = id;
    return this;
  }

  /**
   * The identifier of this transport
   * @return id
   **/
//  @Schema(required = true, description = "The identifier of this transport")
//      @NotNull

    public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public TransportInfo name(String name) {
    this.name = name;
    return this;
  }

  /**
   * The name of this transport
   * @return name
   **/
//  @Schema(required = true, description = "The name of this transport")
//      @NotNull

    public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public TransportInfo description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Human-readable description of this transport
   * @return description
   **/
//  @Schema(description = "Human-readable description of this transport")
  
    public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

//  public TransportInfo type(TransportType type) {
//    this.type = type;
//    return this;
//  }

  /**
   * Get type
   * @return type
   **/
//  @Schema(required = true, description = "")
//      @NotNull
//
//    @Valid
//    public TransportType getType() {
//    return type;
//  }

//  public void setType(TransportType type) {
//    this.type = type;
//  }

  public TransportInfo protocol(String protocol) {
    this.protocol = protocol;
    return this;
  }

  /**
   * The name of the protocol used. Shall be set to HTTP for a REST API.
   * @return protocol
   **/
//  @Schema(required = true, description = "The name of the protocol used. Shall be set to HTTP for a REST API.")
//      @NotNull

    public String getProtocol() {
    return protocol;
  }

  public void setProtocol(String protocol) {
    this.protocol = protocol;
  }

  public TransportInfo version(String version) {
    this.version = version;
    return this;
  }

  /**
   * The version of the protocol used
   * @return version
   **/
//  @Schema(required = true, description = "The version of the protocol used")
//      @NotNull

    public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

//  public TransportInfo endpoint(OneOfTransportInfoEndpoint endpoint) {
//    this.endpoint = endpoint;
//    return this;
//  }

  /**
   * This type represents information about a transport endpoint
   * @return endpoint
   **/
//  @Schema(required = true, description = "This type represents information about a transport endpoint")
//      @NotNull
//
//    public OneOfTransportInfoEndpoint getEndpoint() {
//    return endpoint;
//  }
//
//  public void setEndpoint(OneOfTransportInfoEndpoint endpoint) {
//    this.endpoint = endpoint;
//  }
//
//  public TransportInfo security(SecurityInfo security) {
//    this.security = security;
//    return this;
//  }

  /**
   * Get security
   * @return security
   **/
//  @Schema(required = true, description = "")
//      @NotNull
//
//    @Valid
//    public SecurityInfo getSecurity() {
//    return security;
//  }
//
//  public void setSecurity(SecurityInfo security) {
//    this.security = security;
//  }

  public TransportInfo implSpecificInfo(Object implSpecificInfo) {
    this.implSpecificInfo = implSpecificInfo;
    return this;
  }

  /**
   * Additional implementation specific details of the transport
   * @return implSpecificInfo
   **/
//  @Schema(description = "Additional implementation specific details of the transport")
  
    public Object getImplSpecificInfo() {
    return implSpecificInfo;
  }

  public void setImplSpecificInfo(Object implSpecificInfo) {
    this.implSpecificInfo = implSpecificInfo;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TransportInfo transportInfo = (TransportInfo) o;
    return Objects.equals(this.id, transportInfo.id) &&
        Objects.equals(this.name, transportInfo.name) &&
        Objects.equals(this.description, transportInfo.description) &&
//        Objects.equals(this.type, transportInfo.type) &&
        Objects.equals(this.protocol, transportInfo.protocol) &&
        Objects.equals(this.version, transportInfo.version) &&
//        Objects.equals(this.endpoint, transportInfo.endpoint) &&
//        Objects.equals(this.security, transportInfo.security) &&
        Objects.equals(this.implSpecificInfo, transportInfo.implSpecificInfo);
  }

//  @Override
//  public int hashCode() {
//    return Objects.hash(id, name, description, type, protocol, version, endpoint, security, implSpecificInfo);
//  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TransportInfo {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
//    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    protocol: ").append(toIndentedString(protocol)).append("\n");
    sb.append("    version: ").append(toIndentedString(version)).append("\n");
//    sb.append("    endpoint: ").append(toIndentedString(endpoint)).append("\n");
//    sb.append("    security: ").append(toIndentedString(security)).append("\n");
    sb.append("    implSpecificInfo: ").append(toIndentedString(implSpecificInfo)).append("\n");
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

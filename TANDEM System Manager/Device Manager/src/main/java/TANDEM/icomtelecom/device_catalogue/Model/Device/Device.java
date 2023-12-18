package TANDEM.icomtelecom.device_catalogue.Model.Device;

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

public class Device {
  @Id
  @JsonProperty("id")
  private String id = null;

  @JsonProperty("name")
  private String name = null;
  
  @JsonProperty("type")
  private String type = null;
  
  @JsonProperty("description")
  private String description = null;
          
  @JsonProperty("labels")
  private List<String> labels = null;

  @JsonProperty("operatingState")
  private String operatingState = null;

  @JsonProperty("adminState")
  private String adminState = null;

  @JsonProperty("ip")
  private String ip = null;

  @JsonProperty("port")
  private String port = null;

  @JsonProperty("deviceNode")
  private String deviceNode = null;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public String getOperatingState() {
        return operatingState;
    }

    public void setOperatingState(String operatingState) {
        this.operatingState = operatingState;
    }

    public String getAdminState() {
        return adminState;
    }

    public void setAdminState(String adminState) {
        this.adminState = adminState;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getDeviceNode() {
        return deviceNode;
    }

    public void setDeviceNode(String deviceNode) {
        this.deviceNode = deviceNode;
    }

  

  
  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
 
    Device device = (Device) o;
    return Objects.equals(this.id, device.id) &&
        Objects.equals(this.name, device.name) &&
        Objects.equals(this.type, device.type) &&
        Objects.equals(this.description, device.description) &&
        Objects.equals(this.labels, device.labels) &&
        Objects.equals(this.operatingState, device.operatingState) &&
        Objects.equals(this.adminState, device.adminState) &&
        Objects.equals(this.ip, device.ip) &&
        Objects.equals(this.port, device.port) &&
        Objects.equals(this.deviceNode, device.deviceNode);
}

//  @Override
//  public int hashCode() {
//    return Objects.hash(serInstanceId, serName, serCategory, version, state, transportInfo, serializer, scopeOfLocality, consumedLocalOnly, isLocal);
//  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeviceInfo {\n");
    
  
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    labels: ").append(toIndentedString(labels)).append("\n");
    sb.append("    operatingState: ").append(toIndentedString(operatingState)).append("\n");
    sb.append("    adminState: ").append(toIndentedString(adminState)).append("\n");
    sb.append("    ip: ").append(toIndentedString(ip)).append("\n");
    sb.append("    port: ").append(toIndentedString(port)).append("\n");
    sb.append("    port: ").append(toIndentedString(deviceNode)).append("\n");
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

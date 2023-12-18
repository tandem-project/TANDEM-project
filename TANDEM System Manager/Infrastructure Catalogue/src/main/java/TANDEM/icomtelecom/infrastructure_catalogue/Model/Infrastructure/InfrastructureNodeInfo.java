package TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.validation.annotation.Validated;

/**
 * This type represents the general information of a MEC service.
 */
//@Schema(description = "This type represents the general information of a MEC service.")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class InfrastructureNodeInfo {
  
  @JsonProperty("_id")
  private String id = null;
  
 @JsonProperty("location")
  private String location = null;

 @JsonProperty("name")
  private String name = null;

 @JsonProperty("serial")
  private String serial = null;
    
  @JsonProperty("stats_url")
  private String stats_url = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public String getStats_url() {
        return stats_url;
    }

    public void setStats_url(String stats_url) {
        this.stats_url = stats_url;
    }

    
}

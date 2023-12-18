package TANDEM.icomtelecom.service_catalogue.Model.Product;


import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.validation.annotation.Validated;


/**
 * This type represents the general information of a MEC service.
 */
//@Schema(description = "This type represents the general information of a MEC service.")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class ProductAvailabilityZones {
    
  @JsonProperty("AvailabilityZoneId")
  private String AvailabilityZoneId = null;

  @JsonProperty("AvailabilityZoneName")
  private String AvailabilityZoneName = null;

    public ProductAvailabilityZones(String AvailabilityZoneId, String AvailabilityZoneName) {
        this.AvailabilityZoneId = AvailabilityZoneId;
        this.AvailabilityZoneName = AvailabilityZoneName;
    }

    public String getAvailabilityZoneId() {
        return AvailabilityZoneId;
    }

    public void setAvailabilityZoneId(String AvailabilityZoneId) {
        this.AvailabilityZoneId = AvailabilityZoneId;
    }

    public String getAvailabilityZoneName() {
        return AvailabilityZoneName;
    }

    public void setAvailabilityZoneName(String AvailabilityZoneName) {
        this.AvailabilityZoneName = AvailabilityZoneName;
    }

  
  
}
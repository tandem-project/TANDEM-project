package TANDEM.icomtelecom.service_catalogue.Model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.validation.annotation.Validated;

/**
 * This type represents the general information of a MEC service.
 */
//@Schema(description = "This type represents the general information of a MEC service.")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class ProductPricePerChargeUnit {
    
    

  @JsonProperty("ChargeUnit")
  private String ChargeUnit = null;
  
  @JsonProperty("ProductPrice")
  private String ProductPrice = null;

    public ProductPricePerChargeUnit(String ChargeUnit, String ProductPrice) {
        this.ChargeUnit = ChargeUnit;
        this.ProductPrice = ProductPrice;
    }

    public String getChargeUnit() {
        return ChargeUnit;
    }

    public void setChargeUnit(String ChargeUnit) {
        this.ChargeUnit = ChargeUnit;
    }

    public String getProductPrice() {
        return ProductPrice;
    }

    public void setProductPrice(String ProductPrice) {
        this.ProductPrice = ProductPrice;
    }



 
}
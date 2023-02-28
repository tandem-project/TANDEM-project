package TANDEM.icomtelecom.service_catalogue.Model;

import TANDEM.icomtelecom.service_catalogue.Model.Service.ServiceCategory;
import com.fasterxml.jackson.annotation.JsonProperty;
//import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;

//import javax.validation.constraints.*;
import java.util.Objects;

/**
 * This type represents the category reference
 */
//@Schema(description = "This type represents the category reference")
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2022-03-15T15:58:59.394Z[GMT]")


public class CategoryRef {
  @JsonProperty("href")
  private ServiceCategory href = null;
 // private String href = null;

  @JsonProperty("id")
  private String id = null;

  @JsonProperty("name")
  private String name = null;

  @JsonProperty("version")
  private String version = null;

  /**
   * Reference of the catalogue
   * @return href
   **/
//  @Schema(required = true, description = "Reference of the catalogue")
//      @NotNull

    public CategoryRef href(ServiceCategory href) {
    this.href = href;
    return this;
  }
  
    public ServiceCategory getHref() {
        return href;
    }

    public void setHref(ServiceCategory href) {
        this.href = href;
    }

 /* public void setHref(ServiceCategory href) {
    this.href = href;
  }*/

  public CategoryRef id(String id) {
    this.id = id;
    return this;
  }

  /**
   * Unique identifier of the category
   * @return id
   **/
//  @Schema(required = true, description = "Unique identifier of the category")
//      @NotNull

    public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public CategoryRef name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Name of the category, example values include RNI, Location & Bandwidth Management
   * @return name
   **/
//  @Schema(required = true, description = "Name of the category, example values include RNI, Location & Bandwidth Management")
//      @NotNull

    public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public CategoryRef version(String version) {
    this.version = version;
    return this;
  }

  /**
   * Category version
   * @return version
   **/
//  @Schema(required = true, description = "Category version")
//      @NotNull

    public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CategoryRef categoryRef = (CategoryRef) o;
    return Objects.equals(this.href, categoryRef.href) &&
        Objects.equals(this.id, categoryRef.id) &&
        Objects.equals(this.name, categoryRef.name) &&
        Objects.equals(this.version, categoryRef.version);
  }

  @Override
  public int hashCode() {
    return Objects.hash(href, id, name, version);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CategoryRef {\n");
    
    sb.append("    href: ").append(toIndentedString(href)).append("\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    version: ").append(toIndentedString(version)).append("\n");
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

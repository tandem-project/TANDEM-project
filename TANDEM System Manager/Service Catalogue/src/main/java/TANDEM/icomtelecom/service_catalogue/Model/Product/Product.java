package TANDEM.icomtelecom.service_catalogue.Model.Product;

import TANDEM.icomtelecom.service_catalogue.Model.Service.*;
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


public class Product {

  @Id
  @JsonProperty("productId")
  private String productId = null;

  @JsonProperty("productName")
  private String productName = null;

  @JsonProperty("productType")
  private String productType = null;

  @JsonProperty("productProvider")
  private String productProvider = null;

  @JsonProperty("productDescription")
  private String productDescription = null;

  @JsonProperty("productCategory")
  private ProductRef productCategory = null;

  @JsonProperty("productVersion")
  private String productVersion = null;

  @JsonProperty("productNode")
  private String productNode = null;
  
  @JsonProperty("productLifeCycleStatus")
  private String productLifeCycleStatus = null;

  @JsonProperty("productLifeCycleStatusReason")
  private String productLifeCycleStatusReason = null;

  @JsonProperty("productIsBuddle")
  private Boolean productIsBuddle = null;

  @JsonProperty("productIsSellable")
  private Boolean productIsSellable = null;

  @JsonProperty("productServiceId")
  private String productServiceId = null;

  @JsonProperty("productServiceName")
  private String productServiceName = null;

  @JsonProperty("productApplicationId")
  private String productApplicationId = null;

  @JsonProperty("productApplicationName")
  private String productApplicationName = null;

  @JsonProperty("productValidFrom")
  private String productValidFrom = null;

  @JsonProperty("productValidTo")
  private String productValidTo = null;

  @JsonProperty("productLastUpdate")
  private String productLastUpdate = null;

  @JsonProperty("productPricingModel")
  private String productPricingModel = null;

  @JsonProperty("productPricePerChargeUnit")
  private List<ProductPricePerChargeUnit> productPricePerChargeUnit = null;

  @JsonProperty("productPriceCurrency")
  private String productPriceCurrency = null;

  @JsonProperty("productAvailabilityZones")
  private List<ProductAvailabilityZones> productAvailabilityZones = null;

  @JsonProperty("productServiceLevelAgreementId")
  private String productServiceLevelAgreementId = null;

  @JsonProperty("productServiceLevelAgreementName")
  private String productServiceLevelAgreementName = null;

  @JsonProperty("productServiceLevelAgreementDescription")
  private String productServiceLevelAgreementDescription = null;

  @JsonProperty("countMin")
  private Integer countMin = null;
  
  @JsonProperty("countMax")
  private Integer countMax = null;
  
    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getProductProvider() {
        return productProvider;
    }

    public void setProductProvider(String productProvider) {
        this.productProvider = productProvider;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public ProductRef getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(ProductRef productCategory) {
        this.productCategory = productCategory;
    }

    public String getProductVersion() {
        return productVersion;
    }

    public void setProductVersion(String productVersion) {
        this.productVersion = productVersion;
    }

    public String getProductNode() {
        return productNode;
    }

    public void setProductNode(String productNode) {
        this.productNode = productNode;
    }

    public String getProductLifeCycleStatus() {
        return productLifeCycleStatus;
    }

    public void setProductLifeCycleStatus(String productLifeCycleStatus) {
        this.productLifeCycleStatus = productLifeCycleStatus;
    }

    public String getProductLifeCycleStatusReason() {
        return productLifeCycleStatusReason;
    }

    public void setProductLifeCycleStatusReason(String productLifeCycleStatusReason) {
        this.productLifeCycleStatusReason = productLifeCycleStatusReason;
    }

    public Boolean getProductIsBuddle() {
        return productIsBuddle;
    }

    public void setProductIsBuddle(Boolean productIsBuddle) {
        this.productIsBuddle = productIsBuddle;
    }

    public Boolean getProductIsSellable() {
        return productIsSellable;
    }

    public void setProductIsSellable(Boolean productIsSellable) {
        this.productIsSellable = productIsSellable;
    }

    public String getProductServiceId() {
        return productServiceId;
    }

    public void setProductServiceId(String productServiceId) {
        this.productServiceId = productServiceId;
    }

    public String getProductServiceName() {
        return productServiceName;
    }

    public void setProductServiceName(String productServiceName) {
        this.productServiceName = productServiceName;
    }

    public String getProductApplicationId() {
        return productApplicationId;
    }

    public void setProductApplicationId(String productApplicationId) {
        this.productApplicationId = productApplicationId;
    }

    public String getProductApplicationName() {
        return productApplicationName;
    }

    public void setProductApplicationName(String productApplicationName) {
        this.productApplicationName = productApplicationName;
    }

    public String getProductValidFrom() {
        return productValidFrom;
    }

    public void setProductValidFrom(String productValidFrom) {
        this.productValidFrom = productValidFrom;
    }

    public String getProductValidTo() {
        return productValidTo;
    }

    public void setProductValidTo(String productValidTo) {
        this.productValidTo = productValidTo;
    }

    public String getProductLastUpdate() {
        return productLastUpdate;
    }

    public void setProductLastUpdate(String productLastUpdate) {
        this.productLastUpdate = productLastUpdate;
    }

    public String getProductPricingModel() {
        return productPricingModel;
    }

    public void setProductPricingModel(String productPricingModel) {
        this.productPricingModel = productPricingModel;
    }

    public List<ProductPricePerChargeUnit> getProductPricePerChargeUnit() {
        return productPricePerChargeUnit;
    }

    public void setProductPricePerChargeUnit(List<ProductPricePerChargeUnit> productPricePerChargeUnit) {
        this.productPricePerChargeUnit = productPricePerChargeUnit;
    }

    public String getProductPriceCurrency() {
        return productPriceCurrency;
    }

    public void setProductPriceCurrency(String productPriceCurrency) {
        this.productPriceCurrency = productPriceCurrency;
    }

    public List<ProductAvailabilityZones> getProductAvailabilityZones() {
        return productAvailabilityZones;
    }

    public void setProductAvailabilityZones(List<ProductAvailabilityZones> productAvailabilityZones) {
        this.productAvailabilityZones = productAvailabilityZones;
    }

    public String getProductServiceLevelAgreementId() {
        return productServiceLevelAgreementId;
    }

    public void setProductServiceLevelAgreementId(String productServiceLevelAgreementId) {
        this.productServiceLevelAgreementId = productServiceLevelAgreementId;
    }

    public String getProductServiceLevelAgreementName() {
        return productServiceLevelAgreementName;
    }

    public void setProductServiceLevelAgreementName(String productServiceLevelAgreementName) {
        this.productServiceLevelAgreementName = productServiceLevelAgreementName;
    }

    public String getProductServiceLevelAgreementDescription() {
        return productServiceLevelAgreementDescription;
    }

    public void setProductServiceLevelAgreementDescription(String productServiceLevelAgreementDescription) {
        this.productServiceLevelAgreementDescription = productServiceLevelAgreementDescription;
    }

    public Integer getCountMin() {
        return countMin;
    }

    public void setCountMin(Integer countMin) {
        this.countMin = countMin;
    }

    public Integer getCountMax() {
        return countMax;
    }

    public void setCountMax(Integer countMax) {
        this.countMax = countMax;
    }
  
    
    
  
  

}
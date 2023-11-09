package TANDEM.icomtelecom.service_catalogue.Model.Order;

import TANDEM.icomtelecom.service_catalogue.Model.Product.*;
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


public class Order {

  @Id
  @JsonProperty("orderId")
  private String orderId = null;

  @JsonProperty("orderName")
  private String orderName = null;

  @JsonProperty("orderCategory")
  private String orderCategory = null;

  @JsonProperty("orderType")
  private String orderType = null;

  @JsonProperty("orderDescription")
  private String orderDescription = null;

  @JsonProperty("orderAgreement")
  private String orderAgreement = null;

  @JsonProperty("requestedStartDate")
  private String requestedStartDate = null;

  @JsonProperty("requestedCompletionDate")
  private String requestedCompletionDate = null;
  
  @JsonProperty("totalPrice")
  private String totalPrice = null;
  
  @JsonProperty("billingAccount")
  private String billingAccount = null;
    
  @JsonProperty("orderPriority")
  private String orderPriority = null;
    
  @JsonProperty("contactInfo")
  private String contactInfo = null;
      
  @JsonProperty("notes")
  private List<String> notes = null;
        
  @JsonProperty("orderedProducts")
  private List<String> orderedProducts = null;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    public String getOrderCategory() {
        return orderCategory;
    }

    public void setOrderCategory(String orderCategory) {
        this.orderCategory = orderCategory;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getOrderDescription() {
        return orderDescription;
    }

    public void setOrderDescription(String orderDescription) {
        this.orderDescription = orderDescription;
    }

    public String getOrderAgreement() {
        return orderAgreement;
    }

    public void setOrderAgreement(String orderAgreement) {
        this.orderAgreement = orderAgreement;
    }

    public String getRequestedStartDate() {
        return requestedStartDate;
    }

    public void setRequestedStartDate(String requestedStartDate) {
        this.requestedStartDate = requestedStartDate;
    }

    public String getRequestedCompletionDate() {
        return requestedCompletionDate;
    }

    public void setRequestedCompletionDate(String requestedCompletionDate) {
        this.requestedCompletionDate = requestedCompletionDate;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getBillingAccount() {
        return billingAccount;
    }

    public void setBillingAccount(String billingAccount) {
        this.billingAccount = billingAccount;
    }

    public String getOrderPriority() {
        return orderPriority;
    }

    public void setOrderPriority(String orderPriority) {
        this.orderPriority = orderPriority;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public List<String> getNotes() {
        return notes;
    }

    public void setNotes(List<String> notes) {
        this.notes = notes;
    }

    public List<String> getOrderedProducts() {
        return orderedProducts;
    }

    public void setOrderedProducts(List<String> orderedProducts) {
        this.orderedProducts = orderedProducts;
    }
          

  
  
}
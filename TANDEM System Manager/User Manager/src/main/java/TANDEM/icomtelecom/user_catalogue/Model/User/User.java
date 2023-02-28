package TANDEM.icomtelecom.user_catalogue.Model.User;

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

public class User {
  @Id
  @JsonProperty("userId")
  private String userId = null;

  @JsonProperty("userFirstName")
  private String userFirstName = null;

  @JsonProperty("userLastName")
  private String userLastName = null;
          
  @JsonProperty("userEmail")
  private String userEmail = null;

  @JsonProperty("userName")
  private String userName = null;

  @JsonProperty("userPassword")
  private String userPassword = null;

  @JsonProperty("userAccountType")
  private String userAccountType = null;

  @JsonProperty("userRole")
  private String userRole = null;
    
  @JsonProperty("userBillingAddress")
  private UserBillingAddress userBillingAddress = null;
        
  @JsonProperty("userPhysicalAddress")
  private UserPhysicalAddress userPhysicalAddress = null;
  
  @JsonProperty("userPaymentInfo")
  private UserPaymentInfo userPaymentInfo = null;
    
  @JsonProperty("userCompanyName")
  private String userCompanyName = null;
  
  @JsonProperty("userPhoneNumber")
  private String userPhoneNumber = null;
    
  @JsonProperty("userInterests")
  private List<UserInterest> userInterests = null;
      
  @JsonProperty("userOfferedServices")
  private List<UserOfferedService> userOfferedServices = null;
  
  @JsonProperty("userObtainedServices")
  private List<UserObtainedService> userObtainedServices = null;
      
  @JsonProperty("userInstantiatedServices")
  private List<UserInstantiatedService> userInstantiatedServices = null;
        
  @JsonProperty("userBillingInfo")
  private List<UserBillingInfo> userBillingInfo = null;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserAccountType() {
        return userAccountType;
    }

    public void setUserAccountType(String userAccountType) {
        this.userAccountType = userAccountType;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public UserBillingAddress getUserBillingAddress() {
        return userBillingAddress;
    }

    public void setUserBillingAddress(UserBillingAddress userBillingAddress) {
        this.userBillingAddress = userBillingAddress;
    }

    public UserPhysicalAddress getUserPhysicalAddress() {
        return userPhysicalAddress;
    }

    public void setUserPhysicalAddress(UserPhysicalAddress userPhysicalAddress) {
        this.userPhysicalAddress = userPhysicalAddress;
    }

    public UserPaymentInfo getUserPaymentInfo() {
        return userPaymentInfo;
    }

    public void setUserPaymentInfo(UserPaymentInfo userPaymentInfo) {
        this.userPaymentInfo = userPaymentInfo;
    }

    public String getUserCompanyName() {
        return userCompanyName;
    }

    public void setUserCompanyName(String userCompanyName) {
        this.userCompanyName = userCompanyName;
    }

    public String getUserPhoneNumber() {
        return userPhoneNumber;
    }

    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber;
    }

    public List<UserInterest> getUserInterests() {
        return userInterests;
    }

    public void setUserInterests(List<UserInterest> userInterests) {
        this.userInterests = userInterests;
    }

    public List<UserOfferedService> getUserOfferedServices() {
        return userOfferedServices;
    }

    public void setUserOfferedServices(List<UserOfferedService> userOfferedServices) {
        this.userOfferedServices = userOfferedServices;
    }

    public List<UserObtainedService> getUserObtainedServices() {
        return userObtainedServices;
    }

    public void setUserObtainedServices(List<UserObtainedService> userObtainedServices) {
        this.userObtainedServices = userObtainedServices;
    }

    public List<UserInstantiatedService> getUserInstantiatedServices() {
        return userInstantiatedServices;
    }

    public void setUserInstantiatedServices(List<UserInstantiatedService> userInstantiatedServices) {
        this.userInstantiatedServices = userInstantiatedServices;
    }

    public List<UserBillingInfo> getUserBillingInfo() {
        return userBillingInfo;
    }

    public void setUserBillingInfo(List<UserBillingInfo> userBillingInfo) {
        this.userBillingInfo = userBillingInfo;
    }
    

  
  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return Objects.equals(this.userId, user.userId) &&
        Objects.equals(this.userFirstName, user.userFirstName) &&
        Objects.equals(this.userLastName, user.userLastName) &&
        Objects.equals(this.userEmail, user.userEmail) &&
        Objects.equals(this.userName, user.userName) &&
        Objects.equals(this.userPassword, user.userPassword) &&
        Objects.equals(this.userAccountType, user.userAccountType) &&
        Objects.equals(this.userRole, user.userRole) &&
        Objects.equals(this.userBillingAddress, user.userBillingAddress) &&
        Objects.equals(this.userPhysicalAddress, user.userPhysicalAddress) &&
        Objects.equals(this.userPaymentInfo, user.userPaymentInfo) &&
        Objects.equals(this.userCompanyName, user.userCompanyName) &&
        Objects.equals(this.userPhoneNumber, user.userPhoneNumber) &&
        Objects.equals(this.userInterests, user.userInterests) &&
        Objects.equals(this.userOfferedServices, user.userOfferedServices) &&
        Objects.equals(this.userObtainedServices, user.userObtainedServices) &&
        Objects.equals(this.userInstantiatedServices, user.userInstantiatedServices) &&
        Objects.equals(this.userBillingInfo, user.userBillingInfo);
}

//  @Override
//  public int hashCode() {
//    return Objects.hash(serInstanceId, serName, serCategory, version, state, transportInfo, serializer, scopeOfLocality, consumedLocalOnly, isLocal);
//  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class UserInfo {\n");
    
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    userFirstName: ").append(toIndentedString(userFirstName)).append("\n");
    sb.append("    userLastName: ").append(toIndentedString(userLastName)).append("\n");
    sb.append("    userEmail: ").append(toIndentedString(userEmail)).append("\n");
    sb.append("    userName: ").append(toIndentedString(userName)).append("\n");
    sb.append("    userPassword: ").append(toIndentedString(userPassword)).append("\n");
    sb.append("    userAccountType: ").append(toIndentedString(userAccountType)).append("\n");
    sb.append("    userRole: ").append(toIndentedString(userRole)).append("\n");
    sb.append("    userBillingAddress: ").append(toIndentedString(userBillingAddress)).append("\n");
    sb.append("    userPhysicalAddress: ").append(toIndentedString(userPhysicalAddress)).append("\n");
    sb.append("    userPaymentInfo: ").append(toIndentedString(userPaymentInfo)).append("\n");
    sb.append("    userCompanyName: ").append(toIndentedString(userCompanyName)).append("\n");
    sb.append("    userPhoneNumber: ").append(toIndentedString(userPhoneNumber)).append("\n");
    sb.append("    userInterests: ").append(toIndentedString(userInterests)).append("\n");
    sb.append("    userOfferedServices: ").append(toIndentedString(userOfferedServices)).append("\n");
    sb.append("    userObtainedServices: ").append(toIndentedString(userObtainedServices)).append("\n");
    sb.append("    userInstantiatedServices: ").append(toIndentedString(userInstantiatedServices)).append("\n");
    sb.append("    userBillingInfo: ").append(toIndentedString(userBillingInfo)).append("\n");
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

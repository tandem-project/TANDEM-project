package TANDEM.icomtelecom.user_catalogue.Model.User;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class UserPaymentInfo {
    @JsonProperty("userCardNumber")
    private String userCardNumber;
    @JsonProperty("userExpirationDate")
    private String userExpirationDate;
    @JsonProperty("userCardname")
    private String userCardname;
    @JsonProperty("userCVV")
    private String userCVV;
    @JsonProperty("userPAN")
    private String userPAN;
 //   @JsonProperty("serOperationInputParams")
 //   private List<ServiceOperationParameter> serOperationInputParams;

    public String getUserCardNumber() {
        return userCardNumber;
    }

    public void setUserCardNumber(String userCardNumber) {
        this.userCardNumber = userCardNumber;
    }

    public String getUserExpirationDate() {
        return userExpirationDate;
    }

    public void setUserExpirationDate(String userExpirationDate) {
        this.userExpirationDate = userExpirationDate;
    }

    public String getUserCardname() {
        return userCardname;
    }

    public void setUserCardname(String userCardname) {
        this.userCardname = userCardname;
    }

    public String getUserCVV() {
        return userCVV;
    }

    public void setUserCVV(String userCVV) {
        this.userCVV = userCVV;
    }

    public String getUserPAN() {
        return userPAN;
    }

    public void setUserPAN(String userPAN) {
        this.userPAN = userPAN;
    }
 
}

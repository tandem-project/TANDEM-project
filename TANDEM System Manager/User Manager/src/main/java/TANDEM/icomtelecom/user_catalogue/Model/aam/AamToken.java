package TANDEM.icomtelecom.user_catalogue.Model.aam;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;


public class AamToken {
    @Id
    @JsonProperty("tokenId")
    private String tokenId=null;
    @JsonProperty("token")
    private String token=null;
    @JsonProperty("userName")
    private String userName=null;
    @JsonProperty("userRole")
    private String userRole=null;
    @JsonProperty("time")
    private long time=0;

    public long getTime() {return time;}
    public void setTime(long time) {this.time = time;}
    public String getTokenId() {return tokenId;}
    public void setTokenId(String tokenId) {this.tokenId = tokenId;}
    public String getToken() {return token;}
    public void setToken(String token) {this.token = token;}
    public String getUserName() {return userName;}
    public void setUserName(String userName) {this.userName = userName;}
    public String getUserRole() {return userRole;}
    public void setUserRole(String userRole) {this.userRole = userRole;}
}

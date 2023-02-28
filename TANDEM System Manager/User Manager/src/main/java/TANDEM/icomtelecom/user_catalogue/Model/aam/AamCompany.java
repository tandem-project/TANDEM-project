package TANDEM.icomtelecom.user_catalogue.Model.aam;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

public class AamCompany {
    @Id
    @JsonProperty("guiId")
    private String guiId=null;
    @JsonProperty("companyName")
    private String companyName=null;

    public String getGuiId() {return guiId;}
    public void setGuiId(String guiId) {this.guiId = guiId;}
    public String getCompanyName() {return companyName;}
    public void setCompanyName(String companyName) {this.companyName = companyName;}
}

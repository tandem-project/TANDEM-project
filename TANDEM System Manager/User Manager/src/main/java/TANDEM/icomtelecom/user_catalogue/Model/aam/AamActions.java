package TANDEM.icomtelecom.user_catalogue.Model.aam;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

public class AamActions {
    @Id
    @JsonProperty("guiId")
    private String guiId = null;
    @JsonProperty("order")
    private int order = 0;
    @JsonProperty("type")
    private int type = 0;
    @JsonProperty("name")
    private String name = null;
    @JsonProperty("value")
    private String value = null;
    @JsonProperty("description")
    private String description = null;


    public String getGuiId() {return guiId;}
    public void setGuiId(String guiId) {this.guiId = guiId;}
    public int getOrder() {return order;}
    public void setOrder(int order) {this.order = order;}
    public int getType() {return type;}
    public void setType(int type) {this.type = type;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getValue() {return value;}
    public void setValue(String value) {this.value = value;}
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}
}
package TANDEM.icomtelecom.service_catalogue.Model.Service;

public class ServiceOperationParameter {
    private String name;
    private String type;
    private String value;
    private String description;
    private String typical_value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTypical_value() {
        return typical_value;
    }

    public void setTypical_value(String typical_value) {
        this.typical_value = typical_value;
    }
}

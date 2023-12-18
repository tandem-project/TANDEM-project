package TANDEM.icomtelecom.service_catalogue.Model.Product;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * This enumeration defines the possible types of a service.
 */
public enum ProductType {
    Paas("PaaS"),
    FaaS("FaaS"),
    TANDEM_App("TANDEM_App"),
    User_App("User_App"),
    Device("Device");

    private String value;

    ProductType(String value) { this.value = value; }

    @Override
    @JsonValue
    public String toString() {
        switch(value) {
            case "PaaS":
                return "Support (PaaS) Services";
            case "FaaS":
                return "FaaS Services";
            case "TANDEM_App":
                return "TANDEM App. Services";
            case "User_App":
                return "User App. Services";
            case "Device":
                return "Device Services";
            default:
                return "Uninitialized";
        }
    }

    @JsonCreator
    public static ProductType fromValue(String text) {
        for (ProductType b : ProductType.values()) {
            if (String.valueOf(b.value).equals(text)) {
                return b;
            }
        }
        return null;
    }
}

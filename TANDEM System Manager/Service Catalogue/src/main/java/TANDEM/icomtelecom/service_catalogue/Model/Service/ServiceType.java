package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * This enumeration defines the possible types of a service.
 */
public enum ServiceType {
    Paas("PaaS"),
    FaaS("FaaS"),
    TANDEM_App("TANDEM_App"),
    User_App("User_App"),
    Device("Device");

    private String value;

    ServiceType(String value) { this.value = value; }

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
    public static ServiceType fromValue(String text) {
        for (ServiceType b : ServiceType.values()) {
            if (String.valueOf(b.value).equals(text)) {
                return b;
            }
        }
        return null;
    }
}

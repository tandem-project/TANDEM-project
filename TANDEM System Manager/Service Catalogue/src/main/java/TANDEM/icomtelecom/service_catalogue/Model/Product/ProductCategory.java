package TANDEM.icomtelecom.service_catalogue.Model.Product;

import TANDEM.icomtelecom.service_catalogue.Model.Service.*;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ProductCategory {
    Notification("Notification"),
    AI("AI"),
    Prediction("Prediction"),
    Object_Detection("Object Detection"),
    Location_Based("Location Based"),
    IoT("IoT"),
    IIoT("IIoT"),
    Video_Analytics("Video Analytics"),
    Augmented_Reality("Augmented Reality"),
    OLCD("Optimized Local Content Distribution"),
    Content_Cashing("Content Cashing"),
    VtoV("Vehicle to Vehicle"),
    Gaming("Gaming"),
    eHealth("eHealth");

    private String value;

    ProductCategory(String value) { this.value = value; }

    @Override
    @JsonValue
    public String toString() {
        switch(value) {
            case "Notification":
                return "Notification Services";
            case "AI":
                return "AI Services";
            case "Prediction":
                return "Prediction Services";
            case "Object Detection":
                return "Object Detection & Tracking Services";
            case "Location Based":
                return "Location Based Services";
            case "IoT":
                return "Internet of Things (IoT)";
            case "IIoT":
                return "Industrial Internet of Things (IIoT)";
            default:
                return String.valueOf(value);
        }
    }
    @JsonCreator
    public static ProductCategory fromValue(String text) {
        for (ProductCategory b : ProductCategory.values()) {
            if (String.valueOf(b.value).equals(text)) {
                return b;
            }
        }
        return null;
    }
}

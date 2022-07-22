package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * The enumeration  represents types of serializers
 */
public enum SerializerType {
  JSON("JSON"),
    XML("XML"),
    PROTOBUF3("PROTOBUF3");

  private String value;

  SerializerType(String value) {
    this.value = value;
  }

  @Override
  @JsonValue
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static SerializerType fromValue(String text) {
    for (SerializerType b : SerializerType.values()) {
      if (String.valueOf(b.value).equals(text)) {
        return b;
      }
    }
    return null;
  }
}

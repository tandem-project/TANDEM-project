package TANDEM.icomtelecom.service_catalogue.Model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * The scope of locality as expressed by \"consumedLocalOnly\" and \"isLocal\". If absent, defaults to MEC_HOST
 */
public enum LocalityType {
  MEC_SYSTEM("MEC_SYSTEM"),
    MEC_HOST("MEC_HOST"),
    NFVI_POP("NFVI_POP"),
    ZONE("ZONE"),
    ZONE_GROUP("ZONE_GROUP"),
    NFVI_NODE("NFVI_NODE");

  private String value;

  LocalityType(String value) {
    this.value = value;
  }

  @Override
  @JsonValue
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static LocalityType fromValue(String text) {
    for (LocalityType b : LocalityType.values()) {
      if (String.valueOf(b.value).equals(text)) {
        return b;
      }
    }
    return null;
  }
}

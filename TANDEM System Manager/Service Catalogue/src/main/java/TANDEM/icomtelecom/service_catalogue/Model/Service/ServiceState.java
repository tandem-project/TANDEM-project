package TANDEM.icomtelecom.service_catalogue.Model.Service;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * This enumeration defines the possible states of a service.
 */
public enum ServiceState {
  	In_Study("In Study"),
    In_Design("In Design"),
    IOA("In Organization Approve"),
    ITT("In TANDEM Test"),
    Launched("Launched"),
    Instantiated("Instantiated"),
    Rejected("Rejected"),
    Retired("Retired");

  private String value;

  ServiceState(String value) {
    this.value = value;
  }

  @Override
  @JsonValue
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static ServiceState fromValue(String text) {
    for (ServiceState b : ServiceState.values()) {
      if (String.valueOf(b.value).equals(text)) {
        return b;
      }
    }
    return null;
  }
}

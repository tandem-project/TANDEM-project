package TANDEM.icomtelecom.device_catalogue.Model.Search;

import java.util.List;

public class DeviceSearchCriteria {
    private String name;
    private List<String> labels;
    private String operatingState;
    private String adminState;

    public DeviceSearchCriteria(String name, List<String> labels, String operatingState, String adminState) {
        this.name = name;
        this.labels = labels;
        this.operatingState = operatingState;
        this.adminState = adminState;
    }
}

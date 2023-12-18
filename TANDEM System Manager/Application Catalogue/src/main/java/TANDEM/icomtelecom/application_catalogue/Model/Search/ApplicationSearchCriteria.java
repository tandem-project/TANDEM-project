package TANDEM.icomtelecom.application_catalogue.Model.Search;

import java.util.List;

public class ApplicationSearchCriteria {
    private String name;
    private List<String> labels;
    private String operatingState;
    private String adminState;

    public ApplicationSearchCriteria(String name, List<String> labels, String operatingState, String adminState) {
        this.name = name;
        this.labels = labels;
        this.operatingState = operatingState;
        this.adminState = adminState;
    }
}

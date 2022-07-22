package TANDEM.icomtelecom.service_catalogue.Model.Search;

public class ServiceSearchCriteria {
    private String key;
    private String operation;
    private Object value;

    public ServiceSearchCriteria(String key, String operation, Object value) {
        this.key = key;
        this.operation = operation;
        this.value = value;
    }
}

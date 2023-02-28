package TANDEM.icomtelecom.infrastructure_catalogue.Model.Search;

public class InfrastructureSearchCriteria {
    private String name;
    private String availabilityZone;
    private String provider;

    public InfrastructureSearchCriteria(String name, String availabilityZone, String provider) {
        this.name = name;
        this.availabilityZone = availabilityZone;
        this.provider = provider;
    }
}

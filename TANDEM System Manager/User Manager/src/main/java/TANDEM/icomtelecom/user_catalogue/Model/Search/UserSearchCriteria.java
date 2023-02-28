package TANDEM.icomtelecom.user_catalogue.Model.Search;

public class UserSearchCriteria {
    private String name;
    private String availabilityZone;
    private String provider;

    public UserSearchCriteria(String name, String availabilityZone, String provider) {
        this.name = name;
        this.availabilityZone = availabilityZone;
        this.provider = provider;
    }
}

package TANDEM.icomtelecom.infrastructure_catalogue.Model.Exceptions;

public class InfrastructureNotFoundException extends RuntimeException {

    public InfrastructureNotFoundException(String id) {
        super("Could not find infrastructure with id:  " + id);
    }
}

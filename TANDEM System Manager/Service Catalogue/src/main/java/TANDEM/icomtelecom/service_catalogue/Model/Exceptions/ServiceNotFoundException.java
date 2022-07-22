package TANDEM.icomtelecom.service_catalogue.Model.Exceptions;

public class ServiceNotFoundException extends RuntimeException {

    public ServiceNotFoundException(String id) {
        super("Could not find service with id:  " + id);
    }
}

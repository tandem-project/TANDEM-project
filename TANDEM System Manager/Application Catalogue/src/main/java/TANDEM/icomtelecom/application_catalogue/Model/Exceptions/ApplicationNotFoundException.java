package TANDEM.icomtelecom.application_catalogue.Model.Exceptions;

public class ApplicationNotFoundException extends RuntimeException {

    public ApplicationNotFoundException(String id) {
        super("Could not find device with id:  " + id);
    }
}

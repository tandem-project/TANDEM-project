package TANDEM.icomtelecom.service_catalogue.Model.Exceptions;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String name) {
        super("Could not find order with name: " + name);
    }
}

package TANDEM.icomtelecom.service_catalogue.Model.Exceptions;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String name) {
        super("Could not find product with name: " + name);
    }
}

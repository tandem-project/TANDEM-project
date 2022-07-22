package TANDEM.icomtelecom.service_catalogue.Model.Exceptions;

public class WorkflowNotFoundException extends RuntimeException {
    public WorkflowNotFoundException(String name) {
        super("Could not find workflow with name: " + name);
    }
}

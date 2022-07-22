package TANDEM.icomtelecom.service_catalogue.Repositories;

import java.util.List;

public interface WorkflowCustomRepository {
    public List<String> findNames();
    public List<String> findTypes();
    public List<String> findDescriptions();
}

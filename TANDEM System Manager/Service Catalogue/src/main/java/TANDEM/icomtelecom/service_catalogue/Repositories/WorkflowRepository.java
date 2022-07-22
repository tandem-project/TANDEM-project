package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Workflows.Workflow;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkflowRepository extends MongoRepository<Workflow, String>{
}

package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Service.SerState;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceStateRepository extends MongoRepository<SerState, String> {
}

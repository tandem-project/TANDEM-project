package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceState;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceStateRepository extends MongoRepository<ServiceState, String>, ServiceStateCustomRepository{

}

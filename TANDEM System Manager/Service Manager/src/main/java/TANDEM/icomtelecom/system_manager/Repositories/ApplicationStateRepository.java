package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.ApplicationState;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApplicationStateRepository extends MongoRepository<ApplicationState, String>, ApplicationStateCustomRepository{

}

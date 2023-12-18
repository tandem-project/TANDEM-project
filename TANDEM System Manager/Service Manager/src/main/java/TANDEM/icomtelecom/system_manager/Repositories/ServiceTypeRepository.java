package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceTypeRepository extends MongoRepository<ServiceType, String>, ServiceTypeCustomRepository{

}

package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceCategoryRepository extends MongoRepository<ServiceCategory, String>, ServiceCategoryCustomRepository{

}

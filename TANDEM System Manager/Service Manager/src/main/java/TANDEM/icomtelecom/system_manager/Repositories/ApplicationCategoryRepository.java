package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.ApplicationCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApplicationCategoryRepository extends MongoRepository<ApplicationCategory, String>, ApplicationCategoryCustomRepository{

}

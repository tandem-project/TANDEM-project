package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.ProductType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductTypeRepository extends MongoRepository<ProductType, String>, ProductTypeCustomRepository{

}

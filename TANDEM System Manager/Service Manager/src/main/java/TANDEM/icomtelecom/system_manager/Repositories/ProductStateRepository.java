package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.ProductState;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductStateRepository extends MongoRepository<ProductState, String>, ProductStateCustomRepository{

}

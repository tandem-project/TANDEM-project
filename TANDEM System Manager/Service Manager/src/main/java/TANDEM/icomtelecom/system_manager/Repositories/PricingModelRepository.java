package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.PricingModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PricingModelRepository extends MongoRepository<PricingModel, String>, PricingModelCustomRepository{

}
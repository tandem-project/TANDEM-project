package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.PricingUnit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PricingUnitRepository extends MongoRepository<PricingUnit, String>, PricingUnitCustomRepository{

}

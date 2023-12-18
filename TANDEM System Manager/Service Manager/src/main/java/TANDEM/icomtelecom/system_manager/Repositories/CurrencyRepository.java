package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.Currency;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CurrencyRepository extends MongoRepository<Currency, String>, CurrencyCustomRepository{

}

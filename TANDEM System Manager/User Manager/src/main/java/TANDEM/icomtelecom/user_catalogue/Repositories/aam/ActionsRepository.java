package TANDEM.icomtelecom.user_catalogue.Repositories.aam;

import TANDEM.icomtelecom.user_catalogue.Model.aam.AamActions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActionsRepository extends MongoRepository<AamActions, Integer>{

}

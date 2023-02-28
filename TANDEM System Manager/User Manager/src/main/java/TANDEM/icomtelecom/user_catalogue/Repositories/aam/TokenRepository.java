package TANDEM.icomtelecom.user_catalogue.Repositories.aam;

import TANDEM.icomtelecom.user_catalogue.Model.aam.AamToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TokenRepository extends MongoRepository<AamToken, Integer>{

}

package TANDEM.icomtelecom.user_catalogue.Repositories.aam;

import TANDEM.icomtelecom.user_catalogue.Model.aam.AamRolesActions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RolesActionsRepository extends MongoRepository<AamRolesActions, Integer>{

}
package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.SLA;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SLARepository extends MongoRepository<SLA, String>, SLACustomRepository{

}

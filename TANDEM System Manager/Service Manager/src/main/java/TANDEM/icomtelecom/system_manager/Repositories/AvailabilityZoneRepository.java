package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.AvailabilityZone;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AvailabilityZoneRepository extends MongoRepository<AvailabilityZone, String>, AvailabilityZoneCustomRepository{

}

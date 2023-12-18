package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.DeviceType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeviceTypeRepository extends MongoRepository<DeviceType, String>, DeviceTypeCustomRepository{

}

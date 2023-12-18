package TANDEM.icomtelecom.device_catalogue.Repositories;

import TANDEM.icomtelecom.device_catalogue.Model.Device.Device;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeviceRepository extends MongoRepository<Device, String>, DeviceCustomRepository{

}

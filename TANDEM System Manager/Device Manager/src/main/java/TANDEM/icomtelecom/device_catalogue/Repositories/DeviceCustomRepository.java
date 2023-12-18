package TANDEM.icomtelecom.device_catalogue.Repositories;

import TANDEM.icomtelecom.device_catalogue.Model.Device.Device;
import org.springframework.data.domain.Pageable;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

public interface DeviceCustomRepository {
    
    public List<Device> findDeviceByProperties(String name, 
            List<String> labels, 
            String operatingState,
            String adminState,
            Pageable page);
}

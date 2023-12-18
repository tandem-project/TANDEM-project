package TANDEM.icomtelecom.device_catalogue.Controllers;

import TANDEM.icomtelecom.device_catalogue.Model.Exceptions.DeviceNotFoundException;
import TANDEM.icomtelecom.device_catalogue.Model.Device.Device;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import TANDEM.icomtelecom.device_catalogue.Repositories.DeviceRepository;

@RestController
@RequestMapping("devicecatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class DeviceRESTController {

    @Autowired
    DeviceRepository deviceRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    
    // get devices
    @GetMapping("/get/devices")
    public List<Device> getAllDevices(){
        return deviceRepository.findAll();
    }

    //find specific device by id
    @GetMapping("/get/devices/{id}")
    Device getDeviceById(@PathVariable String id) throws DeviceNotFoundException {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new DeviceNotFoundException(id));
    }

    //create a device
    @PostMapping(path = "/create/devices",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Device> createDevice(@RequestBody @Valid Device newDevice) throws Exception {
        Device device = deviceRepository.save(newDevice);
        if (device == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(device, HttpStatus.CREATED);
        }
    }

    //update a device
    @PutMapping(path = "/update/devices/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
 //   @RolesAllowed({"platinum","gold"})
    public Device updateDevice(@PathVariable String id, @RequestBody Device newDevice) throws Exception{
        return deviceRepository.findById(id)
                .map(device -> {
                    device.setName(newDevice.getName());
                    device.setType(newDevice.getType());
                    device.setDescription(newDevice.getDescription());
                    device.setLabels(newDevice.getLabels());
                    device.setOperatingState(newDevice.getOperatingState());
                    device.setAdminState(newDevice.getAdminState());
                    device.setIp(newDevice.getIp());
                    device.setPort(newDevice.getPort());
                    device.setDeviceNode(newDevice.getDeviceNode());
                    return deviceRepository.save(device);
                }).orElseThrow(() -> new DeviceNotFoundException(id));
    }

    //Delete a device
    @DeleteMapping("/delete/devices/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteDeviceById(@PathVariable String id){
        deviceRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }

}

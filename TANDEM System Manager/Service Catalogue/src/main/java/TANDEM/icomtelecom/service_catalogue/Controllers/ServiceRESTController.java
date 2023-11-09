package TANDEM.icomtelecom.service_catalogue.Controllers;

import TANDEM.icomtelecom.service_catalogue.Model.Exceptions.ServiceNotFoundException;
import TANDEM.icomtelecom.service_catalogue.Model.Service.Service;
import TANDEM.icomtelecom.service_catalogue.Repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("servicecatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class ServiceRESTController {

    @Autowired
    ServiceRepository serviceRepository;
    // All services
    @GetMapping("/get/services")
    public List<Service> getAllServices(){
        return serviceRepository.findAll();
    }
    
    //find specific service by id
    @GetMapping("/get/services/{id}")
    Service getServiceById(@PathVariable String id) throws ServiceNotFoundException {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ServiceNotFoundException(id));
    }

    //search for services
    @GetMapping("/search")
    public ResponseEntity<?> getServicesByProperties(@RequestParam(required = false) String serName,
                                                     @RequestParam(required = false) String version, @RequestParam(required = false) String state,
                                                     @RequestParam Integer page) {
        List<Service> services = serviceRepository.findServicesByProperties(serName, version, state, PageRequest.of(page, 15));
        return ResponseEntity.ok().body(services);
    }

    //create a service
    @PostMapping(path = "/create/services",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Service> createService(@RequestBody @Valid Service newService) throws Exception {
        Service service = serviceRepository.save(newService);
        if (service == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(service, HttpStatus.CREATED);
        }
    }

    //update a service
    @PutMapping(path = "/update/services/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
 //   @RolesAllowed({"platinum","gold"})
    public Service updateService(@PathVariable String id, @RequestBody Service newService) throws Exception{
        return serviceRepository.findById(id)
                .map(service -> {
                    service.setSerName(newService.getSerName());
                    service.setSerType(newService.getSerType());
                    service.setSerProvider(newService.getSerProvider());
                    service.setSerDescription(newService.getSerDescription());
                    service.setSerCategory(newService.getSerCategory());
                    service.setSerVersion(newService.getSerVersion());
                    service.setState(newService.getState());
                    service.setSerAPIDescriptionURL(newService.getSerAPIDescriptionURL());
                    service.setSerConfigParams(newService.getSerConfigParams());
                    service.setSerOperations(newService.getSerOperations());
                    service.setSerComputeReq(newService.getSerComputeReq());
                    service.setSerStorageReq(newService.getSerStorageReq());
                    service.setSerLatencyReq(newService.getSerLatencyReq());
                    service.setSerThroughputReq(newService.getSerThroughputReq());
                    service.setSerServiceReq(newService.getSerServiceReq());
                    service.setSerServiceOptional(newService.getSerServiceOptional());
                    service.setSerSwImage(newService.getSerSwImage());
                    service.setSerializer(newService.getSerializer());
                    service.setTransportType(newService.getTransportType());
                    service.setTransportProtocol(newService.getTransportProtocol());
                    service.setScopeOfLocality(newService.getScopeOfLocality());
                    service.setConsumedLocalOnly(newService.getConsumedLocalOnly());
                    service.setIsLocal(newService.getIsLocal());
               //     service.setPiEdgeInfo(newService.getPiEdgeInfo());
                    return serviceRepository.save(service);
                }).orElseThrow(() -> new javax.management.ServiceNotFoundException(id));
    }

    
    
      //update a service state
    @PutMapping(path = "/update/services/state",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
 //   @RolesAllowed({"platinum","gold"})
    public Service updateServiceState(@RequestBody Service newServiceState) throws Exception{
        return serviceRepository.findById(newServiceState.getSerId())
                .map(service -> {                
                    service.setState(newServiceState.getState());
                    return serviceRepository.save(service);
                }).orElseThrow(() -> new javax.management.ServiceNotFoundException(newServiceState.getSerId()));
    }
    
    
   
    
    //Delete a service
    @DeleteMapping("/delete/services/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteServiceById(@PathVariable String id){
        serviceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

//    //------------------Security----------------------//
//    @GetMapping("/getToken")
//    String GetToken(@RequestParam(required = true) String username,
//                    @RequestParam(required = true) String password){
//        String urlParameters  = "client_id=data1&username=data2&password=data3&grant_type=";
//    }
}

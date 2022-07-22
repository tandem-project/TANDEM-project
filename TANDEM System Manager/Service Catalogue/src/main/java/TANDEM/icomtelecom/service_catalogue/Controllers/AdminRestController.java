package TANDEM.icomtelecom.service_catalogue.Controllers;

import TANDEM.icomtelecom.service_catalogue.Model.Service.SerCategory;
import TANDEM.icomtelecom.service_catalogue.Model.Service.SerState;
import TANDEM.icomtelecom.service_catalogue.Model.Service.ServiceCategory;
import TANDEM.icomtelecom.service_catalogue.Model.Service.ServiceState;
import TANDEM.icomtelecom.service_catalogue.Repositories.ServiceCategoryRepository;
import TANDEM.icomtelecom.service_catalogue.Repositories.ServiceStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("servicecatalogue/admin")
@CrossOrigin("*")
public class AdminRestController {
    @Autowired
    ServiceCategoryRepository serviceCategoryRepository;

    @Autowired
    ServiceStateRepository serviceStateRepository;

    //Service Categories
    @GetMapping("/servicecategory")
    public List<SerCategory> getAllServiceCategories(){
        return serviceCategoryRepository.findAll();
    }

    @PostMapping(path = "/servicecategory",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createServiceCategory(@RequestBody SerCategory newServiceCategory) throws Exception {
        if (newServiceCategory == null || newServiceCategory.getCategory().isEmpty()) {
            return new ResponseEntity<>("Invalid arguments", HttpStatus.BAD_REQUEST);
        } else {
            serviceCategoryRepository.save(newServiceCategory);
            return new ResponseEntity<>(newServiceCategory, HttpStatus.CREATED);
        }
    }

    @PostMapping(path = "/servicecategories",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createServiceCategories(@RequestBody List<SerCategory> newServiceCategories) throws Exception {
        if (newServiceCategories == null || newServiceCategories.isEmpty()) {
            return new ResponseEntity<>("Invalid arguments", HttpStatus.BAD_REQUEST);
        } else {
            serviceCategoryRepository.saveAll(newServiceCategories);
            return new ResponseEntity<>(newServiceCategories, HttpStatus.CREATED);
        }
    }

    @DeleteMapping(path =  "/servicecategory",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteServiceCategory(@RequestBody SerCategory serviceCategory) throws Exception {
        if (serviceCategory == null || serviceCategory.getCategory().isEmpty()) {
            return new ResponseEntity<>("Invalid arguments", HttpStatus.BAD_REQUEST);
        } else {
            serviceCategoryRepository.delete(serviceCategory);
            return new ResponseEntity<>("Deleted " + serviceCategory, HttpStatus.OK);
        }
    }

    @DeleteMapping(path =  "/servicecategories",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteServiceCategories(@RequestBody List<SerCategory> serviceCategories) throws Exception {
        if (serviceCategories == null || serviceCategories.isEmpty()) {
            return new ResponseEntity<>("Invalid arguments", HttpStatus.BAD_REQUEST);
        } else {
            serviceCategoryRepository.deleteAll(serviceCategories);
            return new ResponseEntity<>("Deleted " + serviceCategories, HttpStatus.OK);
        }
    }

    //Service States
    @GetMapping("/servicestate")
    public List<SerState> getAllServiceStates(){
        return serviceStateRepository.findAll();
    }

    @PostMapping(path = "/servicestate",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createServiceState(@RequestBody SerState newServiceState) throws Exception {
        if (newServiceState == null || newServiceState.getState().isEmpty()) {
            return new ResponseEntity<>("Invalid arguments", HttpStatus.BAD_REQUEST);
        } else {
            serviceStateRepository.save(newServiceState);
            return new ResponseEntity<>(newServiceState, HttpStatus.CREATED);
        }
    }

    @PostMapping(path = "/servicestates",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createServiceStates(@RequestBody List<SerState> newServiceStates) throws Exception {
        if (newServiceStates == null || newServiceStates.isEmpty()) {
            return new ResponseEntity<>("Invalid arguments", HttpStatus.BAD_REQUEST);
        } else {
            serviceStateRepository.saveAll(newServiceStates);
            return new ResponseEntity<>(newServiceStates, HttpStatus.CREATED);
        }
    }

    @DeleteMapping(path =  "/servicestate",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteServiceState(@RequestBody SerState serviceState) throws Exception {
        if (serviceState == null || serviceState.getState().isEmpty()) {
            return new ResponseEntity<>("Invalid arguments", HttpStatus.BAD_REQUEST);
        } else {
            serviceStateRepository.delete(serviceState);
            return new ResponseEntity<>("Deleted " + serviceState, HttpStatus.OK);
        }
    }

    @DeleteMapping(path =  "/servicestates",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteServiceStates(@RequestBody List<SerState> serviceStates) throws Exception {
        if (serviceStates == null || serviceStates.isEmpty()) {
            return new ResponseEntity<>("Invalid arguments", HttpStatus.BAD_REQUEST);
        } else {
            serviceStateRepository.deleteAll(serviceStates);
            return new ResponseEntity<>("Deleted " + serviceStates, HttpStatus.OK);
        }
    }

    @GetMapping(path = "/sercategories")
    public List<String> getServiceCategories(){
        return Stream.of(ServiceCategory.values()).map(serviceCategory -> serviceCategory.name()).collect(Collectors.toList());
    }
    @GetMapping(path = "/serstates")
    public List<String> getServiceStates(){
        return Stream.of(ServiceState.values()).map(serviceState -> serviceState.name()).collect(Collectors.toList());
    }
}

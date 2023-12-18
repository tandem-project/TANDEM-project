package TANDEM.icomtelecom.application_catalogue.Controllers;

import TANDEM.icomtelecom.application_catalogue.Model.Exceptions.ApplicationNotFoundException;
import TANDEM.icomtelecom.application_catalogue.Model.Application.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;
import com.google.gson.Gson;
import org.json.JSONObject;
import TANDEM.icomtelecom.application_catalogue.Repositories.ApplicationRepository;

@RestController
@RequestMapping("applicationcatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class ApplicationRESTController {

    @Autowired
    ApplicationRepository applicationRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    // All services
    @GetMapping("/get/applications")
    public List<Application> getAllApplications(){
        return applicationRepository.findAll();
    }

    //find specific application by id
    @GetMapping("/get/applications/{id}")
    Application getApplicationById(@PathVariable String id) throws ApplicationNotFoundException {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException(id));
    }


    //create an application
    @PostMapping(path = "/create/application",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Application> createApplication(@RequestBody @Valid Application newApplication) throws Exception {
        Application application = applicationRepository.save(newApplication);
        if (application == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(application, HttpStatus.CREATED);
        }
    }

    //update an application
    @PutMapping(path = "/update/applications/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
 //   @RolesAllowed({"platinum","gold"})
    public Application updateApplication(@PathVariable String id, @RequestBody Application newApplication) throws Exception{
        return applicationRepository.findById(id)
                .map(application -> {
                    application.setName(newApplication.getName());
                    application.setCategory(newApplication.getCategory());
                    application.setDescription(newApplication.getDescription());
                    application.setProvider(newApplication.getProvider());
                    application.setApplicationServices(newApplication.getApplicationServices());
                    application.setSupportServices(newApplication.getSupportServices());
                    application.setServiceChain(newApplication.getServiceChain());
                    application.setState(newApplication.getState());
                    application.setAppURL(newApplication.getAppURL());
                    application.setMonServicesURL(newApplication.getMonServicesURL());
                    return applicationRepository.save(application);
                }).orElseThrow(() -> new ApplicationNotFoundException(id));
    }

    //Delete an application
    @DeleteMapping("/delete/applications/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteApplicationById(@PathVariable String id){
        applicationRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }


}

package TANDEM.icomtelecom.service_catalogue.Controllers;

import TANDEM.icomtelecom.service_catalogue.Model.Exceptions.WorkflowNotFoundException;
import TANDEM.icomtelecom.service_catalogue.Model.Workflows.Workflow;
import TANDEM.icomtelecom.service_catalogue.Repositories.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("workflows")
@CrossOrigin("*")
public class WorkflowRestController {
    @Autowired
    WorkflowRepository workflowRepository;

    @GetMapping("/list")
    public List<Workflow> getAllWorkflows(){
        return workflowRepository.findAll();
    }

    @GetMapping("/{name}")
    ResponseEntity<?> getWorkflowByName(@PathVariable String name) {
        Optional workflow = workflowRepository.findById(name);
        if (workflow.isPresent())
            return new ResponseEntity<>(workflow, HttpStatus.OK);
        else
            return new ResponseEntity<String>(new WorkflowNotFoundException(name).getMessage(), HttpStatus.NOT_FOUND);
    }
    @PostMapping(path = "/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createWorkflow(@RequestBody @Valid  Workflow newWorkflow, BindingResult result) throws Exception {
        if(result.hasErrors()) {
            return new ResponseEntity<>(result.getAllErrors().get(0).getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        if(workflowRepository.existsById(newWorkflow.getName())){
            return new ResponseEntity<>("Workflow with name " + newWorkflow.getName() + " already exists", HttpStatus.CONFLICT);
        }
        Workflow workflow = workflowRepository.save(newWorkflow);
        if (workflow == null) {
            return new ResponseEntity<String>("Invalid Arguments", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(workflow, HttpStatus.CREATED);
        }
    }

    @DeleteMapping(path = "/delete/{name}")
    public ResponseEntity<?> createWorkflow(@PathVariable String name) throws Exception {
        if(!workflowRepository.existsById(name)){
            return new ResponseEntity<String>(new WorkflowNotFoundException(name).getMessage(), HttpStatus.NOT_FOUND);
        }
        workflowRepository.deleteById(name);
        return new ResponseEntity<>("Deleted workflow " + name, HttpStatus.OK);
    }

    @PutMapping(path = "/update",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateWorkflow(@RequestBody @Valid Workflow updatedWorkflow){
        Optional oldWorkflow = workflowRepository.findById(updatedWorkflow.getName());
        if(!oldWorkflow.isPresent())
            return new ResponseEntity<String>(new WorkflowNotFoundException(updatedWorkflow.getName()).getMessage(), HttpStatus.NOT_FOUND);
        else{
            workflowRepository.save(updatedWorkflow);
            return new ResponseEntity<>(updatedWorkflow, HttpStatus.OK);
        }
    }

    @GetMapping("/names")
    public List<String> getNames(){
        return workflowRepository.findAll().stream().map(workflow -> workflow.getName()).collect(Collectors.toList());
    }

    @GetMapping("/types")
    public List<String> getTypes(){
        return workflowRepository.findAll().stream().map(workflow -> workflow.getType()).collect(Collectors.toList());
    }

    @GetMapping("/descriptions")
    public List<String> getDescriptions(){
        return workflowRepository.findAll().stream().map(workflow -> workflow.getDescription()).collect(Collectors.toList());
    }
}

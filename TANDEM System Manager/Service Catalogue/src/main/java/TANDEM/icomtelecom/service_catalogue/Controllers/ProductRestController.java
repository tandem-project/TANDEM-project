package TANDEM.icomtelecom.service_catalogue.Controllers;

import TANDEM.icomtelecom.service_catalogue.Model.Exceptions.ProductNotFoundException;
import TANDEM.icomtelecom.service_catalogue.Model.Product.Product;
import TANDEM.icomtelecom.service_catalogue.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
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
public class ProductRestController {

    @Autowired
    ProductRepository productRepository;
    // All products
    @GetMapping("/get/products")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    //find specific service by id
  /*  @GetMapping("/get/products/{id}")
    Service getProductById(@PathVariable String id) throws ProductNotFoundException {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }*/

    //search for services
 /*   @GetMapping("/search")
    public ResponseEntity<?> getServicesByProperties(@RequestParam(required = false) String serName,
                                                     @RequestParam(required = false) String version, @RequestParam(required = false) String state,
                                                     @RequestParam Integer page) {
        List<Service> services = serviceRepository.findServicesByProperties(serName, version, state, PageRequest.of(page, 15));
        return ResponseEntity.ok().body(services);
    }*/

    //create a product
    @PostMapping(path = "/create/products",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Product> createProduct(@RequestBody @Valid Product newProduct) throws Exception {
        Product product = productRepository.save(newProduct);
        if (product == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        }
    }

    //update a service
 /*   @PutMapping(path = "/update/services/{id}",
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
//                    service.setVersion(newService.getVersion());
                    service.setState(newService.getState());
//                    service.setTransportInfo(newService.getTransportInfo());
                    service.setSerConfigParameters(newService.getSerConfigParameters());
                    service.setSerOperations(newService.getSerOperations());
                    service.setSerComputeReq(newService.getSerComputeReq());
                    service.setSerStorageReq(newService.getSerStorageReq());
                    service.setSerLatencyReq(newService.getSerLatencyReq());
                    service.setSerThroughputReq(newService.getSerThroughputReq());
                    service.setSerServiceReq(newService.getSerServiceReq());
                    service.setSerServiceOptional(newService.getSerServiceOptional());
                    service.setSerSwImage(newService.getSerSwImage());
                    service.setSerializer(newService.getSerializer());
                    service.setSerializer(newService.getSerializer());
                    service.setTransportType(newService.getTransportType());
                    service.setTransportProtocol(newService.getTransportProtocol());
                    service.setScopeOfLocality(newService.getScopeOfLocality());
                    service.setConsumedLocalOnly(newService.getConsumedLocalOnly());
                    service.setLocal(newService.getLocal());
                    service.setPiEdgeInfo(newService.getPiEdgeInfo());
                    return serviceRepository.save(service);
                }).orElseThrow(() -> new javax.management.ServiceNotFoundException(id));
    }

    */
    
    
    //Delete a product
    @DeleteMapping("/delete/products/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteProductById(@PathVariable String id){
        productRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

//    //------------------Security----------------------//
//    @GetMapping("/getToken")
//    String GetToken(@RequestParam(required = true) String username,
//                    @RequestParam(required = true) String password){
//        String urlParameters  = "client_id=data1&username=data2&password=data3&grant_type=";
//    }
}

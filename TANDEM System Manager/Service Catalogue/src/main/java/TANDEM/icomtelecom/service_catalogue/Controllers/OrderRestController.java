package TANDEM.icomtelecom.service_catalogue.Controllers;

import TANDEM.icomtelecom.service_catalogue.Model.Exceptions.OrderNotFoundException;
import TANDEM.icomtelecom.service_catalogue.Model.Exceptions.ProductNotFoundException;
import TANDEM.icomtelecom.service_catalogue.Model.Order.Order;
import TANDEM.icomtelecom.service_catalogue.Model.Product.Product;
import TANDEM.icomtelecom.service_catalogue.Model.Product.ProductAvailabilityZones;
import TANDEM.icomtelecom.service_catalogue.Model.Product.ProductPricePerChargeUnit;
import TANDEM.icomtelecom.service_catalogue.Model.Product.ProductRef;
import TANDEM.icomtelecom.service_catalogue.Model.Service.Service;
import TANDEM.icomtelecom.service_catalogue.Repositories.OrderRepository;
import TANDEM.icomtelecom.service_catalogue.Repositories.ProductRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.domain.PageRequest;

@RestController
@RequestMapping("servicecatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class OrderRestController {

    @Autowired
    OrderRepository orderRepository;
    // All products
    @GetMapping("/get/orders")
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    //find specific service by id
    @GetMapping("/get/orders/{id}")
    Order getOrderById(@PathVariable String id) throws OrderNotFoundException {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    //search for products
  /*  @GetMapping("/search/products")
    public ResponseEntity<?> getProductsByProperties(@RequestParam(required = false) String serName,
                                                     @RequestParam(required = false) String version, @RequestParam(required = false) String state,
                                                     @RequestParam Integer page) {
        List<Product> products = productRepository.findProductsByProperties(serName, version, state, PageRequest.of(page, 15));
        return ResponseEntity.ok().body(products);
    }*/

    //create a product
    @PostMapping(path = "/create/orders",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Order> createOrder(@RequestBody @Valid Order newOrder) throws Exception {
        Order order = orderRepository.save(newOrder);
        if (order == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(order, HttpStatus.CREATED);
        }
    }

    //update a service
 /*   @PutMapping(path = "/update/products/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
 //   @RolesAllowed({"platinum","gold"})
    public Product updateProduct(@PathVariable String id, @RequestBody Product newProduct) throws Exception{
        return productRepository.findById(id)
                .map(product -> {
                    product.setProductName(newProduct.getProductName());
                    product.setProductType(newProduct.getProductType());
                    product.setProductProvider(newProduct.getProductProvider());
                    product.setProductDescription(newProduct.getProductDescription());
                    product.setProductCategory(newProduct.getProductCategory());
                    product.setProductVersion(newProduct.getProductVersion());
                    product.setProductNode(newProduct.getProductNode());
                    product.setProductLifeCycleStatus(newProduct.getProductLifeCycleStatus());
                    product.setProductLifeCycleStatusReason(newProduct.getProductLifeCycleStatusReason());
                    product.setProductIsBuddle(newProduct.getProductIsBuddle());
                    product.setProductIsSellable(newProduct.getProductIsSellable());
                    product.setProductServiceId(newProduct.getProductServiceId()); 
                    product.setProductServiceName(newProduct.getProductServiceName());
                    product.setProductApplicationId(newProduct.getProductApplicationId());
                    product.setProductApplicationName(newProduct.getProductApplicationName());
                    product.setProductValidFrom(newProduct.getProductValidFrom());
                    product.setProductValidTo(newProduct.getProductValidTo());
                    product.setProductLastUpdate(newProduct.getProductLastUpdate());
                    product.setProductPricingModel(newProduct.getProductPricingModel());
                    product.setProductPricePerChargeUnit(newProduct.getProductPricePerChargeUnit());
                    product.setProductPriceCurrency(newProduct.getProductPriceCurrency());
                    product.setProductAvailabilityZones(newProduct.getProductAvailabilityZones());
                    product.setProductServiceLevelAgreementId(newProduct.getProductServiceLevelAgreementId());
                    product.setProductServiceLevelAgreementName(newProduct.getProductServiceLevelAgreementName());
                    product.setProductServiceLevelAgreementDescription(newProduct.getProductServiceLevelAgreementDescription());
                    product.setCountMin(newProduct.getCountMin());
                    product.setCountMax(newProduct.getCountMax());
                    return productRepository.save(product);
                }).orElseThrow(() -> new ProductNotFoundException(id));
    }*/
/*
    
          //update a product state
    @PutMapping(path = "/update/products/state",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
 //   @RolesAllowed({"platinum","gold"})
    public Product updateProductState(@RequestBody Product newProductState) throws Exception{
        return productRepository.findById(newProductState.getProductId())
                .map(product -> {                
                    product.setProductLifeCycleStatus(newProductState.getProductLifeCycleStatus());
                    return productRepository.save(product);
                }).orElseThrow(() -> new ProductNotFoundException(newProductState.getProductId()));
    }*/
    
    
    
    //Delete a product
    @DeleteMapping("/delete/orders/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteOrderById(@PathVariable String id){
        orderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

//    //------------------Security----------------------//
//    @GetMapping("/getToken")
//    String GetToken(@RequestParam(required = true) String username,
//                    @RequestParam(required = true) String password){
//        String urlParameters  = "client_id=data1&username=data2&password=data3&grant_type=";
//    }
}

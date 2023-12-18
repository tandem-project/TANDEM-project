package TANDEM.icomtelecom.service_catalogue.Controllers;

import TANDEM.icomtelecom.service_catalogue.Model.Exceptions.OrderNotFoundException;
import TANDEM.icomtelecom.service_catalogue.Model.Order.Order;
import TANDEM.icomtelecom.service_catalogue.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("servicecatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class OrderRestController {

    @Autowired
    OrderRepository orderRepository;
    // All orders
    @GetMapping("/get/orders")
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    //find specific order by id
    @GetMapping("/get/orders/{id}")
    Order getOrderById(@PathVariable String id) throws OrderNotFoundException {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    //create an order
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


    //Delete an order
    @DeleteMapping("/delete/orders/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteOrderById(@PathVariable String id){
        orderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}

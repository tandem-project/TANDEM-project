package TANDEM.icomtelecom.user_catalogue.Controllers;

import TANDEM.icomtelecom.user_catalogue.Model.Exceptions.UserNotFoundException;
import TANDEM.icomtelecom.user_catalogue.Model.User.User;
import TANDEM.icomtelecom.user_catalogue.Model.aam.AamCompany;
import TANDEM.icomtelecom.user_catalogue.Repositories.aam.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import TANDEM.icomtelecom.user_catalogue.Repositories.UserRepository;

@RestController
@RequestMapping("usercatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class UserRESTController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    // All services
    @GetMapping("/get/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //find specific service by id
    @GetMapping("/get/users/{id}")
    User getUserById(@PathVariable String id) throws UserNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    //search for services
    @GetMapping("/search")
    public ResponseEntity<?> getUserByProperties(@RequestParam(required = false) String userFirstName,
                                                     @RequestParam(required = false) String userLastName, 
                                                     @RequestParam(required = false) String userName,
                                                     @RequestParam(required = false) String userAccountType,
                                                     @RequestParam(required = false) String userCompanyName,
                                                     @RequestParam(required = false) String userRole
                                                    //,@RequestParam Integer page
    ) {
        List<User> userlst = null;
        if (userCompanyName==null||userCompanyName.isEmpty()){
            userlst = mongoTemplate.findAll(User.class);
        }else{
            Query query = new Query();
            query.addCriteria(Criteria.where("userCompanyName").is(userCompanyName));
            userlst = mongoTemplate.find(query, User.class);
        }

        //List<User> infrastructures = userRepository.findUserByProperties(userFirstName, userLastName, userName, userAccountType, userCompanyName, userRole, PageRequest.of(page, 15));
        return ResponseEntity.ok().body(userlst);
    }

    //create a service
    @PostMapping(path = "/create/users",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<User> createUser(@RequestHeader(value="AAM-Authorization-Token") String token,
                                           @RequestBody User newUser) throws Exception {

//////////////////////////////////////////////////////
        // http call http//<ip>aam/check/auth  passing the token
        //String tmp1 = AamConnection.checkAndRefresh(token,"f.usercatalogue.create.users");
        //JSONObject jtmp1 = new JSONObject(tmp1);
        //if (jtmp1.getInt("status")!=200)
            //return new ResponseEntity<>(new User(), HttpStatus.FORBIDDEN);
//////////////////////////////////////////////////////
        User user = userRepository.save(newUser);
        // in order to save comapny
        saveCompany(user);

        if (user == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }
    }

    //update a service
    @PutMapping(path = "/update/users/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
 //   @RolesAllowed({"platinum","gold"})
    public User updateUser(@PathVariable String id, @RequestBody User newUser) throws Exception{
        return userRepository.findById(id)
                .map(user -> {
                    user.setUserFirstName(newUser.getUserFirstName());
                    user.setUserLastName(newUser.getUserLastName());
                    user.setUserEmail(newUser.getUserEmail());
                    user.setUserName(newUser.getUserName());
                    user.setUserPassword(newUser.getUserPassword());
                    user.setUserAccountType(newUser.getUserAccountType());
                    user.setUserRole(newUser.getUserRole());
                    user.setUserBillingAddress(newUser.getUserBillingAddress());
                    user.setUserPhysicalAddress(newUser.getUserPhysicalAddress());
                    user.setUserPaymentInfo(newUser.getUserPaymentInfo());
                    user.setUserCompanyName(newUser.getUserCompanyName());
                    user.setUserPhoneNumber(newUser.getUserPhoneNumber());
                    user.setUserInterests(newUser.getUserInterests());
                    user.setUserOfferedServices(newUser.getUserOfferedServices());
                    user.setUserObtainedServices(newUser.getUserObtainedServices());
                    user.setUserInstantiatedServices(newUser.getUserInstantiatedServices());
                    user.setUserBillingInfo(newUser.getUserBillingInfo());
                    return userRepository.save(user);
                }).orElseThrow(() -> new javax.management.ServiceNotFoundException(id));
    }

    //Delete a service
    @DeleteMapping("/delete/users/{id}")
//    @RolesAllowed("platinum")
 //   @RolesAllowed("platinum")
    ResponseEntity<?> deleteUserById(@PathVariable String id){
        userRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }
    private void saveCompany(User user){
        if (user==null) return;
        if (user.getUserCompanyName()==null||user.getUserCompanyName().isEmpty()) return;
        AamCompany aamCompany = new AamCompany();
        aamCompany.setCompanyName(user.getUserCompanyName());
        Query query = new Query();
        query.addCriteria(Criteria.where("companyName").is(user.getUserCompanyName()));
        List<AamCompany> companylst = null;
        if (user.getUserCompanyName().length()>0){
            companylst = mongoTemplate.find(query, AamCompany.class);
            if (companylst.size()==0)
                companyRepository.save(aamCompany);
        }
    }
//    //------------------Security----------------------//
//    @GetMapping("/getToken")
//    String GetToken(@RequestParam(required = true) String username,
//                    @RequestParam(required = true) String password){
//        String urlParameters  = "client_id=data1&username=data2&password=data3&grant_type=";
//    }
}

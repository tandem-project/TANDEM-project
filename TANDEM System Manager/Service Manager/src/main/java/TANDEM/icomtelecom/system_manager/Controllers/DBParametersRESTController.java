package TANDEM.icomtelecom.system_manager.Controllers;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.ApplicationCategory;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ApplicationState;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.AvailabilityZone;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.Currency;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.DeviceType;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.Location;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.NodeType;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.PricingModel;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.PricingUnit;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ProductCategory;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ProductState;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ProductType;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.Provider;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.SLA;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceCategory;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceState;
import TANDEM.icomtelecom.system_manager.Model.SystemManager.ServiceType;
import TANDEM.icomtelecom.system_manager.Repositories.ApplicationCategoryRepository;
import TANDEM.icomtelecom.system_manager.Repositories.ApplicationStateRepository;
import TANDEM.icomtelecom.system_manager.Repositories.AvailabilityZoneRepository;
import TANDEM.icomtelecom.system_manager.Repositories.CurrencyRepository;
import TANDEM.icomtelecom.system_manager.Repositories.DeviceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import TANDEM.icomtelecom.system_manager.Repositories.LocationRepository;
import TANDEM.icomtelecom.system_manager.Repositories.NodeTypeRepository;
import TANDEM.icomtelecom.system_manager.Repositories.PricingModelRepository;
import TANDEM.icomtelecom.system_manager.Repositories.PricingUnitRepository;
import TANDEM.icomtelecom.system_manager.Repositories.ProductCategoryRepository;
import TANDEM.icomtelecom.system_manager.Repositories.ProductStateRepository;
import TANDEM.icomtelecom.system_manager.Repositories.ProductTypeRepository;
import TANDEM.icomtelecom.system_manager.Repositories.ProviderRepository;
import TANDEM.icomtelecom.system_manager.Repositories.SLARepository;
import TANDEM.icomtelecom.system_manager.Repositories.ServiceCategoryRepository;
import TANDEM.icomtelecom.system_manager.Repositories.ServiceStateRepository;
import TANDEM.icomtelecom.system_manager.Repositories.ServiceTypeRepository;

@RestController
@RequestMapping("systemmanager")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class DBParametersRESTController {
 
    @Autowired
    LocationRepository locationsRepository;
    @Autowired
    ServiceCategoryRepository serviceCategoryRepository;
    @Autowired
    ApplicationCategoryRepository applicationCategoryRepository;
    @Autowired
    ProductCategoryRepository productCategoryRepository;
    @Autowired
    ServiceTypeRepository serviceTypeRepository;
    @Autowired
    ProductTypeRepository productTypeRepository;
    @Autowired
    ServiceStateRepository serviceStateRepository;
    @Autowired
    ProductStateRepository productStateRepository;
    @Autowired
    ApplicationStateRepository applicationStateRepository;
    @Autowired
    AvailabilityZoneRepository availabilityZoneRepository;
    @Autowired
    SLARepository slaRepository;
    @Autowired
    PricingModelRepository pricingModelRepository;
    @Autowired
    PricingUnitRepository pricingUnitRepository;
    @Autowired
    ProviderRepository providerRepository;
    @Autowired
    CurrencyRepository currencyRepository;
    @Autowired
    DeviceTypeRepository deviceTypeRepository;
    @Autowired
    NodeTypeRepository nodeTypeRepository;
    
// ------------------------ LOCATIONS  ----------------------------------------
    
    @GetMapping("get/parameters/location")
    public List<Location> getAllLocations(){
        return locationsRepository.findAll();
    }

    
    @PostMapping(path = "create/parameters/location",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Location> insertLocation(@RequestBody Location location) throws Exception {
        System.out.println("Got req to print loc: " + location.getName());
        Location loc = locationsRepository.save(location);
        System.out.println("output: " + loc);
        if (loc == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(loc, HttpStatus.CREATED);
        }
    }
    
    @DeleteMapping("/delete/parameters/location/{id}")
    ResponseEntity<?> deleteLocationById(@PathVariable String id){
        locationsRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    
    
            
    // ------------------------ AVAILABILITY ZONES  ----------------------------------------
    
    @GetMapping("get/parameters/availabilityzone")
    public List<AvailabilityZone> getAllAvailabilityZones(){
        return availabilityZoneRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/availabilityzone",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<AvailabilityZone> insertAvailabilityZone(@RequestBody AvailabilityZone availZone) throws Exception {
        System.out.println("Got req to print serCat: " + availZone.getName());
        AvailabilityZone availabilityZone = availabilityZoneRepository.save(availZone);
        System.out.println("output: " + availabilityZone);
        if (availabilityZone == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(availabilityZone, HttpStatus.CREATED);
        }
    }
   
    @DeleteMapping("/delete/parameters/availabilityzone/{id}")
    ResponseEntity<?> deleteAvailabilityZoneById(@PathVariable String id){
        availabilityZoneRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    
    
    // ------------------------ PRICING MODELS  ----------------------------------------
    
    @GetMapping("get/parameters/pricingmodel")
    public List<PricingModel> getPricingModels(){
        return pricingModelRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/pricingmodel",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<PricingModel> insertPricingModel(@RequestBody PricingModel priceModel) throws Exception {
        System.out.println("Got req to print serCat: " + priceModel.getName());
        PricingModel pricingModel = pricingModelRepository.save(priceModel);
        System.out.println("output: " + pricingModel);
        if (pricingModel == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(pricingModel, HttpStatus.CREATED);
        }
    }
    
    @DeleteMapping("/delete/parameters/pricingmodel/{id}")
    ResponseEntity<?> deletePricingModelById(@PathVariable String id){
        pricingModelRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
           
   // ------------------------ PRICING UNITS  ----------------------------------------
    
    @GetMapping("get/parameters/pricingunit")
    public List<PricingUnit> getPricingUnits(){
        return pricingUnitRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/pricingunit",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<PricingUnit> insertPricingUnit(@RequestBody PricingUnit priceUnit) throws Exception {
        System.out.println("Got req to print serCat: " + priceUnit.getName());
        PricingUnit pricingUnit = pricingUnitRepository.save(priceUnit);
        System.out.println("output: " + pricingUnit);
        if (pricingUnit == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(pricingUnit, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/delete/parameters/pricingunit/{id}")
    ResponseEntity<?> deletePricingUnitById(@PathVariable String id){
        pricingUnitRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    // ------------------------ SLAs  ----------------------------------------
    
    @GetMapping("get/parameters/sla")
    public List<SLA> getAllSLAs(){
        return slaRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/sla",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<SLA> insertSLA(@RequestBody SLA slaInput) throws Exception {
        System.out.println("Got req to print serCat: " + slaInput.getName());
        SLA sla = slaRepository.save(slaInput);
        System.out.println("output: " + sla);
        if (sla == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(sla, HttpStatus.CREATED);
        }
    }
    
    
    @DeleteMapping("/delete/parameters/sla/{id}")
    ResponseEntity<?> deleteSLAById(@PathVariable String id){
        slaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
  
        
    // ------------------------ SERVICE STATES  ----------------------------------------
    
    @GetMapping("get/parameters/servicestate")
    public List<ServiceState> getAllServiceStates(){
        return serviceStateRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/servicestate",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<ServiceState> insertServiceState(@RequestBody ServiceState serState) throws Exception {
        System.out.println("Got req to print serCat: " + serState.getName());
        ServiceState servicestate = serviceStateRepository.save(serState);
        System.out.println("output: " + servicestate);
        if (servicestate == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(servicestate, HttpStatus.CREATED);
        }
    }
    
    
    @DeleteMapping("/delete/parameters/servicestate/{id}")
    ResponseEntity<?> deleteServiceStateById(@PathVariable String id){
        serviceStateRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
        // ------------------------ PRODUCT STATES  ----------------------------------------
    
    @GetMapping("get/parameters/productstate")
    public List<ProductState> getAllProductStates(){
        return productStateRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/productstate",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<ProductState> insertProductState(@RequestBody ProductState prodState) throws Exception {
        System.out.println("Got req to print serCat: " + prodState.getName());
        ProductState productstate = productStateRepository.save(prodState);
        System.out.println("output: " + productstate);
        if (productstate == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(productstate, HttpStatus.CREATED);
        }
    }
    
    
    @DeleteMapping("/delete/parameters/productstate/{id}")
    ResponseEntity<?> deleteProductStateById(@PathVariable String id){
        productStateRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    
    // ------------------------ APPLICATION STATES  ----------------------------------------
    
    @GetMapping("get/parameters/applicationstate")
    public List<ApplicationState> getAllApplicationStates(){
        return applicationStateRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/applicationstate",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<ApplicationState> insertApplicationState(@RequestBody ApplicationState appState) throws Exception {
        System.out.println("Got req to print serCat: " + appState.getName());
        ApplicationState applicationstate = applicationStateRepository.save(appState);
        System.out.println("output: " + applicationstate);
        if (applicationstate == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(applicationstate, HttpStatus.CREATED);
        }
    }
    
    
    @DeleteMapping("/delete/parameters/applicationstate/{id}")
    ResponseEntity<?> deleteApplicationStateById(@PathVariable String id){
        applicationStateRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    
    
    
    // ------------------------ SERVICE CATEGORIES  ----------------------------------------
    
        @GetMapping("get/parameters/servicecategory")
    public List<ServiceCategory> getAllServiceCategories(){
        return serviceCategoryRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/servicecategory",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<ServiceCategory> insertServiceCategory(@RequestBody ServiceCategory serCat) throws Exception {
        System.out.println("Got req to print serCat: " + serCat.getName());
        ServiceCategory serviceCategory = serviceCategoryRepository.save(serCat);
        System.out.println("output: " + serviceCategory);
        if (serviceCategory == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(serviceCategory, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/delete/parameters/servicecategory/{id}")
    ResponseEntity<?> deleteServiceCategoryById(@PathVariable String id){
        serviceCategoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }    
    
    
    // ------------------------ PRODUCT CATEGORIES  ----------------------------------------
    
    @GetMapping("get/parameters/productcategory")
    public List<ProductCategory> getAllProductCategories(){
        return productCategoryRepository.findAll();
    }
   
   
    @PostMapping(path = "create/parameters/productcategory",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<ProductCategory> insertProductCategory(@RequestBody ProductCategory prodCat) throws Exception {
        System.out.println("Got req to print serCat: " + prodCat.getName());
        ProductCategory productCategory = productCategoryRepository.save(prodCat);
        System.out.println("output: " + productCategory);
        if (productCategory == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(productCategory, HttpStatus.CREATED);
        }
    }
    
    
    @DeleteMapping("/delete/parameters/productcategory/{id}")
    ResponseEntity<?> deleteProductCategoryById(@PathVariable String id){
        productCategoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    } 
    
    
    
    
    
     // ------------------------ APPLICATION CATEGORIES  ----------------------------------------
    
        @GetMapping("get/parameters/applicationcategory")
    public List<ApplicationCategory> getAllApplicationCategories(){
        return applicationCategoryRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/applicationcategory",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<ApplicationCategory> insertApplicationCategory(@RequestBody ApplicationCategory appCat) throws Exception {
        System.out.println("Got req to print serCat: " + appCat.getName());
        ApplicationCategory applicationCategory = applicationCategoryRepository.save(appCat);
        System.out.println("output: " + applicationCategory);
        if (applicationCategory == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(applicationCategory, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/delete/parameters/applicationcategory/{id}")
    ResponseEntity<?> deleteApplicationCategoryById(@PathVariable String id){
        applicationCategoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }    
    
    
    
    
    
    
    
    // ------------------------ SERVICE TYPES  ----------------------------------------
    
    @GetMapping("get/parameters/servicetype")
    public List<ServiceType> getAllServiceTypes(){
        return serviceTypeRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/servicetype",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<ServiceType> insertServiceType(@RequestBody ServiceType serType) throws Exception {
        System.out.println("Got req to print serCat: " + serType.getName());
        ServiceType servicetype = serviceTypeRepository.save(serType);
        System.out.println("output: " + servicetype);
        if (servicetype == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(servicetype, HttpStatus.CREATED);
        }
    }
    

    @DeleteMapping("/delete/parameters/servicetype/{id}")
    ResponseEntity<?> deleteServiceTypeById(@PathVariable String id){
        serviceTypeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    } 
    
    
    // ------------------------ PRODUCT TYPES  ----------------------------------------
    
    @GetMapping("get/parameters/producttype")
    public List<ProductType> getAllProductTypes(){
        return productTypeRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/producttype",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<ProductType> insertProductType(@RequestBody ProductType prodType) throws Exception {
        System.out.println("Got req to print serCat: " + prodType.getName());
        ProductType productType = productTypeRepository.save(prodType);
        System.out.println("output: " + productType);
        if (productType == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(productType, HttpStatus.CREATED);
        }
    }
    
    
    @DeleteMapping("/delete/parameters/producttype/{id}")
    ResponseEntity<?> deleteProductTypeById(@PathVariable String id){
        productTypeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }    
    
    
    
        // ------------------------ PROVIDERS  ----------------------------------------
    
    @GetMapping("get/parameters/provider")
    public List<Provider> getAllProviders(){
        return providerRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/provider",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Provider> insertProvider(@RequestBody Provider prov) throws Exception {
        System.out.println("Got req to print serCat: " + prov.getName());
        Provider provider = providerRepository.save(prov);
        System.out.println("output: " + provider);
        if (provider == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(provider, HttpStatus.CREATED);
        }
    }
    
    @DeleteMapping("/delete/parameters/provider/{id}")
    ResponseEntity<?> deleteProviderById(@PathVariable String id){
        providerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }       


        // ------------------------ CURRENCIES  ----------------------------------------
    
    @GetMapping("get/parameters/currency")
    public List<Currency> getAllCurrencies(){
        return currencyRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/currency",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<Currency> insertCurrency(@RequestBody Currency cur) throws Exception {
        System.out.println("Got req to print cur: " + cur.getName());
        Currency currency = currencyRepository.save(cur);
        System.out.println("output: " + currency);
        if (currency == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(currency, HttpStatus.CREATED);
        }
    }
    
    @DeleteMapping("/delete/parameters/currency/{id}")
    ResponseEntity<?> deleteCurrencyById(@PathVariable String id){
        currencyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }       


    
        // ------------------------ DEVICE TYPES  ----------------------------------------
    
    @GetMapping("get/parameters/devicetype")
    public List<DeviceType> getAllDeviceTypes(){
        return deviceTypeRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/devicetype",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<DeviceType> insertDeviceType(@RequestBody DeviceType devType) throws Exception {
        System.out.println("Got req to print serCat: " + devType.getName());
        DeviceType deviceType = deviceTypeRepository.save(devType);
        System.out.println("output: " + deviceType);
        if (deviceType == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(deviceType, HttpStatus.CREATED);
        }
    }
    
    
    @DeleteMapping("/delete/parameters/devicetype/{id}")
    ResponseEntity<?> deleteDeviceTypeById(@PathVariable String id){
        deviceTypeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }    
    
    
          // ------------------------ NODE TYPES  ----------------------------------------
    
    @GetMapping("get/parameters/nodetype")
    public List<NodeType> getAllNodeTypes(){
        return nodeTypeRepository.findAll();
    }
    
   
    @PostMapping(path = "create/parameters/nodetype",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @RolesAllowed({"platinum","gold"})
    public ResponseEntity<NodeType> insertNodeType(@RequestBody NodeType nodType) throws Exception {
        System.out.println("Got req to print nodType: " + nodType.getName());
        NodeType nodeType = nodeTypeRepository.save(nodType);
        System.out.println("output: " + nodeType);
        if (nodeType == null) {
            throw new Exception("Invalid arguments");
        } else {
            return new ResponseEntity<>(nodeType, HttpStatus.CREATED);
        }
    }
    
    
    @DeleteMapping("/delete/parameters/nodetype/{id}")
    ResponseEntity<?> deleteNodeTypeById(@PathVariable String id){
        nodeTypeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }    
    
    

}

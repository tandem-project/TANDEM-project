package TANDEM.icomtelecom.service_catalogue.Controllers;

import TANDEM.icomtelecom.service_catalogue.Model.Exceptions.ServiceNotFoundException;
import TANDEM.icomtelecom.service_catalogue.Model.Service.AutoscalingPolicy;
import TANDEM.icomtelecom.service_catalogue.Model.Service.MonitoringMetric;
import TANDEM.icomtelecom.service_catalogue.Model.Service.RequiredEnvParameter;
import TANDEM.icomtelecom.service_catalogue.Model.Service.RequiredVolume;
import TANDEM.icomtelecom.service_catalogue.Model.Service.Service;
import TANDEM.icomtelecom.service_catalogue.Repositories.ServiceRepository;
import Utilities.Utilities;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@RestController
@RequestMapping("servicecatalogue")
@PropertySource("classpath:application.properties")
@CrossOrigin("*")
public class ServiceRESTController {

    @Autowired
    ServiceRepository serviceRepository;
    
    private Utilities utilities = new Utilities();
    private static Map<String, String> cloudsTokens = new HashMap<>();

        
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
    public ResponseEntity<Service> createService(@RequestBody Service newService) throws Exception {
        //save new service in all PiEdges
        //first, get all edge clouds
        String urlToRequest = "http://infrastructurecatalogue:8081/infrastructurecatalogue/get/infrastructure";
        String infrastructureResponse = utilities.sendGETHTTPRequest(urlToRequest, null);
        
        if (infrastructureResponse != null){
            //create related service function in each edge cloud
            Map<String, String> edgeCloudsIPsToPorts = new HashMap<>();
            try {
                JSONArray jsonArray = new JSONArray(infrastructureResponse.trim());
                for (int i = 0; i < jsonArray.length(); i++){
                    JSONObject jsonObject = new JSONObject(jsonArray.get(i).toString().trim());
                    String piEdgeIP = jsonObject.getString("piEdgeIP");
                    String piEdgePort = jsonObject.getString("piEdgePort");
                    edgeCloudsIPsToPorts.put(piEdgeIP, piEdgePort);
                }
                System.out.println(edgeCloudsIPsToPorts);
                //for each edge cloud, request token and use it to send service function to PiEdge
                for (Map.Entry<String, String> entry : edgeCloudsIPsToPorts.entrySet()) {
                    String token = "";
                    if (cloudsTokens.get(entry.getKey()) == null){
                        token = utilities.getPiEdgeAuthentication(entry.getKey(), entry.getValue());
                        System.out.println("Token received from PiEdge: " + token);
                        cloudsTokens.put(entry.getKey(), token);
                    }
                   
                    String serviceFunctionAdditionResponse = serviceFunctionAddition(entry, newService, token);
                    System.out.println(serviceFunctionAdditionResponse);
                    if (serviceFunctionAdditionResponse == null){
                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);                       
                    }
                    if (serviceFunctionAdditionResponse.equals("400")){
                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                    }
                    if (serviceFunctionAdditionResponse.equals("500")){
                        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                    }         
                    //then, create paas service
                    String paasServiceAdditionResponse = paasServiceAddition(entry, newService);
                    System.out.println(paasServiceAdditionResponse);
                    if (paasServiceAdditionResponse == null){
                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);                       
                    }
                    if (paasServiceAdditionResponse.equals("400")){
                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                    }
                    if (paasServiceAdditionResponse.equals("500") || paasServiceAdditionResponse.contains("required input")){
                        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                    }   
                }
            } catch (JSONException err){
                err.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        

        
        //then, save to DB
        Service service = serviceRepository.save(newService);
        if (service == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(service, HttpStatus.CREATED);
        }
    }
    
    
    public String paasServiceAddition(Map.Entry<String, String> entry, Service newService){
    //    List<ServiceFunction> serviceFunctions;
        
        //first, create service functions body
        String service_function_identifier_name = newService.getSerSwImage().getSerSWImageName();
        String autoscaling_metric = newService.getSerPaasAutoscalingMetric();
        String volumeMounts = null;
        if (newService.getSerRequiredVolumes() != null){
            volumeMounts = produceVolumeMountsStr(newService.getSerRequiredVolumes());
        }
        String envParameters = null;
        if (newService.getSerRequiredEnvParameters() != null){
            envParameters = produceEnvParametersStr(newService.getSerRequiredEnvParameters());
        }
        String serviceFunctionsStr = serviceFunctionsToStr(service_function_identifier_name, autoscaling_metric, volumeMounts, envParameters);
        
        //then, add paas service
        String paasAdditionUrl = "http://" + entry.getKey() + ":" + entry.getValue() + "/piedge-connector/2.0.0/paasService";
        String body = "{\"paas_service_name\":\"" + newService.getSerId() + "\","
                + "\"service_functions\":"+ serviceFunctionsStr + "" + "}";
        
        System.out.println("BODY SENT TO ADD PAAS SERVICE: " + body);

        String paasServiceAdditionResponse = utilities.sendPOSTHTTPRequest(paasAdditionUrl, cloudsTokens.get(entry.getKey()), body);
        if (paasServiceAdditionResponse.equals("401")){
            String token = utilities.getPiEdgeAuthentication(entry.getKey(), entry.getValue());
            cloudsTokens.put(entry.getKey(), token);
            paasServiceAdditionResponse = utilities.sendPOSTHTTPRequest(paasAdditionUrl, cloudsTokens.get(entry.getKey()), body);
        }
        System.out.println(paasServiceAdditionResponse);
        return paasServiceAdditionResponse;
    }
    
    
    public String serviceFunctionsToStr(String service_function_identifier_name, String autoscaling_metric, String volumeMounts, String envParameters){
        
        String service_functions = "[{\"service_function_identifier_name\":\"" + service_function_identifier_name + "\","
            + "\"autoscaling_metric\":\""+ autoscaling_metric + "\""; 

        if (volumeMounts != null){
            service_functions = service_functions + ",\"volume_mounts\":" + volumeMounts;
        }
        if (envParameters != null){
            service_functions = service_functions + ",\"env_parameters\":" + envParameters;
        }
        service_functions = service_functions + "}]";
            return service_functions;
    }
    
    
    public String produceVolumeMountsStr(List<RequiredVolume> required_volumes){
        String volume_mounts_str = "[";
             
        for (RequiredVolume rv : required_volumes){
            volume_mounts_str = volume_mounts_str.concat("{\"name\":\"");
            volume_mounts_str = volume_mounts_str.concat(rv.getName());
            volume_mounts_str = volume_mounts_str.concat("\",");
            volume_mounts_str = volume_mounts_str.concat("\"storage\":\"");
            volume_mounts_str = volume_mounts_str.concat(rv.getStorage());
            volume_mounts_str = volume_mounts_str.concat("\"},");
        }
        if (!volume_mounts_str.equals("[")){
            volume_mounts_str = volume_mounts_str.substring(0, volume_mounts_str.length() - 1);
        }
        volume_mounts_str = volume_mounts_str.concat("]");
        return volume_mounts_str;
    }
    
    
    public String produceEnvParametersStr(List<RequiredEnvParameter> required_env_parameters){
        String required_env_parameters_str = "[";
        for (RequiredEnvParameter rep : required_env_parameters){
            required_env_parameters_str = required_env_parameters_str.concat("{\"name\":\"");
            required_env_parameters_str = required_env_parameters_str.concat(rep.getName());
            required_env_parameters_str = required_env_parameters_str.concat("\",");
            required_env_parameters_str = required_env_parameters_str.concat("\"value\":\"");
            required_env_parameters_str = required_env_parameters_str.concat(rep.getValue());
            required_env_parameters_str = required_env_parameters_str.concat("\"},");
        }
        if (!required_env_parameters_str.equals("[")){
            required_env_parameters_str = required_env_parameters_str.substring(0, required_env_parameters_str.length() - 1);
        }
        required_env_parameters_str = required_env_parameters_str.concat("]");
        return required_env_parameters_str;
    }
        
    public String serviceFunctionAddition(Map.Entry<String, String> entry, Service newService, String token){
        String serviceFunctionAdditionUrl = "http://" + entry.getKey() + ":" + entry.getValue() + "/piedge-connector/2.0.0/serviceFunction";
                    
                    
        String service_function_name = newService.getSerSwImage().getSerSWImageName();
        String service_function_image = newService.getSerSwImage().getSerSWImageURL();
        List<Integer> application_ports = newService.getSerApplicationPorts();
        String application_ports_str = applicationPortsToStr(application_ports);
        List<AutoscalingPolicy> autoscaling_policies = newService.getSerAutoscalingPolicies();
        String autoscaling_policies_str;
        if (autoscaling_policies != null){
            autoscaling_policies_str = autoscalingPoliciesToStr(autoscaling_policies);
        }
        else{
            autoscaling_policies_str = null;
        }
        if (autoscaling_policies_str == null){
            return null;
        }
        List<RequiredVolume> required_volumes = newService.getSerRequiredVolumes();
        String required_volumes_str = requiredVolumesToString(required_volumes);
        List<RequiredEnvParameter> required_env_parameters = newService.getSerRequiredEnvParameters();
        String required_env_parameters_str = requiredEnvParametersToString(required_env_parameters);
        Boolean privileged = newService.getSerPrivileged();
        String body = "{\"service_function_name\":\"" + service_function_name + "\","
                + "\"service_function_image\":\""+ service_function_image + "\","
                + "\"service_function_type\":\"Container\","
                + "\"application_ports\":" + application_ports_str + ","
                + "\"autoscaling_policies\":" + autoscaling_policies_str + ","
                + "\"required_volumes\":" + required_volumes_str + ","
                + "\"required_env_parameters\":" + required_env_parameters_str + ","
                + "\"privileged\":" + privileged + "}";
        String serviceFunctionAdditionResponse = utilities.sendPOSTHTTPRequest(serviceFunctionAdditionUrl, cloudsTokens.get(entry.getKey()), body);
        if (serviceFunctionAdditionResponse.equals("401")){
            token = utilities.getPiEdgeAuthentication(entry.getKey(), entry.getValue());
            cloudsTokens.put(entry.getKey(), token);
            serviceFunctionAdditionResponse = utilities.sendPOSTHTTPRequest(serviceFunctionAdditionUrl, cloudsTokens.get(entry.getKey()), body);
        }
        return serviceFunctionAdditionResponse;
    }



    public String autoscalingPoliciesToStr(List <AutoscalingPolicy> autoscaling_policies){
        
        String autoscaling_policies_str = "[";
             
        for (AutoscalingPolicy ap : autoscaling_policies){
            autoscaling_policies_str = autoscaling_policies_str.concat("{\"policy\":\"");
            autoscaling_policies_str = autoscaling_policies_str.concat(ap.getPolicy());
            autoscaling_policies_str = autoscaling_policies_str.concat("\",");
            List<MonitoringMetric> monitoringMetrics = ap.getMonitoring_metrics();
            if (monitoringMetrics != null){
                autoscaling_policies_str = autoscaling_policies_str.concat("\"monitoring_metrics\":[");
                for (MonitoringMetric monitoringMetric : monitoringMetrics){
                    autoscaling_policies_str = autoscaling_policies_str.concat("{\"metric\":\"");
                    autoscaling_policies_str = autoscaling_policies_str.concat(monitoringMetric.getMetric());
                    autoscaling_policies_str = autoscaling_policies_str.concat("\",");
                    autoscaling_policies_str = autoscaling_policies_str.concat("\"limit\":\"");
                    autoscaling_policies_str = autoscaling_policies_str.concat(monitoringMetric.getLimit());
                    autoscaling_policies_str = autoscaling_policies_str.concat("\",");
                    autoscaling_policies_str = autoscaling_policies_str.concat("\"request\":\"");
                    autoscaling_policies_str = autoscaling_policies_str.concat(monitoringMetric.getRequest());
                    autoscaling_policies_str = autoscaling_policies_str.concat("\",");
                    autoscaling_policies_str = autoscaling_policies_str.concat("\"util_percent\":");
                    autoscaling_policies_str = autoscaling_policies_str.concat(Float.toString(monitoringMetric.getUtil_percent()));
                    autoscaling_policies_str = autoscaling_policies_str.concat(",");
                    autoscaling_policies_str = autoscaling_policies_str.concat("\"is_default\":");
                    if (monitoringMetric.getIs_default() != null){
                        autoscaling_policies_str = autoscaling_policies_str.concat(monitoringMetric.getIs_default().toString());
                    }
                    else{
                        return null;
                    }
                    autoscaling_policies_str = autoscaling_policies_str.concat("},");
                }
            }
            else{
                autoscaling_policies_str = autoscaling_policies_str.concat("\"monitoring_metrics\":null}");
            }
            if (!autoscaling_policies_str.equals("[")){
                autoscaling_policies_str = autoscaling_policies_str.substring(0, autoscaling_policies_str.length() - 1);
            }
            autoscaling_policies_str = autoscaling_policies_str.concat("]");
            autoscaling_policies_str = autoscaling_policies_str.concat("},");
        }
        
        if (!autoscaling_policies_str.equals("["))
        {
            autoscaling_policies_str = autoscaling_policies_str.substring(0, autoscaling_policies_str.length() - 1);
        }
        autoscaling_policies_str = autoscaling_policies_str.concat("]");
        return autoscaling_policies_str;
        
        
        
    }
    
    public String applicationPortsToStr(List<Integer> application_ports){
        String application_ports_str = "[";
        for (Integer ap : application_ports){
            application_ports_str = application_ports_str.concat(ap.toString());
            application_ports_str = application_ports_str.concat(",");
        }
        if (!application_ports_str.equals("[")){
            application_ports_str = application_ports_str.substring(0, application_ports_str.length() - 1);
        }
        application_ports_str = application_ports_str.concat("]");
        return application_ports_str;
    }
    
    
    public String requiredVolumesToString(List<RequiredVolume> required_volumes){
        String required_volumes_str = "[";
             
        for (RequiredVolume rv : required_volumes){
            required_volumes_str = required_volumes_str.concat("{\"name\":\"");
            required_volumes_str = required_volumes_str.concat(rv.getName());
            required_volumes_str = required_volumes_str.concat("\",");
            required_volumes_str = required_volumes_str.concat("\"path\":\"");
            required_volumes_str = required_volumes_str.concat(rv.getPath());
            required_volumes_str = required_volumes_str.concat("\",");
            required_volumes_str = required_volumes_str.concat("\"hostpath\":\"");
            required_volumes_str = required_volumes_str.concat(rv.getHostpath());
            required_volumes_str = required_volumes_str.concat("\"},");
        }
        if (!required_volumes_str.equals("[")){
            required_volumes_str = required_volumes_str.substring(0, required_volumes_str.length() - 1);
        }
        required_volumes_str = required_volumes_str.concat("]");
        return required_volumes_str;
    }
        
        
    public String requiredEnvParametersToString(List<RequiredEnvParameter> required_env_parameters){
        String required_env_parameters_str = "[";
        for (RequiredEnvParameter rep : required_env_parameters){
            required_env_parameters_str = required_env_parameters_str.concat("{\"name\":\"");
            required_env_parameters_str = required_env_parameters_str.concat(rep.getName());
            required_env_parameters_str = required_env_parameters_str.concat("\"},");
        }
        if (!required_env_parameters_str.equals("[")){
            required_env_parameters_str = required_env_parameters_str.substring(0, required_env_parameters_str.length() - 1);
        }
        required_env_parameters_str = required_env_parameters_str.concat("]");
        return required_env_parameters_str;
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

}

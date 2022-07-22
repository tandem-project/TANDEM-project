package TANDEM.icomtelecom.service_catalogue.Controllers;

import TANDEM.icomtelecom.service_catalogue.Model.Service.Service;
import TANDEM.icomtelecom.service_catalogue.Repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Controller
@ApiIgnore
@RequestMapping("serviceCatalogue")
public class ServiceController {

    @Autowired
    ServiceRepository serviceRepository;

    @RequestMapping("/servicesList")
    public String getServices(Model model){
        model.addAttribute("services", serviceRepository.findAll());
        return "services/list";
    }

    @GetMapping("/servicesListSearch")
    public String getServicesByProperties(@RequestParam(required = false) String serName,
                                                     @RequestParam(required = false) String version, @RequestParam(required = false) String state,
                                                     @RequestParam Integer page, Model model){
        List<Service> services = serviceRepository.findServicesByProperties(serName, version, state, PageRequest.of(page, 15));
        model.addAttribute("services", services);
        return "services/list";
    }

    @RequestMapping("/index")
    public String getindex(){
//        model.addAttribute("services", serviceRepository.findAll());
        return "index";
    }
}

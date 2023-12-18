package TANDEM.icomtelecom.application_catalogue.Repositories;

import TANDEM.icomtelecom.application_catalogue.Model.Application.Application;
import org.springframework.data.domain.Pageable;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

public interface ApplicationCustomRepository {
    
    public List<Application> findUserByProperties(String name, 
            List<String> labels, 
            String operatingState,
            String adminState,
            Pageable page);
}

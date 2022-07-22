package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Service.Service;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ServiceCustomRepository {
    public List<Service> findServicesByProperties(String serName, String version, String state, Pageable page);
}

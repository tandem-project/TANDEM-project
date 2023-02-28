package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Service.Service;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceRepository extends MongoRepository<Service, String>, ServiceCustomRepository{

}

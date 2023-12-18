package TANDEM.icomtelecom.application_catalogue.Repositories;

import TANDEM.icomtelecom.application_catalogue.Model.Application.Application;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApplicationRepository extends MongoRepository<Application, String>, ApplicationCustomRepository{

}

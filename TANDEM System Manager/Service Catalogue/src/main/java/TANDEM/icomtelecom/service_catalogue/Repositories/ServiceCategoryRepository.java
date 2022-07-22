package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Service.SerCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceCategoryRepository extends MongoRepository<SerCategory, String> {
}

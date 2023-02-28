package TANDEM.icomtelecom.user_catalogue.Repositories.aam;

import TANDEM.icomtelecom.user_catalogue.Model.aam.AamCompany;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyRepository extends MongoRepository<AamCompany, Integer>{

}

package TANDEM.icomtelecom.infrastructure_catalogue.Repositories;

import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.Infrastructure;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InfrastructureRepository extends MongoRepository<Infrastructure, String>, InfrastructureCustomRepository{

}

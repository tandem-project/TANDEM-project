package TANDEM.icomtelecom.user_catalogue.Repositories;

import TANDEM.icomtelecom.user_catalogue.Model.User.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String>, UserCustomRepository{

}

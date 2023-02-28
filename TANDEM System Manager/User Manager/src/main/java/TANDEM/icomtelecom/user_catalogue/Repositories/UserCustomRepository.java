package TANDEM.icomtelecom.user_catalogue.Repositories;

import TANDEM.icomtelecom.user_catalogue.Model.User.User;
import org.springframework.data.domain.Pageable;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

public interface UserCustomRepository {
    
    public List<User> findUserByProperties(String userFirstName, 
            String userLastName, 
            String userName, 
            String userAccountType,
            String userCompanyName,
            String userRole,
            Pageable page);
}

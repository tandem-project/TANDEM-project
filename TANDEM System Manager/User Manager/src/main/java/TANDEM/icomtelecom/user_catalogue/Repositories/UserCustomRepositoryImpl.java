package TANDEM.icomtelecom.user_catalogue.Repositories;

import TANDEM.icomtelecom.user_catalogue.Model.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserCustomRepositoryImpl implements UserCustomRepository{
    @Autowired
    MongoTemplate mongoTemplate;

    public List<User> findUserByProperties(String userFirstName, String userLastName, String userName, 
            String userAccountType, String userCompanyName, String userRole, Pageable page) {
        final Query query = new Query().with(page);
//     query.fields().include("id").include("name");
        final List<Criteria> criteria = new ArrayList<>();
        if (userFirstName != null && !userFirstName.isEmpty())
            criteria.add(Criteria.where("userFirstName").is(userFirstName));
        
        if (userLastName != null && !userLastName.isEmpty())
            criteria.add(Criteria.where("userLastName").is(userLastName));
        
        if (userName != null && !userName.isEmpty())
            criteria.add(Criteria.where("userName").is(userName));
        
        if (userAccountType != null && !userAccountType.isEmpty())
            criteria.add(Criteria.where("userAccountType").is(userAccountType));
                
        if (userCompanyName != null && !userCompanyName.isEmpty())
            criteria.add(Criteria.where("userCompanyName").is(userCompanyName));
                
        if (userRole != null && !userRole.isEmpty())
            criteria.add(Criteria.where("userRole").is(userRole));


        if (!criteria.isEmpty())
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        return mongoTemplate.find(query, User.class);
    }
}
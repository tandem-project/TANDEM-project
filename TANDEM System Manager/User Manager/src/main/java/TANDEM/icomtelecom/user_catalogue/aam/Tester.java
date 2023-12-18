package TANDEM.icomtelecom.user_catalogue.aam;

import TANDEM.icomtelecom.user_catalogue.Model.aam.AamToken;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class Tester {
    MongoTemplate mongoTemplate;
    public Tester(MongoTemplate mongot){
        mongoTemplate = mongot;
    }
    public String testme(){
        Query query = new Query();
        query.addCriteria(Criteria.where("token").is("token"));
        List<AamToken> tokenlst = mongoTemplate.find(query, AamToken.class);
        AamToken aToken = tokenlst.get(0);
        return "";
    }
}

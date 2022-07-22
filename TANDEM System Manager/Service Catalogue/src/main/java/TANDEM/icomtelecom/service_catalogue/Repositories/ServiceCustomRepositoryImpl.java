package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ServiceCustomRepositoryImpl implements ServiceCustomRepository{
    @Autowired
    MongoTemplate mongoTemplate;

    public List<Service> findServicesByProperties(String serName, String version, String state, Pageable page) {
        final Query query = new Query().with(page);
//     query.fields().include("id").include("name");
        final List<Criteria> criteria = new ArrayList<>();
        if (serName != null && !serName.isEmpty())
            criteria.add(Criteria.where("serName").is(serName));
        if (version != null && !version.isEmpty())
            criteria.add(Criteria.where("version").is(version));
        if (state != null)
            criteria.add(Criteria.where("state").is(state));

        if (!criteria.isEmpty())
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        return mongoTemplate.find(query, Service.class);
    }
}
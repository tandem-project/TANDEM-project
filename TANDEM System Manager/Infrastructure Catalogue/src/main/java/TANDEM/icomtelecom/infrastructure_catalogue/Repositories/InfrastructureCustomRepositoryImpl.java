package TANDEM.icomtelecom.infrastructure_catalogue.Repositories;

import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.Infrastructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class InfrastructureCustomRepositoryImpl implements InfrastructureCustomRepository{
    @Autowired
    MongoTemplate mongoTemplate;

    public List<Infrastructure> findinfrastructuresByProperties(String edgeCloudName, String edgeCloudAvailabilityZone, String edgeCloudProvider, Pageable page) {
        final Query query = new Query().with(page);
//     query.fields().include("id").include("name");
        final List<Criteria> criteria = new ArrayList<>();
        if (edgeCloudName != null && !edgeCloudName.isEmpty())
            criteria.add(Criteria.where("edgeCloudName").is(edgeCloudName));
        if (edgeCloudAvailabilityZone != null && !edgeCloudAvailabilityZone.isEmpty())
            criteria.add(Criteria.where("edgeCloudAvailabilityZone").is(edgeCloudAvailabilityZone));
        if (edgeCloudProvider != null)
            criteria.add(Criteria.where("edgeCloudProvider").is(edgeCloudProvider));

        if (!criteria.isEmpty())
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        return mongoTemplate.find(query, Infrastructure.class);
    }
}
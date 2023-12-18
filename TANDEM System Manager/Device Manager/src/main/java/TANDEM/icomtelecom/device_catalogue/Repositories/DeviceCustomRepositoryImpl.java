package TANDEM.icomtelecom.device_catalogue.Repositories;

import TANDEM.icomtelecom.device_catalogue.Model.Device.Device;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class DeviceCustomRepositoryImpl implements DeviceCustomRepository{
    @Autowired
    MongoTemplate mongoTemplate;

    public List<Device> findDeviceByProperties(String name, List<String> labels, String operatingState, 
            String adminState, Pageable page) {
        final Query query = new Query().with(page);
//     query.fields().include("id").include("name");
        final List<Criteria> criteria = new ArrayList<>();
        if (name != null && !name.isEmpty())
            criteria.add(Criteria.where("name").is(name));
        
        if (labels != null && !labels.isEmpty())
            criteria.add(Criteria.where("labels").is(labels));
        
        if (operatingState != null && !operatingState.isEmpty())
            criteria.add(Criteria.where("operatingState").is(operatingState));
        
        if (adminState != null && !adminState.isEmpty())
            criteria.add(Criteria.where("adminState").is(adminState));

        if (!criteria.isEmpty())
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        return mongoTemplate.find(query, Device.class);
    }
}
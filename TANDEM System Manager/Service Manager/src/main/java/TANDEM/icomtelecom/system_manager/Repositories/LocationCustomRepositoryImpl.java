package TANDEM.icomtelecom.system_manager.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class LocationCustomRepositoryImpl implements LocationCustomRepository{
    @Autowired
    MongoTemplate mongoTemplate;

}
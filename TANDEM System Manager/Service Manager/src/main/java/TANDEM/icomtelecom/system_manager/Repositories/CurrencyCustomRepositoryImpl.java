package TANDEM.icomtelecom.system_manager.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CurrencyCustomRepositoryImpl implements CurrencyCustomRepository{
    @Autowired
    MongoTemplate mongoTemplate;

}
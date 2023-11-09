package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Order.Order;
import TANDEM.icomtelecom.service_catalogue.Model.Product.Product;
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
public class ProductCustomRepositoryImpl implements ProductCustomRepository{
    @Autowired
    MongoTemplate mongoTemplate;

    public List<Product> findProductsByProperties(String productName, String version, String state, Pageable page) {
        final Query query = new Query().with(page);
//     query.fields().include("id").include("name");
        final List<Criteria> criteria = new ArrayList<>();
        if (productName != null && !productName.isEmpty())
            criteria.add(Criteria.where("productName").is(productName));
        if (version != null && !version.isEmpty())
            criteria.add(Criteria.where("version").is(version));
        if (state != null)
            criteria.add(Criteria.where("state").is(state));

        if (!criteria.isEmpty())
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        return mongoTemplate.find(query, Product.class);
    }
}
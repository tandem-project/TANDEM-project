package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Order.Order;
import TANDEM.icomtelecom.service_catalogue.Model.Product.Product;
import TANDEM.icomtelecom.service_catalogue.Model.Service.Service;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderCustomRepository {
    public List<Order> findOrdersByProperties(String orderName, String version, String state, Pageable page);
}

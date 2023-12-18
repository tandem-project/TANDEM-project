package TANDEM.icomtelecom.system_manager.Repositories;

import TANDEM.icomtelecom.system_manager.Model.SystemManager.NodeType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NodeTypeRepository extends MongoRepository<NodeType, String>, NodeTypeCustomRepository{

}

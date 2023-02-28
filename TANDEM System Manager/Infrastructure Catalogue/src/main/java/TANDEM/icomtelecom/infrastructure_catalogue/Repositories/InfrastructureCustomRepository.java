package TANDEM.icomtelecom.infrastructure_catalogue.Repositories;

import TANDEM.icomtelecom.infrastructure_catalogue.Model.Infrastructure.Infrastructure;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InfrastructureCustomRepository {
    public List<Infrastructure> findinfrastructuresByProperties(String edgeCloudName, String edgeCloudAvailabilityZone, String edgeCloudProvider, Pageable page);
}

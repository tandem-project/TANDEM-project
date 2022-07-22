package TANDEM.icomtelecom.service_catalogue.Repositories;

import TANDEM.icomtelecom.service_catalogue.Model.Workflows.Workflow;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class WorkflowCustomRepositoryImpl implements WorkflowCustomRepository{
    @Autowired
    WorkflowRepository workflowRepository;

    @Override
    public List<String> findNames() {
        List<Workflow> workflows = workflowRepository.findAll();
        return workflows.stream().map(workflow -> workflow.getName()).collect(Collectors.toList());
    }

    @Override
    public List<String> findTypes() {
        List<Workflow> workflows = workflowRepository.findAll();
        return workflows.stream().map(workflow -> workflow.getType()).collect(Collectors.toList());
    }

    @Override
    public List<String> findDescriptions() {
        List<Workflow> workflows = workflowRepository.findAll();
        return workflows.stream().map(workflow -> workflow.getDescription()).collect(Collectors.toList());
    }
}

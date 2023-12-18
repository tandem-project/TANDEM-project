package TANDEM.icomtelecom.service_catalogue.Utilities.Validators;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class WorkflowJsonValidator implements ConstraintValidator<WorkflowJsonConstraint, Object> {
    @Override
    public void initialize(WorkflowJsonConstraint workflowJson) {
    }

    @Override
    public boolean isValid(Object workflowJson,
                           ConstraintValidatorContext cxt) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.readTree(mapper.writeValueAsString(workflowJson));
        } catch (JacksonException e) {
            return false;
        }
        return true;

    }
}

package TANDEM.icomtelecom.service_catalogue.Utilities.Validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;


@Documented
@Constraint(validatedBy = WorkflowJsonValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface WorkflowJsonConstraint {
    String message() default "Invalid workflow json";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

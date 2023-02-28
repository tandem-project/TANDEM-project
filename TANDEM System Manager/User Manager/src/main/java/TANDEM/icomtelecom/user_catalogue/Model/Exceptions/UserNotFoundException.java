package TANDEM.icomtelecom.user_catalogue.Model.Exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String id) {
        super("Could not find user with id:  " + id);
    }
}

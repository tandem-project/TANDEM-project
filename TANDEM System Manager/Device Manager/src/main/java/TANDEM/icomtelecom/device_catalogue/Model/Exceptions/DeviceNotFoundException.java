package TANDEM.icomtelecom.device_catalogue.Model.Exceptions;

public class DeviceNotFoundException extends RuntimeException {

    public DeviceNotFoundException(String id) {
        super("Could not find device with id:  " + id);
    }
}

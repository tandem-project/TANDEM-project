/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TANDEM.icomtelecom.user_catalogue.Model.User;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * @author maxez
 */
class UserOfferedService {
    @JsonProperty("offservID")
    private String offservID;
    @JsonProperty("offservName")
    private String offservName;

    public String getOffservID() {
        return offservID;
    }

    public void setOffservID(String offservID) {
        this.offservID = offservID;
    }

    public String getOffservName() {
        return offservName;
    }

    public void setOffservName(String offservName) {
        this.offservName = offservName;
    }
   
}

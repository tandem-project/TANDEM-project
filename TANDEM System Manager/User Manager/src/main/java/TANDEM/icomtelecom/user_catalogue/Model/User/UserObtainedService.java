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
public class UserObtainedService {
    @JsonProperty("obtserID")
    private String obtserID;
    @JsonProperty("obtserName")
    private String obtserName;

    public String getObtserID() {
        return obtserID;
    }

    public void setObtserID(String obtserID) {
        this.obtserID = obtserID;
    }

    public String getObtserName() {
        return obtserName;
    }

    public void setObtserName(String obtserName) {
        this.obtserName = obtserName;
    }


    
}

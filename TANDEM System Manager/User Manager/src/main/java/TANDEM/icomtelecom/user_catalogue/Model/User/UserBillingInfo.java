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
public class UserBillingInfo {
    @JsonProperty("billingURL")
    private String billingURL;

    public String getBillingURL() {
        return billingURL;
    }

    public void setBillingURL(String billingURL) {
        this.billingURL = billingURL;
    }

}

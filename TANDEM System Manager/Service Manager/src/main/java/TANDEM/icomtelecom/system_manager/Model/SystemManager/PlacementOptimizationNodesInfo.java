/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TANDEM.icomtelecom.system_manager.Model.SystemManager;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * @author maxez
 */
class PlacementOptimizationNodesInfo {
    @JsonProperty("app-service-configurable-rules")
    private String appServiceConfigurableRules = null;    
     
    @JsonProperty("core-command")
    private String coreCommand = null; 
    
    @JsonProperty("core-consul")
    private String coreConsul = null;     
    
    @JsonProperty("core-data")
    private String coreData = null; 
        
    @JsonProperty("core-metadata")
    private String coreMetadata = null; 
        
    @JsonProperty("device-rest")
    private String deviceRest = null; 
        
    @JsonProperty("kuiper")
    private String kuiper = null; 
        
    @JsonProperty("redis")
    private String redis = null; 
        
    @JsonProperty("support-notifications")
    private String supportNotifications = null; 
            
    @JsonProperty("support-scheduler")
    private String supportScheduler = null; 
            
    @JsonProperty("sys-mgmt-agent")
    private String sysMgmtAgent = null; 

    public String getAppServiceConfigurableRules() {
        return appServiceConfigurableRules;
    }

    public void setAppServiceConfigurableRules(String appServiceConfigurableRules) {
        this.appServiceConfigurableRules = appServiceConfigurableRules;
    }

    public String getCoreCommand() {
        return coreCommand;
    }

    public void setCoreCommand(String coreCommand) {
        this.coreCommand = coreCommand;
    }

    public String getCoreConsul() {
        return coreConsul;
    }

    public void setCoreConsul(String coreConsul) {
        this.coreConsul = coreConsul;
    }

    public String getCoreData() {
        return coreData;
    }

    public void setCoreData(String coreData) {
        this.coreData = coreData;
    }

    public String getCoreMetadata() {
        return coreMetadata;
    }

    public void setCoreMetadata(String coreMetadata) {
        this.coreMetadata = coreMetadata;
    }

    public String getDeviceRest() {
        return deviceRest;
    }

    public void setDeviceRest(String deviceRest) {
        this.deviceRest = deviceRest;
    }

    public String getKuiper() {
        return kuiper;
    }

    public void setKuiper(String kuiper) {
        this.kuiper = kuiper;
    }

    public String getRedis() {
        return redis;
    }

    public void setRedis(String redis) {
        this.redis = redis;
    }

    public String getSupportNotifications() {
        return supportNotifications;
    }

    public void setSupportNotifications(String supportNotifications) {
        this.supportNotifications = supportNotifications;
    }

    public String getSupportScheduler() {
        return supportScheduler;
    }

    public void setSupportScheduler(String supportScheduler) {
        this.supportScheduler = supportScheduler;
    }

    public String getSysMgmtAgent() {
        return sysMgmtAgent;
    }

    public void setSysMgmtAgent(String sysMgmtAgent) {
        this.sysMgmtAgent = sysMgmtAgent;
    }
   
    
    
    
}
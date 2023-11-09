
async function loadingApplicationRegistration() {
   
    var params = new Array();
    
    var urlPrefixAppCat = _BACKENDSERVER+"/servicecatalogue/get/services/";
    const urlPrefixApps = _BACKENDSERVER+"/applicationcatalogue/get/applications/";
    var urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
    var urlState = urlPrefixSysManGet + "applicationstate";
    var urlCategory = urlPrefixSysManGet + "applicationcategory";

    var urlProvider = urlPrefixSysManGet + "provider";
    const urlSCO = _BACKENDSERVER + "/workflows/list";
    //Add event to radio buttons
    const radioButtons = document.querySelectorAll('input[name="appconfiguration"]');
    for (const radioButton of radioButtons)
    {
        radioButton.addEventListener('change', function() {
            if (this.value === "manualconfig")
            {
                
                if (this.checked)
                {
                    document.getElementById("appservices").style.display = 'block';
                    document.getElementById("appscos").style.display = 'none';
                }
                
            }
            else
            {
                if (this.checked)
                {
                    document.getElementById("appservices").style.display = 'none';
                    document.getElementById("appscos").style.display = 'block';
                }
            }
        });
    }
    params = getParams();

    if (typeof params['appId'] !== 'undefined') {
        // Appid is defined when we want to edit a service
        var appId = params['appId'];
        if ((appId !== null) && (appId !== ''))
        {
            // Get the application from backend
            var url = urlPrefixApps + appId;
         
            CallPostUrl(url,"GET",null,[],"jsoninfoappedit");
            resultfnct['errjsoninfoappedit'] = function (arg1) { 
                alert(arg1);
            };
            // Get json info
            resultfnct['jsoninfoappedit'] = async function (arg1) { 
                var appInfo = JSON.parse(arg1);
           
                if (appInfo !== null)
                {
                    // Fill fields we want to be pre-edited
                    var name = document.getElementById('appnamereg');
                    name.value = appInfo.name;
                    var id = document.getElementById('appidreg');
                    id.value = appInfo.id;
                    id.contenteditable = false;
                    document.getElementById('appidreg').readonly = true;

               
                    var description = document.getElementById('appdescriptionreg');                
                    description.value = appInfo.description;

                    // Fill the tables (Possible options: show only services tables, show only SCO list, show nothing)
                    if (appInfo.applicationServices.length > 0 || appInfo.supportServices.length > 0)
                    {
                        //console.log("Services are defined!");
                        //Check the respective checkbox
                        document.getElementById("appservicesreg").checked = true;
                        //Show hidden div
                        document.getElementById("appservices").style.display = 'block';
                        // Application Services
                        if (appInfo.applicationServices.length === 0)
                        {
                            //Fill the selection list
                            //console.log("appInfo.applicationServices.length === 0");
                            await listServicesGivenType('appservicename1', null, 'appservicedescr1', true, ["TANDEM_App", "User_App"]);
                            await setServiceDescriptionEvent('appservicename1', 'appservicedescr1', urlPrefixAppCat);
                        }
                        else
                        {
                            for (var i = 0; i < appInfo.applicationServices.length; i++)
                            {
                                if (i === 0)
                                {
                                    console.log("App service ID = " + appInfo.applicationServices[i].serID);
                                    await listServicesGivenType('appservicename1', appInfo.applicationServices[i].serID, 'appservicedescr1', true, ["TANDEM_App", "User_App"]);
                                    await setServiceDescriptionEvent('appservicename1', 'appservicedescr1', urlPrefixAppCat);
                                }   
                                else
                                {
                                    // add new row in table
                                    //console.log("Calling addNewServiceRow()");
                                    addNewServiceRow('appservicestable', 'appservice', appInfo.applicationServices[i].serID, ["TANDEM_App", "User_App"]);
                                }
                            }
                        }
                        // Support Services
                        if (appInfo.supportServices.length === 0)
                        {
                            //Fill the selection list
                            await listServicesGivenType('supportservicename1', null, 'supportservicedescr1', true, ["PaaS"]);
                            await setServiceDescriptionEvent('supportservicename1', 'supportservicedescr1', urlPrefixAppCat);
                        }
                        else
                        {
                            for (var i = 0; i < appInfo.supportServices.length; i++)
                            {
                                if (i === 0)
                                {
                                    await listServicesGivenType('supportservicename1', appInfo.supportServices[i].serID, 'supportservicedescr1', true, ["PaaS"]);
                   
                                    await setServiceDescriptionEvent('supportservicename1', 'supportservicedescr1', urlPrefixAppCat);
                                }
                                else
                                {
                                    addNewServiceRow('supportservicestable', 'supportservice', appInfo.supportServices[i].serID, appInfo.supportServices[i].serID, ["PaaS"]);
                                }
                            }
                        }
                        selectionList('appscoreg', urlSCO, null);
                    }
                    else if (appInfo.serviceChain !== '')
                    {
                        //Check the respective checkbox
                        document.getElementById("appscosreg").checked = true;
                        //Show hidden div
                        document.getElementById("appscos").style.display = 'block';
                        selectionList('appscoreg', urlSCO, appInfo.serviceChain);
                        await listServicesGivenType('appservicename1', null, 'appservicedescr1', true, ["TANDEM_App", "User_App"]);
                        await setServiceDescriptionEvent('appservicename1', 'appservicedescr1', urlPrefixAppCat);
                        await listServicesGivenType('supportservicename1', null, 'supportservicedescr1', true, ["PaaS"]);
                        await setServiceDescriptionEvent('supportservicename1', 'supportservicedescr1', urlPrefixAppCat);
                    }
                    else
                    {
                        await listServicesGivenType('appservicename1', null, 'appservicedescr1', true, ["TANDEM_App", "User_App"]);
                        await setServiceDescriptionEvent('appservicename1', 'appservicedescr1', urlPrefixAppCat);
                        await listServicesGivenType('supportservicename1', null, 'supportservicedescr1', true, ["PaaS"]);
                        await setServiceDescriptionEvent('supportservicename1', 'supportservicedescr1', urlPrefixAppCat);
                        selectionList('appscoreg', urlSCO, null);
                    }
                
                    // Fill the selection lists
                    selectionList('appcategoryreg', urlCategory, appInfo.category);
                
                    selectionList('appproviderreg', urlProvider, appInfo.provider);
                    selectionList('appstatereg', urlState, appInfo.state);
                
                    
                }
            };
        }
        else 
        {
            // Fill the selection lists
            selectionList('appcategoryreg', urlCategory, null);
                
            selectionList('appproviderreg', urlProvider, null);
            selectionList('appstatereg', urlState, null);
            selectionList('appscoreg', urlSCO, null);
            
            
            // Fill tables
            
            await listServicesGivenType('appservicename1', null, 'appservicedescr1', true, ["TANDEM_App", "User_App"]);
            await setServiceDescriptionEvent('appservicename1', 'appservicedescr1', urlPrefixAppCat);
            await listServicesGivenType('supportservicename1', null, 'supportservicedescr1', true, ["PaaS"]);
            await setServiceDescriptionEvent('supportservicename1', 'supportservicedescr1', urlPrefixAppCat);
        }
    }
    else
    {
        // Fill the selection lists
        selectionList('appcategoryreg', urlCategory, null);
                
        selectionList('appproviderreg', urlProvider, null);
        selectionList('appstatereg', urlState, null);
        selectionList('appscoreg', urlSCO, null);

        
        // Fill tables
        await listServicesGivenType('appservicename1', null, 'appservicedescr1', true, ["TANDEM_App", "User_App"]);
        await setServiceDescriptionEvent('appservicename1', 'appservicedescr1', urlPrefixAppCat);
        await listServicesGivenType('supportservicename1', null, 'supportservicedescr1', true, ["PaaS"]);
        await setServiceDescriptionEvent('supportservicename1', 'supportservicedescr1', urlPrefixAppCat);
    }
}

async function getApplication(url, appId) {
    var appInfo = "";
    await fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            var apps = data;
            
            for (i = 0; i < apps.length; i++)
            {
                if (apps[i].id === appId)
                {
                    appInfo = apps[i];
                    break;
                }
            }
            console.log("appInfo = " + appInfo);
            return appInfo;   
              
                        
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });   
        
    return appInfo;
}
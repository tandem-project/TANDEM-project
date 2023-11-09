
function submitApplicationRegistration(event) {
  
    var id, name, provider, description, category, state, sco;
    
    // Check if all required fields are completed
    var isoktoadd = true;
    var errorlist = new Array();
    if (document.getElementById("appidreg").value===""){
        isoktoadd = false;
        errorlist.push("application id");
    }
    if (document.getElementById("appnamereg").value===""){
        isoktoadd = false;
        errorlist.push("application name");
    }
    if (document.getElementById("appcategoryreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("application category");
    }
    
    if (document.getElementById("appproviderreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("application provider");
    }
 
    if (document.getElementById("appstatereg").value==="Select"){
        isoktoadd = false;
        errorlist.push("application state");
    }
    var tableAppServices = document.getElementById("appservicestable");
    var trApp = tableAppServices.getElementsByTagName("tr");
    var tableSupServices = document.getElementById("supportservicestable");
    var trSup = tableSupServices.getElementsByTagName("tr");
    if (document.getElementById("appservicesreg").checked)
    {
        var appServicesDefined = true;
        for (i = 2 ; i < trApp.length ; i++)
        {
            var checklist = document.getElementsByName('appservicename')[i-2];
            var appServiceSelectedText = checklist.options[checklist.selectedIndex].text;
            
            if (appServiceSelectedText === 'Select')
            {
                isoktoadd = false;
                appServicesDefined = false;
                errorlist.push("some rows in application services");
                break;
            }
        }
        if (appServicesDefined && trSup.length > 3)
        {
            for (i = 2 ; i < trSup.length ; i++)
            {
                var checklist = document.getElementsByName('supportservicename')[i-2];
                var supServiceSelectedText = checklist.options[checklist.selectedIndex].text;
      
                if (supServiceSelectedText === 'Select')
                {
                    isoktoadd = false;
                    errorlist.push("some rows in support services");
                    break;
                }
            }
        }
        
    }
    else if (document.getElementById("appscosreg").checked)
    {
        if (document.getElementById("appscoreg").value==="Select"){
            isoktoadd = false;
            errorlist.push("application service chain");
        }
    }
    else {
        isoktoadd = false;
        errorlist.push("services selection");
    }
    
    
    if (!isoktoadd){
        var message = "The next fields are empty:";
        for (i = 0; i < errorlist.length; i++)
        {
            
            if (i === errorlist.length - 1)
            {
                message = message + " " + errorlist[i];
            }
            else
            {
                message = message + " " + errorlist[i] + ",";
            }
        }
        dispmess('ERROR',message);
        return;
    }
    
    // Get application data
    id = document.getElementById("appidreg").value;
    //Check if the id is valid
    if (id.includes('&'))
    {
        dispmess('ERROR','The special chatacter \'&\' should not be included in ID value. Please remove it');
        return;
    }
    name = document.getElementById("appnamereg").value;
   
    provider = document.getElementById("appproviderreg").value;
    if (provider === "Select")
    {
        provider = '';
    }
    description = document.getElementById("appdescriptionreg").value;
    category = document.getElementById("appcategoryreg").value;
    if (category === "Select")
    {
        category = '';
    }
   
    state = document.getElementById("appstatereg").value;
    if (state === "Select")
    {
        state = '';
    }
    
    // Get selected services or SCOs
    var appServices = new Array();
    var supServices = new Array();
    sco = '';
    if (document.getElementById("appservicesreg").checked)
    {
        
         // Get Application Services
        
    
    
    
        for (i = 2 ; i < trApp.length ; i++)
        {
            var appService = {serID:'', serName:''};
            var checklist = document.getElementsByName('appservicename')[i-2];
            var appServiceSelectedText = checklist.options[checklist.selectedIndex].text;
            var appServiceSelectedValue = checklist.options[checklist.selectedIndex].value;
            if (appServiceSelectedText === 'Select')
            {
                continue;
            }
            appService.serID = appServiceSelectedValue;
            appService.serName = appServiceSelectedText;
            appServices[i-2] = appService;
        }
        // Get Support Services
        
    
        for (i = 2 ; i < trSup.length ; i++)
        {
            var supService = {serID:'', serName:''};
            var checklist = document.getElementsByName('supportservicename')[i-2];
            var supServiceSelectedText = checklist.options[checklist.selectedIndex].text;
            var supServiceSelectedValue = checklist.options[checklist.selectedIndex].value;
            if (supServiceSelectedText === 'Select')
            {
                continue;
            }
            supService.serID = supServiceSelectedValue;
            supService.serName = supServiceSelectedText;
            supServices[i-2] = supService;
        }

  
    }
    else if (document.getElementById("appscosreg").checked)
    {
        sco = document.getElementById("appscoreg").value;
        if (sco === "Select")
        {
            sco = '';
        }
    }
    
    
   

    
    
    //below we are binding the input data (json format) in a variable inorder to post it.

    var data = {
        name: name,
        id: id,
        category: category,
        description: description,
        provider: provider,
        applicationServices: appServices,
        supportServices: supServices,
        serviceChain: sco,
        state: state,
        AppURL: '',
        monServicesURL: ''
    };
    
    //Send json
    var url = _BACKENDSERVER+"/applicationcatalogue/create/application";
    CallPostUrl(url,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addapp");
}
resultfnct['_addapp'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Application was saved');

}
resultfnct['err_addapp'] = function (arg1) {
    console.log("ERROR3 in submission");
    dispmess('info','Application was saved');
}
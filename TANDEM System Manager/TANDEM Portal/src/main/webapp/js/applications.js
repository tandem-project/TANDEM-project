const appCreationURL = _GUISERVER + 'applicationRegistration.html';
const productCreationURL = _GUISERVER + 'productRegistration.html';
const productManagementURL = _GUISERVER + 'products.html';
const urlPrefixService = _BACKENDSERVER+"/servicecatalogue/get/services/";
const urlPrefixApp = _BACKENDSERVER+"/applicationcatalogue/get/applications/";
const urlPrefixSco = _BACKENDSERVER+"/workflows/";
const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const instantiateServiceURL = _BACKENDSERVER + '/systemmanager/instantiate/service';
const instantiateWorkflowURL = _BACKENDSERVER + '/systemmanager/run/workflow';
const urlState = urlPrefixSysManGet + "applicationstate";

async function displayApplications() {
    var length = applicationsInfo.length;
    var htmltext = "";
  
    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='appname'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='appcategory'>" + "Category" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Description" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='appprovider'>" + "Provider" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Application Services" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Support Services" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Service Chain" + "<a href='#'></a></th>\
                <th class='services-mgmttable-actions'>" + "State" + "<a href='#'></a></th>\
                <th class='services-mgmttable-actions'>" + "Actions" + "<a href='#'></a></th>\
            </tr>"; 
    
    for (var i = 0; i < length; i++) {    
        var j = i + 1;
 
        var editIconId = 'editIcon' + j;
        var stateIconId = 'stateIcon' + j;
        var listId = 'dropDown' + j;
        var monIconId = 'monitorIcon' + j;
        var runIconId = 'runIcon' + j;
        var productIconId = 'productIcon' + j;
        var listProductsIconId = 'listProductsIcon' + j;
        
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]"); 
        iconsarr1.push("<i id=" + editIconId + " class='fas fa-edit' title='Edit' style='color:blue;font-size:18px;'></i>");
        iconsarr1.push("<i id=" + stateIconId + " class='fas fa-project-diagram' title='Change state' style='color:green;font-size:18px'></i></a>" +
                    "<select id=" + listId + " style='display:none; position: relative; width:200px; overflow: auto;'>" + "</select>");
        iconsarr1.push("<i id=" + monIconId + " class='fas fa-desktop' title='Monitor' style='color:#5E0E94;font-size:18px'></i>");
        
        iconstab["rows"].push(iconsarr1);
        var iconsarr2 = JSON.parse("[]");
        iconsarr2.push("<i id=" + runIconId + " class='fa fa-play' title='Run application' style='color:#C99D5C;font-size:18px'></i>");
        iconsarr2.push("<i id=" + productIconId + " class='fas fa-cube' title='Create product' style='color:#2BB6C0;font-size:18px'></i>");
        iconsarr2.push("<i id=" + listProductsIconId + " class='fas fa-cubes' title='List products' style='color:#0E947C;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr2);
        var iconsarr3 = JSON.parse("[]");
        iconsarr3.push("<i class='far fa-trash-alt' onclick='deleteApplication(\""+applicationsInfo[i].id+"\")' title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr3);
        
        //iconstab["tdstyle"]="padding-bottom: 3px;padding-top: 2px;border: 1px solid black;border-radius: 4px;box-shadow: 2px 5px 5px #9e9e9e;border-style: outset;";
        ////////////////////////////////// construct icons table
        
        htmltext +=
            "<tr>\
                <td>" + applicationsInfo[i].name + "</td>\
                <td>" + applicationsInfo[i].category + "</td>\
                <td>" + applicationsInfo[i].description.slice(0,100) + 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                applicationsInfo[i].description+"'></i></a>"+
                "</td>\
                <td>" + applicationsInfo[i].provider + "</td>\
                <td>";
        
        for (var j=0; j < applicationsInfo[i].applicationServices.length; j++){
            htmltext += applicationsInfo[i].applicationServices[j].serName + ", ";
        }
        if (applicationsInfo[i].applicationServices.length === 0)
        {
            htmltext += '';
        }
        else
        {
            htmltext = htmltext.substring(0, htmltext.length - 2);
        }
        
        
        htmltext += "</td><td>";
        
        for (var j=0; j < applicationsInfo[i].supportServices.length; j++){
             htmltext += applicationsInfo[i].supportServices[j].serName + ", ";
        }
        if (applicationsInfo[i].supportServices.length === 0)
        {
            htmltext += '';
        }
        else
        {
            htmltext = htmltext.substring(0, htmltext.length - 2);
        }
        var j = i + 1;

        htmltext += "</td><td>" + applicationsInfo[i].serviceChain + "</td>\
                <td>" + applicationsInfo[i].state + "</td>\
                <td>" + _makeicons(iconstab) + "</td>\
            </tr>";
    }
    
    document.getElementById("applicationsTable").innerHTML = htmltext;
    
    // +++++++++ Temporary code. To Be Moved to Instances table
    for (var i = 0; i < length; i++) {
        var j = i + 1;
        var monitorIconId = 'monitorIcon' + j;
        var hrefElement = document.getElementById(monitorIconId);
        //If the application is instantiated, add the monitoring URL on monitorIconId
        if (applicationsInfo[i].state === "Instantiated")
        {
            // Call API for getting the monitoring URL
            var url = await applicationMonUrl(applicationsInfo[i].id);
            hrefElement.href = url;
           
        }
    }
        // -----------------------------------
}

function addOnClickApplicationsEvents(tableid){

    document.getElementById('appname').addEventListener('click', function(event){
        sortTableRows(tableid, 0);
    });
    
    document.getElementById('appcategory').addEventListener('click', function(event){
        sortTableRows(tableid, 1);
    });
    
    document.getElementById('appprovider').addEventListener('click', function(event){
        sortTableRows(tableid, 3);
    });
}

function addOnClickEditApplicationEvent(editIconId, appId){
 
    document.getElementById(editIconId).addEventListener('click', function(event){
     
        // Get variables from the current page
        const queryString = window.location.search;
//        console.log("queryString = " + queryString);
        // Open the service registration page in new tab
        var url = appCreationURL + queryString + "&appId=" + appId;
        window.open(url, '_blank');
    });
}

function addOnClickNextStateEvent(stateId, dropdownId, appId){
 
    document.getElementById(stateId).addEventListener('click', async function(event){
       
        // Get the status of the application
        var appStatus = '';
        var url = urlState;
//        console.log("url = " + url);
        var appSelected;
        // Get application's info
        for (var i= 0; i < applicationsInfo.length; i++)
        {
            if (applicationsInfo[i].id === appId)
            {
                appStatus = applicationsInfo[i].state;
                appSelected = applicationsInfo[i];
                break;
            }
        }
//        console.log("dropdownId = " + dropdownId);
        if (document.getElementById(dropdownId).style.display === "")
        {
            // In this case, the selection list has already opened.
            // On click, get the selected value and change the status
            // First check if the status has changed
            var newStatus = document.getElementById(dropdownId).value;
            if (newStatus !== appStatus)
            {
               
                // Ask for confirmation
                if (confirm("Change the status?") === false) {
                    return;
                }
                
                // +++++++++ Temporary code
                // Check if the status is "Instantiated" and proceed with the instantiation before updating the status
                if (newStatus === "Instantiated")
                {
                    // Get the excecution URL and start the service
                    var instantiateServiceURL = appSelected.AppURL;
                    window.open(instantiateServiceURL,'_blank');

                  
                 
                    // Update the monitoring URL
                    var url = await applicationMonUrl(appId);
                    
                    var rowIndex = stateId.substr(9,stateId.length);
                    var monitorIconId = 'monitorIcon' + rowIndex;
                    var hrefElement = document.getElementById(monitorIconId);
                    hrefElement.href = url;
                }
                else if (newStatus === "Retired")
                {                
                    // Update the monitoring URL
                    var url = '#';
                    
                    var rowIndex = stateId.substr(9,stateId.length);
                    var monitorIconId = 'monitorIcon' + rowIndex;
                    var hrefElement = document.getElementById(monitorIconId);
                    hrefElement.href = url;
                }
                
                // -----------------------------------
               
                //Change the status of the application
                var updateData = appSelected;
                updateData.state = newStatus;
                var updateUrl = _BACKENDSERVER+"/applicationcatalogue/update/applications/" + appId;
                CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updateapp");
                resultfnct['updateapp'] = function () {
                    console.log("Updating application");
                };
                // Change the value in the table
                var myTable = document.getElementById("applicationsTable");
                var rowIndex = stateId.substr(9,stateId.length);
                var cellIndex = 7;
                myTable.rows[rowIndex].cells[cellIndex].innerHTML = newStatus;
                
            }
            document.getElementById(dropdownId).style.display = "none";
        }
        else {
            // Add the options on the list
            let dropdown = document.getElementById(dropdownId);
            dropdown.length = 0;
    
            let defaultOption = document.createElement('option');
            defaultOption.text = appStatus;
            dropdown.add(defaultOption);
            dropdown.selectedIndex = 0;
            
            fetch(url)
    
                .then(response => response.json())
                .then(data => {
                    // Examine the text in the response
                    let option;
                    
                    for (let i = 0; i < data.length; i++) {
                        // find the status
                        if (data[i].name === appStatus)
                        {
                            var nextStatuses = data[i].next;
                            for (let j = 0; j < nextStatuses.length; j++)
                            {
                                
                                option = document.createElement('option');
                                option.text = nextStatuses[j];
                                option.value = nextStatuses[j];
//                                console.log(option.text);
//                                console.log(option.value);
                                dropdown.add(option);
//                                console.log(nextStatuses[j]);
                            }
                            // Show dropdown list
                            
                            var listSize = document.getElementById(dropdownId).length;
//                            console.log("listSize = " + listSize);
                            document.getElementById(dropdownId).style.display = "";
//                            console.log("#10");
                            document.getElementById(dropdownId).size = listSize;
//                            console.log("#11");
                            break;
                        }
                        
                    }
                        
                })
                
              
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });           
        }
        
    });
}

function addOnClickRunApplicationsEvent(id, app){
    document.getElementById(id).addEventListener('click', function(event){
        //First check the it is allowed to run the application (according to status) and then open the respective link
        if ((app.state !== "Instantiated") && (app.state !== "Retired"))
        {
            // Open a popup window according to whether the application is defined through services or through a SCO
            if (app.applicationServices.length > 0 || app.supportServices.length > 0)
            {
                runAppFromServicesPopUp(id, app);
            }
            else if (app.serviceChain !== '')
            {
                runAppFromScoPopUp(id, app);
            }
            else
            {
                dispmess('INFO', "You can't run this application because there are no services or service chain defined.'");
                return;
            }         
        }
        else
        {
            dispmess('INFO', "You can't run an application with status '" + app.state + "'");
            
        }
    });
}

function addOnClickMonServicesEvent(id, app){
    document.getElementById(id).addEventListener('click', function(event){
        if (app.state === "Instantiated")
        {
            var monURL = app.monServicesURL;
            window.open(monURL,'_blank');
        }
        else
        {
            dispmess('INFO', "You can't monitor a non-instantiated application");
           
        }
    });
}

//Function for opening product creation page, for a give application
function addOnClickCreateProductEvent(productIconId, appId){
    document.getElementById(productIconId).addEventListener('click', function(event){
        // Check the status of the application

        var myTable = document.getElementById("applicationsTable");
        var rowIndex = productIconId.substr(11,productIconId.length);
        var cellIndex = 7;
        var appStatus = myTable.rows[rowIndex].cells[cellIndex].innerHTML;
        
        // If status >= Launched, open the product registration page (the user can create a product from application)
        if (appStatus === "Launched") 
        {
            // Get variables from the current page
            const queryString = window.location.search;

            // Open the product registration page in new tab
            var url = productCreationURL + queryString + "&appId=" + appId;
            window.open(url, '_blank');
        }
        else
        {
            // Otherwise, show a message (the user can't create a product from application)
            dispmess("INFO", "You can't create a product from the selected application. The application's state should be 'Launched'");
        }
        
        
    });
}

// Shows a list of products that were created from this application
function addOnClickListProductsEvent(iconId, appId){
 
    document.getElementById(iconId).addEventListener('click', async function(event){
        
        //Check if there are products created from this application
        var productsExist = false;
        var getProductsUrl = _BACKENDSERVER+"/servicecatalogue/get/products";
     
        await fetch(getProductsUrl)
            .then(response => response.json())
            .then(data => {
   
                // Examine the text in the response
                    
                for (let i = 0; i < data.length; i++) {
                    // find the application id

                    if (data[i].productApplicationId === appId)
                    {
                        productsExist = true;
                        break;
                    }
                        
                }

            })
   
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
        if (productsExist)
        {
            //Open Products page
            // Get variables from the current page
            const queryString = window.location.search;

            // Open Product Management page in new tab, listing only the products that were created from the selected service
            var url = productManagementURL + queryString + "&productApplicationId=" + appId;
            window.open(url, '_blank');
        }
        else
        {
            dispmess('INFO','There are no products created from the selected application');
        }

    });
}

//Function for deleting the application
function deleteApplication(id){
    console.log("In delete App");
    if (confirm("Delete Application?") === false) {
        return;
    }
    var url = _BACKENDSERVER+"/applicationcatalogue/delete/applications/"+id;
    CallPostUrl(url,"DELETE",null,[],"dummyans");
    resultfnct['dummyans'] = function () {
        //Reload page
        window.location.reload();
    }
}

resultfnct['jsoninfoapps'] = function (arg1) { 
    applicationsInfo = JSON.parse(arg1);
    displayApplications("0");
    addOnClickApplicationsEvents('applicationsTable');
    
    var IDs = [];
    var editIDs = [];
    var stateIDs = [];
    
    var dropdownIDs = [];
    var productIDs = [];
    var listProductsIDs = [];
    var tableLength = document.getElementById('applicationsTable').rows.length;
    for (var i = 1; i < tableLength; i++){
       var runIconId = 'runIcon';
       var editId = 'editIcon';
       var stateIconId = 'stateIcon';
       var dropDownId = 'dropDown';
       var productId = 'productIcon';
       var listProductsId = 'listProductsIcon';
       stateIconId = stateIconId + i;
       dropDownId = dropDownId + i;
       runIconId = runIconId + i;
       editId = editId + i;
       productId = productId + i;
       listProductsId = listProductsId + i;
       IDs.push(runIconId);
       editIDs.push(editId);
       stateIDs.push(stateIconId);
       dropdownIDs.push(dropDownId);
       productIDs.push(productId);
       listProductsIDs.push(listProductsId);
    }
    for (var k = 0; k < applicationsInfo.length; k++){
        appId = applicationsInfo[k].id;
        
        addOnClickEditApplicationEvent(editIDs[k], appId);
        addOnClickNextStateEvent(stateIDs[k], dropdownIDs[k], appId);
        addOnClickCreateProductEvent(productIDs[k], appId);
        addOnClickListProductsEvent(listProductsIDs[k], appId);
        addOnClickRunApplicationsEvent(IDs[k], applicationsInfo[k]);
    }   
    
    
    var monIDs = [];
    for (var i = 1; i < tableLength; i++){
       var monIconId = 'monitorIcon';
       monIconId = monIconId + i;
       monIDs.push(monIconId);
    }
    for (var k = 0; k < applicationsInfo.length; k++){
        addOnClickMonServicesEvent(monIDs[k], applicationsInfo[k]);
    }
};

resultfnct['errjsoninfoapps'] = function (sts) {
    alert("error="+sts);
} 
       
function getjsoninfo(){
    applicationsInfo = "";
    CallPostUrl(_BACKENDSERVER+"/applicationcatalogue/get/applications","GET",null,[],"jsoninfoapps");
}

// Shows a pop-up window for configuring the services that atre associated with the application, before executing the app
async function runAppFromServicesPopUp(divId, app) {
    var title = "CONFIGURE SERVICES";
    document.getElementById('applicationTitle').innerHTML = title.bold();
    var htmltxt = "";
    htmltxt += "<div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                    <form id='addoperationform' style='margin: 0 auto; text-align:center; width:100%;'>";
    var allServices = new Array();
    for (var i = 0; i < app.applicationServices.length; i++)
    {
        allServices.push(app.applicationServices[i]);
    }
    
    for (var i = 0; i < app.supportServices.length; i++)
    {
        allServices.push(app.supportServices[i]);
    }
  
    var confIndex = 0;
    for (var i = 0; i < allServices.length; i++)
    {
        
        if (i > 0)
        {
            htmltxt += "<hr style='width:100%; border-top:2px solid #000'/>";
        }
        
        htmltxt += "<div class='row'>\
                        <h3 style='text-align: center;'><b>" + allServices[i].serName + "</b></h3>\n\
                    </div>";
        
        // Get service details
        var getServiceUrl = urlPrefixService + allServices[i].serID;
        console.log("getServiceUrl = " + getServiceUrl);
        await fetch(getServiceUrl)
            .then(response => response.json())
            .then(data => {
   
                // Examine the text in the response
                var service = data;
                console.log("service = " + service);
                // Show configurations table
                if (service.serConfigParams.length > 0)
                {
                    confIndex++;
                    var confTableId = divId + "configparamstable" + confIndex;
                    console.log("confTableId = " + confTableId);
                    console.log("There are configuration params");
                    htmltxt += "<div class='row regformrow'>\
                                    <div class='col-srvregistration-tables'>\
                                        <table class='srvregtable' id='" + confTableId + "'>\
                                            <thead>\
                                                <tr>\
                                                    <td style='background-color: #9e9e9e;' colspan='100%'><b>Configuration Parameters</b></td>\
                                                </tr>\
                                                <tr>\
                                                    <th>Parameter Name</th>\
                                                    <th>Parameter Type</th>\
                                                    <th>Parameter Description</th>\
                                                    <th>Parameter Value</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody>";
                };
                
                for (var j = 0; j < service.serConfigParams.length; j++)
                {
                    htmltxt += "<tr>\
                                    <td>" + service.serConfigParams[j].serParamName + "</td>\
                                    <td>" + service.serConfigParams[j].serParamType + "</td>\
                                    <td>" + service.serConfigParams[j].serParamDescr + "</td>\
                                    <td contenteditable>" + service.serConfigParams[j].serParamTypicalValue + "</td>\
                                </tr>";
                }
                htmltxt += "</tbody>\
                            </table>\
                            </div>\
                            </div>";
                // Show operations tables
                for (var j = 0; j < service.serOperations.length; j++)
                {
                    htmltxt += "<h4 style='text-align: center; padding-top: 25px;'><b>Parameters of operation '" + service.serOperations[j].serOperationName + "'</b></h3>";
                    if (service.serOperations[j].serOperationInputParams.length > 0 || service.serOperations[j].serOperationOutputParams.length > 0)
                    {
                        htmltxt += "<div class='row regformrow' >";
                    }
                    // Input parameters
                    if (service.serOperations[j].serOperationInputParams.length > 0)
                    {
                        htmltxt += "<div class='col-srvregistration-tables' width='45%'>\
                                        <table class='srvregtable'>\
                                            <thead>\
                                                <tr >\
                                                   <td style='background-color: #9e9e9e;' colspan='100%'><b>Input Parameters</b></td>\
                                                </tr>\
                                                <tr>\
                                                   <th>Parameter Name</th>\
                                                    <th>Parameter Type</th>\
                                                    <th>Parameter Description</th>\
                                                    <th>Parameter Value</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody>";
                        for (var k = 0; k < service.serOperations[j].serOperationInputParams.length; k++)
                        {
                            htmltxt += "<tr>\
                                            <td>" + service.serOperations[j].serOperationInputParams[k].serParamName + "</td>\
                                            <td>" + service.serOperations[j].serOperationInputParams[k].serParamType + "</td>\
                                            <td>" + service.serOperations[j].serOperationInputParams[k].serParamDescr + "</td>\
                                            <td contenteditable>" + service.serOperations[j].serOperationInputParams[k].serParamTypicalValue + "</td>\
                                        </tr>";
                        }

                        htmltxt += "</tbody>\
                                    </table>\
                                    </div>";
                    }
                    // Output parameters
                    if (service.serOperations[j].serOperationOutputParams.length > 0)
                    {
                        htmltxt += "<div class='col-srvregistration-tables' width='45%'>\
                                        <table class='srvregtable'>\
                                            <thead>\
                                                <tr >\
                                                    <td style='background-color: #9e9e9e;' colspan='100%'><b>Output Parameters</b></td>\
                                                </tr>\
                                                <tr>\
                                                    <th>Parameter Name</th>\
                                                    <th>Parameter Type</th>\
                                                    <th>Parameter Description</th>\
                                                    <th>Parameter Value</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody>";
                        for (var k = 0; k < service.serOperations[j].serOperationOutputParams.length; k++)
                        {
                            htmltxt += "<tr>\
                                            <td>" + service.serOperations[j].serOperationOutputParams[k].serParamName + "</td>\
                                            <td>" + service.serOperations[j].serOperationOutputParams[k].serParamType + "</td>\
                                            <td>" + service.serOperations[j].serOperationOutputParams[k].serParamDescr + "</td>\
                                            <td contenteditable>" + service.serOperations[j].serOperationOutputParams[k].serParamTypicalValue + "</td>\
                                        </tr>";
                        }
                        htmltxt += "</tbody>\
                            </table>\
                            </div>";
                    }
                }
                htmltxt += "</div>";         
            })
   
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
    }

    htmltxt += "</form>\
                <div class='row'>\
                    <input id='add-operation-btn' type='button' value='Run Application' onclick=\"runApplication('" + divId + "', '" + app.id + "')\">\
                </div>\
                </div>";
    // Insert the div to the document
    var elemDiv = document.getElementById("applicationInstantiateTables");
    elemDiv.innerHTML = htmltxt;

    document.getElementById('applicationInstantiatePopup').style.display='block';
}

// Function for retreiving configuration parameters from the popup and executing the application's service(s)
async function runApplication(divId, applicationId)
{
    // Get the application from backend
    const applicationUrl = urlPrefixApp + applicationId;
    console.log("applicatonUrl = " + applicationUrl);
    fetch(applicationUrl)
    
        .then(response => response.json())
        .then(async data => {
            var application = data;
//            var allConfParams = [];
            var allServices = new Array();
            for (var i = 0; i < application.applicationServices.length; i++)
            {
                allServices.push(application.applicationServices[i]);
            }
    
            for (var i = 0; i < application.supportServices.length; i++)
            {
                allServices.push(application.supportServices[i]);
            }
            
       
         
            var confIndex = 0;
            var allServicesInstantiated = true;
            var lastService = '';
            for (var i = 0; i < allServices.length; i++)
            {
                 // Get service details
                var getServiceUrl = urlPrefixService + allServices[i].serID;

                await fetch(getServiceUrl)
                    .then(response => response.json())
                    .then(async data => {
   
                        // Examine the text in the response
                        var service = data;
                        var confParams = service.serConfigParams;
                        // Read configurations table
                        if (service.serConfigParams.length > 0)
                        {
                            confIndex++;
                            var confTableId = divId + "configparamstable" + confIndex;
                            var tableConfParams = document.getElementById(confTableId);
                            
                            //Get Param name and value from the table
                            for (var j = 0; j < service.serConfigParams.length; j++)
                            {
                                console.log("j = " + j);
                                console.log(tableConfParams.rows);
                                var paramName = tableConfParams.rows[j+2].cells[0].innerHTML;
                                console.log("paramName = " + paramName);
                                var paramValue = tableConfParams.rows[j+2].cells[3].innerHTML;
                                console.log("paramValue = " + paramValue);
                       
                                confParams[j].serParamValue = paramValue;
                   
                            }
                        }
                        
                        // Create the call's body
                        var instantiateServiceBody = '{';
                        for (var j = 0; j < confParams.length; j++)
                        {
                            //Get Param name and value from the table

   
                            instantiateServiceBody = instantiateServiceBody + "\"" + confParams[j].serParamName + "\": \"" + confParams[j].serParamValue + "\"";
                            if (j < confParams.length - 1)
                            {
                                instantiateServiceBody = instantiateServiceBody + ', ';
                            }
                        }
                        instantiateServiceBody = instantiateServiceBody + '}';
                        console.log("instantiateServiceBody = " + instantiateServiceBody);
                        let r = await fetch(instantiateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: instantiateServiceBody});
                        console.log("Status for excecuting service " + service.serName + " : " + r.status);
                        lastService = service.serName;
                        if (r.status !== 200)
                        {
                            dispmess("ERROR", "Unable to instantiate the service " + service.serName + ". Please try again later or contact the administrator");
                            console.log("Unable to instantiate the service " + service.serName);
                            allServicesInstantiated = false;
                            return;
                        }
                    })
   
                    .catch(function(err) {  
                        console.error('Fetch Error -', err);  
                    });
  
//                if (!allServicesInstantiated)
//                {
//                    dispmess("ERROR", "The application instantiation was disrupted because we were unable to instantiate the service " + lastService + ". Please try again later or contact the administrator");
//                    break;
//                }
                    
            }
//            if (!allServicesInstantiated)
//            {
//                // Delete all instances of previous services
//                // TO BE DONE: Call the correct API. The problem is that the current API doesn't actually delete instance from pi-Edge. Also, it has to be mofified, as the piEdge IP and port should be known for making the call. Otherwise my processing must change
//            }
//            else {
//                            // Update the monitoring URL
    //            var rowIndex = divId.substr(7,divId.length);
    //            var url = await serviceMonUrl(service.serId);
    //            console.log("url = " + url);
    //            if (url !== '#')
    //            {
    //                console.log("Going to change the monitoring URL...");
    //                
    //                var monitorIconId = 'monitorIcon' + rowIndex;
    //                var hrefElement = document.getElementById(monitorIconId);
    //                hrefElement.href = url;
    //            }

                //change the status of the application
                var updateData = application;
                updateData.state = "Instantiated";
                var updateUrl = _BACKENDSERVER+"/applicationcatalogue/update/applications/" + application.id;
                CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updateapp");
                resultfnct['updateapp'] = function () {
                    console.log("Updating application");
                };
                // Change the value in the table
                var myTable = document.getElementById("applicationsTable");
                var rowIndex = divId.substr(7,divId.length);
                var cellIndex = 7;
                myTable.rows[rowIndex].cells[cellIndex].innerHTML = "Instantiated";
                dispmess("INFO", "The application has been instantiated");
//            }
                 
 
                   
            // Close the pop-up window
            document.getElementById('applicationInstantiatePopup').style.display='none';
            
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });   

}


// Shows a pop-up window for configuring the service chain that is associated with the application, before executing the app
async function runAppFromScoPopUp(divId, app) {
    var title = "CONFIGURE SERVICES OF THE SERVICE CHAIN '" + app.serviceChain + "'" ;
    document.getElementById('applicationTitle').innerHTML = title.bold();
    
    // Get service chain
    var getScoUrl = urlPrefixSco + app.serviceChain;
//    console.log("getScoUrl = " + getScoUrl);
    await fetch(getScoUrl)
        .then(response => response.json())
        .then(data => {
   
            // Examine the text in the response
            var workflow = data;
            // Get the workflow's json
            var scojson = workflow.json;
            var services = scojson.integration;

            var htmltxt = "";
            htmltxt += "<div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                    <form id='addoperationform' style='margin: 0 auto; text-align:center; width:100%;'>";
            for (var i = 0; i < services.length; i++)
            {
                var service = services[i];
                if (i > 0)
                {
                    htmltxt += "<hr style='width:100%; border-top:2px solid #000'/>";
                }
        
                htmltxt += "<div class='row'>\
                        <h3 style='text-align: center;'><b>" + service.name + " (service id: " + service.type + ")" + "</b></h3>\n\
                    </div>";
        
                // Show parameters table
                var tableId = "configparamstable";

                if (Object.keys(service.parameters.input_from_user).length > 0)
                {
                    tableId = tableId + i;
                    console.log("There are configuration params");
                    htmltxt += "<div class='row regformrow'>\
                                    <div class='col-srvregistration-tables'>\
                                        <table class='srvregtable' id='" + tableId + "'>\
                                            <thead>\
                                                <tr>\
                                                    <td style='background-color: #9e9e9e;' colspan='100%'><b>Service Parameters</b></td>\
                                                </tr>\
                                                <tr>\
                                                    <th>Parameter Name</th>\
                                                    <th>Parameter Value</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody>";
                };

                //for (var j = 0; j < service.parameters.input_from_user.length; j++)
                for(let j in service.parameters.input_from_user)
                {
                    console.log("j = " + j);
//                    Object.entries(service.parameters.input_from_user[j]).forEach(([key, value])=> {
//                        console.log(`${key}: ${value}`);
//                        htmltxt += "<tr>\
//                                    <td>" + `${key}` + "</td>\
//                                    <td contenteditable>" + `${value}` + "</td>\
//                                </tr>";
//                    });
//                   Object.entries(service.parameters.input_from_user[j]).forEach(([key, value])=> {
//                        console.log(`${key}: ${value}`);
                        htmltxt += "<tr>\
                                    <td>" + j + "</td>\
                                    <td contenteditable>" + service.parameters.input_from_user[j] + "</td>\
                                </tr>";
//                    });
                }
                htmltxt += "</tbody>\
                            </table>\
                            </div>\
                            </div>";
           
            }

            htmltxt += "</form>\
                <div class='row'>\
                    <input id='add-operation-btn' type='button' value='Run Workflow' onclick=\"runWorkflow('" + divId + "', '" + app.id + "')\">\
                </div>\
                </div>";
            //Insert the div to the document
            var elemDiv = document.getElementById("applicationInstantiateTables");
            elemDiv.innerHTML = htmltxt;

        })
   
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });


    document.getElementById('applicationInstantiatePopup').style.display='block';
}

// Function for retreiving configuration parameters from the popup and executing the service
async function runWorkflow(divId, applicationId)
{
    const applicationUrl = urlPrefixApp + applicationId;
    console.log("applicatonUrl = " + applicationUrl);
    fetch(applicationUrl)
    
        .then(response => response.json())
        .then(async data => {
            var application = data;
            var workflowId = application.serviceChain;
            console.log("serviceChain = " + workflowId);
            // Get the workflow from backend
            const workflowUrl = urlPrefixSco + workflowId;
            console.log("workflowUrl = " + workflowUrl);
            fetch(workflowUrl)
    
                .then(response => response.json())
                .then(async data => {
                    var workflow = data;
                 
//                    console.log("workflow = " + workflow);

                    // Get configuration parameters from the form and create the call's body
                    var json = workflow.json;
//                    console.log("json = " + json);
                    var services = workflow.json.integration;
//                    console.log("services = " + services);
                    for (var i = 0; i < services.length; i++)
                    {
                        console.log("i = " + i);
                        var tableId = "configparamstable";
//                        console.log("tableId = " + tableId);
//                        if (services[i].parameters.input_from_user.length > 0)
                        var paramsSize = Object.keys(services[i].parameters.input_from_user).length;
                        if (paramsSize > 0)
                        {
                            tableId = tableId + i;
                            console.log("tableId = " + tableId);
                            var tableConfParams = document.getElementById(tableId);
                            //Get Param name and value from the table
                            for (var j = 0; j < paramsSize; j++)
//                            for(let j in services[i].parameters.input_from_user)
                            {
                                console.log("j = " + j);
                                var paramName = tableConfParams.rows[j+2].cells[0].innerHTML;
                                console.log("paramName = " + paramName);
                                var paramValue = tableConfParams.rows[j+2].cells[1].innerHTML;
                                console.log("paramValue = " + paramValue);
//                                json.integration[i].parameters.input_from_user[j][paramName] = paramValue;
                                json.integration[i].parameters.input_from_user[paramName] = paramValue;
                            }
                    
                        }
               
                    }
            
                    var jsonToSend = {components: json.integration};
//                    console.log("json = " + jsonToSend);
                    const jsonToPrint = JSON.stringify(jsonToSend);
                    console.log("---------------JSON---------------");
                    console.log(jsonToPrint);
                    console.log("instantiateWorkflowURL = " + instantiateWorkflowURL);
//                    let r = await fetch(instantiateWorkflowURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: jsonToSend});
                    CallPostUrl(instantiateWorkflowURL,"POST",jsonToSend,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"runflow");
                    resultfnct['runflow'] = function () {
                        console.log("Updating application");
                                    // Update the monitoring URL
//            var rowIndex = divId.substr(7,divId.length);
//            var url = await serviceMonUrl(service.serId);
//            console.log("url = " + url);
//            if (url !== '#')
//            {
//                console.log("Going to change the monitoring URL...");
//                
//                var monitorIconId = 'monitorIcon' + rowIndex;
//                var hrefElement = document.getElementById(monitorIconId);
//                hrefElement.href = url;
//            }
                        //Change the status of the application
                        var updateData = application;
                        updateData.state = "Instantiated";
                        var updateUrl = _BACKENDSERVER+"/applicationcatalogue/update/applications/" + application.id;
                        CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"updateapp");
                        resultfnct['updateapp'] = function () {
                            console.log("Updating application");
                        };
                        // Change the value in the table
                        var myTable = document.getElementById("applicationsTable");
                        var rowIndex = divId.substr(7,divId.length);
                        var cellIndex = 7;
                        myTable.rows[rowIndex].cells[cellIndex].innerHTML = "Instantiated";
                   
                        // Close the pop-up window
                        document.getElementById('applicationInstantiatePopup').style.display='none';
                        dispmess("INFO", "The workflow has been instantiated");
                    };
                    resultfnct['errrunflow'] = function () {
                        dispmess("ERROR", "Unable to instantiate the workflow. Please try again later or contact the administrator");
                        document.getElementById('applicationInstantiatePopup').style.display = "none";
                        return;
                    }; 
                })
                
              
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
       
        })
         .catch(function(err) {  
                console.error('Fetch Error -', err);  
        }); 
}


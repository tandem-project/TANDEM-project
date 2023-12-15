const appCreationURL = _GUISERVER + 'applicationRegistration.html';
const productCreationURL = _GUISERVER + 'productRegistration.html';
const productManagementURL = _GUISERVER + 'products.html';

const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const instantiateServiceURL = _BACKENDSERVER + '/systemmanager/instantiate/service';
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
                runAppFromServicesPopUp(id, app, true);
            }
            else if (app.serviceChain !== '')
            {
                runAppFromScoPopUp(id, app, true);
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
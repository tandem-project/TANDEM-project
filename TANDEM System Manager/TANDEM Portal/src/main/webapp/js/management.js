var productCreationURL = _GUISERVER + 'productRegistration.html';
var productManagementURL = _GUISERVER + 'products.html';
var serviceCreationURL = _GUISERVER + 'serviceRegistration.html';

//const instantiateServiceURL = _BACKENDSERVER + '/systemmanager/instantiate/service';
const terminateServiceURL = _BACKENDSERVER + '/systemmanager/delete/service';
//const getServiceURL = _BACKENDSERVER + '/servicecatalogue/get/services/';

const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const urlState = urlPrefixSysManGet + "servicestate";

async function displayServices(action) {
    var length = servicesInfo.length;
    var htmltext = "";
  
    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='servid'>" + "ID" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='servname'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='servtype'>" + "Type" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Provider" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Description" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='servcategory'>" + "Category" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Version" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "State" + "<a href='#'></a></th>\
                <th class='services-mgmttable-actions'>" + "Actions" + "<a href='#'></a></th>\
            </tr>";

    for (var i = 0; i < length; i++) {  
        var id = 'stateIcon';
        var j = i + 1;
        var stateIconId = id + j;
        var listId = 'dropDown' + j;
        var productIconId = 'productIcon' + j;
        var editIconId = 'editIcon' + j;
        var monitorIconId = 'monitorIcon' + j;
        var instanceIconId = 'instanceIcon' + j;
        var listProductsIconId = 'listProductsIcon' + j;
        var runIconId = 'runIcon' + j;
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i id=" + editIconId + " class='fas fa-edit' title='Edit' style='color:blue;font-size:18px;'></i>");
        iconsarr1.push("<i id=" + stateIconId + " class='fas fa-project-diagram' title='Change state' style='color:green;font-size:18px'></i>" +
                            "<select id=" + listId + " style='display:none; position: relative; width:200px; overflow: auto;'>" + "</select>");
        iconsarr1.push("<a href='#' target='_blank' id=" + monitorIconId + "><i class='fas fa-desktop' title='Monitor' style='color:#5E0E94;font-size:18px'></i></a>");
        
        iconstab["rows"].push(iconsarr1);
        var iconsarr2 = JSON.parse("[]");
        iconsarr2.push("<i id=" + instanceIconId + " class='fa fa-book' title='View instances' style='color:black;font-size:18px'></i>");
        iconsarr2.push("<i id=" + productIconId + " class='fas fa-cube' title='Create product' style='color:#2BB6C0;font-size:18px'></i>");
        iconsarr2.push("<i id=" + listProductsIconId + " class='fas fa-cubes' title='List products' style='color:#0E947C;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr2);
        var iconsarr3 = JSON.parse("[]");
        iconsarr3.push("<i id=" + runIconId + " class='fa fa-play' title='Run service' style='color:#C99D5C;font-size:18px'></i>");
        iconsarr3.push("<i class='far fa-trash-alt' onclick='deleteService(\""+servicesInfo[i].serId+"\")' title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr3);
        
        //iconstab["tdstyle"]="padding-bottom: 3px;padding-top: 2px;border: 1px solid black;border-radius: 4px;box-shadow: 2px 5px 5px #9e9e9e;border-style: outset;";
        ////////////////////////////////// construct icons table
        htmltext +=
        "<tr>\
                <td id=" + servicesInfo[i].serId +">" + servicesInfo[i].serId + "</td>\
                <td>" + servicesInfo[i].serName + "</td>\
                <td>" + servicesInfo[i].serType + "</td>\
                <td>" + servicesInfo[i].serProvider + "</td>\
                <td>" + servicesInfo[i].serDescription.slice(0,100);
        if (servicesInfo[i].serDescription.length>90) htmltext += 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                servicesInfo[i].serDescription+"'></i></a>";
        
        htmltext +=
                "</td>\
                <td>" + servicesInfo[i].serCategory.name + "</td>\
                <td>" + servicesInfo[i].serVersion + "</td>\
                <td>" + servicesInfo[i].state + "</td>\
                <td >" + _makeicons(iconstab) + "</td>\
            </tr>";
    }
    document.getElementById("myTable").innerHTML = htmltext;
    // +++++++++ Temporary code. To Be Moved to Instances table
    for (var i = 0; i < length; i++) {
        var j = i + 1;
        var monitorIconId = 'monitorIcon' + j;
        var hrefElement = document.getElementById(monitorIconId);
        //If the service is instantiated, add the monitoring URL on monitorIconId
        if (servicesInfo[i].state === "Instantiated")
        {
            // Call API for getting the monitoring URL
            var url = await serviceMonUrl(servicesInfo[i].serId);
            //console.log("url = " + url);
            hrefElement.href = url;
           
        }
    }
    // -----------------------------------
}

function addOnClickServicesEvents(tableid){
    document.getElementById('servid').addEventListener('click', function(event){
        sortTableRows(tableid, 0);
    });
    
    document.getElementById('servname').addEventListener('click', function(event){
        sortTableRows(tableid, 1);
    });
    
    document.getElementById('servtype').addEventListener('click', function(event){
        sortTableRows(tableid, 2);
    });
    
    document.getElementById('servcategory').addEventListener('click', function(event){
        sortTableRows(tableid, 5);
    });
}


function addOnClickNextStateEvent(stateId, dropdownId, serviceId){
 
    document.getElementById(stateId).addEventListener('click', async function(event){
       
        // Get the status of the service
        var serStatus = '';
        var url = urlState;
      
        var serviceSelected;
        // Get service's info
        for (var i= 0; i < servicesInfo.length; i++)
        {
            if (servicesInfo[i].serId === serviceId)
            {
                serStatus = servicesInfo[i].state;
                serviceSelected = servicesInfo[i];
                break;
            }
        }
       
        if (document.getElementById(dropdownId).style.display === "")
        {
            // In this case, the selection list has already opened.
            // On click, get the selected value and change the status
            // First check if the status has changed
            var newStatus = document.getElementById(dropdownId).value;
            if (newStatus !== serStatus)
            {
               
                // Ask for confirmation
                if (confirm("Change the status?") === false) {
                    return;
                }
                
                // +++++++++ Temporary code
                // Check if the status is "Instantiated" and proceed with the instrantiation before updating the status
                if (newStatus === "Instantiated")
                {
                    // Get configuration parameters from selected service and create the call's body
                    var instantiateServiceBody = '{';
                    for (var i = 0; i < serviceSelected.serConfigParams.length; i++)
                    {
                        instantiateServiceBody = instantiateServiceBody + "\"" +serviceSelected.serConfigParams[i].serParamName + "\": \"" + serviceSelected.serConfigParams[i].serParamTypicalValue + "\"";
                        if (i < serviceSelected.serConfigParams.length - 1)
                        {
                            instantiateServiceBody = instantiateServiceBody + ', ';
                        }
                    }
                    instantiateServiceBody = instantiateServiceBody + '}';

//                    console.log("instantiateServiceBody = " + instantiateServiceBody);
                    let r = await fetch(instantiateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: instantiateServiceBody});
//                    console.log("#6");
//                    
//                    console.log(r.status);
                    if (r.status !== 200)
                    {
                        dispmess("ERROR", "Unable to instantiate the service. Please try again later or contact the administrator");
//                        console.error('Fetch Error -', r.status);
                        document.getElementById(dropdownId).style.display = "none";
                        return;
                    }
                 
                    // Update the monitoring URL
                    var url = await serviceMonUrl(serviceId);
                    
                    var rowIndex = stateId.substr(9,stateId.length);
                    var monitorIconId = 'monitorIcon' + rowIndex;
                    var hrefElement = document.getElementById(monitorIconId);
                    hrefElement.href = url;
                }
                else if (newStatus === "Retired")
                {
                    console.log("Service to be retired!");
                    // Get configuration parameters from selected service and create the call's body
                    var terminateServiceBody = '{';
                    for (var j = 0; j < serviceSelected.serOperations.length; j++)
                    {
                        var operation = serviceSelected.serOperations[j];
                        if (operation.serOperationName === 'terminate')
                        {
                            for (var i = 0; i < operation.serOperationInputParams.length; i++)
                            {
                                terminateServiceBody = terminateServiceBody + "\"" + operation.serOperationInputParams[i].serParamName + "\": \"" + operation.serOperationInputParams[i].serParamTypicalValue + "\"";
                                if (i < operation.serOperationInputParams.length - 1)
                                {
                                    terminateServiceBody = terminateServiceBody + ', ';
                                }
                            }
                            terminateServiceBody = terminateServiceBody + '}';
                            break;
                        }
                    }
                    
                    
                    console.log("terminateServiceBody = " + terminateServiceBody);
                    //console.log("terminateServiceURL = " + terminateServiceURL);
                    let r = await fetch(terminateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: terminateServiceBody});

                    if (r.status !== 200)
                    {
                        dispmess("ERROR", "Unable to terminate the service. Please try again later or contact the administrator");
                        document.getElementById(dropdownId).style.display = "none";
                        return;
                    }
                 
                    // Update the monitoring URL
                    var url = '#';
                    
                    var rowIndex = stateId.substr(9,stateId.length);
                    var monitorIconId = 'monitorIcon' + rowIndex;
                    var hrefElement = document.getElementById(monitorIconId);
                    hrefElement.href = url;
                }
                
                // -----------------------------------
               
                //Change the status of the service
                var updateData = {
                    serId: serviceId,
     
                    state: newStatus

                };
                var updateUrl = _BACKENDSERVER+"/servicecatalogue/update/services/state";
                CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updateservice");
                
                // Change the value in the table
                var myTable = document.getElementById("myTable");
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
            defaultOption.text = serStatus;
            dropdown.add(defaultOption);
            dropdown.selectedIndex = 0;
            
            fetch(url)
    
                .then(response => response.json())
                .then(data => {
                    // Examine the text in the response
                    let option;
                    
                    for (let i = 0; i < data.length; i++) {
                        // find the status
                        if (data[i].name === serStatus)
                        {
                            var nextStatuses = data[i].next;
                            for (let j = 0; j < nextStatuses.length; j++)
                            {
                                
                                option = document.createElement('option');
                                option.text = nextStatuses[j];
                                option.value = nextStatuses[j];
                                dropdown.add(option);
                            }
                            // Show dropdown list
//                            var element = document.getElementById(dropdownId);
//                            //element.className = element.className.replace(' hidden', '');
//                            var str = '';
//                            //e = e||event;
//                            str += "left: " + event.pageX + "px; top:"+event.pageY+"px;";
//                            element.setAttribute('style',str);
                            var listSize = document.getElementById(dropdownId).length;
                            document.getElementById(dropdownId).style.display = "";
                            document.getElementById(dropdownId).size = listSize;
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

function addOnClickCreateProductEvent(productIconId, serviceId){
    document.getElementById(productIconId).addEventListener('click', function(event){
        // Check the status of the service

        var myTable = document.getElementById("myTable");
        var rowIndex = productIconId.substr(11,productIconId.length);
        var cellIndex = 7;
        var serStatus = myTable.rows[rowIndex].cells[cellIndex].innerHTML;
        
        // If status >= Launched, open the product registration page (the user can create a product from service)
        if (serStatus === "Launched") 
        {
            // Get variables from the current page
            const queryString = window.location.search;

            // Open the product registration page in new tab
            var url = productCreationURL + queryString + "&serId=" + serviceId;
            window.open(url, '_blank');
        }
        else
        {
            // Otherwise, show a message (the user can't create a product from service)
            dispmess("INFO", "You can't create a product from the selected service. The service state should be 'Launched'");
        }
        
        
    });
}

// Shows a list of products that were created from this service
function addOnClickListProductsEvent(iconId, serviceId){
 
    document.getElementById(iconId).addEventListener('click', async function(event){
        
        //Check if there are products created from this service
        var productsExist = false;
        var getProductsUrl = _BACKENDSERVER+"/servicecatalogue/get/products";
     
        await fetch(getProductsUrl)
            .then(response => response.json())
            .then(data => {
   
                // Examine the text in the response
                    
                for (let i = 0; i < data.length; i++) {
                    // find the service id

                    if (data[i].productServiceId === serviceId)
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
            var url = productManagementURL + queryString + "&productServiceId=" + serviceId;
            window.open(url, '_blank');
        }
        else
        {
            dispmess('INFO','There are no products created from the selected service');
        }

    });
}

function addOnClickEditServiceEvent(editIconId, serviceId){
 
    document.getElementById(editIconId).addEventListener('click', function(event){
     
        // Get variables from the current page
        const queryString = window.location.search;

        // Open the service registration page in new tab
        var url = serviceCreationURL + queryString + "&serId=" + serviceId;
        window.open(url, '_blank');
    });
}

function addOnClickMonitorServiceEvent(monitorIconId, serviceId){
    //console.log("monitorIconId = " + monitorIconId);
    document.getElementById(monitorIconId).addEventListener('click', async function(event){
        var hrefElement = document.getElementById(monitorIconId);
        
        // Get URL of current page
        var currentPage = window.location.href;
      
        // Open the monitoring page in new tab
        var url = hrefElement.href;

        if (url === currentPage)
        {
            dispmess('INFO', "There is no URL currently assigned to the service");
           
            event.preventDefault();
        }
    });
}

// Opens a pop-up window and shows the instances of the selected service
function addOnClickServiceInstancesEvent(instanceIconId, serviceId){
    document.getElementById(instanceIconId).addEventListener('click', async function(event){
        
        // Regardless of the service status, show the instances (currently shows all the instances)
        
        console.log("serviceID = " + serviceId);
        // Get PaaS name for the service
        var paasName = await getPaasName(serviceId);
        console.log("Paas Name = " + paasName);

        if (paasName === '')
        {
            dispmess('INFO', "We cannot get instances for this sevice, because the PaaS name is not defined in its configuartion parameters!");
            return;
        }
            
                            
        // Find the instances
        var getInstancesUrl = _BACKENDSERVER+"/systemmanager/get/service/" + paasName;
        console.log("getInstancesUrl = " + getInstancesUrl);
        await fetch(getInstancesUrl)
            .then(response => response.json())
            .then(data => {
                const instancesPerCluster = data;
                var instances = reformInstances(instancesPerCluster);
                if (instances === [])
                {
                    dispmess('INFO', "There are no instances for this service");
                }
                else {
                    displayInstances(instances);
                }

            })

            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
           
    });
}

function addOnClickRunServiceEvent(id, service){
    //console.log("id = " + id);
    
    document.getElementById(id).addEventListener('click', function(event){
        console.log("Adding event listener");
        //First check that it is allowed to run the service (according to status) and then open the respective link
        if ((service.state !== "Instantiated") && (service.state !== "Retired"))
        {
            // Open a popup window for configuring the service
       
            runServicePopUp(id, service, true);
        }
        else
        {
            dispmess('INFO', "You can't run a service with status '" + service.state + "'");
            
        }
    });
}

function deleteService(id){
    if (confirm("Delete Service?") === false) {
        return;
    }
    var url = _BACKENDSERVER+"/servicecatalogue/delete/services/"+id;
    CallPostUrl(url,"DELETE",null,[],"dummyans");
    resultfnct['dummyans'] = function () {
        //Reload page
        window.location.reload();

    }
}


resultfnct['jsoninfoservices'] = function (arg1) { 
    servicesInfo = JSON.parse(arg1);
    displayServices("0");
    addOnClickServicesEvents('myTable');
    
    var tableLength = document.getElementById('myTable').rows.length;

    // Assign ids for "Next state" buttons and dropdown lists
    var stateIDs = [];
    var dropdownIDs = [];
    var productIDs = [];
    var listProductsIDs = [];
    var editIDs = [];
    var monitorIDs = [];
    var instanceIDs = [];
    var runIDs = [];
    for (var i = 1; i < tableLength; i++){
       var stateIconId = 'stateIcon';
       var dropDownId = 'dropDown';
       var productId = 'productIcon';
       var listProductsId = 'listProductsIcon';
       var editId = 'editIcon';
       var monitorId = 'monitorIcon';
       var instanceId = 'instanceIcon';
       var runId = 'runIcon';
       stateIconId = stateIconId + i;
       dropDownId = dropDownId + i;
       productId = productId + i;
       listProductsId = listProductsId + i;
       editId = editId + i;
       monitorId = monitorId + i;
       instanceId = instanceId + i;
       runId = runId + i;
       stateIDs.push(stateIconId);
       dropdownIDs.push(dropDownId);
       productIDs.push(productId);
       listProductsIDs.push(listProductsId);
       editIDs.push(editId);
       monitorIDs.push(monitorId);
       instanceIDs.push(instanceId);
       runIDs.push(runId);
    }
    
    
    var rows = document.getElementById('myTable').getElementsByTagName("tr");
    for (var k = 0; k < servicesInfo.length; k++){
        
        serviceId = servicesInfo[k].serId;
        addOnClickNextStateEvent(stateIDs[k], dropdownIDs[k], serviceId);
        addOnClickCreateProductEvent(productIDs[k], serviceId);
        addOnClickListProductsEvent(listProductsIDs[k], serviceId);
        addOnClickEditServiceEvent(editIDs[k], serviceId);
        addOnClickMonitorServiceEvent(monitorIDs[k], serviceId);
        addOnClickServiceInstancesEvent(instanceIDs[k], serviceId);
        addOnClickRunServiceEvent(runIDs[k], servicesInfo[k]);
    }
};

resultfnct['errjsoninfoservices'] = function (sts) {
    alert("error="+sts);
} 
   
function getjsoninfo(action){
    servicesInfo = "";
    if (action == "1")
        CallPostUrl(_BACKENDSERVER+"/servicecatalogue/get/services","GET",null,[],"jsoninfoservices");
}
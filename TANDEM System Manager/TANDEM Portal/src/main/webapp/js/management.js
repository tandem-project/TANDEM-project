var productCreationURL = 'http://146.124.106.209/static/templates/productRegistration.html';
var serviceCreationURL = 'http://146.124.106.209/static/templates/serviceRegistration.html';
function displayServices(action) {
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
        var listProductsIconId = 'listProductsIcon' + j;
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
                <td ><table ><tr><td style='padding-bottom: 1px;padding-top: 1px;'>" + "<a href='#'><i id=" + editIconId + " class='fas fa-edit' title='Edit' style='padding-bottom:1px;color:blue;font-size:18px'></i></a></td>" +
                    " <td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i id=" + stateIconId + " class='fas fa-project-diagram' title='Change state' style='padding-bottom:1px;color:green;font-size:18px'></i></a>" + 
                    "<select id=" + listId + " style='display:none; position: absolute; width:200px; overflow: auto;'>" + "</select></td>" +
                    " </tr><tr><td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i class='far fa-trash-alt' onclick='deleteService(\""+servicesInfo[i].serId+"\")' title='Delete' style='padding-bottom:1px;color:red;font-size:18px'></i></a>" + "</td>" +
                    " <td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i id=" + productIconId + " class='fas fa-cube' title='Create product' style='padding-bottom:1px;color:#2BB6C0;font-size:18px'></i></a></td>" +
                    " <td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i id=" + listProductsIconId + " class='fas fa-cubes' title='List products' style='padding-bottom:1px;color:#0E947C;font-size:18px'></i></a></td>" +
                    "</tr></table></td>\
            </tr>";
        
    }
    document.getElementById("myTable").innerHTML = htmltext;
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
 
    document.getElementById(stateId).addEventListener('click', function(event){
       

        // Get the status of the service
        var serStatus = '';
        var url = "./data/serviceStatus.json";
        // Get service's info
        for (var i= 0; i < servicesInfo.length; i++)
        {
            if (servicesInfo[i].serId === serviceId)
            {
                serStatus = servicesInfo[i].state;
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
     
        // Get variables from the current page
        const queryString = window.location.search;
//        console.log(queryString);

        // Open the product registration page in new tab
        var url = productCreationURL + queryString + "&serId=" + serviceId;
        window.open(url, '_blank');
    });
}

function addOnClickListProductsEvent(iconId, serviceId){
 
    document.getElementById(iconId).addEventListener('click', function(event){
        dispmess('INFO','This button will be implemented on next cycle');
    });
}

function addOnClickEditServiceEvent(editIconId, serviceId){
 
    document.getElementById(editIconId).addEventListener('click', function(event){
     
        // Get variables from the current page
        const queryString = window.location.search;
//        console.log(queryString);

        // Open the product registration page in new tab
        var url = serviceCreationURL + queryString + "&serId=" + serviceId;
        window.open(url, '_blank');
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
    
    for (var i = 1; i < tableLength; i++){
       var stateIconId = 'stateIcon';
       var dropDownId = 'dropDown';
       var productId = 'productIcon';
       var listProductsId = 'listProductsIcon';
       var editId = 'editIcon';
       stateIconId = stateIconId + i;
       dropDownId = dropDownId + i;
       productId = productId + i;
       listProductsId = listProductsId + i;
       editId = editId + i;
       stateIDs.push(stateIconId);
       dropdownIDs.push(dropDownId);
       productIDs.push(productId);
       listProductsIDs.push(listProductsId);
       editIDs.push(editId);
    }
    
    
    var rows = document.getElementById('myTable').getElementsByTagName("tr");
    for (var k = 0; k < servicesInfo.length; k++){
        
        serviceId = servicesInfo[k].serId;
        addOnClickNextStateEvent(stateIDs[k], dropdownIDs[k], serviceId);
        addOnClickCreateProductEvent(productIDs[k], serviceId);
        addOnClickListProductsEvent(listProductsIDs[k], serviceId);
        addOnClickEditServiceEvent(editIDs[k], serviceId);
    }
};

resultfnct['errjsoninfoservices'] = function (sts) {
    alert("error="+sts);
} 
   
function getjsoninfo(action){
    servicesInfo = "";
//    if (action == "0")
//        CallPostUrl("data/services.json","GET",null,[],"jsoninfo");
    if (action == "1")
        CallPostUrl(_BACKENDSERVER+"/servicecatalogue/get/services","GET",null,[],"jsoninfoservices");
}
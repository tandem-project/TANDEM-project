const deviceCreationURL = _GUISERVER + 'deviceRegistration.html';
function displayDevices(action) {
    var length = devicesInfo.length;
    var htmltext = "";
    

    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers'>" + "ID" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='devicename'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Description" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Labels" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='deviceopstate'>" + "Operating State" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-actions' id='deviceadminstate'>" + "Admin State" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-actions'>" + "IP:Port" + "<a href='#'></a></th>\
                <th class='services-mgmttable-actions'>" + "Actions" + "<a href='#'></a></th>\
            </tr>"; 
    
    for (var i = 0; i < length; i++) {    
        var j = i + 1;
    
        var editIconId = 'editIcon' + j;
        var deleteIconId = 'deleteIcon' + j;
        
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]"); 
        iconsarr1.push("<i id=" + editIconId + " class='fas fa-edit' title='Edit' style='color:black;font-size:18px'></i>");
        iconsarr1.push("<i id=" + deleteIconId + " class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
       
        ////////////////////////////////// construct icons table
       
        htmltext +=
            "<tr>\
                <td>" + devicesInfo[i].id + "</td>\
                <td>" + devicesInfo[i].name + "</td>\
                <td>" + devicesInfo[i].description.slice(0,100) + 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                devicesInfo[i].description+"'></i></a>"+
                "</td>\<td>";
        console.log("devicesInfo[i].labels.length = " + devicesInfo[i].labels.length);
        if (devicesInfo[i].labels.length === 0)
        {
            htmltext += "";
        }
        else
        {
            for (var j=0; j < devicesInfo[i].labels.length; j++){
                htmltext += devicesInfo[i].labels[j];
                if (j < devicesInfo[i].labels.length - 1) 
                {
                    htmltext += ", ";
                }
            }
            htmltext = htmltext.substring(0, htmltext.length - 1);
        }
        
        
        htmltext +=
                "</td><td>" + devicesInfo[i].operatingState + "</td>\
                <td>" + devicesInfo[i].adminState + "</td>\
                <td>" + devicesInfo[i].ip + ":" + devicesInfo[i].port + "</td>\
                <td>" + _makeicons(iconstab) +
                "</td>\
            </tr>";
    }
    document.getElementById("devicesTable").innerHTML = htmltext;
}

function addOnClickDevicesEvents(tableid){

    document.getElementById('devicename').addEventListener('click', function(event){
        sortTableRows(tableid, 1);
    });

    document.getElementById('deviceadminstate').addEventListener('click', function(event){
        sortTableRows(tableid, 5);
    });

}

function addOnClickEditDeviceEvent(editIconId, deviceId){
//    console.log("Adding listener to icon " + editIconId + " to edit " + deviceId);
    document.getElementById(editIconId).addEventListener('click', function(event){
     
        // Get variables from the current page
        const queryString = window.location.search;

        // Open the service registration page in new tab
        var url = deviceCreationURL + queryString + "&deviceId=" + deviceId;
        window.open(url, '_blank');
    });
}


//Function for deleting a device
function addOnClickDeleteDeviceEvent(deleteIconId, deviceId){
    document.getElementById(deleteIconId).addEventListener('click', function(event){
            if (confirm("Delete Device?") === false) {
                return;
            }
            var url = _BACKENDSERVER+"/devicecatalogue/delete/devices/" + deviceId;
            CallPostUrl(url,"DELETE",null,[],"dummyans");
            resultfnct['dummyans'] = function () {
                //Reload page
                window.location.reload();

            }
    });
}

resultfnct['jsoninfo'] = function (arg1) { 
    devicesInfo = JSON.parse(arg1);
//    console.log("Before the displayDevices");
    displayDevices("0");
//    console.log("After the displayDevices");
    addOnClickDevicesEvents('devicesTable');
//    console.log("jsoninfo");

    var tableLength = document.getElementById('devicesTable').rows.length;
    var editIDs = [];
    var deleteIDs = [];
    for (var i = 1; i < tableLength; i++){
       
       var editId = 'editIcon';
       var deleteId = 'deleteIcon';
       editId = editId + i;
       deleteId = deleteId + i;
       editIDs.push(editId);
       deleteIDs.push(deleteId);
    }
    for (var k = 0; k < devicesInfo.length; k++){
        
        deviceId = devicesInfo[k].id;
       
        addOnClickEditDeviceEvent(editIDs[k], deviceId);
        addOnClickDeleteDeviceEvent(deleteIDs[k], deviceId);
        
    }
};

resultfnct['errjsoninfo'] = function (sts) {
    alert("error="+sts);
} 
  
function getjsoninfo(action){
    devicesInfo = "";

    CallPostUrl(_BACKENDSERVER+"/devicecatalogue/get/devices","GET",null,[],"jsoninfo");

}
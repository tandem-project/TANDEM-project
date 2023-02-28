function displayDevices(action) {
    if (action=="1")
        getjsoninfo("1");
    var length = devicesInfo.length;
    var htmltext = "";

    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers'>" + "Creation Date" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='devicename'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Description" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Labels" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='deviceopstate'>" + "Operating State" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-actions' id='deviceadminstate'>" + "Admin State" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-actions'>" + "IP:Port" + "<a href='#'></a></th>\
                <th class='services-mgmttable-actions'>" + "Actions" + "<a href='#'></a></th>\
            </tr>"; 
    
    for (var i = 0; i < length; i++) {    
 //   var id = 'runIcon';
 //   var j = i + 1;
 //   var runIconId = id + j;

    var date = new Date(devicesInfo[i].created); // create Date object
    console.log(date.toString()); // result: Wed Jan 12 2011 12:42:46 GMT-0800 (PST)


    htmltext +=
      "<tr>\
                <td>" + date + "</td>\
                <td>" + devicesInfo[i].name + "</td>\
                <td>" + devicesInfo[i].description.slice(0,100) + 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                devicesInfo[i].description+"'></i></a>"+
                "</td>\<td>";
        
                for (var j=0; j < devicesInfo[i].labels.length; j++){
                    htmltext += devicesInfo[i].labels[j] + ", ";
                }
                htmltext = htmltext.substring(0, htmltext.length - 1);
        
        htmltext +=
                "</td><td>" + devicesInfo[i].operatingState + "</td>\
                <td>" + devicesInfo[i].adminState + "</td>\
                <td>" + devicesInfo[i].protocols.example.host + ":" + devicesInfo[i].protocols.example.port + "</td>\
                <td>" + "<a href='#'><i class='fas fa-edit' title='Edit' style='padding-bottom:5px;color:black;font-size:24px'></i></a>" +
                    " <a href='#'><i class='far fa-trash-alt' title='Delete' style='padding-bottom:5px;color:red;font-size:24px'></i></a>" +
                "</td>\
            </tr>";
    }
    document.getElementById("devicesTable").innerHTML = htmltext;
}

function addOnClickDevicesEvents(tableid){

    document.getElementById('devicename').addEventListener('click', function(event){
        sortTableRows(tableid, 1);
    });
    
    document.getElementById('devicemanufacturer').addEventListener('click', function(event){
        sortTableRows(tableid, 4);
    });
    
    document.getElementById('deviceadminstate').addEventListener('click', function(event){
        sortTableRows(tableid, 5);
    });

}

/*function addOnClickRunApplicationsEvent(id, appURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(appURL,'_blank');
    });
}*/

resultfnct['jsoninfo'] = function (arg1) { 
    devicesInfo = JSON.parse(arg1);
    displayDevices("0");
    addOnClickDevicesEvents('devicesTable');
    
  /*  var IDs = [];
    var tableLength = document.getElementById('applicationsTable').rows.length;
    for (var i = 1; i < tableLength; i++){
       var runIconId = 'runIcon';
       runIconId = runIconId + i;
       IDs.push(runIconId);
    }
    for (var k = 0; k < applicationsInfo.length; k++){
        addOnClickRunApplicationsEvent(IDs[k], applicationsInfo[k].AppURL);
    }   */
};
resultfnct['jsoninfo1'] = function (arg1) { 
    devicesInfo = JSON.parse(arg1);
    displayDevices("1");
    addOnClickDevicesEvents('devicesTable');
};
resultfnct['errjsoninfo'] = function (sts) {
    alert("error="+sts);
} 
resultfnct['errjsoninfo1'] = function (sts) {
    alert("error="+sts);
} 
       
function getjsoninfo(action){
    devicesInfo = "";
    document.getElementById('devicesTable').style.display = "none";
    if (action == "0")
        CallPostUrl("data/devices.json","GET",null,[],"jsoninfo");
    if (action == "1")
        CallPostUrl(_BACKENDSERVER+"/api/v1/device","GET",null,[],"jsoninfo1");
}
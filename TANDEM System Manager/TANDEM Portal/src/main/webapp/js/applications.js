//var applicationsInfo = [
//    {
//        "name": "Smart Parking",
//        "category": "Smart City",
//        "description": "to be added",
//        "provider": "INTRACOM TELECOM S.A.",
//        "applicationServices": "Parking Service",
//        "supportServices": "Object Detection Service",
//        "serviceChain": "Object Detection SC1",
//        "state": "Approved"
//    },
//    {
//        "name": "Physical Security",
//        "category": "Surveillance",
//        "description": "to be added",
//        "provider": "INTRACOM TELECOM S.A.",
//        "applicationServices": "Physical Security Service",
//        "supportServices": "Object Detection Service",
//        "serviceChain": "Object Detection SC2",
//        "state": "Instantiated"
//    },
//    {
//        "name": "Temperature Monitoring",
//        "category": "IoT",
//        "description": "to be added",
//        "provider": "INTRACOM TELECOM S.A.",
//        "applicationServices": "IoT Data Analytics Service",
//        "supportServices": "Temperature Monitoring Service, Rules Engine",
//        "serviceChain": "string",
//        "state": "Rejected"
//    }
//];


function displayApplications(action) {
    if (action=="1")
        getjsoninfo("1");
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
    var id = 'runIcon';
    var idMon = 'monIcon';

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
                htmltext = htmltext.substring(0, htmltext.length - 2);
        
                htmltext += "</td><td>";
        
                for (var j=0; j < applicationsInfo[i].supportServices.length; j++){
                    htmltext += applicationsInfo[i].supportServices[j].serName + ", ";
                }
                htmltext = htmltext.substring(0, htmltext.length - 2);
        
            var j = i + 1;
            var runIconId = id + j;
            var monIconId = idMon + j;
            htmltext += "</td><td>" + applicationsInfo[i].serviceChain + "</td>\
                <td>" + applicationsInfo[i].state + "</td>\
                <td>" + "<a href='#'><i class='fas fa-info' title='Details' style='padding-bottom:5px;color:blue;font-size:24px'></i></a>" +
                    " <a href='#'><i class='fas fa-project-diagram' title='Next state' style='padding-bottom:5px;color:green;font-size:24px'></i></a>" +
                    " <a href='#'><i id=" + monIconId + " class='fas fa-desktop' title='Monitor' style='padding-bottom:5px;color:#5E0E94;font-size:24px'></i></a>" +
                    " <a href='#'><i class='far fa-trash-alt' title='Delete' style='padding-bottom:5px;color:red;font-size:24px'></i></a>" +
                    " <a href='#'><i class='fas fa-cube' title='Create product' style='padding-bottom:5px;color:#2BB6C0;font-size:24px'></i></a>" +
                    " <a href='#'><i class='fas fa-cubes' title='List products' style='padding-bottom:5px;color:#0E947C;font-size:24px'></i></a>" +
                    " <a href='#'><i id=" + runIconId + " class='fa fa-play' title='Run application' style='padding-bottom:5px;color:#C99D5C;font-size:24px'></i></a>" +
                    "</td>\
            </tr>";
    }
    document.getElementById("applicationsTable").innerHTML = htmltext;
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

function addOnClickRunApplicationsEvent(id, appURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(appURL,'_blank');
    });
}

function addOnClickMonServicesEvent(id, monURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monURL,'_blank');
    });
}


resultfnct['jsoninfo'] = function (arg1) { 
    applicationsInfo = JSON.parse(arg1);
    displayApplications("0");
    addOnClickApplicationsEvents('applicationsTable');
    
    var IDs = [];
    var tableLength = document.getElementById('applicationsTable').rows.length;
    for (var i = 1; i < tableLength; i++){
       var runIconId = 'runIcon';
       runIconId = runIconId + i;
       IDs.push(runIconId);
    }
    for (var k = 0; k < applicationsInfo.length; k++){
        addOnClickRunApplicationsEvent(IDs[k], applicationsInfo[k].AppURL);
    }   
    
    
    var monIDs = [];
    for (var i = 1; i < tableLength; i++){
       var monIconId = 'monIcon';
       monIconId = monIconId + i;
       monIDs.push(monIconId);
    }
    for (var k = 0; k < applicationsInfo.length; k++){
        addOnClickMonServicesEvent(monIDs[k], applicationsInfo[k].monServicesURL);
    }
};
resultfnct['jsoninfo1'] = function (arg1) { 
    applicationsInfo = JSON.parse(arg1);
    displayApplications("1");
    addOnClickServicesEvents('applicationsTable');
};
resultfnct['errjsoninfo'] = function (sts) {
    alert("error="+sts);
} 
resultfnct['errjsoninfo1'] = function (sts) {
    alert("error="+sts);
} 
       
function getjsoninfo(action){
    applicationsInfo = "";
    document.getElementById('applicationsTable').style.display = "none";
    if (action == "0")
        CallPostUrl("data/applications.json","GET",null,[],"jsoninfo");
    if (action == "1")
        CallPostUrl(_BACKENDSERVER+"/servicecatalogue/get/services","GET",null,[],"jsoninfo1");
}
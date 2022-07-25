function displayServices(action) {
    //if (action=="1")
        //getjsoninfo("1");
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
    var id = 'monIcon';
    var j = i + 1;
    var monIconId = id + j;
    htmltext +=
      "<tr>\
                <td>" + servicesInfo[i].serId + "</td>\
                <td>" + servicesInfo[i].serName + "</td>\
                <td>" + servicesInfo[i].serType + "</td>\
                <td>" + servicesInfo[i].serProvider + "</td>\
                <td>" + servicesInfo[i].serDescription.slice(0,100) + 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                servicesInfo[i].serDescription+"'></i></a>"+
                "</td>\
                <td>" + servicesInfo[i].serCategory.name + "</td>\
                <td>" + servicesInfo[i].serVersion + "</td>\
                <td>" + servicesInfo[i].state + "</td>\
                <td ><table ><tr><td style='padding-bottom: 1px;padding-top: 1px;'>" + "<a href='#'><i class='fas fa-info' title='Details' style='padding-bottom:1px;color:blue;font-size:18px'></i></a></td>" +
                    " <td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i class='fas fa-project-diagram' title='Next state' style='padding-bottom:1px;color:green;font-size:18px'></i></a></td>" +
                    " <td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i id=" + monIconId +" class='fas fa-desktop' title='Monitor' style='padding-bottom:1px;color:#5E0E94;font-size:18px'></i></a></td>" +
                    " </tr><tr><td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i class='far fa-trash-alt' title='Delete' style='padding-bottom:1px;color:red;font-size:18px'></i></a></td>" +
                    " <td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i class='fas fa-cube' title='Create product' style='padding-bottom:1px;color:#2BB6C0;font-size:18px'></i></a></td>" +
                    " <td style='padding-bottom: 1px;padding-top: 1px;'><a href='http://tandem:tandem@146.124.106.209:3000/d/HGSpBtqnk/iot_metrics?orgId=1&refresh=1m&from=now-3h&to=now'><i class='fas fa-cubes' title='List products' style='padding-bottom:1px;color:#0E947C;font-size:18px'></i></a></td>" +
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

function addOnClickMonServicesEvent(id, monURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monURL,'_blank');
    });
}

resultfnct['jsoninfo'] = function (arg1) { 
    servicesInfo = JSON.parse(arg1);
    displayServices("0");
    addOnClickServicesEvents('myTable');
    
    var IDs = [];
    var tableLength = document.getElementById('myTable').rows.length;
    for (var i = 1; i < tableLength; i++){
       var monIconId = 'monIcon';
       monIconId = monIconId + i;
       IDs.push(monIconId);
    }
    for (var k = 0; k < servicesInfo.length; k++){
        addOnClickMonServicesEvent(IDs[k], servicesInfo[k].serMonitoringURL);
    }  
};
resultfnct['jsoninfo1'] = function (arg1) { 
    servicesInfo = JSON.parse(arg1);
    displayServices("1");
//    document.getElementById('myTable').style.display = "block";
    addOnClickServicesEvents('myTable');
    
    var IDs = [];
    var tableLength = document.getElementById('myTable').rows.length;
    for (var i = 1; i < tableLength; i++){
       var monIconId = 'monIcon';
       monIconId = monIconId + i;
       IDs.push(monIconId);
    }
    for (var k = 0; k < servicesInfo.length; k++){
        addOnClickMonServicesEvent(IDs[k], servicesInfo[k].serMonitoringURL);
    }  
};
resultfnct['errjsoninfo'] = function (sts) {
    alert("error="+sts);
} 
resultfnct['errjsoninfo1'] = function (sts) {
    alert("error="+sts);
} 
       
function getjsoninfo(action){
    servicesInfo = "";
    document.getElementById('myTable').style.display = "none";
    if (action == "0")
        CallPostUrl("data/services.json","GET",null,[],"jsoninfo");
    if (action == "1")
        CallPostUrl("http://146.124.106.209/servicecatalogue/get/services","GET",null,[],"jsoninfo1");
}
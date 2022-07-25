var cloudId = '';
      
function displayCloudNodes(action) {
    
    if (action=="1")
       getjsoninfo("1");
  //  var edgeCloud = cloudId.at(-1);
  //  var nodeTitle = "EDGE CLOUD " + edgeCloud + " NODES";
    var nodeTitle = "EDGE CLOUD NODES";
    document.getElementById('edgeCloudNodeTitle').innerHTML = nodeTitle.bold();
    
    var length = edgeCloudsNodesInfo.length;
    var htmltext = "";
  
    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='edgecloudnodeid'>" + "ID" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='edgecloudnodename'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='edgecloudnodetype'>" + "Type" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='edgecloudnodeprovider'>" + "Provider" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Addresses" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Conditions" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Capacity" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Allocatable Resources" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "General Info" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Actions" + "<a href='#'></a></th>\
            </tr>";
 
    
    for (var i = 0; i < length; i++) {   
    
    var monnodeid = 'monitorNode';
    var monservid = 'monitorServices';
    var j = i + 1;
    var monitorNodeId = monnodeid + j;
    var monitorServicesId = monservid + j;
           
    htmltext +=
      "<tr>\
                <td>" + edgeCloudsNodesInfo[i].nodeId + "</td>\
                <td>" + edgeCloudsNodesInfo[i].nodeName + "</td>\
                <td>" + edgeCloudsNodesInfo[i].nodeType + "</td>\
                <td>" + edgeCloudsNodesInfo[i].nodeProvider + "</td>\
                <td> <u><i>Hostname</i></u>: " + edgeCloudsNodesInfo[i].nodeAddresses.nodeHostName + "<br> <u><i>Ext. IP</i></u>: " + edgeCloudsNodesInfo[i].nodeAddresses.nodeExternalIP +
                "<br>  <u><i>Int. IP</i></u>: " + edgeCloudsNodesInfo[i].nodeAddresses.nodeInternalIP + "</td>\
                <td>  <u><i>Ready</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodeReady + "<br><u><i>Disk Press.</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodeDiskPressure +
                "<br>  <u><i>PID Press.</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodePIDPressure + 
                "<br>  <u><i>Mem. Press.</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodeMemoryPressure + "<br><u><i>NW Unavail.</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodeNetworkUnavailabilty + "</td>\
                <td>  <u><i>CPU</i></u>: " + edgeCloudsNodesInfo[i].nodeCapacity.nodeCPUCap + "<br><u><i>Memory:</i></u> " + edgeCloudsNodesInfo[i].nodeCapacity.nodeMemoryCap +
                "<br>  <u><i>Mem. MU</i></u>: " + edgeCloudsNodesInfo[i].nodeCapacity.nodeMemoryCapMU + "<br><u><i>Storage</i></u>: " + edgeCloudsNodesInfo[i].nodeCapacity.nodeStorageCap +
                "<br>  <u><i>Stor. MU</i> </u>: " + edgeCloudsNodesInfo[i].nodeCapacity.nodeStorageCapMU + "<br><u><i>Max Pods Number</i></u>: " + edgeCloudsNodesInfo[i].nodeCapacity.nodeMaxNoofPods + "</td>\
                <td > <u><i>CPU Alloc.</i></u>: " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeCPUAllocatable + "<br><u><i>Mem. Alloc.</i></u>: " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeMemoryAllocatable +
                "<br>  <u><i>Mem. Alloc. MU</i></u>: " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeMemoryAllocatableMU + 
                "<br>  <u><i>Stor. Alloc.</i></u>: " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeStorageAllocatable +
                "<br> <u><i>Stor. Alloc. MU</i></u>: " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeStorageAllocatableMU + "</td>\
                <td>  <u><i>Node OS</i></u>: " + edgeCloudsNodesInfo[i].nodeGeneralInfo.nodeOS + "<br><u><i>Kubernetes Version:</i></u> " + edgeCloudsNodesInfo[i].nodeGeneralInfo.nodeKubernetesVersion + 
                "<br>  <u><i>Kernel Version</i></u>: " + edgeCloudsNodesInfo[i].nodeGeneralInfo.nodeKernelVersion + "</td>\
                <td><a href='#'><i class='fas fa-edit' title='Edit' style='padding:2px;color:black;font-size:22px'></i></a>" +
                    "<a href='#'><i id=" + monitorNodeId + " class='fa fa-desktop' title='Monitor Node' style='padding:2px;color:#4C5FB6;font-size:22px'></i></a>" +
                    "<a href='#'><i id=" + monitorServicesId + " class='fas fa-desktop' title='Monitor Services' style='padding:2px;color:#5E0E94;font-size:22px'></i></a>" +
                    "<a href='#'><i class='far fa-trash-alt' title='Deregister' style='padding:2px;color:red;font-size:22px'></i></a>" +
                "</td>\
            </tr>";
        
    }
               
            
    document.getElementById("edgeCloudNodesTable").innerHTML = htmltext;
    document.getElementById('edgeCloudNodesPopup').style.display='block';

}


function addOnClickCloudNodesEvents(tableId){
    document.getElementById('edgecloudnodeid').addEventListener('click', function(event){
        sortTableRows(tableId, 0);
    });
    
    document.getElementById('edgecloudnodename').addEventListener('click', function(event){
        sortTableRows(tableId, 1);
    });
    
    document.getElementById('edgecloudnodetype').addEventListener('click', function(event){
        sortTableRows(tableId, 2);
    });
    
    
    document.getElementById('edgecloudnodeprovider').addEventListener('click', function(event){
        sortTableRows(tableId, 3);
    });
    
}



function addOnClickCloudsEvents(tableId){
    document.getElementById('cloudid').addEventListener('click', function(event){
        sortTableRows(tableId, 0);
    });
    
    document.getElementById('cloudname').addEventListener('click', function(event){
        sortTableRows(tableId, 1);
    });
    
    document.getElementById('cloudzone').addEventListener('click', function(event){
        sortTableRows(tableId, 2);
    });
    
    
    document.getElementById('cloudprovider').addEventListener('click', function(event){
        sortTableRows(tableId, 5);
    });
    
}

/*function addCloudsRowsEvents(tableId){
    var rows = document.getElementById(tableId).getElementsByTagName("tr");
    for(var i = 1; i < rows.length; i++){
        row = rows[i];
        row.addEventListener('click', function(event){
            var cloud_id = row.getElementsByTagName('td')[0].id;
            cloudId = cloud_id;
            getjsoninfoCloudNodes("0");
        });
    }
}*/

function displayClouds(action){
    if (action=="1")
        getjsoninfo("1");
    var length = edgeCloudsInfo.length;
    var htmltext = "";

  /*  htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'><a href='#'></a></th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'><a href='#'></a></th>\
                <th class='services-mgmttable-headers' style='text-align:right; background-color:#9e9e9e'>EDGE<a href='#'></a></th>\
                <th class='services-mgmttable-headers' style='text-align:left; background-color:#9e9e9e'>CLOUDS<a href='#'></a></th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'><a href='#'></a></th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'><a href='#'></a></th>\
            </tr>";
*/

    htmltext +=
      "<tr class='header'>\
            <th class='services-mgmttable-headers' id='cloudid'>ID<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 0)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers' id='cloudname'>Name<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 1)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers' id='cloudzone'>Availability Zone<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 2)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers'>Number of Nodes</th>\
            <th class='services-mgmttable-headers'>Number of IoT Devices</th>\
            <th class='services-mgmttable-headers' id='cloudprovider'>Provider<a href='#'></a><a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 5)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers'>" + "Actions" + "<a href='#'></a></th>\
       </tr>";
    var idBase = 'edgecloud';
    var edgecloudid = '';
    

    for (var i = 0; i < length; i++) {   
        edgecloudid = idBase + (i + 1);
        
        var id = 'cloudmonitornodes';
        var info = 'infoIcon';
        var j = i + 1;
        var infoIconId = info + j;
        var monitorIconId = id + j;
        htmltext +=
        "<tr>\
            <td id=" + edgecloudid + ">" + edgeCloudsInfo[i].edgeCloudId + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudName + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudAvailabilityZone + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudNumberofNodes + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudNumberofIoTDevices + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudProvider + "</td>\
            <td><a href='#'><i id=" + infoIconId + " class='fas fa-info' title='Info' style='padding-left:5px;color:blue;font-size:24px'></i></a>" +
                "<a href='#'><i class='fas fa-edit' title='Edit' style='padding-left:5px;color:black;font-size:24px'></i></a>" +
                "<a href='#'><i class='fa fa-plus' title='Register Node' style='padding-left:5px;color:#398B57;font-size:24px'></i></a>" +
                "<a href='#'><i id=" + monitorIconId + " class='fas fa-desktop' title='Monitor' style='padding-left:5px;color:#5E0E94;font-size:24px'></i></a>" +
                "<a href='#'><i class='far fa-trash-alt' title='Delete' style='padding-left:5px;color:red;font-size:24px'></i></a>" +
            "</td>\
        </tr>";      
    }
    document.getElementById("edgeCloudsTable").innerHTML = htmltext;
}



function addOnClickCloudMonitorNodesEvent(id, monitorNodesURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monitorNodesURL,'_blank');
    });
}

function addOnClickInfoEvent(infoId, cloudId){
 
    console.log("Adding listener to icon " + infoId + " to display nodes of " + cloudId);
    document.getElementById(infoId).addEventListener('click', function(event){
        getjsoninfoCloudNodes("0");
    });
}

function addOnClickDisplayNodesEvent(infoId){
       
}

resultfnct['jsoninfo'] = function (arg1) { 
    edgeCloudsInfo = JSON.parse(arg1);
    displayClouds("0");
    addOnClickCloudsEvents('edgeCloudsTable');
   // addCloudsRowsEvents('edgeCloudsTable');
    
    var monitorIDs = [];
    var tableLength = document.getElementById('edgeCloudsTable').rows.length;
    for (var i = 1; i < tableLength; i++){
       var monitorIconId = 'cloudmonitornodes';
       monitorIconId = monitorIconId + i;
       monitorIDs.push(monitorIconId);
    }
    for (var k = 0; k < edgeCloudsInfo.length; k++){
        addOnClickCloudMonitorNodesEvent(monitorIDs[k], edgeCloudsInfo[k].monitorNodesURL);
    }    
    
    var infoIDs = [];
    //var tableLength = document.getElementById('edgeCloudsTable').rows.length;
    for (var i = 1; i < tableLength; i++){
       var infoIconId = 'infoIcon';
       infoIconId = infoIconId + i;
       infoIDs.push(infoIconId);
    }
    
    for (var k = 0; k < edgeCloudsInfo.length; k++){
        var rows = document.getElementById('edgeCloudsTable').getElementsByTagName("tr");
        var rowNum = infoIDs[k].at(-1);
        cloudId = rows[rowNum].getElementsByTagName('td')[0].id;
        addOnClickInfoEvent(infoIDs[k], cloudId);
    }
    
};
resultfnct['jsoninfo1'] = function (arg1) { 
    edgeCloudsInfo = JSON.parse(arg1);
    displayClouds("1");
    //addOnClickServicesEvents('myTable');
};
resultfnct['errjsoninfo'] = function (sts) {
    alert("error="+sts);
} 
resultfnct['errjsoninfo1'] = function (sts) {
    alert("error="+sts);
} 


function getjsoninfo(action){
    edgeCloudsInfo = "";
    document.getElementById('edgeCloudsTable').style.display = "none";
    if (action == "0")
        CallPostUrl("data/edgeClouds.json","GET",null,[],"jsoninfo");
    if (action == "1")
        CallPostUrl("http://146.124.106.209/servicecatalogue/get/services","GET",null,[],"jsoninfo1");
}


function addOnClickMonitorEvents(id, monitorURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monitorURL,'_blank');
    });
}


resultfnct['jsoninfoCloudNodes'] = function (arg1) { 
    edgeCloudsNodesInfo = JSON.parse(arg1);
    //displayClouds("0");
    displayCloudNodes("0");
    addOnClickCloudNodesEvents('edgeCloudNodesTable');
       
    var monitorNodeIDs = [];
    var monitorServicesIDs = [];
    var tableLength = document.getElementById('edgeCloudNodesTable').rows.length;
    for (var i = 1; i < tableLength; i++){
        var monnodeid = 'monitorNode';
        var monservid = 'monitorServices';
        monnodeid = monnodeid + i;
        monservid = monservid + i;
        monitorNodeIDs.push(monnodeid);
        monitorServicesIDs.push(monservid);
    }
    for (var k = 0; k < edgeCloudsNodesInfo.length; k++){
        addOnClickMonitorEvents(monitorNodeIDs[k], edgeCloudsNodesInfo[k].nodeUsageMonitoringURL);
        addOnClickMonitorEvents(monitorServicesIDs[k], edgeCloudsNodesInfo[k].nodeServicesMonitoringURL);
    }    
};
resultfnct['jsoninfoCloudNodes1'] = function (arg1) { 
    edgeCloudsNodesInfo = JSON.parse(arg1);
    displayCloudNodes("1");
    //addOnClickServicesEvents('myTable');
};
resultfnct['errjsoninfoCloudNodes'] = function (sts) {
    alert("error="+sts);
} 
resultfnct['errjsoninfoCloudNodes1'] = function (sts) {
    alert("error="+sts);
} 


function getjsoninfoCloudNodes(action){
    edgeCloudsNodesInfo = "";
   // document.getElementById('edgeCloudsTable').style.display = "none";
    if (action == "0")
        CallPostUrl("data/edgeCloudsNodes.json","GET",null,[],"jsoninfoCloudNodes");
    if (action == "1")
        CallPostUrl("http://146.124.106.209/servicecatalogue/get/services","GET",null,[],"jsoninfoCloudNodes1");
}


/*function displayCloudNodes(edgeCloudId) {
    
    
    

  var length = edgeCloudNodeInfo.length;
  var htmltext = "";
  var edgeCloud = edgeCloudId.at(-1);
  console.log(edgeCloud);
  
  htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'>" + "</th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'>" + "</th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'>" + "</th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'>" + "</th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e;'>" + "CLOUD " + edgeCloud + " NODES" + "</th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'>" + "</th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'>" + "</th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'>" + "</th>\
                <th class='services-mgmttable-headers' style='background-color:#9e9e9e'>" + "</th>\
            </tr>";
    
    
  htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers'>" + "ID" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudNodesTable', 0)' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudNodesTable', 1)' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Type" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudNodesTable', 2)' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Provider" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudNodesTable', 3)' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Addresses" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Conditions" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Capacity" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Allocatable Resources" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "General Info" + "<a href='#'></a></th>\
            </tr>";
    
  for (var i = 0; i < length; i++) {    
   htmltext +=
      "<tr>\
                <td>" + edgeCloudNodeInfo[i].nodeId + "</td>\
                <td>" + edgeCloudNodeInfo[i].nodeName + "</td>\
                <td>" + edgeCloudNodeInfo[i].nodeType + "</td>\
                <td>" + edgeCloudNodeInfo[i].nodeProvider + "</td>\
                <td>" + edgeCloudNodeInfo[i].nodeAddresses.nodeHostName + "<br>" + edgeCloudNodeInfo[i].nodeAddresses.nodeExternalIP +
                "<br>" + edgeCloudNodeInfo[i].nodeAddresses.nodeInternalIP + "</td>\
                <td>" + edgeCloudNodeInfo[i].nodeConditions.nodeReady + "<br>" + edgeCloudNodeInfo[i].nodeConditions.nodeDiskPressure +
                "<br>" + edgeCloudNodeInfo[i].nodeConditions.nodePIDPressure + "<br>" + edgeCloudNodeInfo[i].nodeConditions.nodeNetworkUnavailabilty + "</td>\
                <td>" + edgeCloudNodeInfo[i].nodeCapacity.nodeCPUCap + "<br>" + edgeCloudNodeInfo[i].nodeCapacity.nodeMemoryCap +
                "<br>" + edgeCloudNodeInfo[i].nodeCapacity.nodeMaxNoofPods + "</td>\
                <td>" + edgeCloudNodeInfo[i].nodeAllocatableResources.nodeCPUAllocatable + "<br>" +
                edgeCloudNodeInfo[i].nodeAllocatableResources.nodeMemoryAllocatable + "</td>\
                <td>" + edgeCloudNodeInfo[i].nodeGeneralInfo.nodeOS + "<br>" + edgeCloudNodeInfo[i].nodeGeneralInfo.nodeKubernetesVersion + 
                "<br>" + edgeCloudNodeInfo[i].nodeGeneralInfo.nodeKernelVersion + "</td>\
            </tr>";
        
  }
  document.getElementById("edgeCloudNodesTable").innerHTML = htmltext;
}*/
var cloudId = '';
var edgeCloudsInfo;
var edgeCloudsNodesInfo = [];
function displayCloudNodes(index) {
    console.log("start displayCloudNodes");
    var nodeTitle = "EDGE CLOUD NODES";
    document.getElementById('edgeCloudNodeTitle').innerHTML = nodeTitle.bold();
    
    var length = edgeCloudsNodesInfo.length;
    console.log(length);
    var htmltext = "";
  
    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='edgecloudnodeid'>" + "ID" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='edgecloudnodename'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='edgecloudnodelocation'>" + "Location" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='edgecloudnodeprovider'>" + "Provider" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Addresses" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Conditions" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Capacity" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Allocatable Resources" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "General Info" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Usage" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Actions" + "<a href='#'></a></th>\
            </tr>";
 
    
    for (var i = 0; i < length; i++) {   
    
        var monnodeid = 'monitorNode';
        var monservid = 'monitorServices';
        var j = i + 1;
        var monitorNodeId = monnodeid + j;
        var monitorServicesId = monservid + j;
        let cpuPerc = parseFloat(edgeCloudsNodesInfo[i].nodeUsage.nodeCPUUsage).toFixed(3);
       
        console.log(cpuPerc);
        let memPerc = parseFloat(edgeCloudsNodesInfo[i].nodeUsage.nodeMemoryUsage).toFixed(3);
        htmltext +=
          "<tr>\
                    <td>" + edgeCloudsNodesInfo[i].nodeId + "</td>\
                    <td>" + edgeCloudsNodesInfo[i].nodeName + "</td>\
                    <td>" + edgeCloudsNodesInfo[i].nodeLocation + "</td>\
                    <td>" + edgeCloudsInfo[index].edgeCloudProvider + "</td>\
                    <td> <u><i>Hostname</i></u>: " + edgeCloudsNodesInfo[i].nodeAddresses.nodeHostName + "<br> <u><i>Ext. IP</i></u>: " + edgeCloudsNodesInfo[i].nodeAddresses.nodeExternalIP +
                    "<br>  <u><i>Int. IP</i></u>: " + edgeCloudsNodesInfo[i].nodeAddresses.nodeInternalIP + "</td>\
                    <td>  <u><i>Ready</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodeReady + "<br><u><i>Disk Press.</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodeDiskPressure +
                    "<br>  <u><i>PID Press.</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodePIDPressure + 
                    "<br>  <u><i>Mem. Press.</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodeMemoryPressure + "<br><u><i>NW Unavail.</i></u>: " + edgeCloudsNodesInfo[i].nodeConditions.nodeNetworkUnavailable + "</td>\
                    <td>  <u><i>CPU</i></u>: " + edgeCloudsNodesInfo[i].nodeCapacity.nodeCPUCap + "<br><u><i>Memory:</i></u> " + edgeCloudsNodesInfo[i].nodeCapacity.nodeMemoryCap + " " + edgeCloudsNodesInfo[i].nodeCapacity.nodeMemoryCapMU +
                    "<br><u><i>Storage</i></u>: " + edgeCloudsNodesInfo[i].nodeCapacity.nodeStorageCap + " " + 
                    edgeCloudsNodesInfo[i].nodeCapacity.nodeStorageCapMU + "<br><u><i>Max Pods Number</i></u>: " + edgeCloudsNodesInfo[i].nodeCapacity.nodeMaxNoofPods + "</td>\
                    <td > <u><i>CPU Alloc.</i></u>: " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeCPUCap + "<br><u><i>Mem. Alloc.</i></u>: " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeMemoryCap +
                    " " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeMemoryCapMU + 
                    "<br>  <u><i>Stor. Alloc.</i></u>: " + edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeStorageCap + " " + 
                    edgeCloudsNodesInfo[i].nodeAllocatableResources.nodeStorageCapMU + "</td>\
                    <td>  <u><i>Node OS</i></u>: " + edgeCloudsNodesInfo[i].nodeGeneralInfo.nodeOS + "<br><u><i>Kubernetes Version:</i></u> " + edgeCloudsNodesInfo[i].nodeGeneralInfo.nodeKubernetesVersion + 
                    "<br>  <u><i>Kernel Version</i></u>: " + edgeCloudsNodesInfo[i].nodeGeneralInfo.nodeKernelVersion + "<br><u><i>Architecture:</i></u> " + edgeCloudsNodesInfo[i].nodeGeneralInfo.nodeArchitecture + "<br><u><i>Container Runtime Version:</i></u> " + edgeCloudsNodesInfo[i].nodeGeneralInfo.nodecontainerRuntimeVersion +"</td>\
                    <td>  <u><i>CPU</i></u>: " + edgeCloudsNodesInfo[i].nodeUsage.nodeCPUInUse + " " + edgeCloudsNodesInfo[i].nodeUsage.nodeCPUInUseMU + "<br>  <u><i>CPU %</i></u>: " + cpuPerc + 
                    "<br><u><i>Memory:</i></u> " + edgeCloudsNodesInfo[i].nodeUsage.nodeMemoryInUse + " " + edgeCloudsNodesInfo[i].nodeUsage.nodeMemoryInUseMU + "<br><u><i>Memory %:</i></u> " + memPerc +"</td>\
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
    
    document.getElementById('edgecloudnodelocation').addEventListener('click', function(event){
        sortTableRows(tableId, 2);
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

function displayClouds(action){
    if (action=="1")
        getjsoninfo("1");
    var length = edgeCloudsInfo.length;
    var htmltext = "";

    htmltext +=
      "<tr class='header'>\
            <th class='services-mgmttable-headers' id='cloudid'>ID<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 0)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers' id='cloudname'>Name<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 1)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers' id='cloudzone'>Availability Zone<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 2)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers'>Number of Nodes</th>\
            <th class='services-mgmttable-headers'>PiEdge</th>\
            <th class='services-mgmttable-headers' id='cloudprovider'>Provider<a href='#'></a><a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 5)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers'>" + "Actions" + "<a href='#'></a></th>\
       </tr>";
    var idBase = 'edgecloud';
    var edgecloudid = '';
    

    for (var i = 0; i < length; i++) {   
        edgecloudid = idBase + (i + 1);
        
        var id = 'cloudmonitornodes';
        var info = 'infoIcon';
        var edit = 'editIcon';
        var register = 'registerIcon';
        var deleteIcon = 'deleteIcon';
        var j = i + 1;
        var infoIconId = info + j;
        var editIconId = edit + j;
        var registerIconId = register + j;
        var monitorIconId = id + j;
        var deleteIconId = deleteIcon + j;
        htmltext +=
        "<tr>\
            <td id=" + edgecloudid + ">" + edgeCloudsInfo[i].edgeCloudId + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudName + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudAvailabilityZone + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudNumberofNodes + "</td>\
            <td>" + edgeCloudsInfo[i].piEdgeIP + "/" + edgeCloudsInfo[i].piEdgePort + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudProvider + "</td>\
            <td><a href='#'><i id=" + infoIconId + " class='fas fa-info' title='Info' style='padding-left:5px;color:blue;font-size:24px'></i></a>" +
                "<a href='#'><i id=" + editIconId + " class='fas fa-edit' title='Edit' style='padding-left:5px;color:black;font-size:24px'></i></a>" +
                "<a href='#'><i id=" + registerIconId + " class='fa fa-plus' title='Register Node' style='padding-left:5px;color:#398B57;font-size:24px'></i></a>" +
                "<a href='#'><i id=" + monitorIconId + " class='fas fa-desktop' title='Monitor' style='padding-left:5px;color:#5E0E94;font-size:24px'></i></a>" +
                "<a href='#'><i id=" + deleteIconId + " class='far fa-trash-alt' title='Delete' style='padding-left:5px;color:red;font-size:24px'></i></a>" +
            "</td>\
        </tr>";      
    }
    document.getElementById("edgeCloudsTable").innerHTML = htmltext;
}



function addOnClickInfoEvent(infoId, cloudId){
 
    console.log("Adding listener to icon " + infoId + " to display nodes of " + cloudId);
    document.getElementById(infoId).addEventListener('click', function(event){
        getinfoCloudNodes(infoId);
    });
}

function addOnClickEditEvent(editId, cloudId){
 
    console.log("Adding listener to icon " + editId + " to edit " + cloudId);
    document.getElementById(editId).addEventListener('click', function(event){
        dispmess('INFO','This button will be implemented on next cycle');
    });
}

function addOnClickRegisterNodeEvent(registerId, cloudId){
 
    console.log("Adding listener to icon " + registerId + " to register node in " + cloudId);
    document.getElementById(registerId).addEventListener('click', function(event){
        dispmess('INFO','This button will be implemented on next cycle');
    });
}


function addOnClickCloudMonitorNodesEvent(id, monitorNodesURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monitorNodesURL,'_blank');
    });
}


function addOnClickCloudDeleteEvent(id, cloudId){
    document.getElementById(id).addEventListener('click', function(event){
        dispmess('INFO','This button will be implemented on next cycle');
    });
}


function addOnClickDisplayNodesEvent(infoId){
       
}

resultfnct['edgejsoninfo'] = function (arg1) { 
    edgeCloudsInfo = JSON.parse(arg1);
    displayClouds("0");
    //addOnClickCloudsEvents('edgeCloudsTable');
  
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
    var editIDs = [];
    var registerIDs = [];
    var deleteIDs = [];
    for (var i = 1; i < tableLength; i++){
       var infoIconId = 'infoIcon';
       var editIconId = 'editIcon';
       var registerIconId = 'registerIcon';
       var deleteIconId = 'deleteIcon';
       infoIconId = infoIconId + i;
       editIconId = editIconId + i;
       registerIconId = registerIconId + i;
       deleteIconId = deleteIconId + i;
       infoIDs.push(infoIconId);
       editIDs.push(editIconId);
       registerIDs.push(registerIconId);
       deleteIDs.push(deleteIconId);
    }
    
    for (var k = 0; k < edgeCloudsInfo.length; k++){
        var rows = document.getElementById('edgeCloudsTable').getElementsByTagName("tr");
        var rowNum = infoIDs[k].at(-1);
        cloudId = rows[rowNum].getElementsByTagName('td')[0].id;
        addOnClickInfoEvent(infoIDs[k], cloudId);
        addOnClickEditEvent(editIDs[k], cloudId);
        addOnClickRegisterNodeEvent(registerIDs[k], cloudId);
        addOnClickCloudDeleteEvent(deleteIDs[k], cloudId);
    }
    //submitEdgeCloudsFiltersForm()
    //addOnClickCloudsEvents('edgeCloudsTable');
   document.getElementById("waitimg").style.display = 'none';
};

resultfnct['erredgejsoninfo'] = function (sts) {
   document.getElementById("waitimg").style.display = 'none';
   alert("error="+sts);
} 

function getjsoninfo(action){
    document.getElementById("waitimg").style.display = 'block';
    edgeCloudsInfo = "";
//    if (action == "0")
//        CallPostUrl("data/edgeClouds.json","GET",null,[],"jsoninfo");
    if (action == "1")
        CallPostUrl(_BACKENDSERVER+"/infrastructurecatalogue/get/infrastructure","GET",null,[],"edgejsoninfo");
}


function addOnClickMonitorEvents(id, monitorURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monitorURL,'_blank');
    });
}


function getinfoCloudNodes(infoId){

    console.log("info id = " + infoId);
    var indexStr = infoId.substr(8,infoId.length);
    console.log("indexStr = " + indexStr);
    var index = indexStr - 1;
    console.log("index = " + index);

    edgeCloudsNodesInfo = edgeCloudsInfo[index].nodes;
    console.log("edgeCloudsNodesInfo.length = " + edgeCloudsNodesInfo.length);
  
    displayCloudNodes(index);
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
}

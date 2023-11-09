var nodeCreationURL = _GUISERVER + 'nodeRegistration.html'; 
var cloudCreationURL = _GUISERVER + 'edgecloudRegistration.html'; 
var cloudId = '';
var edgeCloudsInfo;
var edgeCloudsNodesInfo = [];
function displayCloudNodes(index) {
    var nodeTitle = "EDGE CLOUD NODES";
    document.getElementById('edgeCloudNodeTitle').innerHTML = nodeTitle.bold();
    
    var length = edgeCloudsNodesInfo.length;
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
        var editnodeid = 'editNode';
        var monnodeid = 'monitorNode';
        var monservid = 'monitorServices';
        var deregisternodeid = 'deregisterNode';
        var j = i + 1;
        var editNodeId = editnodeid + j;
        var monitorNodeId = monnodeid + j;
        var monitorServicesId = monservid + j;
        var deregisterNodeId = deregisternodeid + j;
        let cpuPerc = parseFloat(edgeCloudsNodesInfo[i].nodeUsage.nodeCPUUsage).toFixed(3);
        let memPerc = parseFloat(edgeCloudsNodesInfo[i].nodeUsage.nodeMemoryUsage).toFixed(3);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]"); 
        iconsarr1.push("<i id=" + editNodeId + " class='fas fa-edit' title='Edit' style='color:black;font-size:18px'></i>");
        iconsarr1.push("<i id=" + monitorNodeId + " class='fa fa-desktop' title='Monitor Node' style='color:#4C5FB6;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
        var iconsarr2 = JSON.parse("[]"); 
        iconsarr2.push("<i id=" + monitorServicesId + " class='fas fa-desktop' title='Monitor Services' style='color:#5E0E94;font-size:18px'></i>");
        iconsarr2.push("<i id=" + deregisterNodeId + " class='far fa-trash-alt' title='Deregister' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr2);
        ////////////////////////////////// construct icons table
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
                    <td>" +
                        _makeicons(iconstab) +
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
    var length = edgeCloudsInfo.length;
    var htmltext = "";

    htmltext +=
      "<tr class='header'>\
            <th class='services-mgmttable-headers' id='cloudid'>ID<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 0)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers' id='cloudname'>Name<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 1)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers' id='cloudzone'>Availability Zone<a href='#'><i class='actions-link fa fa-sort-alpha-asc' onclick='sortTableRowsDoubleTitle('edgeCloudsTable', 2)' aria-hidden='true'></i></a></th>\
            <th class='services-mgmttable-headers'>Number of Nodes</th>\
            <th class='services-mgmttable-headers'>IP/Port</th>\
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
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]"); 
        iconsarr1.push("<i id=" + infoIconId + " class='fas fa-info' title='Info' style='color:blue;font-size:18px'></i>");
        iconsarr1.push("<i id=" + editIconId + " class='fas fa-edit' title='Edit' style='color:black;font-size:18px'></i>");
        iconsarr1.push("<i id=" + registerIconId + " class='fa fa-plus' title='Register Node' style='color:#398B57;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
        var iconsarr2 = JSON.parse("[]"); 
        iconsarr2.push("<i id=" + monitorIconId + " class='fas fa-desktop' title='Monitor' style='color:#5E0E94;font-size:18px'></i>");
        iconsarr2.push("<i id=" + deleteIconId + " class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr2);
        ////////////////////////////////// construct icons table
        htmltext +=
        "<tr>\
            <td id=" + edgecloudid + ">" + edgeCloudsInfo[i].edgeCloudId + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudName + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudAvailabilityZone + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudNumberofNodes + "</td>\
            <td>" + edgeCloudsInfo[i].piEdgeIP + "/" + edgeCloudsInfo[i].piEdgePort + "</td>\
            <td>" + edgeCloudsInfo[i].edgeCloudProvider + "</td>\
            <td>" +
                _makeicons(iconstab) +
            "</td>\
        </tr>";      
    }
    document.getElementById("edgeCloudsTable").innerHTML = htmltext;
}



function addOnClickInfoEvent(infoId, cloudId){
 
    document.getElementById(infoId).addEventListener('click', function(event){
        getinfoCloudNodes(infoId);
    });
}

function addOnClickEditEvent(editId, cloudId){
    document.getElementById(editId).addEventListener('click', function(event){
//        dispmess('INFO','This button will be implemented on next cycle');
        const queryString = window.location.search;

        // Open the infrastructure registration page in new tab
        var url = cloudCreationURL + queryString + "&infraId=" + cloudId;
        window.open(url, '_blank');
    });
}

function addOnClickRegisterNodeEvent(registerId, cloudId){
    document.getElementById(registerId).addEventListener('click', function(event){
        
        // Get variables from the current page
        const queryString = window.location.search;

        // Open the node registration page in new tab
        var url = nodeCreationURL + queryString + "&cloudId=" + cloudId;
        window.open(url, '_blank');
    });
}


function addOnClickCloudMonitorNodesEvent(id, monitorNodesURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monitorNodesURL,'_blank');
    });
}


function addOnClickCloudDeleteEvent(id, cloudId){
    document.getElementById(id).addEventListener('click', function(event){
//        dispmess('INFO','This button will be implemented on next cycle');
        if (confirm("Delete the Inrastructure?") === false) {
            return;
        }
        var url = _BACKENDSERVER+"/infrastructurecatalogue/delete/infrastructure/" + cloudId;
        CallPostUrl(url,"DELETE",null,[],"dummyans");
        resultfnct['dummyans'] = function () {
        
            //Refresh the table (Practically click the Submit button)
            const get= document.getElementById('submitq');
            get.click('1');
        };
    });
}


function addOnClickDisplayNodesEvent(infoId){
       
}

function processData(arg1) {
    edgeCloudsInfo = arg1;
    displayClouds("0");
    
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
        var cloudId = edgeCloudsInfo[k].edgeCloudId;
        addOnClickInfoEvent(infoIDs[k], cloudId);
        addOnClickEditEvent(editIDs[k], cloudId);
        addOnClickRegisterNodeEvent(registerIDs[k], cloudId);
        addOnClickCloudDeleteEvent(deleteIDs[k], cloudId);
    }
    
   document.getElementById("waitimg").style.display = 'none';
};
 

async function getjsoninfo(action){
    document.getElementById("waitimg").style.display = 'block';
    edgeCloudsInfo = "";
    
    if (action === "1")
    {
        //console.log("Getting infrastructure from backend...");
        fetch(_BACKENDSERVER+"/infrastructurecatalogue/get/infrastructure")
    
            .then(response => response.json())
            .then(data => {
                // Examine the text in the response
                processData(data);
            })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 
    }
}

function addOnClickEditNodeEvents(editIconId, cloudId, nodeId)
{
    document.getElementById(editIconId).addEventListener('click', function(event){
        // Get variables from the current page
        const queryString = window.location.search;

        // Open the node registration page in new tab
        var url = nodeCreationURL + queryString + "&cloudId=" + cloudId + "&nodeId=" + nodeId;
        window.open(url, '_blank');
    });
}

function addOnClickMonitorEvents(id, monitorURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monitorURL,'_blank');
    });
}

function addOnClickDeregisterNodeEvents(id, cloudId, nodeId){
    document.getElementById(id).addEventListener('click', function(event){
        if (confirm("Remove node from Edge Cloud?") === false) {
            return;
        }

        // Get Edge-Cloud info
        const infraUrl = _BACKENDSERVER+"/infrastructurecatalogue/get/infrastructure/" + cloudId;
        fetch(infraUrl)
    
            .then(response => response.json())
            .then(data => {
                // Find the requested node
                var requestedNode = '';
                for (var i = 0; i < data.nodes.length; i++)
                {
                    if (data.nodes[i].nodeId === nodeId)
                    {
                        requestedNode = data.nodes[i];
                        break;
                    }
                }
                if (requestedNode === '')
                {
                    dispmess("Warning: The node was not found. Please refresh the page!")
                }
                else
                {
                    const nodeToRemove = {
                        nodeName: requestedNode.nodeName,
                        nodeHostname: requestedNode.nodeAddresses.nodeHostName,
                        nodePassword: requestedNode.nodePassword,
                        nodeIp: requestedNode.nodeAddresses.nodeExternalIP
                    };
    
   
                    // Create data to json
                    var json = JSON.stringify(nodeToRemove);
                    console.log("---------------JSON---------------");
                    console.log(json);
    
                    //Send json
                    var urlRemoveNode = _BACKENDSERVER+"/infrastructurecatalogue/removenode/infrastructure/" + cloudId;
                    console.log("urlRemoveNode = " + urlRemoveNode);
                    CallPostUrl(urlRemoveNode,"POST",nodeToRemove,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_removenode");

                }
            })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 
        
    });
}

                    
resultfnct['_removenode'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Node removed');
    //Close pop-up
    document.getElementById('edgeCloudNodesPopup').style.display='none';
    //Refresh the table (Practically click the Submit button)
    const get= document.getElementById('submitq');
    get.click('1');
//    window.location.reload();
}

resultfnct['err_removenode'] = function (arg1) {
    console.log("ERROR3 in submission");
    dispmess('info','Unable to remove the node');
//    //Close pop-up
//    document.getElementById('edgeCloudNodesPopup').style.display='none';
//    //Refresh the table
//    window.location.reload();
}

function getinfoCloudNodes(infoId){
    var indexStr = infoId.substr(8,infoId.length);
    var index = indexStr - 1;
    
    edgeCloudsNodesInfo = edgeCloudsInfo[index].nodes;
    var cloudId = edgeCloudsInfo[index].edgeCloudId;
    
    displayCloudNodes(index);
    addOnClickCloudNodesEvents('edgeCloudNodesTable');
    var editNodesIDs = [];
    var monitorNodeIDs = [];
    var monitorServicesIDs = [];
    var deregisterNodeIDs = [];
    var tableLength = document.getElementById('edgeCloudNodesTable').rows.length;
    for (var i = 1; i < tableLength; i++){
        var editnodeid = 'editNode';
        var monnodeid = 'monitorNode';
        var monservid = 'monitorServices';
        var deregisternodeid = 'deregisterNode';
        editnodeid = editnodeid + i;
        monnodeid = monnodeid + i;
        monservid = monservid + i;
        deregisternodeid = deregisternodeid + i;
        editNodesIDs.push(editnodeid);
        monitorNodeIDs.push(monnodeid);
        monitorServicesIDs.push(monservid);
        deregisterNodeIDs.push(deregisternodeid);
    }
    for (var k = 0; k < edgeCloudsNodesInfo.length; k++){
        addOnClickEditNodeEvents(editNodesIDs[k], cloudId, edgeCloudsNodesInfo[k].nodeId);
        addOnClickMonitorEvents(monitorNodeIDs[k], edgeCloudsNodesInfo[k].nodeUsageMonitoringURL);
        addOnClickMonitorEvents(monitorServicesIDs[k], edgeCloudsNodesInfo[k].nodeServicesMonitoringURL);
        addOnClickDeregisterNodeEvents(deregisterNodeIDs[k], cloudId, edgeCloudsNodesInfo[k].nodeId);
    } 
}

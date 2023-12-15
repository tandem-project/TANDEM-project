var getCloudUrl = _BACKENDSERVER + "/infrastructurecatalogue/get/infrastructure/";

async function submitNodeRegistration(event) {
    var id, name, psw, location, cloud, description, type;
    
    // Check if all required fields are completed
    var isoktoadd = true;
    var errorlist = new Array();
    if (document.getElementById("nodeidreg").value===""){
        isoktoadd = false;
        errorlist.push("node id");
    }
    if (document.getElementById("nodenamereg").value===""){
        isoktoadd = false;
        errorlist.push("node name");
    }
   
    if (document.getElementById("nodepswreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("node password");
    }
    if (document.getElementById("nodelocationreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("node location");
    }
    if (document.getElementById("nodecloudreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("node cloud");
    }
    
    
    if (!isoktoadd){
        var message = "The next fields are empty:";
        for (i = 0; i < errorlist.length; i++)
        {
            
            if (i === errorlist.length - 1)
            {
                message = message + " " + errorlist[i];
            }
            else
            {
                message = message + " " + errorlist[i] + ",";
            }
        }
        dispmess('ERROR',message);
        return;
    }
    
    // Get node data
    id = document.getElementById("nodeidreg").value;
    name = document.getElementById("nodenamereg").value;
    psw = document.getElementById("nodepswreg").value;
//    var x = document.getElementById("myPsw").value;
//  document.getElementById("demo").innerHTML = x;
//  console.log("x = " + x);
    console.log("psw = " + psw);
    location = document.getElementById("nodelocationreg").value;
    if (location === "Select")
    {
        location = '';
    }
    cloud = document.getElementById("nodecloudreg").value;
    if (cloud === "Select")
    {
        cloud = '';
    }
    description = document.getElementById("nodedescrreg").value;
    type = document.getElementById("nodetypereg").value;
    if (type === "Select")
    {
        type = '';
    }

    // Get Addresses
    var nodeAddresses = {nodeHostName:'', nodeExternalIP:'', nodeInternalIP:''};
    
    var addresses = document.getElementById("nodeAddressTable");
   
    nodeAddresses.nodeHostName = addresses.rows[2].cells[1].innerHTML;
    nodeAddresses.nodeExternalIP = addresses.rows[3].cells[1].innerHTML;
    nodeAddresses.nodeInternalIP = addresses.rows[4].cells[1].innerHTML;
 

    // Get Node Configuration
    var installedServices = new Array();
    
    var tableInstServices = document.getElementById("installedservicestable");
   
    var tr = tableInstServices.getElementsByTagName("tr");
    for (i = 1 ; i < tr.length ; i++)
    {
        var service = tableInstServices.rows[i].cells[0].innerHTML;
        installedServices[i-1] = service;
    }
    
    // Here are the node infos that are required to include when adding a node, but are not given by the user.
    
    var nodeConditions =  {
        nodeReady: false,
        nodeDiskPressure: false,
        nodeMemoryPressure: false,
        nodePIDPressure: false,
        nodeNetworkUnavailable: false
    };
    var nodeCapacity = {
        nodeCPUCap: 0,
        nodeMemoryCap: 0,
        nodeMemoryCapMU: "",
        nodeStorageCap: 0,
        nodeStorageCapMU: "",
        nodeMaxNoofPods: 0
    };
    var nodeAllocatableResources = {
        nodeCPUCap: 0,
        nodeMemoryCap: 0,
        nodeMemoryCapMU: "",
        nodeStorageCap: 0,
        nodeStorageCapMU: ""
    };
    var nodeGeneralInfo = {
        nodeOS: "",
        nodeKubernetesVersion: "",
        nodeKernelVersion: "",
        nodeArchitecture: "",
        nodecontainerRuntimeVersion: ""
    };
    var nodeUsage = {
        nodeCPUInUse: "",
        nodeCPUInUseMU: "",
        nodeCPUUsage: "",
        nodeMemoryInUse: "",
        nodeMemoryInUseMU: "",
        nodeMemoryUsage: ""
    };
    var nodeUsageMonitoringURL = "";
    var nodeServicesMonitoringURL = "";
    
    // Get Cloud Info to check if the node already exists in it and fill the node info appropriately
   
    getCloudUrl += cloud;
    console.log("getCloudUrl = " + getCloudUrl);
    await fetch(getCloudUrl)
    
        .then(response => response.json())
        .then(data => {
            // Check if the node is already included in the edge-cloud
            
            for (let i = 0; i < data.nodes.length; i++) {
                if (data.nodes[i].nodeId === id) {
//                    console.log("Node found!");
//                    console.log("About to get node's info");
                    // Get node's info
                    var node = data.nodes[i];
//                    console.log("node = " + node);
                    // Update the non-user defined parameters with existing values
                    nodeConditions = node.nodeConditions;
                    nodeCapacity = node.nodeCapacity;
                    nodeAllocatableResources = node.nodeAllocatableResources;
                    nodeGeneralInfo = node.nodeGeneralInfo;
                    nodeUsage = node.nodeUsage;
                    nodeUsageMonitoringURL = node.UsageMonitoringURL;
                    nodeServicesMonitoringURL = node.nodeServicesMonitoringURL;
                    break;
                }
            }
                        
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 
        
    
    
    //below we are binding the input data (json format) in a variable in order to post it.

    var data = {
        nodeId: id,
        nodeName: name,
        nodeType: type,
        nodeLocation: location,
        nodeAddresses: nodeAddresses,
        nodePassword: psw,
        nodeDescription: description,
        nodeConditions: nodeConditions,
        nodeCapacity: nodeCapacity,
        nodeAllocatableResources: nodeAllocatableResources,
        nodeGeneralInfo: nodeGeneralInfo,
        nodeUsage: nodeUsage,
        nodeUsageMonitoringURL: nodeUsageMonitoringURL,
        nodeServicesMonitoringURL: nodeServicesMonitoringURL,
        
        nodeServices: installedServices
    };
    
   
    // Create data to json
    var json = JSON.stringify(data);
    console.log("---------------JSON---------------");
    console.log(json);
    
    //Send json
    var url = _BACKENDSERVER+"/infrastructurecatalogue/addnode/infrastructure/" + cloud;
    CallPostUrl(url,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addnode");

}
resultfnct['_addnode'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Node saved');

}
resultfnct['err_addnode'] = function (arg1) {
    console.log("ERROR3 in submission");
    dispmess('info','Node saved');
}




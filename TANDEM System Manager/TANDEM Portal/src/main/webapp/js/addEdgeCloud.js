var getCloudUrl = _BACKENDSERVER + "/infrastructurecatalogue/get/infrastructure/";
async function submitEdgeCloudRegistration(event) {
  
    var id, name, zone, provider, ip, port;
    
    // Check if all required fields are completed
    var isoktoadd = true;
    var errorlist = new Array();
    if (document.getElementById("infraidreg").value===""){
        isoktoadd = false;
        errorlist.push("ID");
    }
    if (document.getElementById("infranamereg").value===""){
        isoktoadd = false;
        errorlist.push("name");
    }
    if (document.getElementById("infrazonereg").value==="Select"){
        isoktoadd = false;
        errorlist.push("availability zone");
    }
  
    if (document.getElementById("infraproviderreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("provider");
    }
 
    if (document.getElementById("infraipreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("IP");
    }
    if (document.getElementById("infraportreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("port");
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
    
    // Get service data
    id = document.getElementById("infraidreg").value;
    name = document.getElementById("infranamereg").value;
   
    zone = document.getElementById("infrazonereg").value;
    
    provider = document.getElementById("infraproviderreg").value;
   
    ip = document.getElementById("infraipreg").value;
    port = document.getElementById("infraportreg").value;

    // Get Nodes
    var nodes = new Array();
    var tableNodes = document.getElementById("nodestable");
    var tr = tableNodes.getElementsByTagName("tr");

    for (var i = 2; i < tr.length; i++) {
        var node = {
            nodeName:'', 
            nodeId:'', 
            nodeLocation:'', 
            nodeAddresses:{nodeHostName:'', nodeExternalIP:'', nodeInternalIP:''}, 
            nodeConditions: null, 
            nodeCapacity:null,
            nodeAllocatableResources: null,
            nodeGeneralInfo: null,
            nodeUsage: null,
            nodeUsageMonitoringURL: null,
            nodeServicesMonitoringURL: null
        };
        node.nodeName = tableNodes.rows[i].cells[0].innerHTML;
        node.nodeId = tableNodes.rows[i].cells[1].innerHTML;
        node.nodeLocation = tableNodes.rows[i].cells[2].innerHTML;
        
        if ((node.nodeName === '') && (node.id === ''))
        {
            continue;
        }
        var nodeRowIndex = tableNodes.rows[i].cells[7].innerHTML;
      
        node.nodeAddresses.nodeHostName = tableNodes.rows[i].cells[3].innerHTML;
        node.nodeAddresses.nodeExternalIP = tableNodes.rows[i].cells[4].innerHTML;
        node.nodeAddresses.nodeInternalIP = tableNodes.rows[i].cells[5].innerHTML;
        
        
        // Get Cloud Info (if it is an existing cloud) to check if the node already exists in it and fill the node info appropriately
   
//        console.log("getCloudUrl = " + getCloudUrl);
        await fetch(getCloudUrl)
    
            .then(response => response.json())
            .then(data => {
                // Check if the cloud is already included in the DB
                var edgeCloud = null;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].edgeCloudId === id) {
//                        console.log("Cloud found!");
//                        console.log("About to get cloud's info");
                        // Get cloud's info
                        var edgeCloud = data[i];
                    
                        break;
                    }
                }
                if (edgeCloud !== null) {
                    for (let i = 0; i < edgeCloud.nodes.length; i++) {
                        if (edgeCloud.nodes[i].nodeId === node.nodeId) {
//                            console.log("Node found!");
//                            console.log("About to get node's info");
                            
                            // Update the non-user defined parameters with existing values
                            node.nodeConditions = edgeCloud.nodes[i].nodeConditions;
                            node.nodeCapacity = edgeCloud.nodes[i].nodeCapacity;
                            node.nodeAllocatableResources = edgeCloud.nodes[i].nodeAllocatableResources;
                            node.nodeGeneralInfo = edgeCloud.nodes[i].nodeGeneralInfo;
                            node.nodeUsage = edgeCloud.nodes[i].nodeUsage;
                            node.nodeUsageMonitoringURL = edgeCloud.nodes[i].nodeUsageMonitoringURL;
                            node.nodeServicesMonitoringURL = edgeCloud.nodes[i].nodeServicesMonitoringURL;
                            break;
                        }
                    }
                }       
            })
                
              
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            }); 
        
        // Get Node Configuration
        var autoConfRadioId = "infraautoconfigradio" + nodeRowIndex;
        var confServicesId = "availableservicestable" + nodeRowIndex;
        var manualConfRadioId = "inframanualconfigradio" + nodeRowIndex;
        var installedServicesTableId = "installedservicestable" + nodeRowIndex;
        var nodeServices = configuredServices(autoConfRadioId, manualConfRadioId, confServicesId, installedServicesTableId);

        if (nodeServices === null)
        {
            node.services = [];
        }
        else
        {
            node.services = nodeServices;
        }
        nodes.push(node);
    }
    for (i = 0 ; i < nodes.length ; i++) {
        console.log("Node #" + i + ": " + nodes[i].nodeName + ", " + nodes[i].nodeId + ", " + nodes[i].nodeLocation + ", " + nodes[i].nodeAddresses.nodeHostName);
        for (j = 0 ; j < nodes[i].services.length ; j++) {
            console.log("Node services #" + j + ": " + nodes[i].services[j]);
        }
    }
    
    // Get configured services for the Edge-Cloud
    var edgecloudServices = configuredServices("infraautoconfigreg", "inframanualconfigreg", "confservicestable", "installedservicestable");
    if (edgecloudServices === null)
    {
        edgecloudServices = [];
    }
    //below we are binding the input data (json format) in a variable inorder to post it.

    var data = {
        edgeCloudId: id,
        edgeCloudName: name,
        edgeCloudAvailabilityZone: zone,
        edgeCloudProvider: provider,
        piEdgeIP: ip,
        piEdgePort: port,
        nodes: nodes,
        services: edgecloudServices
        
    };
    
   
    // Create data to json
    json = JSON.stringify(data);
    console.log("---------------JSON---------------");
    console.log(json);
    
    // Check the parameters of the page's URL
    var params = new Array();  
    params = getParams();
    var url1 = '#';

    if (typeof params['infraId'] === 'undefined') {
        // If infraid is not defined, then create a new infrastructure
        url1 = _BACKENDSERVER+"/infrastructurecatalogue/create/infrastructure";
        CallPostUrl(url1,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addinfra");
    }
    // Update the infrastructure (nodes aren't updated with this call
    url1 = _BACKENDSERVER+"/infrastructurecatalogue/update/infrastructure/" + id;
    CallPostUrl(url1,"PUT",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addinfra");
    
    // Explicitly call the "Add node" for each node in the table, 
    // in order to make sure that the new ones will be added 
    // and the old ones will be updated
    var url2 = _BACKENDSERVER+"/infrastructurecatalogue/addnode/infrastructure/" + id;
    for (var i = 0; i < nodes.length; i++)
    {
        CallPostUrl(url2,"POST",nodes[i],[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addnode");
    }
}
resultfnct['_addinfra'] = function (arg1) {
    dispmess('info','Edge-Cloud was saved');

}
resultfnct['err_addinfra'] = function (arg1) {
    dispmess('info','Edge-Cloud was saved');
}

resultfnct['_addnode'] = function (arg1) {
    dispmess('info','Node was saved');

}
resultfnct['err_addnode'] = function (arg1) {
    dispmess('info','Node was not saved');
}
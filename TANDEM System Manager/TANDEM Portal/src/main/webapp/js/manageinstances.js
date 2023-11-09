var getInstantiateURL = 'http://localhost/systemmanager/get/monitoringurl/instance';
const getServiceURL = _BACKENDSERVER + '/servicecatalogue/get/services/';

async function serviceMonUrl(serviceId){
    // Get service from service catalogue
    var getServiceUrl = _BACKENDSERVER+"/servicecatalogue/get/services/" + serviceId;
    var returnedUrl = "#";
    var instanceId = '';
    var ip, port;
        
    await fetch(getServiceUrl)
        .then(response => response.json())
        .then(data => {
   
            // Examine the text in the response
            for (var i = 0; i < data.serConfigParams.length; i++){
                if (data.serConfigParams[i].serParamName === "paas_instance_name")
                {
                    instanceId = data.serConfigParams[i].serParamTypicalValue;   
                }
                else if (data.serConfigParams[i].serParamName === "piEdgeIP")
                {
                    ip = data.serConfigParams[i].serParamTypicalValue;   
                }
                else if (data.serConfigParams[i].serParamName === "piEdgePort")
                {
                    port = data.serConfigParams[i].serParamTypicalValue;   
                }
                
            }

        })
   
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
    console.log("instanceId = " + instanceId);
    if (instanceId !== '')
    {
//        console.log("instanceId !== ''");
        //Get the monitoring URL
        var getInstantiateBody = {
            piEdgeIP:ip,
            piEdgePort:port,
            instance_id:instanceId
        };
        var getInstantiateBodyJson = JSON.stringify(getInstantiateBody);
        console.log("getInstantiateBodyJson = " + getInstantiateBodyJson);
        await fetch(getInstantiateURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: getInstantiateBodyJson})
            .then(response => response.json())
            .then(data => {
   
                // Examine the text in the response
                if (typeof data.monitoring_service_URL !== 'undefined')
                {
                    console.log("data.monitoring_service_URL = " + data.monitoring_service_URL);
                    returnedUrl = data.monitoring_service_URL;
                }
        })
   
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
    }
    console.log("returnedUrl = " + returnedUrl);

    return returnedUrl;
}

// Applications
async function applicationMonUrl(appId){
    // Get application from application catalogue
    var getAppUrl = _BACKENDSERVER+"/applicationcatalogue/get/applications/";
    var returnedUrl = "#";
   
    var appInfo = await getApplication(getAppUrl, appId);

    returnedUrl = appInfo.monServicesURL;

    //console.log("returnedUrl = " + returnedUrl);
    return returnedUrl;
}

// Returns the PaaS name for a service
async function getPaasName(serviceId)
{
    const serviceUrl = getServiceURL + serviceId;
    console.log("serviceUrl = " + serviceUrl);
    var paasName = '';
    await fetch(serviceUrl)
    
        .then(response => response.json())
        .then(async data => {
            var service = data;
            
            console.log("service = " + service);
            
            for (var i = 0; i < service.serConfigParams.length; i++) {
                if (service.serConfigParams[i].serParamName === "paas_service_name")
                {
                    if (service.serConfigParams[i].serParamValue !== "")
                        paasName = service.serConfigParams[i].serParamValue;
                    else
                        paasName = service.serConfigParams[i].serParamTypicalValue;
                    break;
                }
            }
            
        })
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });  
    
    return paasName;   
}

// Gets a mapping and return a json of instances, where the Edge-Cloud is included as a new field in each element
function reformInstances(instancesPerCluster) {
    var totalInstancesPerCluster = [];
                    
    console.log("Instances in EC2, length: " + instancesPerCluster.EC2.length);
    // TO BE UPDATED: Carrently we check manually each edge known edge cloud. We have to add additional code for retrieving Edge-Clouf IDs
    // Check each edge cloud
    if (typeof instancesPerCluster.EC2 !== 'undefined')
    {
        for (let i = 0; i < instancesPerCluster.EC2.length; i++) {
            totalInstancesPerCluster.push(instancesPerCluster.EC2[i]);
            var index = totalInstancesPerCluster.length - 1;
            totalInstancesPerCluster[index].cluster = "EC2";

        }
    }
                    
    if (typeof instancesPerCluster.EC3 !== 'undefined')
    {
        for (let i = 0; i < instancesPerCluster.EC3.length; i++) {
            totalInstancesPerCluster.push(instancesPerCluster.EC3[i]);
            var index = totalInstancesPerCluster.length - 1;
            totalInstancesPerCluster[index].cluster = "EC3";

        }
    }    
    return totalInstancesPerCluster;
     
}

// Shows instances in a pop-up window
function displayInstances(instances) {
    var title = "SERVICE INSTANCES";
    document.getElementById('serviceInstancesTitle').innerHTML = title.bold();
    
    var length = instances.length;
    if (length === 0)
    {
        dispmess('INFO', "There are no instances of this service");
        return;
    }
    var htmltext = "";
  
    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='servicename'>" + "Service Name" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Infrastructure" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='serviceinstancename'>" + "Instance Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Autoscaling Type" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Monitoring URL" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Actions" + "<a href='#'></a></th>\
            </tr>";

    for (var i = 0; i < length; i++) {   
        var servicefunctionsid = 'serviceFunctions';
        var j = i + 1;
        var serviceFunctionsId = servicefunctionsid + j;

        htmltext +=
            "<tr>\
                <td>" + instances[i].paas_name + "</td>\
                <td>" + instances[i].cluster + "</td>\
                <td>" + instances[i].paas_instance_name + "</td>\
                <td>" + instances[i].autoscaling_type + "</td>";
        if (instances[i].monitoring_service_URL !== 'undefined') 
        {
            htmltext += 
                "<td><a href='" + instances[i].monitoring_service_URL + "'>URL</td>";
        }
        else
        {
            htmltext += 
                "<td></td>";
        }
        htmltext += 
                "<td><a href='#'><i id='" + serviceFunctionsId + "' class='fas fa-info' title='Service Functions' style='padding:2px;color:blue;font-size:22px'></i></a>" +
                "</td>\
            </tr>";
        
    }

    document.getElementById("serviceInstancesTable").innerHTML = htmltext;
    document.getElementById('serviceInstancesPopup').style.display='block';
  
    // Add event on action buttons
    var serviceFunctionIDs = [];
    
    var tableLength = document.getElementById('serviceInstancesTable').rows.length;
    for (var i = 1; i < tableLength; i++){
        var servicefunctionid = 'serviceFunctions';
      
        servicefunctionid = servicefunctionid + i;
        serviceFunctionIDs.push(servicefunctionid);
    }

    for (var k = 0; k < length; k++){
        addOnClickServiceFunctionEvents(serviceFunctionIDs[k], instances[k].deployed_service_functions);
    }
}

// Opens a pop-up window and shows the instantiated service functions of the given service instance
function addOnClickServiceFunctionEvents(instanceIconId, functions){
    document.getElementById(instanceIconId).addEventListener('click', async function(event){
        var title = "SERVICE FUNCTION INSTANCES";
        document.getElementById('serviceFunctionsTitle').innerHTML = title.bold();
    
        var length = functions.length;
        if (length === 0)
        {
            dispmess('INFO', "There are no functions for this service");
            return;
        }
        var htmltext = "";
  
        htmltext +=
            "<tr class='header'>\
                <th class='services-mgmttable-headers'>" + "Service Function Name" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Instance Name" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Status" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Replicas" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Location" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Node" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Ports" + "<a href='#'></a></th>\
            </tr>";
 
    
        for (var i = 0; i < length; i++) {   
            
            
        
            htmltext +=
                "<tr>\
                    <td>" + functions[i].service_function_catalogue_name + "</td>\
                    <td>" + functions[i].service_function_instance_name + "</td>" + 
                    "<td>" + functions[i].status + "</td>" +  
                    "<td>" + functions[i].replicas + "</td>" +  
                    "<td>" + functions[i].location + "</td>\
                    <td>" + functions[i].node_name + "</td>"
            if (functions[i].ports.length === 0) {
                htmltext += "<td></td>";
            }
            else {
                htmltext += "<td>";
                for (j = 0; j < functions[i].ports.length; j++) {
                    htmltext += "<u><i>Application port</i></u>: " + functions[i].ports[j].application_port + "<br> <u><i>Exposed port</i></u>: " + functions[i].ports[j].exposed_port +
                    "<br>  <u><i>Protocol</i></u>: " + functions[i].ports[j].protocol;
                    if (j < functions[i].ports.length - 1) {
                        htmltext += "<br>-----<br>";
                    }
            
                }
                htmltext += "</td>";
            }
                
           
                    
            htmltext += "</tr>";
        
        }
    
        document.getElementById("serviceFunctionsTable").innerHTML = htmltext;
        document.getElementById('serviceFunctionsPopup').style.display='block';
        
    });
}



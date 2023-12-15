
const instantiateServiceURL = _BACKENDSERVER + '/systemmanager/instantiate/service';
const getInfrastructureURL = _BACKENDSERVER+"/infrastructurecatalogue/get/infrastructure";
const getLocationURL = _BACKENDSERVER + '/systemmanager/get/parameters/location';
// Shows a pop-up window for configuring the service that is given in the input
async function runServicePopUp(divId, service, fromService) {
    var title = "CONFIGURE SERVICE";
    document.getElementById('serviceTitle').innerHTML = title.bold();
    var htmltxt = "";
    htmltxt += "<div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                    <form id='addoperationform' style='margin: 0 auto; text-align:center; width:100%;'>";
   
    htmltxt += "<div class='row'>\
                    <h3 style='text-align: center;'><b>" + service.serName + "</b></h3>\n\
                </div>";

     
    // Show configurations table
    if (service.serConfigParams.length > 0)
    {
        var confTableId = divId + "configparamstable";
        htmltxt += "<div class='row regformrow'>\
                        <div class='col-srvregistration-tables'>\
                            <table class='srvregtable' id='" + confTableId + "'>\
                                <thead>\
                                    <tr>\
                                        <td style='background-color: #9e9e9e;' colspan='100%'><b>Configuration Parameters</b></td>\
                                    </tr>\
                                    <tr>\
                                        <th>Parameter Name</th>\
                                        <th>Parameter Type</th>\
                                        <th>Parameter Description</th>\
                                        <th>Parameter Value</th>\
                                    </tr>\
                                </thead>\
                            <tbody>";
    }
                
    for (var j = 0; j < service.serConfigParams.length; j++)
    {
        htmltxt += "<tr>\
                        <td>" + service.serConfigParams[j].serParamName + "</td>\
                        <td>" + service.serConfigParams[j].serParamType + "</td>\
                        <td>" + service.serConfigParams[j].serParamDescr + "</td>\
                        <td contenteditable>" + service.serConfigParams[j].serParamTypicalValue + "</td>\
                    </tr>";
    }
    htmltxt += "</tbody>\
                </table>\
                </div>\
                </div>";
    // Show operations tables
    for (var j = 0; j < service.serOperations.length; j++)
    {
        console.log("Thare are operations");
        htmltxt += "<h4 style='text-align: center; padding-top: 25px;'><b>Parameters of operation '" + service.serOperations[j].serOperationName + "'</b></h3>";
        if (service.serOperations[j].serOperationInputParams.length > 0 || service.serOperations[j].serOperationOutputParams.length > 0)
        {
            htmltxt += "<div class='row regformrow' >";
        }
        // Input parameters
        if (service.serOperations[j].serOperationInputParams.length > 0)
        {
            htmltxt += "<div class='col-srvregistration-tables' width='45%'>\
                            <table class='srvregtable'>\
                                <thead>\
                                    <tr >\
                                        <td style='background-color: #9e9e9e;' colspan='100%'><b>Input Parameters</b></td>\
                                    </tr>\
                                    <tr>\
                                        <th>Parameter Name</th>\
                                        <th>Parameter Type</th>\
                                        <th>Parameter Description</th>\
                                        <th>Parameter Value</th>\
                                    </tr>\
                                </thead>\
                                <tbody>";
            for (var k = 0; k < service.serOperations[j].serOperationInputParams.length; k++)
            {
                htmltxt += "<tr>\
                                <td>" + service.serOperations[j].serOperationInputParams[k].serParamName + "</td>\
                                <td>" + service.serOperations[j].serOperationInputParams[k].serParamType + "</td>\
                                <td>" + service.serOperations[j].serOperationInputParams[k].serParamDescr + "</td>\
                                <td contenteditable>" + service.serOperations[j].serOperationInputParams[k].serParamTypicalValue + "</td>\
                            </tr>";
            }

            htmltxt += "</tbody>\
                        </table>\
                        </div>";
        }
        // Output parameters
        if (service.serOperations[j].serOperationOutputParams.length > 0)
        {
            htmltxt += "<div class='col-srvregistration-tables' width='45%'>\
                            <table class='srvregtable'>\
                                <thead>\
                                    <tr >\
                                        <td style='background-color: #9e9e9e;' colspan='100%'><b>Output Parameters</b></td>\
                                    </tr>\
                                    <tr>\
                                        <th>Parameter Name</th>\
                                        <th>Parameter Type</th>\
                                        <th>Parameter Description</th>\
                                        <th>Parameter Value</th>\
                                    </tr>\
                                </thead>\
                                <tbody>";
            for (var k = 0; k < service.serOperations[j].serOperationOutputParams.length; k++)
            {
                htmltxt += "<tr>\
                                <td>" + service.serOperations[j].serOperationOutputParams[k].serParamName + "</td>\
                                <td>" + service.serOperations[j].serOperationOutputParams[k].serParamType + "</td>\
                                <td>" + service.serOperations[j].serOperationOutputParams[k].serParamDescr + "</td>\
                                <td contenteditable>" + service.serOperations[j].serOperationOutputParams[k].serParamTypicalValue + "</td>\
                            </tr>";
            }
            htmltxt += "</tbody>\
                        </table>\
                        </div>";
        }
    }
    
    htmltxt += "</div>";         
    htmltxt += "</form>\
                <div class='row'>\
                    <input id='add-operation-btn' type='button' value='Run Service' onclick=\"runService('" + divId + "', '" + service.serId + "', '" + fromService + "')\">\
                </div>\
                </div>";
    // Insert the div to the document
    var elemDiv = document.getElementById("serviceInstantiateTables");
    elemDiv.innerHTML = htmltxt;

    document.getElementById('serviceInstantiatePopup').style.display='block';
}

// Function for retreiving configuration parameters from the popup and executing the service
async function runService(divId, serviceId, fromService)
{
    console.log("About to run the service....");
    // Get the service from backend
    const serviceUrl = getServiceURL + serviceId;
    fetch(serviceUrl)
    
        .then(response => response.json())
        .then(async data => {
            var service = data;
            const confTableId = divId + "configparamstable";

            var tableConfParams = document.getElementById(confTableId);

            // Get configuration parameters from selected service and create the call's body
            var instantiateServiceBody = '{';
            for (var i = 0; i < service.serConfigParams.length; i++)
            {
                //Get Param name and value from the table
        
                var paramName = tableConfParams.rows[i+2].cells[0].innerHTML;
    
                var paramValue = tableConfParams.rows[i+2].cells[3].innerHTML;
   
                instantiateServiceBody = instantiateServiceBody + "\"" +paramName + "\": \"" + paramValue + "\"";
                if (i < service.serConfigParams.length - 1)
                {
                    instantiateServiceBody = instantiateServiceBody + ', ';
                }
            }
            instantiateServiceBody = instantiateServiceBody + '}';
            console.log("instantiateServiceBody = " + instantiateServiceBody);
            let r = await fetch(instantiateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: instantiateServiceBody});

            if (r.status !== 200)
            {
                dispmess("ERROR", "Unable to instantiate the service. Please try again later or contact the administrator");
                document.getElementById('serviceInstantiatePopup').style.display = "none";
                return;
            }
            if (fromService === true)
            {
                // Update the monitoring URL
                var rowIndex = divId.substr(7,divId.length);
                var url = await serviceMonUrl(service.serId);
                if (url !== '#')
                {
//                    console.log("Going to change the monitoring URL...");
                
                    var monitorIconId = 'monitorIcon' + rowIndex;
                    var hrefElement = document.getElementById(monitorIconId);
                    hrefElement.href = url;
                }
                //Change the status of the service
                var updateData = {
                    serId: service.serId,
     
                    state: 'Instantiated'

                };
                var updateUrl = _BACKENDSERVER+"/servicecatalogue/update/services/state";
                CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updateservice");
                // Change the value in the table
                var myTable = document.getElementById("myTable");
    
                var cellIndex = 7;
                myTable.rows[rowIndex].cells[cellIndex].innerHTML = 'Instantiated';
            }
            
    
            
                
            
                   
            // Close the pop-up window
            document.getElementById('serviceInstantiatePopup').style.display='none';
            dispmess("INFO", "The service has been instantiated");
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });   

}

// Shows a pop-up window for configuring the procuvtionized service that is given in the input
async function runServiceAsProductPopUp(divId, product, service) {
    var title = "CONFIGURE SERVICE";
    document.getElementById('serviceTitle').innerHTML = title.bold();
    var htmltxt = "";
    htmltxt += "<div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                    <form id='addoperationform' style='margin: 0 auto; text-align:center; width:100%;'>";
   
    htmltxt += "<div class='row'>\
                    <h3 style='text-align: center;'><b>" + service.serName + "</b></h3>\n\
                </div>";

     
    console.log("service = " + service);
    // Show configuration parameters
    
    console.log("There are configuration params");
    var instanceNameId = divId + "instanceNameId";
    var metricNameId = divId + "metricNameId";
    htmltxt += "<div class='row regformrow'>\
                    <div class='col-srvregistration'>\
                        <label for=" + instanceNameId + ">Service Instance Name</label>\
                    </div>\
                    <div class='col-srvregistration'>";
//    var instanceNameIndex = service.serConfigParams["serParamName"].indexOf('paas_instance_name');
    var instanceNameIndex = indexOfParam(service.serConfigParams, 'paas_instance_name');
    console.log("instanceNameIndex = " + instanceNameIndex);
    if (instanceNameIndex === -1)
    {
        console.log("instanceNameIndex === -1");
        htmltxt += "<input type='text' id=" + instanceNameId + " name=" + instanceNameId + ">";
    }
    else
    {
//        console.log("instanceNameIndex !== -1");
        htmltxt += "<input type='text' id=" + instanceNameId + " name=" + instanceNameId + " value=" + service.serConfigParams[instanceNameIndex].serParamTypicalValue + ">";
    }
    htmltxt += "</div>\
                <div class='col-srvregistration'>\
                    <label for=" + metricNameId + ">Metric Name</label>\
                </div>\
                <div class='col-srvregistration'>";

    var metricNameIndex = indexOfParam(service.serConfigParams, 'eval_metric_name');
    if (metricNameIndex === -1)
    {
        htmltxt += "<input type='text' id=" + metricNameId + " name=" + metricNameId + ">";
    }
    else
    {
        htmltxt += "<input type='text' id=" + metricNameId + " name=" + metricNameId + " value=" + service.serConfigParams[metricNameIndex].serParamTypicalValue + ">";
    }
    htmltxt += "</div>\
            </div>";
    var locationId = divId + "locationId";
    htmltxt += "<div class='row regformrow'>\
                    <div class='col-srvregistration'>\
                        <label for=" + locationId + ">Location</label>\
                    </div>\
                    <div class='col-srvregistration'>\
                        <select id=" + locationId + " name=" + locationId + ">\
                        </select>\
                    </div>";
    
    
    
    var includePortsId = divId + "includePortsId";
    htmltxt += "<div class='col-srvregistration'>\
                    <label for=" + includePortsId + ">Include all node ports</label>\
                </div>\
                <div class='col-srvregistration' style='margin-top:2%;'>\
                    <input type='checkbox' id=" + includePortsId + " name=" + includePortsId +">\
                </div>\
        </div>";
    
    var monitorId = divId + "monitorId";
    var dataSpaceId = divId + "dataSpaceId";
    htmltxt += "<div class='row regformrow'>\
                    <div class='col-srvregistration'>\
                        <label for=" + monitorId + ">Monitor service(s)</label>\
                    </div>\
                    <div class='col-srvregistration' style='margin-top:2%;'>\
                        <input type='checkbox' id=" + monitorId + " name=" + monitorId +">\
                    </div>";
    
    
    htmltxt += "<div class='col-srvregistration'>\
                    <label for=" + dataSpaceId + ">Data space enabled</label>\
                </div>\
                <div class='col-srvregistration' style='margin-top:2%;'>\
                    <input type='checkbox' id=" + dataSpaceId + " name=" + dataSpaceId +">\
                </div>\
        </div>\
        </div>";


    // Show operations tables
    for (var j = 0; j < service.serOperations.length; j++)
    {
//        console.log("Thare are operations");
        htmltxt += "<h4 style='text-align: center; padding-top: 25px;'><b>Parameters of operation '" + service.serOperations[j].serOperationName + "'</b></h3>";
        if (service.serOperations[j].serOperationInputParams.length > 0 || service.serOperations[j].serOperationOutputParams.length > 0)
        {
            htmltxt += "<div class='row regformrow' >";
        }
        // Input parameters
        if (service.serOperations[j].serOperationInputParams.length > 0)
        {
            htmltxt += "<div class='col-srvregistration-tables' width='45%'>\
                            <table class='srvregtable'>\
                                <thead>\
                                    <tr >\
                                        <td style='background-color: #9e9e9e;' colspan='100%'><b>Input Parameters</b></td>\
                                    </tr>\
                                    <tr>\
                                        <th>Parameter Name</th>\
                                        <th>Parameter Type</th>\
                                        <th>Parameter Description</th>\
                                        <th>Parameter Value</th>\
                                    </tr>\
                                </thead>\
                                <tbody>";
            for (var k = 0; k < service.serOperations[j].serOperationInputParams.length; k++)
            {
                htmltxt += "<tr>\
                                <td>" + service.serOperations[j].serOperationInputParams[k].serParamName + "</td>\
                                <td>" + service.serOperations[j].serOperationInputParams[k].serParamType + "</td>\
                                <td>" + service.serOperations[j].serOperationInputParams[k].serParamDescr + "</td>\
                                <td contenteditable>" + service.serOperations[j].serOperationInputParams[k].serParamTypicalValue + "</td>\
                            </tr>";
            }

            htmltxt += "</tbody>\
                        </table>\
                        </div>";
        }
        // Output parameters
        if (service.serOperations[j].serOperationOutputParams.length > 0)
        {
            htmltxt += "<div class='col-srvregistration-tables' width='45%'>\
                            <table class='srvregtable'>\
                                <thead>\
                                    <tr >\
                                        <td style='background-color: #9e9e9e;' colspan='100%'><b>Output Parameters</b></td>\
                                    </tr>\
                                    <tr>\
                                        <th>Parameter Name</th>\
                                        <th>Parameter Type</th>\
                                        <th>Parameter Description</th>\
                                        <th>Parameter Value</th>\
                                    </tr>\
                                </thead>\
                                <tbody>";
            for (var k = 0; k < service.serOperations[j].serOperationOutputParams.length; k++)
            {
                htmltxt += "<tr>\
                                <td>" + service.serOperations[j].serOperationOutputParams[k].serParamName + "</td>\
                                <td>" + service.serOperations[j].serOperationOutputParams[k].serParamType + "</td>\
                                <td>" + service.serOperations[j].serOperationOutputParams[k].serParamDescr + "</td>\
                                <td contenteditable>" + service.serOperations[j].serOperationOutputParams[k].serParamTypicalValue + "</td>\
                            </tr>";
            }
            htmltxt += "</tbody>\
                        </table>\
                        </div>";
        }
    }
    
    htmltxt += "</div>";         
    htmltxt += "</form>\
                <div class='row'>\
                    <input \
                        id='add-operation-btn' \
                        type='button' \
                        value='Run Service' \
                        onclick=\"runServiceAsProduct('" + divId + "', '" + service.serId + "', '" + product.productServiceLevelAgreementId + "', '" + product.countMin + "', '" + product.countMax + "')\">\
                </div>\
                </div>";
    // Insert the div to the document
    var elemDiv = document.getElementById("serviceInstantiateTables");
    elemDiv.innerHTML = htmltxt;    
    document.getElementById('serviceInstantiatePopup').style.display='block';
    
    // Set default values, if they exist
    var locationIndex = indexOfParam(service.serConfigParams, 'location');

    if (locationIndex === -1)
    {
//        console.log("locationIndex === -1");
        if (product.productAvailabilityZones.length > 0)
        {
            // Load all locations defined for the product, whithout selecting one
            listLocations(locationId, product.productAvailabilityZones, null);
        }
        else if (product.productNode !== '')
        {
            // Load only the location of the node
            var locations = [];
            //Find the node
            let nodeLocation = await getNodeLocation(product.productNode);
            if (nodeLocation < 0)
            {
                // Load all available locations, whithout selecting one
                
                selectionList(locationId, getLocationURL, null);
            }
            else
            {
                var location = {
                    AvailabilityZoneName: nodeLocation,
                    AvailabilityZoneId: nodeLocation
                };
                locations.push(location);
                listLocations(locationId, locations, null);
            }
        }
        
    }
    else
    {
        if (product.productAvailabilityZones.length > 0)
        {
            // Load all locations defined for the product, but show the one defined in service's configuration parameters selecting one
            console.log("product.productAvailabilityZones.length > 0");
            listLocations(locationId, product.productAvailabilityZones, service.serConfigParams[locationIndex].serParamTypicalValue);
        }
        else if (product.productNode !== '')
        {
            // Load only the location of the node
            var locations = [];
            //Find the node
            let nodeLocation = await getNodeLocation(product.productNode);
            console.log("nodeLocation = " + nodeLocation);
            if (nodeLocation < 0)
            {
                // Load all available locations, selecting the defined (if exists)
                console.log("nodeLocation === -1");
                selectionList(locationId, getLocationURL, service.serConfigParams[locationIndex].serParamTypicalValue);
            }
            else
            {
                console.log("nodeLocation = " + nodeLocation);
                var location = {
                    AvailabilityZoneName: nodeLocation,
                    AvailabilityZoneId: nodeLocation
                };
//                console.log("location = " + location);
                locations.push(location);
                listLocations(locationId, locations, service.serConfigParams[locationIndex].serParamTypicalValue);
            }
        }
        
    }
    var includePortsIndex = service.serConfigParams.indexOf('all_node_ports');
    if (includePortsIndex === -1)
    {
        document.getElementById(includePortsId).checked = true;
    }
    else
    {
        document.getElementById(includePortsId).checked = service.serConfigParams[includePortsIndex].serParamTypicalValue;
    }
    var monitorIndex = service.serConfigParams.indexOf('monitoring_services');
    if (monitorIndex === -1)
    {
        document.getElementById(monitorId).checked = true;
    }
    else
    {
        document.getElementById(monitorId).checked = service.serConfigParams[monitorIndex].serParamTypicalValue;
    }
    var dataSpaceIndex = service.serConfigParams.indexOf('data_space_enabled');
    if (dataSpaceIndex === -1)
    {
        document.getElementById(dataSpaceId).checked = false;
    }
    else
    {
        document.getElementById(dataSpaceId).checked = service.serConfigParams[dataSpaceIndex].serParamTypicalValue;
    }
}

// Function for retreiving configuration parameters from the popup and executing the service.
// This is called from runServiceAsProductPopUp
async function runServiceAsProduct(divId, serId, productServiceLevelAgreementName, countMin, countMax)
{
    // Get configuration parameters from the popup & given service and create the call's body

    var paas_service_name = serId;
//    console.log("paas_service_name = " + paas_service_name);
    var instanceNameId = divId + "instanceNameId";
    var paas_instance_name = document.getElementById(instanceNameId).value;
    var autoscaling_type = productServiceLevelAgreementName;
    var count_min = parseInt(countMin);
    var count_max = parseInt(countMax);
    var locationId = divId + "locationId";
    var location = document.getElementById(locationId).value;
    var includePortsId = divId + "includePortsId";
    var all_node_ports = document.querySelector('#'+includePortsId);
    var all_node_portsJson;
    if (all_node_ports.checked)
    {
        all_node_portsJson = true;
    }
    else
    {
        all_node_portsJson = false;
    }
 
    var monitorId = divId + "monitorId";
    
    var monitoring_services = document.querySelector('#'+monitorId);
    var monitoring_servicesJson;
    if (monitoring_services.checked)
    {
        monitoring_servicesJson = true;
    }
    else
    {
        monitoring_servicesJson = false;
    }
    var metricNameId = divId + "metricNameId";
    var eval_metric_name = document.getElementById(metricNameId).value;
    var dataSpaceId = divId + "dataSpaceId";
    var data_space_enabled = document.querySelector('#'+dataSpaceId);
    var data_space_enabledJson;
    if (data_space_enabled.checked)
    {
        data_space_enabledJson = true;
    }
    else
    {
        data_space_enabledJson = false;
    }
    var instantiateServiceBody = {
        paas_service_name: paas_service_name,
	paas_instance_name: paas_instance_name,
	autoscaling_type: autoscaling_type, 	
	count_min: count_min, 
	count_max: count_max, 
	location: location,
	all_node_ports: all_node_portsJson,
	monitoring_services: monitoring_servicesJson,
	eval_metric_name: eval_metric_name,
	data_space_enabled: data_space_enabledJson
    };

    var json = JSON.stringify(instantiateServiceBody);
//    console.log(json);
//    console.log("instantiateServiceBody = " + instantiateServiceBody);
    let r = await fetch(instantiateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: json});

    if (r.status !== 200)
    {
        dispmess("ERROR", "Unable to instantiate the service. Please try again later or contact the administrator");
        document.getElementById('serviceInstantiatePopup').style.display = "none";
        return;
    }
    
//    console.log("instantiateServiceBody = " + instantiateServiceBody);
//            let r = await fetch(instantiateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: instantiateServiceBody});
//
//            if (r.status !== 200)
//            {
//                dispmess("ERROR", "Unable to instantiate the service. Please try again later or contact the administrator");
//                document.getElementById('serviceInstantiatePopup').style.display = "none";
//                return;
//            }
                
            
                   
    // Close the pop-up window
    document.getElementById('serviceInstantiatePopup').style.display='none';
    dispmess("INFO", "The service has been instantiated");

}

//List all the Locations or Nodes that are defined for a product
function listLocations(listid, locations, selectedLocation) {
//    console.log("selectedLocation = " + selectedLocation);
    let dropdown = document.getElementById(listid);
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    
    var selectedLocationInList = false;
    for (let i = 0; i < locations.length; i++) {
                
        option = document.createElement('option');
        option.text = locations[i].AvailabilityZoneName;
        option.value = locations[i].AvailabilityZoneId;
        dropdown.add(option);
        
        if (locations[i].AvailabilityZoneName === selectedLocation)
        {
            selectedLocationInList = true;
        }
    }
    
    if (((selectedLocation !== null) || (selectedLocation !== null)) && (selectedLocationInList === true))
    {
//        console.log("Slect the given location!");
        dropdown.text = selectedLocation;
        dropdown.value = selectedLocation;   
    }
}

//Return a node details given the node name
async function getNodeLocation(nodeName) {
    // Get all infrastructures and check if the node belongs to any of them
//    console.log("In getNode()");
    var nodeLocation = "-2";
    await fetch(getInfrastructureURL)
    
        .then(response => response.json())
        .then(async data => {
            for (let i = 0; i < data.length; i++)
            {
                var nodes = data[i].nodes;
                let j = 0;
                for (j = 0; j < nodes.length; j++)
                {
                    if (nodes[j].nodeName === nodeName)
                    {
//                        console.log("About to return node " + nodes[j].nodeName);
                        nodeLocation = nodes[j].nodeLocation;
                        break;
                    }
                }
                if (j < nodes.length)
                {
                    break;
                }
            }
            return -1;
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 
    return nodeLocation;
}

// Check if the configuration parameters exists in the list and return its index
function indexOfParam(configParams, paramName)
{
    var index = -1;
    for (var i = 0; i < configParams.length; i++)
    {
        if (configParams[i].serParamName === paramName)
        {
            index = i;
            break;
        }
    }
    return index;
}
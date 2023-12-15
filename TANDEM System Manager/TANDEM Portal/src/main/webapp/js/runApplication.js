const urlPrefixService = _BACKENDSERVER+"/servicecatalogue/get/services/";

const urlPrefixApp = _BACKENDSERVER+"/applicationcatalogue/get/applications/";
const urlPrefixSco = _BACKENDSERVER+"/workflows/";
const instantiateWorkflowURL = _BACKENDSERVER + '/systemmanager/run/workflow';
const terminateServiceURL = _BACKENDSERVER + '/systemmanager/delete/service';
// Shows a pop-up window for configuring the services that are associated with the application, before executing the app
async function runAppFromServicesPopUp(divId, app, fromApplication) {
    var title = "CONFIGURE SERVICES";
    document.getElementById('applicationTitle').innerHTML = title.bold();
    var htmltxt = "";
    htmltxt += "<div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                    <form id='addoperationform' style='margin: 0 auto; text-align:center; width:100%;'>";
    var allServices = new Array();
    for (var i = 0; i < app.applicationServices.length; i++)
    {
        allServices.push(app.applicationServices[i]);
    }
    
    for (var i = 0; i < app.supportServices.length; i++)
    {
        allServices.push(app.supportServices[i]);
    }
  
    var confIndex = 0;
    var opIndex = 0;
    for (var i = 0; i < allServices.length; i++)
    {
        
        if (i > 0)
        {
            htmltxt += "<hr style='width:100%; border-top:2px solid #000'/>";
        }
        
        htmltxt += "<div class='row'>\
                        <h3 style='text-align: center;'><b>" + allServices[i].serName + "</b></h3>\n\
                    </div>";
        
        // Get service details
        var getServiceUrl = urlPrefixService + allServices[i].serID;
//        console.log("getServiceUrl = " + getServiceUrl);
        await fetch(getServiceUrl)
            .then(response => response.json())
            .then(data => {
   
                // Examine the text in the response
                var service = data;
                console.log("service = " + service);
                // Show configurations table
                if (service.serConfigParams.length > 0)
                {
                    confIndex++;
                    var confTableId = divId + "configparamstable" + confIndex;
                    console.log("confTableId = " + confTableId);
                    console.log("There are configuration params");
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
                };
                
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
                    htmltxt += "<h4 style='text-align: center; padding-top: 25px;'><b>Parameters of operation '" + service.serOperations[j].serOperationName + "'</b></h3>";
                    if (service.serOperations[j].serOperationInputParams.length > 0 || service.serOperations[j].serOperationOutputParams.length > 0)
                    {
                        htmltxt += "<div class='row regformrow' >";
                    }
                    // Input parameters
                    if (service.serOperations[j].serOperationInputParams.length > 0)
                    {
                        opIndex++;
                        var opTableId = divId + "operationstable" + opIndex;
                        htmltxt += "<div class='col-srvregistration-tables' width='45%'>\
                                        <table class='srvregtable' id='" + opTableId + "'>\
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
            })
   
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
    }

    htmltxt += "</form>\
                <div class='row'>\
                    <input id='add-operation-btn' type='button' value='Run Application' onclick=\"runApplication('" + divId + "', '" + app.id + "', '" + fromApplication + "')\">\
                </div>\
                </div>";
    // Insert the div to the document
    var elemDiv = document.getElementById("applicationInstantiateTables");
    elemDiv.innerHTML = htmltxt;

    document.getElementById('applicationInstantiatePopup').style.display='block';
}

// Function for retreiving configuration parameters from the popup and executing the application's service(s)
async function runApplication(divId, applicationId, fromApplication)
{
    // Get the application from backend
    const applicationUrl = urlPrefixApp + applicationId;
    console.log("applicatonUrl = " + applicationUrl);
    fetch(applicationUrl)
    
        .then(response => response.json())
        .then(async data => {
            var application = data;
            var allServices = new Array();
            for (var i = 0; i < application.applicationServices.length; i++)
            {
                allServices.push(application.applicationServices[i]);
            }
    
            for (var i = 0; i < application.supportServices.length; i++)
            {
                allServices.push(application.supportServices[i]);
            }
            
       
         
            var confIndex = 0;
            var opIndex = 0;
            var allServicesInstantiated = true;
            var lastService = '';
            var lastServiceIndex = 0;
            for (var i = 0; i < allServices.length; i++)
            {
                 // Get service details
                var getServiceUrl = urlPrefixService + allServices[i].serID;

                await fetch(getServiceUrl)
                    .then(response => response.json())
                    .then(async data => {
   
                        // Examine the text in the response
                        var service = data;
                        var confParams = service.serConfigParams;
                        // Read configurations table
                        if (service.serConfigParams.length > 0)
                        {
                            confIndex++;
                            var confTableId = divId + "configparamstable" + confIndex;
                            var tableConfParams = document.getElementById(confTableId);
                            
                            //Get Param name and value from the table
                            for (var j = 0; j < service.serConfigParams.length; j++)
                            {
                                console.log("j = " + j);
                                console.log(tableConfParams.rows);
                                var paramName = tableConfParams.rows[j+2].cells[0].innerHTML;
                                console.log("paramName = " + paramName);
                                var paramValue = tableConfParams.rows[j+2].cells[3].innerHTML;
                                console.log("paramValue = " + paramValue);
                       
                                confParams[j].serParamValue = paramValue;
                   
                            }
                        }
                        
                        // Create the call's body
                        var instantiateServiceBody = '{';
                        for (var j = 0; j < confParams.length; j++)
                        {
                            //Get Param name and value from the table

   
                            instantiateServiceBody = instantiateServiceBody + "\"" + confParams[j].serParamName + "\": \"" + confParams[j].serParamValue + "\"";
                            if (j < confParams.length - 1)
                            {
                                instantiateServiceBody = instantiateServiceBody + ', ';
                            }
                        }
                        instantiateServiceBody = instantiateServiceBody + '}';
                        console.log("instantiateServiceBody = " + instantiateServiceBody);
                        let r = await fetch(instantiateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: instantiateServiceBody});
                        console.log("Status for excecuting service " + service.serName + " : " + r.status);
                        lastService = service.serName;
                        lastServiceIndex = i;
                        if (r.status !== 200)
                        {
                            dispmess("ERROR", "Unable to instantiate the service " + service.serName + ". Please try again later or contact the administrator");
//                            console.log("Unable to instantiate the service " + service.serName);
                            allServicesInstantiated = false;
                            return;
                        }
                    })
   
                    .catch(function(err) {  
                        console.error('Fetch Error -', err);  
                    });
  
                if (!allServicesInstantiated)
                {
                    dispmess("ERROR", "The application instantiation was disrupted because we were unable to instantiate the service " + lastService + ". Please try again later or contact the administrator");
                    break;
                }
                    
            }
            if (!allServicesInstantiated)
            {
                // -----------------------------------------
                // Delete all instances of previous services
                // TO BE UNCOMENTED
                for (var i = 0; i < lastServiceIndex; i++)
                {
                    // Get service details
                    var getServiceUrl = urlPrefixService + allServices[i].serID;

                    await fetch(getServiceUrl)
                        .then(response => response.json())
                        .then(async data => {
   
                            // Examine the text in the response
                            var service = data;
                            var operations = service.serOperations;
                            // Read oprerations table
                            
                            for (var j = 0; j < operations.length; j++)
                            {
                                if (operations[j].serOperationInputParams.length > 0)
                                {
                                    opIndex++;
                                    
                                    if ((operations[j].serOperationName === "terminate") || (operations[i].serOperationName === "Terminate"))
                                    {
                                        var opTableId = divId + "operationstable" + opIndex;
                                        var tableOperation = document.getElementById(opTableId);
                            
                                        //Get Param name and value from the table
                                        for (var k = 0; k < operations[j].serOperationInputParams.length; k++)
                                        {
//                                            console.log("j = " + j);
//                                            console.log(tableOperation.rows);
                                            var paramName = tableOperation.rows[k+2].cells[0].innerHTML;
//                                            console.log("paramName = " + paramName);
                                            var paramValue = tableOperation.rows[k+2].cells[3].innerHTML;
//                                            console.log("paramValue = " + paramValue);
                       
                                            operations[j].serOperationInputParams[k].serParamValue = paramValue;
                   
                                        }
                                        var inputParams = operations[j].serOperationInputParams;
                                  
                                        // Create the call's body
                                        var terminateServiceBody = '{';
                                        for (var k = 0; k < inputParams.length; k++)
                                        {
                            
                                            terminateServiceBody = terminateServiceBody + "\"" + inputParams[k].serParamName + "\": \"" + inputParams[k].serParamValue + "\"";
                                            if (k < inputParams.length - 1)
                                            {
                                                terminateServiceBody = terminateServiceBody + ', ';
                                            }
                                        }
                                        terminateServiceBody = terminateServiceBody + '}';
                                        console.log("terminateServiceBody = " + terminateServiceBody);
                                        let r = await fetch(terminateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: terminateServiceBody});
                                        console.log("Status for terminating service " + service.serName + " : " + r.status);
  
                                        if (r.status !== 200)
                                        {
                            
                                            console.log("Unable to terminate the service " + service.serName);
                            
                                        }
                                        break;
                                    }
                                }
                            }
                        })
   
                        .catch(function(err) {  
                            console.error('Fetch Error -', err);  
                        });
  
                    
                }
                // ------------------------------------------
            }
            else {
//                            // Update the monitoring URL
    //            var rowIndex = divId.substr(7,divId.length);
    //            var url = await serviceMonUrl(service.serId);
    //            console.log("url = " + url);
    //            if (url !== '#')
    //            {
    //                console.log("Going to change the monitoring URL...");
    //                
    //                var monitorIconId = 'monitorIcon' + rowIndex;
    //                var hrefElement = document.getElementById(monitorIconId);
    //                hrefElement.href = url;
    //            }
                console.log("fromApplication = " + fromApplication);
                if (fromApplication === "true")
                {
                    console.log("looks like started from Application page!!!!");
                    //change the status of the application
                    var updateData = application;
                    updateData.state = "Instantiated";
                    var updateUrl = _BACKENDSERVER+"/applicationcatalogue/update/applications/" + application.id;
                    CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"updateapp");
                    resultfnct['updateapp'] = function () {
                        console.log("Updating application");
                    };
                    // Change the value in the table
                    var myTable = document.getElementById("applicationsTable");
                    var rowIndex = divId.substr(7,divId.length);
                    var cellIndex = 7;
                    myTable.rows[rowIndex].cells[cellIndex].innerHTML = "Instantiated";
                    dispmess("INFO", "The application has been instantiated");
                }
            }
 
                   
            // Close the pop-up window
            document.getElementById('applicationInstantiatePopup').style.display='none';
            
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });   

}

// Shows a pop-up window for configuring the service chain that is associated with the application, before executing the app
async function runAppFromScoPopUp(divId, app, fromApplication) {
    var title = "CONFIGURE SERVICES OF THE SERVICE CHAIN '" + app.serviceChain + "'" ;
    document.getElementById('applicationTitle').innerHTML = title.bold();
    
    // Get service chain
    var getScoUrl = urlPrefixSco + app.serviceChain;

    await fetch(getScoUrl)
        .then(response => response.json())
        .then(data => {
   
            // Examine the text in the response
            var workflow = data;
            // Get the workflow's json
            var scojson = workflow.json;
            var services = scojson.integration;

            var htmltxt = "";
            htmltxt += "<div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                    <form id='addoperationform' style='margin: 0 auto; text-align:center; width:100%;'>";
            for (var i = 0; i < services.length; i++)
            {
                var service = services[i];
                if (i > 0)
                {
                    htmltxt += "<hr style='width:100%; border-top:2px solid #000'/>";
                }
        
                htmltxt += "<div class='row'>\
                        <h3 style='text-align: center;'><b>" + service.name + " (service id: " + service.type + ")" + "</b></h3>\n\
                    </div>";
        
                // Show parameters table
                var tableId = "configparamstable";

                if (Object.keys(service.parameters.input_from_user).length > 0)
                {
                    tableId = tableId + i;
                    console.log("There are configuration params");
                    htmltxt += "<div class='row regformrow'>\
                                    <div class='col-srvregistration-tables'>\
                                        <table class='srvregtable' id='" + tableId + "'>\
                                            <thead>\
                                                <tr>\
                                                    <td style='background-color: #9e9e9e;' colspan='100%'><b>Service Parameters</b></td>\
                                                </tr>\
                                                <tr>\
                                                    <th>Parameter Name</th>\
                                                    <th>Parameter Value</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody>";
                };

                for(let j in service.parameters.input_from_user)
                {
                    console.log("j = " + j);
                    htmltxt += "<tr>\
                                <td>" + j + "</td>\
                                <td contenteditable>" + service.parameters.input_from_user[j] + "</td>\
                            </tr>";
                }
                htmltxt += "</tbody>\
                            </table>\
                            </div>\
                            </div>";
           
            }

            htmltxt += "</form>\
                <div class='row'>\
                    <input id='add-operation-btn' type='button' value='Run Workflow' onclick=\"runWorkflow('" + divId + "', '" + app.id + "', '" + fromApplication + "')\">\
                </div>\
                </div>";
            //Insert the div to the document
            var elemDiv = document.getElementById("applicationInstantiateTables");
            elemDiv.innerHTML = htmltxt;

        })
   
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });


    document.getElementById('applicationInstantiatePopup').style.display='block';
}

// Function for retreiving configuration parameters from the popup and executing the service
async function runWorkflow(divId, applicationId, fromApplication)
{
    const applicationUrl = urlPrefixApp + applicationId;
    console.log("applicatonUrl = " + applicationUrl);
    fetch(applicationUrl)
    
        .then(response => response.json())
        .then(async data => {
            var application = data;
            var workflowId = application.serviceChain;
//            console.log("serviceChain = " + workflowId);
            // Get the workflow from backend
            const workflowUrl = urlPrefixSco + workflowId;
//            console.log("workflowUrl = " + workflowUrl);
            fetch(workflowUrl)
    
                .then(response => response.json())
                .then(async data => {
                    var workflow = data;
                 

                    // Get configuration parameters from the form and create the call's body
                    var json = workflow.json;
                    var services = workflow.json.integration;
                    for (var i = 0; i < services.length; i++)
                    {
//                        console.log("i = " + i);
                        var tableId = "configparamstable";
                        var paramsSize = Object.keys(services[i].parameters.input_from_user).length;
                        if (paramsSize > 0)
                        {
                            tableId = tableId + i;
//                            console.log("tableId = " + tableId);
                            var tableConfParams = document.getElementById(tableId);
                            //Get Param name and value from the table
                            for (var j = 0; j < paramsSize; j++)
                            {
//                                console.log("j = " + j);
                                var paramName = tableConfParams.rows[j+2].cells[0].innerHTML;
                                console.log("paramName = " + paramName);
                                var paramValue = tableConfParams.rows[j+2].cells[1].innerHTML;
                                console.log("paramValue = " + paramValue);
                                json.integration[i].parameters.input_from_user[paramName] = paramValue;
                            }
                    
                        }
               
                    }
            
                    var jsonToSend = {components: json.integration};
                    const jsonToPrint = JSON.stringify(jsonToSend);
                    console.log("---------------JSON---------------");
                    console.log(jsonToPrint);
                    console.log("instantiateWorkflowURL = " + instantiateWorkflowURL);
                    CallPostUrl(instantiateWorkflowURL,"POST",jsonToSend,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"runflow");
                    resultfnct['runflow'] = function () {
                        console.log("Updating application");
                        if (fromApplication === true)
                        {
                            //Change the status of the application
                            var updateData = application;
                            updateData.state = "Instantiated";
                            var updateUrl = _BACKENDSERVER+"/applicationcatalogue/update/applications/" + application.id;
                            CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"updateapp");
                            resultfnct['updateapp'] = function () {
                                console.log("Updating application");
                            };
                            // Change the value in the table
                            var myTable = document.getElementById("applicationsTable");
                            var rowIndex = divId.substr(7,divId.length);
                            var cellIndex = 7;
                            myTable.rows[rowIndex].cells[cellIndex].innerHTML = "Instantiated";
                        }
                        // Close the pop-up window
                        document.getElementById('applicationInstantiatePopup').style.display='none';
                        dispmess("INFO", "The workflow has been instantiated");
                    };
                    resultfnct['errrunflow'] = function () {
                        dispmess("ERROR", "Unable to instantiate the workflow. Please try again later or contact the administrator");
                        document.getElementById('applicationInstantiatePopup').style.display = "none";
                        return;
                    }; 
                })
                
              
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
       
        })
         .catch(function(err) {  
                console.error('Fetch Error -', err);  
        }); 
}

// Shows a pop-up window for configuring the services that are associated with the application, before executing the app
async function runAppFromServicesAsProductPopUp(divId, product, app) {
    var title = "CONFIGURE SERVICES";
    document.getElementById('applicationTitle').innerHTML = title.bold();
    var htmltxt = "";
    htmltxt += "<div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                    <form id='addoperationform' style='margin: 0 auto; text-align:center; width:100%;'>";
    var allServices = new Array();
    for (var i = 0; i < app.applicationServices.length; i++)
    {
        allServices.push(app.applicationServices[i]);
    }
    
    for (var i = 0; i < app.supportServices.length; i++)
    {
        allServices.push(app.supportServices[i]);
    }
  
    var servIndex = 0;
    var locationValues = [];
    var includePortsValues = [];
    var monitorValues = [];
    var dataSpaceValues = [];
    for (var i = 0; i < allServices.length; i++)
    {
        
        if (i > 0)
        {
            htmltxt += "<hr style='width:100%; border-top:2px solid #000'/>";
        }
        
        htmltxt += "<div class='row'>\
                        <h3 style='text-align: center;'><b>" + allServices[i].serName + "</b></h3>\n\
                    </div>";
        
        // Get service details
        var getServiceUrl = urlPrefixService + allServices[i].serID;
        await fetch(getServiceUrl)
            .then(response => response.json())
            .then(data => {
   
                // Examine the text in the response
                var service = data;
//                console.log("service = " + service);
                // Show configurations parameters
                servIndex++;
//                console.log("There are configuration params");
                var instanceNameId = divId + "instanceNameId" + servIndex;
                var metricNameId = divId + "metricNameId" + servIndex;
                htmltxt += "<div class='row regformrow'>\
                                <div class='col-srvregistration'>\
                                    <label for=" + instanceNameId + ">Service Instance Name</label>\
                                </div>\
                                <div class='col-srvregistration'>";
                
                var instanceNameIndex = indexOfParam(service.serConfigParams, 'paas_instance_name');
//                console.log("instanceNameIndex = " + instanceNameIndex);
                if (instanceNameIndex === -1)
                {
                    htmltxt += "<input type='text' id=" + instanceNameId + " name=" + instanceNameId + ">";
                }
                else
                {
                    console.log("instanceNameIndex !== -1");
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
                var locationId = divId + "locationId" + servIndex;
                htmltxt += "<div class='row regformrow'>\
                                <div class='col-srvregistration'>\
                                    <label for=" + locationId + ">Location</label>\
                                </div>\
                                <div class='col-srvregistration'>\
                                    <select id=" + locationId + " name=" + locationId + ">\
                                    </select>\
                                </div>";
                var includePortsId = divId + "includePortsId" + servIndex;
                htmltxt += "<div class='col-srvregistration'>\
                                <label for=" + includePortsId + ">Include all node ports</label>\
                            </div>\
                            <div class='col-srvregistration' style='margin-top:2%;'>\
                                <input type='checkbox' id=" + includePortsId + " name=" + includePortsId +">\
                            </div>\
                        </div>";
                var monitorId = divId + "monitorId" + servIndex;
                var dataSpaceId = divId + "dataSpaceId" + servIndex;
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
                
                // Save the default values, if they exist, in order to be placed on the form (after rendering)
                var locationIndex = indexOfParam(service.serConfigParams, 'location');
//                console.log("locationIndex = " + locationIndex);
                if (locationIndex === -1)
                {
                    console.log("locationIndex === -1");
                    // Location in empty
                    locationValues.push("");
                  
                }
                else
                {
                    locationValues.push(service.serConfigParams[locationIndex].serParamTypicalValue);
                }

                var includePortsIndex = service.serConfigParams.indexOf('all_node_ports');
                if (includePortsIndex === -1)
                {
                    includePortsValues.push(true);
                }
                else
                {
                    includePortsValues.push(service.serConfigParams[includePortsIndex].serParamTypicalValue);
                }
                var monitorIndex = service.serConfigParams.indexOf('monitoring_services');
                if (monitorIndex === -1)
                {
                    monitorValues.push(true);
                }
                else
                {
                    monitorValues.push(service.serConfigParams[monitorIndex].serParamTypicalValue);
                }
                var dataSpaceIndex = service.serConfigParams.indexOf('data_space_enabled');
                if (dataSpaceIndex === -1)
                {
                    dataSpaceValues.push(false);
                }
                else
                {
                    dataSpaceValues.push(service.serConfigParams[dataSpaceIndex].serParamTypicalValue);
                }
            })
   
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
    }

    htmltxt += "</form>\
                <div class='row'>\
                    <input \
                        id='add-operation-btn' \
                        type='button' \
                        value='Run Application' \n\
                        onclick=\"runApplicationAsProduct('" + divId + "', '" + app.id + "', '" + product.productServiceLevelAgreementId + "', '" + product.countMin + "', '" + product.countMax + "')\">\
                </div>\
                </div>";
    // Insert the div to the document
    var elemDiv = document.getElementById("applicationInstantiateTables");
    elemDiv.innerHTML = htmltxt;

    document.getElementById('applicationInstantiatePopup').style.display='block';
    
    // Set default values, if they exist
//    var servIndex = 0;
    if (product.productAvailabilityZones.length > 0)
    {
        for (let i = 0; i < allServices.length; i++)
        {
            var servIndex = i + 1;
            var locationId = divId + "locationId" + servIndex;
            if (locationValues[i] === "")
            {
                // Load all locations defined for the product, whithout selecting one
                listLocations(locationId, product.productAvailabilityZones, null);
            }
            else
            {
                // Load all locations defined for the product, but show the one defined in service's configuration parameters selecting one
                console.log("product.productAvailabilityZones.length > 0");
                listLocations(locationId, product.productAvailabilityZones, locationValues[i]);
            }
        }
    }
    else if (product.productNode !== '')
    {
        // Load only the location of the node
        var locations = [];
        //Find the node
        let nodeLocation = await getNodeLocation(product.productNode);
        if (nodeLocation < 0)
        {
            for (let i = 0; i < allServices.length; i++)
            {
                var servIndex = i + 1;
                var locationId = divId + "locationId" + servIndex;
                if (locationValues[i] === "")
                {
                    // Load all available locations, whithout selecting one
                
                    selectionList(locationId, getLocationURL, null);
                }
                else
                {
                    // Load all available locations, selecting the defined (if exists)
                    console.log("nodeLocation === -1");
                    selectionList(locationId, getLocationURL, locationValues[i]);
                }
            }
        }
        else
        {
            var location = {
                AvailabilityZoneName: nodeLocation,
                AvailabilityZoneId: nodeLocation
            };
            locations.push(location);
            for (let i = 0; i < allServices.length; i++)
            {
                var servIndex = i + 1;
                var locationId = divId + "locationId" + servIndex;
                if (locationValues[i] === "")
                {
            
                    listLocations(locationId, locations, null);
                }
                else
                {
                    listLocations(locationId, locations, locationValues[i]);
                }
            }
        
        }
    }
    for (let i = 0; i < allServices.length; i++)
    {
        var servIndex = i + 1;
        var includePortsId = divId + "includePortsId" + servIndex;
        var monitorId = divId + "monitorId" + servIndex;
        var dataSpaceId = divId + "dataSpaceId" + servIndex;
          
        document.getElementById(includePortsId).checked = includePortsValues[i];
   
        document.getElementById(monitorId).checked = monitorValues[i];
   
        document.getElementById(dataSpaceId).checked = dataSpaceValues[i];
   
    }
    
    
    
}

// Function for retreiving configuration parameters from the popup and the product and executing the application's service(s)
// // This is called from runAppFromServicesAsProductPopUp
async function runApplicationAsProduct(divId, applicationId, productServiceLevelAgreementName, countMin, countMax)
{
    // Get the application from backend
    const applicationUrl = urlPrefixApp + applicationId;
//    console.log("applicatonUrl = " + applicationUrl);
    fetch(applicationUrl)
    
        .then(response => response.json())
        .then(async data => {
            var application = data;
            var allServices = new Array();
            for (var i = 0; i < application.applicationServices.length; i++)
            {
                allServices.push(application.applicationServices[i]);
            }
    
            for (var i = 0; i < application.supportServices.length; i++)
            {
                allServices.push(application.supportServices[i]);
            }
            
       
         
            var servIndex = 0;
            var allServicesInstantiated = true;
            var lastService = '';
            for (var i = 0; i < allServices.length; i++)
            {
                 // Get service details
                var getServiceUrl = urlPrefixService + allServices[i].serID;

                await fetch(getServiceUrl)
                    .then(response => response.json())
                    .then(async data => {
   
                        // Examine the text in the response
                        var service = data;
                        servIndex++;
                        // Get configuration parameters from the popup & given service and create the call's body

                        var paas_service_name = service.serId;
                        console.log("paas_service_name = " + paas_service_name);
                        var instanceNameId = divId + "instanceNameId" + servIndex;
                        var paas_instance_name = document.getElementById(instanceNameId).value;
                        var autoscaling_type = productServiceLevelAgreementName;
                        var count_min = parseInt(countMin);
                        var count_max = parseInt(countMax);
                        var locationId = divId + "locationId" + servIndex;
                        var location = document.getElementById(locationId).value;
                        var includePortsId = divId + "includePortsId" + servIndex;
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
 
                        var monitorId = divId + "monitorId" + servIndex;
    
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
                        var metricNameId = divId + "metricNameId" + servIndex;
                        var eval_metric_name = document.getElementById(metricNameId).value;
                        var dataSpaceId = divId + "dataSpaceId" + servIndex;
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
                        
                        // Create the call's body
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
                        console.log(json);
                        console.log("instantiateServiceBody = " + instantiateServiceBody);
                        let r = await fetch(instantiateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: json});
                        console.log("Status for excecuting service " + service.serName + " : " + r.status);
                        lastService = service.serName;
                        if (r.status !== 200)
                        {
                            dispmess("ERROR", "Unable to instantiate the service " + service.serName + ". Please try again later or contact the administrator");
//                            console.log("Unable to instantiate the service " + service.serName);
                            allServicesInstantiated = false;
                            return;
                        }
                    })
   
                    .catch(function(err) {  
                        console.error('Fetch Error -', err);  
                    });
  
//                if (!allServicesInstantiated)
//                {
//                    dispmess("ERROR", "The application instantiation was disrupted because we were unable to instantiate the service " + lastService + ". Please try again later or contact the administrator");
//                    break;
//                }
                    
            }
//            if (!allServicesInstantiated)
//            {
//                // Delete all instances of previous services
//                // TO BE DONE: Call the correct API. The problem is that the current API doesn't actually delete instance from pi-Edge. Also, it has to be mofified, as the piEdge IP and port should be known for making the call. Otherwise my processing must change
//            }
//            else {
//                            // Update the monitoring URL
    //            var rowIndex = divId.substr(7,divId.length);
    //            var url = await serviceMonUrl(service.serId);
    //            console.log("url = " + url);
    //            if (url !== '#')
    //            {
    //                console.log("Going to change the monitoring URL...");
    //                
    //                var monitorIconId = 'monitorIcon' + rowIndex;
    //                var hrefElement = document.getElementById(monitorIconId);
    //                hrefElement.href = url;
    //            }
              
            // Close the pop-up window
            document.getElementById('applicationInstantiatePopup').style.display='none';
            
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });   

}


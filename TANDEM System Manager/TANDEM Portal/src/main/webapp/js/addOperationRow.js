
// Add a new row in Operations table showing Name, Description, Type, Endpoind and Action. 
// This is used in serviceRegistration page in "Service Description & APIs URLs" table
var operationRowIndex = 0;
function addOperationRow(tableId, operation) {
    // Add pop-up window for operation's parameters
    operationRowIndex++;
    var popUpId = "addOpParamsPopup" + operationRowIndex;
    var inputParamId = "addinputparamstable" + operationRowIndex;
    var outputParamId = "addoutputparamstable" + operationRowIndex;
    var selectListId = "operationType" + operationRowIndex;
  
    var table = document.getElementById(tableId);
    
    //var rows = document.getElementById(tableId).getElementsByTagName('tr');
    
    if (operation === null)
    {
        //Empty parameters
        addOpParamPopUp(popUpId, inputParamId, outputParamId, null, null);
        
        //Blank row
        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td contenteditable></td>\
                            <td contenteditable></td>\
                            <td>\
                                <select class='regselect' name='operationType'>\
                                    <option>Synchronous</option>\
                                    <option>Asynchronous</option>\
                                </select>\
                            </td>\
                            <td contenteditable></td>\
                            <td><a href='javascript:void(0)'><i class='fas fa-info' title='Details' style='padding-bottom:5px;color:blue;font-size:24px' onclick=\"addOpParamsPopup('" + popUpId + "');\" data-target=\"" + popUpId + "-{{ task.id }}\"></i></a><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, 'operationstable', true)\" style='padding-bottom:5px;color:red;font-size:24px;margin-left: 20%'></i></a></td>\
                            <td hidden>" + inputParamId + "</td>\
                            <td hidden>" + outputParamId + "</td>\
                        </tr>";
    }
    else
    {
        console.log("Operation length < 3");
        addOpParamPopUp(popUpId, inputParamId, outputParamId, operation.serOperationInputParams, operation.serOperationOutputParams);
        
        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td contenteditable>" + operation.serOperationName + "</td>\
                            <td contenteditable>" + operation.serOperationDescription + "</td>\
                            <td>\
                                <select class='regselect' name='operationType' id='" + selectListId + "'>\
                                    <option>Synchronous</option>\
                                    <option>Asynchronous</option>\
                                </select>\
                            </td>\
                            <td contenteditable>" + operation.serOperationEndPoint + "</td>\
                            <td><a href='javascript:void(0)'><i class='fas fa-info' title='Details' style='padding-bottom:5px;color:blue;font-size:24px' onclick=\"addOpParamsPopup('" + popUpId + "');\" data-target=\"" + popUpId + "-{{ task.id }}\"></i></a>\
                                <a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, 'operationstable', true)\" style='padding-bottom:5px;color:red;font-size:24px;margin-left: 20%'></i></a>\
                            </td>\
                            <td hidden>" + inputParamId + "</td>\
                            <td hidden>" + outputParamId + "</td>\
                        </tr>";
        // Select the proper value in selection list
        console.log("Selected List id = " + selectListId);
        console.log("Operation type = " + operation.serOperationType);
        let dropdown = document.getElementById(selectListId);
        dropdown.value = operation.serOperationType;
    }
}

// Adds a new popup window
function addOpParamPopUp(divId, inputParamId, outputParamId, inputParams, outputParams) {
    //console.log("Input param ID: " + inputParamId);
    var elemDiv = document.createElement('div');
  
    elemDiv.innerHTML = "<div class='mw3-container' style=''>\
                            <div id='" + divId + "' class='mw3-modal'>\
                                <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                    <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                        <span onclick=\"document.getElementById('" + divId + "').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                        <h2 id='addOperationTitle' style='text-align: center;'><b>OPERATION ADDITION</b></h2>\
                                    </header>\
                                    <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                        <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                                            <form id='addoperationform' style='margin: 0 auto; text-align:center; width:100%;'>\
                                                <div class='row regformrow'>\
                                                    <div class='col-srvregistration-tables'>\
                                                        <table class='srvregtable' id='" + inputParamId + "'>\
                                                        <thead>\
                                                            <tr >\
                                                                <td style='background-color: #9e9e9e;' colspan='100%'><b>Input Parameters</b></td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th>Parameter Name</th>\
                                                                <th>Parameter Type</th>\
                                                                <th>Parameter Typical Value</th>\
                                                                <th>Parameter Description</th>\
                                                                <th>Action</th>\
                                                            </tr>\
                                                        </thead>\
                                                        <tbody>\
                                                        </tbody>\
                                                    </table>\
                                                </div>\
                                            </div>\
                                            <div class='row' style='margin-left:42%'>\
                                                <div class='col-srvregistration'>\n\
                                                    <input id='add-inputparams-btn' type='button' value='+ Add Input Parameters' onclick=\"addConfParamRow('" + inputParamId + "', null)\">\
                                                </div>\
                                            </div>\
                                            <div class='row regformrow'>\
                                                <div class='col-srvregistration-tables'>\
                                                    <table class='srvregtable' id='" + outputParamId + "'>\
                                                        <thead>\
                                                            <tr>\
                                                                <td style='background-color: #9e9e9e;' colspan='100%'><b>Output Parameters</b></td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th>Parameter Name</th>\
                                                                <th>Parameter Type</th>\
                                                                <th>Parameter Typical Value</th>\
                                                                <th>Parameter Description</th>\
                                                                <th>Action</th>\
                                                            </tr>\
                                                        </thead>\
                                                        <tbody>\
                                                        </tbody>\
                                                    </table>\
                                                </div>\
                                            </div>\
                                            <div class='row' style='margin-left:42%'>\
                                                <div class='col-srvregistration'>\
                                                    <input id='add-outputparams-btn' type='button' value='+ Add Output Parameters' onclick=\"addConfParamRow('" + outputParamId + "', null)\">\
                                                </div>\
                                            </div>\
                                            </form>\
                                            <div class='row'>\
                                                <input id='add-operation-btn' type='button' value='Add Parameters' onclick=\"addOperation('" + divId + "')\">\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <footer class='w3-container' style='background-color: #9e9e9e;'>\
                                        <p> </p>\
                                    </footer>\
                                </div>\
                            </div>\
                        </div>";
    // Insert the div to the document
    document.body.appendChild(elemDiv);
    
    // Fill tables of Configuration parameters
    
    addConfParamRow(inputParamId, inputParams);
    addConfParamRow(outputParamId, outputParams);
}

//Function for showing popup window for adding input and output parameters for an operation
function addOpParamsPopup(divId){
    document.getElementById(divId).style.display = 'block';
}


function addOperation(divId){
    console.log("#1");
    document.getElementById(divId).style.display = 'none';
}

                                                        
var nodeRowIndex = 0;
// Add a new row in Edge Nodes table showing. 
function addNodeRow(tableId, nodes) {
    // Add pop-up window for additional nodes's parameters
    nodeRowIndex++; 
    var table = document.getElementById(tableId);
    
    if (nodes === null)
    {
        //Empty tables
        addNodeConfPopUp(nodeRowIndex);
        //Blank row
        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td contenteditable></td>\
                            <td contenteditable></td>\
                            <td contenteditable></td>\
                            <td contenteditable></td>\
                            <td contenteditable></td>\
                            <td contenteditable></td>\
                            <td>\
                                <a href='javascript:void(0)'><i class='fas fa-info' title='Details' style='padding-bottom:5px;color:blue;font-size:24px' onclick=\"addNodeConfsPopUp('" + nodeRowIndex + "');\" data-target=\"" + nodeRowIndex + "-{{ task.id }}\"></i></a>\
                                <a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px;margin-left: 20%'></i></a>\
                            </td>\
                            <td hidden>" + nodeRowIndex + "</td>\
                        </tr>";
        
                      
    }
    else
    {

        addNodeConfPopUp(nodeRowIndex);
        for (var i = 0; i < nodes.length; i++)
        {
            var row = table.insertRow(-1);
            row.innerHTML = "<tr>\
                            <td contenteditable>" + nodes[i].nodeName + "</textarea></td>\
                            <td contenteditable>" + nodes[i].nodeId + "</textarea></td>\
                            <td contenteditable>" + nodes[i].nodeLocation + "</textarea></td>\
                            <td contenteditable>" + nodes[i].nodeAddresses.nodeHostName + "</textarea></td>\
                            <td contenteditable>" + nodes[i].nodeAddresses.nodeExternalIP + "</textarea></td>\
                            <td contenteditable>" + nodes[i].nodeAddresses.nodeInternalIP + "</textarea></td>\
                            <td>\
                                <a href='javascript:void(0)'><i class='fas fa-info' title='Details' style='padding-bottom:5px;color:blue;font-size:24px' onclick=\"addNodeConfsPopUp('" + nodeRowIndex + "');\" data-target=\"" + nodeRowIndex + "-{{ task.id }}\"></i></a>\
                                <a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a>\
                            </td>\
                            <td hidden>" + nodeRowIndex + "</td>\
                          </tr>";
        }
    }
}

// Adds a new popup window
function addNodeConfPopUp(nodeRowIndex){
    
    var divId = "addNodeConfPopup" + nodeRowIndex;
    var conftypeRadioName = "configurationtype" + nodeRowIndex;
    var confRadioName = "configuration" + nodeRowIndex;
    var autoConfRadioId = "infraautoconfigradio" + nodeRowIndex;
    var manualConfRadioId = "inframanualconfigradio" + nodeRowIndex;
    var confDivId = "conftables" + nodeRowIndex;
    var confTableId = "configurationtable" + nodeRowIndex;
    var hiddenDivId = "servicestables" + nodeRowIndex;
    var confServicesId = "availableservicestable" + nodeRowIndex;
    var manualConfDivId = "manualconftables" + nodeRowIndex;
    var availableServicesTableId = "confservicestable" + nodeRowIndex;
    var installedServicesTableId = "installedservicestable" + nodeRowIndex;
       
    var elemDiv = document.createElement('div');

    elemDiv.innerHTML = "<div class='mw3-container' style=''>\
                            <div id='" + divId + "' class='mw3-modal'>\
                                <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                    <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                        <span onclick=\"document.getElementById('" + divId + "').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                        <h2 id='addNodeInfoTitle' style='text-align: center;'><b>NODE CONFIGURATION</b></h2>\
                                    </header>\
                                    <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                        <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>\
                                            <form id='confnodeform' style='margin: 0 auto; text-align:center; width:100%;'>\
                                                <div>\
                                                    <label for='" + autoConfRadioId + "'>Select from existing configurations</label>\
                                                    <input type='radio' id='" + autoConfRadioId + "' name='" + conftypeRadioName + "' value='" + autoConfRadioId + "'>\
                                                    <br>\
                                                    <label for='" + manualConfRadioId + "'>Create your configuration</label>\
                                                    <input type='radio' id='" + manualConfRadioId + "' name='" + conftypeRadioName + "' value='" + manualConfRadioId + "'>\
                                                </div>\
                                                <div class='row regformrow' style='margin-top: 3%' id='" + confDivId + "' hidden>\
                                                    <div class='col-srvregistration' style='width:45%'>\
                                                        <table class='srvregtable' id='" + confTableId + "'>\
                                                            <thead>\
                                                                <tr>\
                                                                    <th style='background-color: #9e9e9e;'>Configuration</th>\
                                                                    <th style='background-color: #9e9e9e;'></th>\
                                                                </tr>\
                                                            </thead>\
                                                            <tbody>\
                                                                <tr>\
                                                                    <td>Basic (includes only IoT support services)</td>\
                                                                    <td><input type='radio' id='basic' name='" + confRadioName + "' value='basic'></td>\
                                                                </tr>\
                                                                <tr>\
                                                                    <td>Medium</td>\
                                                                    <td><input type='radio' id='medium' name='" + confRadioName + "' value='medium'></td>\
                                                                </tr>\
                                                                <tr>\
                                                                    <td>Complete (Includes all the TANDEM Core PaaS Services</td>\
                                                                    <td><input type='radio' id='complete' name='" + confRadioName + "' value='complete'></td>\
                                                                </tr>\
                                                            </tbody>\
                                                        </table>\
                                                    </div>\
                                                    <div class='col-srvregistration' style='width:45%' id='" + hiddenDivId + "' hidden>\
                                                        <table class='srvregtable' id='" + confServicesId + "'>\
                                                            <tbody>\
                                                                <tr id='" + confServicesId + "'>\
                                                                    <td style='background-color: #9e9e9e;'><b>Configuration Services</b></td>\
                                                                </tr>\
                                                            </tbody>\
                                                        </table>\
                                                    </div>\
                                                </div>\
                                                <div id='" + manualConfDivId + "' hidden>\
                                                    <div style='font-size: 18px; margin-top: 3%;'>Select Specific Services</div>\
                                                    <div class='row regformrow' style='margin-top: 3%'>\
                                                        <div class='col-srvregistration' style='width:45%'>\
                                                            <table class='mytable' id='" + availableServicesTableId + "'>\
                                                                <tbody class='connectedSortable'>\
                                                                    <tr id='" + availableServicesTableId + "'>\
                                                                        <td style='background-color: #9e9e9e;'><b>Available TANDEM Core PaaS Services</b></td>\
                                                                    </tr>\
                                                                </tbody>\
                                                            </table>\
                                                        </div>\
                                                        <div class='col-srvregistration' style='width:45%'>\
                                                            <table class='mytable' id='" + installedServicesTableId + "'>\
                                                                <tbody class='connectedSortable'>\
                                                                    <tr id='" + installedServicesTableId + "'>\
                                                                        <td style='background-color: #9e9e9e;'><b>Installed TANDEM Core PaaS Services</b></td>\
                                                                    </tr>\
                                                                </tbody>\
                                                            </table>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </form>\
                                            <div class='row'>\
                                                <input id='add-operation-btn' type='button' value='Save' onclick=\"addNodeInfo('" + divId + "')\">\
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
    //Add event to radio buttons
    const radioButtons1 = document.querySelectorAll('input[name="' + conftypeRadioName + '"]');
    for (const radioButton of radioButtons1)
    {
        radioButton.addEventListener('change', function() {
            if (this.value === autoConfRadioId)
            {
                if (this.checked)
                {
                    document.getElementById(confDivId).style.display = 'block';
                    document.getElementById(manualConfDivId).style.display = 'none';
                }
                
            }
            else if (this.value === manualConfRadioId)
            {
                if (this.checked)
                {
                    document.getElementById(confDivId).style.display = 'none';
                    showManualConfiguration(this.value, manualConfDivId, availableServicesTableId, installedServicesTableId);
                }
            }
        });
    }
    const radioButtons = document.querySelectorAll('input[name="' + confRadioName + '"]');
    for (const radioButton of radioButtons)
    {
        radioButton.addEventListener('change', function() {
            if (this.checked)
            {
                showNodeConfiguration(this.value, hiddenDivId, confServicesId);
            }
        });
    }
}

//Function for showing popup window for adding services in a node
function addNodeConfsPopUp(nodeRowIndex){
    const divId = "addNodeConfPopup" + nodeRowIndex;
    document.getElementById(divId).style.display = 'block';
}

function addNodeInfo(divId){
    document.getElementById(divId).style.display = 'none';
}

                             
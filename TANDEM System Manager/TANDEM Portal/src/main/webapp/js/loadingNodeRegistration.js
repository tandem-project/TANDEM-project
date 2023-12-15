const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const urlType = urlPrefixSysManGet + "nodetype";
const urlLocation = urlPrefixSysManGet + "location";
async function loadingNodeRegistration() {
   
    var params = new Array();
    params = getParams();
 
    //Add event to radio buttons
    const radioButtons1 = document.querySelectorAll('input[name="configurationtype"]');
    for (const radioButton of radioButtons1)
    {
        radioButton.addEventListener('change', function() {
            if (this.value === "autoconfig")
            {
                
                if (this.checked)
                {
                    document.getElementById("conftables").style.display = 'block';
                    document.getElementById("manualconftables").style.display = 'none';
                }
                
            }
            else
            {
                if (this.checked)
                {
                    document.getElementById("conftables").style.display = 'none';
                    showManualConfiguration(this.value, 'manualconftables', 'availableservicestable', 'installedservicestable', null);
                }
            }
        });
    }
    const radioButtons2 = document.querySelectorAll('input[name="configuration"]');
    for (const radioButton of radioButtons2)
    {
        radioButton.addEventListener('change', function() {
            if (this.checked)
            {
                showNodeConfiguration(this.value, 'confservicestables', 'confservicestable');
            }
        });
    }
 
    if (typeof params['cloudId'] !== 'undefined') {
        // cloudId is defined when we want to add a node to an existing cloud
        var cloudId = params['cloudId'];
        if ((cloudId !== null) && (cloudId !== ''))
        {
            // Get the cloud from backend
            var url = _BACKENDSERVER + "/infrastructurecatalogue/get/infrastructure/" + cloudId;
            CallPostUrl(url,"GET",null,[],"jsoninfocloudreg");
            resultfnct['jsoninfocloudreg'] = function (arg1) {
                // Get json info
                var cloudInfo = JSON.parse(arg1);
                
                // Fill the selection lists
                listClouds('nodecloudreg', cloudId);
                document.getElementById('nodecloudreg').style.color = 'black';
                document.getElementById('nodecloudreg').disabled = true;
                
                // Check if also the nodeId is defined
                if (typeof params['nodeId'] !== 'undefined') {
                    // nodeId is defined when we want to edit an existing node
                    var nodeId = params['nodeId'];
                    if ((nodeId !== null) && (nodeId !== ''))
                    {
                        var nodeInfo = '';
                        // Get the node 
                        for (var i = 0; i < cloudInfo.nodes.length; i++)
                        {
                            if (cloudInfo.nodes[i].nodeId === nodeId)
                            {
                                nodeInfo = cloudInfo.nodes[i];
                                break;
                            }
                        }
                        if (nodeInfo !== '')
                        {
                            // Fill fields we want to be pre-edited 
                            var name = document.getElementById('nodenamereg');                
                            name.value = nodeInfo.nodeName;
                         
                            var id = document.getElementById('nodeidreg');                
                            id.value = nodeInfo.nodeId;
                            id.contenteditable = false;
                            var password = document.getElementById('nodepswreg');
                            if (typeof nodeInfo.nodePassword !== 'undefined')
                            {
                                password.value = nodeInfo.nodePassword;
                                password.contenteditable = false;
                                
//                                console.log("psw = " + nodeInfo.nodePassword);
                            }
                            
                            // Fill location list
                            selectionList('nodelocationreg', urlLocation, nodeInfo.nodeLocation);
                            //  +++++++++++++ TO BE DONE: Fill the Type list ++++++++++++++
                            selectionList('nodetypereg',urlType, null);
                            // -----------------------------------------------------------
                            
                            // Fill the Addresses tables
                            var root = document.getElementById('nodeAddressTable').getElementsByTagName('tbody')[0];
                            var rows = root.getElementsByTagName('tr');
                
                            rows[0].cells[1].innerHTML = nodeInfo.nodeAddresses.nodeHostName;
                            rows[1].cells[1].innerHTML = nodeInfo.nodeAddresses.nodeExternalIP;
               
                            rows[2].cells[1].innerHTML = nodeInfo.nodeAddresses.nodeInternalIP;
               
                            // Fill the Node Configuration table (To Be Done)
                        }
                    }
                    
                }
                else 
                {
                    // Fill the selection lists
                
                    selectionList('nodelocationreg', urlLocation, null);
                    selectionList('nodetypereg',urlType, null);
                }
            };
            
        
            
          
        }
        else 
        {
            // Fill the selection lists
            listClouds('nodecloudreg', null);
            selectionList('nodelocationreg', urlLocation, null);
            selectionList('nodetypereg',urlType, null);
        }
    }
    
    else
    {
        // Fill the selection lists
        listClouds('nodecloudreg', null);
        selectionList('nodelocationreg', urlLocation, null);
        selectionList('nodetypereg',urlType, null);
    }
}
var urlPrefixDevice = _BACKENDSERVER+"/devicecatalogue/get/devices/";
const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const urlType = urlPrefixSysManGet + "devicetype";

async function loadingDeviceRegistration() {
   
    var params = new Array();
    
    
   
    params = getParams();

    if (typeof params['deviceId'] !== 'undefined') {
        // deviceId is defined when we want to edit an existing device
        var devId = params['deviceId'];
        if ((devId !== null) && (devId !== ''))
        {
//            console.log("About to fill the fields");
            
            // Get the device from backend
            var url = urlPrefixDevice + devId;
            CallPostUrl(url,"GET",null,[],"jsoninfodevedit");
            resultfnct['errjsoninfodevedit'] = function (arg1) { 
                alert(arg1);
            };
            // Get json info
            resultfnct['jsoninfodevedit'] = async function (arg1) { 
                var devInfo = JSON.parse(arg1);
                
                if (devInfo !== null)
                {
                    // Fill fields we want to be pre-edited
                    var name = document.getElementById('devicenamereg');
                    name.value = devInfo.name;
                    var id = document.getElementById('deviceidreg');
                    id.value = devInfo.id;
                    document.getElementById("deviceidreg").disabled = true;
                    
                    var description = document.getElementById('devicedescriptionreg');                
                    description.value = devInfo.description;

                    var labels = document.getElementById('devicelabelsreg');
                    for (var i = 0; i < devInfo.labels.length; i++)
                    {
                        if (i < devInfo.labels.length - 1)
                        {
                            labels.value = labels.value + devInfo.labels[i] + ', ';
                        }
                        else
                        {
                            labels.value = labels.value + devInfo.labels[i];
                        }
                    }
                    var adminState = document.getElementById('deviceadminstate');    
                    adminState.value = devInfo.adminState;
                    var opState = document.getElementById('deviceoperatingstate');
                    opState.value = devInfo.operatingState;
                    var ip = document.getElementById('deviceipreg');
                    ip.value = devInfo.ip;
                    var port = document.getElementById('deviceportreg');
                    port.value = devInfo.port;
//                    var type = document.getElementById('devicetypereg');
//                    type.value = devInfo.type;
                    
                    // Fill Type selection list
                    selectionList('devicetypereg',urlType, devInfo.type);
                    
                    // Fill Nodes table 
                    await showNodes('devicenodestable', 'nodestable');
                    document.getElementById(devInfo.deviceNode).checked = true;
                }
            };
        }
    }
    else
    {
        // Fill Type selection list
        selectionList('devicetypereg',urlType, null);
        // Fill Nodes table 
        await showNodes('devicenodestable', 'nodestable');
    }
}

async function loadingEdgecloudRegistration() {
   
    var params = new Array();    
    var urlPrefixInfraCat = _BACKENDSERVER+"/infrastructurecatalogue/get/infrastructure/";
    var urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
    var urlZone = urlPrefixSysManGet + "availabilityzone";
    var urlProvider = urlPrefixSysManGet + "provider";
    
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
                    showManualConfiguration(this.value, 'manualconftables', 'availableservicestable', 'installedservicestable');
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
//                console.log("this.checked = " + this.checked);
                showNodeConfiguration(this.value, 'confservicestables', 'confservicestable');
            }
        });
    }
    
    params = getParams();
    

    if (typeof params['infraId'] !== 'undefined') {
        // Serid is defined when we want to edit a service
        var infraId = params['infraId'];
        if ((infraId !== null) && (infraId !== ''))
        {
            
            // Get the edge cloud infrastructure from backend
            var url = urlPrefixInfraCat + infraId;
            CallPostUrl(url,"GET",null,[],"jsoninfoinfraedit");
            resultfnct['errjsoninfoinfraedit'] = function (arg1) { 
                alert(arg1);
            };
            // Get json info
            resultfnct['jsoninfoinfraedit'] = function (arg1) { 
                var infrastructureInfo = JSON.parse(arg1);
                
                // Fill fields we want to be pre-edited
                var name = document.getElementById('infranamereg');
                name.value = infrastructureInfo.edgeCloudName;
                var id = document.getElementById('infraidreg');
                id.value = infrastructureInfo.edgeCloudId;
//                id.contenteditable = false;
//                document.getElementById('infraidreg').readonly = true;
                document.getElementById("infraidreg").disabled = true;
                var ip = document.getElementById('infraipreg');
                ip.value = infrastructureInfo.piEdgeIP;
                var port = document.getElementById('infraportreg');                
                port.value = infrastructureInfo.piEdgePort;

                // Fill the Nodes table
               
                addNodeRow('nodestable', infrastructureInfo.nodes);
               
                
                // Fill the selection lists
                selectionList('infrazonereg', urlZone, infrastructureInfo.edgeCloudAvailabilityZone);
                selectionList('infraproviderreg', urlProvider, infrastructureInfo.edgeCloudProvider);
                //+++ To be modified in order to have the existing services preselected +++
//                listServices('infraservicereg', null, null, false);
            };
            
        }
        else 
        {
            // Fill the selection lists
            selectionList('infrazonereg', urlZone, null);
            selectionList('infraproviderreg', urlProvider, null);

            // Fill tables
            addNodeRow('nodestable', null);
        }
    }
    else
    {
        // Fill the selection lists
        selectionList('infrazonereg', urlZone, null);
        selectionList('infraproviderreg', urlProvider, null);

        // Fill tables
        addNodeRow('nodestable', null);
    }
}

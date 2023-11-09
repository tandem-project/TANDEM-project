
async function loadingServiceRegistration() {
   
    var params = new Array();
   
    var urlPrefixSerCat = _BACKENDSERVER+"/servicecatalogue/get/services/";
    var urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
    var urlState = urlPrefixSysManGet + "servicestate";
    var urlCategory = urlPrefixSysManGet + "servicecategory";
    var urlType = urlPrefixSysManGet + "servicetype";
    var urlProvider = urlPrefixSysManGet + "provider";
   
//    var defaultConfParam = [{serParamName:'Smtp_server', serParamType:'string', serParamTypicalValue:'smtp.tandem.com:587', serParamDescr:'E-mail server address'}];
//    var defaultSerOperationInputParams = [{serParamName:'Sender_email', serParamType:'string', serParamTypicalValue:'TANDEM-notifications@intracom-telecom.com', serParamDescr:'E-mail address of the sender'},
//                                          {serParamName:'Receiver_email', serParamType:'string', serParamTypicalValue:'TANDEM-administrator@intracom-telecom.com', serParamDescr:'E-mail address of the receipient'}];
//    var defaultSerOperationOutputParams = [{serParamName:'Sending result', serParamType:'string', serParamTypicalValue:'201', serParamDescription:'E-mail sending result, success or failure codes'}];
//    var defaultOpParam = {serOperationName:'SendNotification', serOperationEndPoint:'/ICOM/NotificationSer', serOperationDescription:'Send Notifications', serOperationType:'Synchronous', serOperationInputParams:defaultSerOperationInputParams, serOperationOutputParams: defaultSerOperationOutputParams};
    params = getParams();
//    console.log(params);
    if (typeof params['serId'] !== 'undefined') {
        // Serid is defined when we want to edit a service
        var serId = params['serId'];
        if ((serId !== null) && (serId !== ''))
        {
//            console.log("About to fill the fields");
            
            // Get the service from backend
            console.log("serId = " + serId);
            var url = urlPrefixSerCat + serId;
            console.log("Get service url = " + url);
            CallPostUrl(url,"GET",null,[],"jsoninfosrvedit");
            resultfnct['errjsoninfosrvedit'] = function (arg1) { 
                alert(arg1);
            };
            // Get json info
            resultfnct['jsoninfosrvedit'] = async function (arg1) { 
                var serviceInfo = JSON.parse(arg1);
//                console.log(serviceInfo);
                
                // Fill fields we want to be pre-edited
                var name = document.getElementById('servicenamereg');
                name.value = serviceInfo.serName;
                var id = document.getElementById('serviceidreg');
                id.value = serviceInfo.serId;
                id.contenteditable = false;
                document.getElementById('serviceidreg').readonly = true;

                var version = document.getElementById('serviceversionreg');
                version.value = serviceInfo.serVersion;
                var description = document.getElementById('servicedescriptionreg');                
                description.value = serviceInfo.serDescription;

                // Fill the tables
                // APIs & URLs
                var root = document.getElementById('urlstable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
//                console.log("Rows length: " + rows.length);
//                console.log("URLs Rows length: " + serviceInfo.serAPIDescriptionURL.length);
//                console.log("#3");

                for (var i = 0; i < serviceInfo.serAPIDescriptionURL.length; i++)
                {
                    addUrlRow('urlstable', serviceInfo.serAPIDescriptionURL[i]);
                    console.log("New URL: " + serviceInfo.serAPIDescriptionURL[i]);
                }
                
                // Configuration Parameters
                addConfParamRow('configparamstable', serviceInfo.serConfigParams);
                
                // Operations
                for (var i = 0; i < serviceInfo.serOperations.length; i++)
                {
                    addOperationRow('operationstable', serviceInfo.serOperations[i]);
                }
                
                
                // Computational & Storage Requirements
                var root = document.getElementById('serComputeReqTable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
                
                rows[0].cells[1].innerHTML = serviceInfo.serComputeReq.serMemorySize;
                rows[0].cells[2].innerHTML = serviceInfo.serComputeReq.serMemorySizeMU;
                rows[1].cells[1].innerHTML = serviceInfo.serComputeReq.serNumVirtualCPUs;
                rows[1].cells[2].innerHTML = serviceInfo.serComputeReq.serNumVirtualCPUsMU;
                rows[2].cells[1].innerHTML = serviceInfo.serComputeReq.serNumVirtualGPUs;
                rows[2].cells[2].innerHTML = serviceInfo.serComputeReq.serNumVirtualCPUsMU;
                rows[3].cells[1].innerHTML = serviceInfo.serStorageReq.serSizeOfStorage;
                rows[3].cells[2].innerHTML = serviceInfo.serStorageReq.serSizeOfStorageMU;
                
                // Communication Requirements
                var root = document.getElementById('serCommunicationReqTable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
                
                rows[0].cells[1].innerHTML = serviceInfo.serLatencyReq.serLatencyValue;
                rows[0].cells[2].innerHTML = serviceInfo.serLatencyReq.serLatencyTimeUnit;
                rows[1].cells[1].innerHTML = serviceInfo.serThroughputReq.serThroughputValue;
                rows[1].cells[2].innerHTML = serviceInfo.serThroughputReq.serThroughputMU;
                
                // Required Services
                if (serviceInfo.serServiceReq.length === 0)
                {
                    //Fill the selection list
                    await listServices('reqservicename1', null, 'reqservicedescr1', true);
                    await setServiceDescriptionEvent('reqservicename1', 'reqservicedescr1', urlPrefixSerCat);
                }
                else
                {
                    for (var i = 0; i < serviceInfo.serServiceReq.length; i++)
                    {
                        if (i === 0)
                        {
                            await listServices('reqservicename1', serviceInfo.serServiceReq[i].serServiceId, 'reqservicedescr1', true, null);
                            await setServiceDescriptionEvent('reqservicename1', 'reqservicedescr1', urlPrefixSerCat);
                        }   
                        else
                        {
                            // add new row in table
                            //console.log("Calling addNewServiceRow()");
                            addNewServiceRow('reqservicestable', 'reqservice', serviceInfo.serServiceReq[i].serServiceId, null);
                    
                        }
                    }
                }
                // Optional Services
                if (serviceInfo.serServiceOptional.length === 0)
                {
                    //Fill the selection list
                    await listServices('optservicename1', null, 'optservicedescr1', true);
                    await setServiceDescriptionEvent('optservicename1', 'optservicedescr1', urlPrefixSerCat);
                }
                else
                {
                    for (var i = 0; i < serviceInfo.serServiceOptional.length; i++)
                    {
                        if (i === 0)
                        {
                            await listServices('optservicename1', serviceInfo.serServiceOptional[i].serServiceId, 'optservicedescr1', true, null);
                            await setServiceDescriptionEvent('optservicename1', 'optservicedescr1', urlPrefixSerCat);
                        }   
                        else
                        {
                            addNewServiceRow('optservicestable', 'optservice', serviceInfo.serServiceOptional[i].serServiceId, serviceInfo.serServiceOptional[i].serServiceId);
                        }
                    }
                }
                // Software Image Parameters
                var root = document.getElementById('swImageParamsTable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
                
                rows[0].cells[1].innerHTML = serviceInfo.serSwImage.serSWImageName;
                
                rows[1].cells[1].innerHTML = serviceInfo.serSwImage.serSWImageContainerFormat;
               
                rows[2].cells[1].innerHTML = serviceInfo.serSwImage.serSWImageSizeinMBs;
                rows[3].cells[1].innerHTML = serviceInfo.serSwImage.serSWImageOS;
                rows[4].cells[1].innerHTML = '';
                rows[5].cells[1].innerHTML = serviceInfo.serSwImage.serSWImageURL;
                
                //Last input parameters
                var consumedLocal = document.getElementById('consumedlocal');
                if (serviceInfo.consumedLocalOnly === true)
                {
                    consumedLocal.value = 'Yes';
                        
                }
                else if (serviceInfo.consumedLocalOnly === false)
                {
                    consumedLocal.value = 'No';
                }
                else
                {
                    consumedLocal.value = 'Select';
                }
                var isLocal = document.getElementById('islocal');
                if (serviceInfo.isLocal === true)
                {
                    isLocal.value = 'Yes';
                        
                }
                else if (serviceInfo.isLocal === false)
                {
                    isLocal.value = 'No';
                }
                else
                {
                    isLocal.value = 'Select';
                }
                var localityScope = document.getElementById('scopeoflocality');
                
                localityScope.value = serviceInfo.scopeOfLocality;
                
                // Fill the selection lists
                selectionList('servicecategoryreg', urlCategory, serviceInfo.serCategory.name);
                selectionList('servicetypereg', urlType, serviceInfo.serType);
                selectionList('serviceproviderreg', urlProvider, serviceInfo.serProvider);
                selectionList('servicestatereg', urlState, serviceInfo.state);
            };
            
        }
        else 
        {
            // Fill the selection lists
            selectionList('servicecategoryreg', urlCategory, null);
            selectionList('servicetypereg', urlType, null);
            selectionList('serviceproviderreg', urlProvider, null);
            selectionList('servicestatereg', urlState, null);
            
            // Fill tables
            addNewServiceRow('reqservicestable', 'reqservice', null, null);
            addNewServiceRow('optservicestable', 'optservice', null, null);
        }
    }
    else
    {
        // Fill the selection lists
        selectionList('servicecategoryreg', urlCategory, null);
        selectionList('servicetypereg', urlType, null);
        selectionList('serviceproviderreg', urlProvider, null);
        selectionList('servicestatereg', urlState, null);

        
        // Fill tables
        await listServices('reqservicename1', null, 'reqservicedescr1', true, null);
        await setServiceDescriptionEvent('reqservicename1', 'reqservicedescr1', urlPrefixSerCat);
        await listServices('optservicename1', null, 'optservicedescr1', true, null);
        await setServiceDescriptionEvent('optservicename1', 'optservicedescr1', urlPrefixSerCat);
    }
}

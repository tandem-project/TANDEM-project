
async function loadingServiceRegistration() {
   
    var params = new Array();
    
    params = getParams();
    console.log(params);
    if (typeof params['serId'] !== 'undefined') {
        // Serid is defined when we want to edit a service
        var serId = params['serId'];
        if ((serId !== null) && (serId !== ''))
        {
            console.log("About to fill the fields");
            // Get the service from backend
            /////////////////
            var url = _BACKENDSERVER+"/servicecatalogue/get/services/" + serId;
            CallPostUrl(url,"GET",null,[],"jsoninfosrvedit");
            resultfnct['errjsoninfosrvedit'] = function (arg1) { 
                alert(arg1);
            };
            // Get json info
            resultfnct['jsoninfosrvedit'] = function (arg1) { 
                var serviceInfo = JSON.parse(arg1);
                console.log(serviceInfo);
                
                // Fill fields we want to be pre-edited
                var name = document.getElementById('servicenamereg');
                name.value = serviceInfo.serName;
                var id = document.getElementById('serviceidreg');
                id.value = serviceInfo.serId;
                id.contenteditable = false;
                document.getElementById('serviceidreg').readonly = true;
//                var category = document.getElementById('servicecategoryreg');
//                console.log("Service category: " + serviceInfo.serCategory.name);
//
//                category.value = serviceInfo.serCategory.name;
//                selectionList('servicecategoryreg', './data/categories.json', serviceInfo.serCategory.name);

//                var type = document.getElementById('servicetypereg');
//                for (i = 0; i < type.length; i++)
//                {
//                    if (type.options[i].value === serviceInfo.serType)
//                    {
//                        type.value = serviceInfo.serType;
//                        break;
//                    }
//                }
                var version = document.getElementById('serviceversionreg');
                version.value = serviceInfo.serVersion;
//                var provider = document.getElementById('serviceproviderreg');
//                for (i = 0; i < provider.length; i++)
//                {
//                    if (provider.options[i].value === serviceInfo.serProvider)
//                    {
//                        provider.value = serviceInfo.serProvider;
//                        break;
//                    }
//                }
                var description = document.getElementById('servicedescriptionreg');
                
                description.value = serviceInfo.serDescription;
                
                
//                var state = document.getElementById('servicestatereg');
//                for (i = 0; i < state.length; i++)
//                {
//                    if (state.options[i].value === serviceInfo.state)
//                    {
//                        state.value = serviceInfo.state;
//                        
//                        break;
//                    }
//                }
                
                // Fill the tables
                // APIs & URLs
                var root = document.getElementById('urlstable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
                var rowIndex = 0;
                console.log("Rows length: " + rows.length);
                if (serviceInfo.serAPIDescriptionURL.length < 2)
                {
                    rows[1].cells[0].innerHTML = '';
                    if (serviceInfo.serAPIDescriptionURL.length < 1)
                    {
                        rows[0].cells[0].innerHTML = '';
                    }
                }
                for (var i = 0; i < serviceInfo.serAPIDescriptionURL.length; i++)
                {
                    if (i > 1)
                    {
                        console.log("About to clone last row");
                        var clone = cloneEl(rows[rows.length - 1]);
                        root.appendChild(clone);
                        
                    }
                    rows[rowIndex].cells[0].innerHTML = serviceInfo.serAPIDescriptionURL[i];
                    console.log("New URL: " + serviceInfo.serAPIDescriptionURL[i]);
                    rowIndex++;
                }
                // Configuration Parameters
                var root = document.getElementById('configparamstable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
                var rowIndex = 0;
                console.log("Rows length: " + rows.length);
                if (serviceInfo.serConfigParams.length < 1)
                {
                    for (var i = 0; i < rows[0].length; i++)
                    {
                        rows[0].cells[i].innerHTML = '';
                    }
                    
                }
                for (var i = 0; i < serviceInfo.serConfigParams.length; i++)
                {
                    if (i > 0)
                    {
                        console.log("About to clone last row");
                        var clone = cloneEl(rows[rows.length - 1]);
                        root.appendChild(clone);
                        
                    }
                    rows[rowIndex].cells[0].innerHTML = serviceInfo.serConfigParams[i].serParamName;
                    rows[rowIndex].cells[1].innerHTML = serviceInfo.serConfigParams[i].serParamType;
                    rows[rowIndex].cells[2].innerHTML = serviceInfo.serConfigParams[i].serParamTypicalValue;
                    rows[rowIndex].cells[3].innerHTML = serviceInfo.serConfigParams[i].serParamDescr;
                    console.log("New parameter: " + serviceInfo.serConfigParams[i]);
                    rowIndex++;
                }
                // Operations
                var root = document.getElementById('operationstable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
                var rowIndex = 0;
                console.log("Rows length: " + rows.length);
                if (serviceInfo.serOperations.length < 1)
                {
                    for (var i = 0; i < rows[0].length; i++)
                    {
                        rows[0].cells[i].innerHTML = '';
                    }
                    
                }
                for (var i = 0; i < serviceInfo.serOperations.length; i++)
                {
                    if (i > 0)
                    {
                        console.log("About to clone last row");
                        var clone = cloneEl(rows[rows.length - 1]);
                        root.appendChild(clone);
                        
                    }
                    rows[rowIndex].cells[0].innerHTML = serviceInfo.serOperations[i].serOperationName;
                    rows[rowIndex].cells[1].innerHTML = serviceInfo.serOperations[i].serOperationDescription;
                    rows[rowIndex].cells[2].innerHTML = serviceInfo.serOperations[i].serOperationType;
                    rows[rowIndex].cells[3].innerHTML = serviceInfo.serOperations[i].serOperationEndPoint;
                    console.log("New parameter: " + serviceInfo.serOperations[i]);
                    // Operation Parameters
                    // Input Parameters
                    var rootInput = document.getElementById('addinputparamstable').getElementsByTagName('tbody')[0];
                    var rowsInput = rootInput.getElementsByTagName('tr');
                    var rowIndexInput = 0;
                    console.log("Rows length: " + rowsInput.length);
                    if (serviceInfo.serOperations[i].serOperationInputParams.length < 2)
                    {
                        for (var iInput = 0; iInput < rowsInput[1].length; iInput++)
                        {
                            rowsInput[1].cells[iInput].innerHTML = '';
                        }
                        if (serviceInfo.serOperations[i].serOperationInputParams.length < 1)
                        {
                            for (var iInput = 0; iInput < rowsInput[0].length; iInput++)
                            {
                                rowsInput[0].cells[iInput].innerHTML = '';
                            }
                        
                        }
                    }
                    console.log("Input params length: " + serviceInfo.serOperations[i].serOperationInputParams.length);
                    for (var iInput = 0; iInput < serviceInfo.serOperations[i].serOperationInputParams.length; iInput++)
                    {
                        if (iInput > 1)
                        {
                            console.log("About to clone last row");
                            var cloneInput = cloneEl(rowsInput[rowsInput.length - 1]);
                            rootInput.appendChild(cloneInput);
                        
                        }
                        console.log("1: " +  rowsInput[rowIndexInput].cells[0].innerHTML);
                        console.log("2: " + serviceInfo.serOperations[i].serOperationInputParams[iInput].serParamName);
                        rowsInput[rowIndexInput].cells[0].innerHTML = serviceInfo.serOperations[i].serOperationInputParams[iInput].serParamName;
                        rowsInput[rowIndexInput].cells[1].innerHTML = serviceInfo.serOperations[i].serOperationInputParams[iInput].serParamType;
                        rowsInput[rowIndexInput].cells[2].innerHTML = serviceInfo.serOperations[i].serOperationInputParams[iInput].serParamTypicalValue;
                        rowsInput[rowIndexInput].cells[3].innerHTML = serviceInfo.serOperations[i].serOperationInputParams[iInput].serParamDescr;
                        console.log("New parameter: " + serviceInfo.serOperations[i].serOperationInputParams[iInput]);
                        rowIndexInput++;
                    }
                    // Output Parameters
                    var rootOutput = document.getElementById('addoutputparamstable').getElementsByTagName('tbody')[0];
                    var rowsOutput = rootOutput.getElementsByTagName('tr');
                    var rowIndexOutput = 0;
                    console.log("Rows length: " + rowsOutput.length);
                    if (serviceInfo.serOperations[i].serOperationOutputParams.length < 1)
                    {
                        
                        for (var iOutput = 0; iOutput < rowsOutput[0].length; iOutput++)
                        {
                            rowsOutput[0].cells[iOutput].innerHTML = '';
                        }
                       
                    }
                    for (var iOutput = 0; iOutput < serviceInfo.serOperations[i].serOperationOutputParams.length; iOutput++)
                    {
                        if (iOutput > 0)
                        {
                            console.log("About to clone last row");
                            var cloneOutput = cloneEl(rowsOutput[rowsOutput.length - 1]);
                            rootOutput.appendChild(cloneOutput);
                        
                        }
                        rowsOutput[rowIndexOutput].cells[0].innerHTML = serviceInfo.serOperations[i].serOperationOutputParams[iOutput].serParamName;
                        rowsOutput[rowIndexOutput].cells[1].innerHTML = serviceInfo.serOperations[i].serOperationOutputParams[iOutput].serParamType;
                        rowsOutput[rowIndexOutput].cells[2].innerHTML = serviceInfo.serOperations[i].serOperationOutputParams[iOutput].serParamTypicalValue;
                        rowsOutput[rowIndexOutput].cells[3].innerHTML = serviceInfo.serOperations[i].serOperationOutputParams[iOutput].serParamDescr;
                        console.log("New parameter: " + serviceInfo.serOperations[i].serOperationOutputParams[iOutput]);
                        rowIndexOutput++;
                    }
                    rowIndex++;
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
                var root = document.getElementById('reqservicestable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
                var rowIndex = 0;
                console.log("Rows length: " + rows.length);
                if (serviceInfo.serServiceReq.length < 1)
                {
                    for (var i = 0; i < rows[0].length; i++)
                    {
                        rows[0].cells[i].innerHTML = '';
                    }
                    
                }
                for (var i = 0; i < serviceInfo.serServiceReq.length; i++)
                {
                    if (i > 0)
                    {
                        console.log("About to clone last row");
                        var clone = cloneEl(rows[rows.length - 1]);
                        root.appendChild(clone);
                        
                    }
                    //var reqServId = serviceInfo.serServiceReq[i].serServiceId;
                    rows[rowIndex].cells[0].innerHTML = serviceInfo.serServiceReq[i].serServiceId;
                    rows[rowIndex].cells[1].innerHTML = serviceInfo.serServiceReq[i].serServiceId;
                    
                    rowIndex++;
                }
                
                // Optional Services
                var root = document.getElementById('optservicestable').getElementsByTagName('tbody')[0];
                var rows = root.getElementsByTagName('tr');
                var rowIndex = 0;
              
                if (serviceInfo.serServiceOptional.length < 1)
                {
                    for (var i = 0; i < rows[0].length; i++)
                    {
                        rows[0].cells[i].innerHTML = '';
                    }
                    
                }
                for (var i = 0; i < serviceInfo.serServiceOptional.length; i++)
                {
                    if (i > 0)
                    {
                        console.log("About to clone last row");
                        var clone = cloneEl(rows[rows.length - 1]);
                        root.appendChild(clone);
                        
                    }
                    //var reqServId = serviceInfo.serServiceReq[i].serServiceId;
                    rows[rowIndex].cells[0].innerHTML = serviceInfo.serServiceOptional[i].serServiceId;
                    rows[rowIndex].cells[1].innerHTML = serviceInfo.serServiceOptional[i].serServiceId;
                    
                    rowIndex++;
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
                selectionList('servicecategoryreg', './data/categories.json', serviceInfo.serCategory.name);
                selectionList('servicetypereg','./data/types.json', serviceInfo.serType);
                selectionList('serviceproviderreg', './data/providers.json', serviceInfo.serProvider);
                selectionList('servicestatereg', './data/serviceStatus.json', serviceInfo.state);
            };
            
        }
        else 
        {
            // Fill the selection lists
            selectionList('servicecategoryreg', './data/categories.json', null);
            selectionList('servicetypereg','./data/types.json', null);
            selectionList('serviceproviderreg', './data/providers.json', null);
            selectionList('servicestatereg', './data/serviceStatus.json', null);

        }
    }
    else
    {
        // Fill the selection lists
        selectionList('servicecategoryreg', './data/categories.json', null);
        selectionList('servicetypereg','./data/types.json', null);
        selectionList('serviceproviderreg', './data/providers.json', null);
        selectionList('servicestatereg', './data/serviceStatus.json', null);
    }
}

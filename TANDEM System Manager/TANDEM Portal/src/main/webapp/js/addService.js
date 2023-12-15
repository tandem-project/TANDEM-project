
async function submitServiceRegistration(event) {
  
    var id, name, type, provider, description, categoryName, version, state;
    
    // Check if all required fields are completed
    var isoktoadd = true;
    var errorlist = new Array();
    if (document.getElementById("serviceidreg").value===""){
        isoktoadd = false;
        errorlist.push("service id");
    }
    if (document.getElementById("servicenamereg").value===""){
        isoktoadd = false;
        errorlist.push("service name");
    }
    if (document.getElementById("servicecategoryreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("service category");
    }
    if (document.getElementById("servicetypereg").value==="Select"){
        isoktoadd = false;
        errorlist.push("service type");
    }
    if (document.getElementById("serviceproviderreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("service provider");
    }
 
    if (document.getElementById("servicestatereg").value==="Select"){
        isoktoadd = false;
        errorlist.push("service state");
    }
    if (document.getElementById("consumedlocal").value==="Select"){
        isoktoadd = false;
        errorlist.push("consumed local");
    }
    if (document.getElementById("islocal").value==="Select"){
        isoktoadd = false;
        errorlist.push("is local");
    }
    
        
    // Get ports for service/application
    var ports = [];
    
    var portsString = document.getElementById("ports").value;
    if (portsString !== "")
    {
        //Get the various ports that are sperated by commas (,)
        ports = portsString.split(/[.,!,?,;]/);
        for (var i = 0; i < ports.length; i++)
        {
            if (isNaN(ports[i]))
            {
                dispmess('ERROR', "The Service ports should contain only numbers");
                return;
            }
            ports[i] = parseInt(ports[i]);
        }
    }
//    console.log("port length = " + ports.length);
    
    if (!isoktoadd){
        var message = "The next fields are empty:";
        for (i = 0; i < errorlist.length; i++)
        {
            
            if (i === errorlist.length - 1)
            {
                message = message + " " + errorlist[i];
            }
            else
            {
                message = message + " " + errorlist[i] + ",";
            }
        }
        dispmess('ERROR',message);
        return;
    }
    
    // Get service data
    id = document.getElementById("serviceidreg").value;
    name = document.getElementById("servicenamereg").value;
   
    type = document.getElementById("servicetypereg").value;
    if (type === "Select")
    {
        type = '';
    }
    provider = document.getElementById("serviceproviderreg").value;
    if (provider === "Select")
    {
        provider = '';
    }
    description = document.getElementById("servicedescriptionreg").value;
    categoryName = document.getElementById("servicecategoryreg").value;
    if (categoryName === "Select")
    {
        categoryName = '';
    }
    var category = {href:'', id:'', name:categoryName, version:''};
    version = document.getElementById("serviceversionreg").value;
    state = document.getElementById("servicestatereg").value;
    if (state === "Select")
    {
        state = '';
    }
    
    //Get Service Description & APIs URLs

    var urls = new Array();
    
    var tableUrls = document.getElementById("urlstable");
    var tr = tableUrls.getElementsByTagName("tr");
    for (i = 2 ; i < tr.length ; i++)
    {
        url = tableUrls.rows[i].cells[0].innerHTML;
        urls[i-2] = url;
    }
   
    // Get Configuration Parameters
    var tableConfParams = document.getElementById("configparamstable");
    var tr = tableConfParams.getElementsByTagName("tr");
   
    const confParams = [];

    var globalConfParamIndex = 0;
    for (i = 2; i < tr.length; i++) {
        var confParam = {serParamName:'', serParamType:'', serParamValue:'', serParamDescr:'', serParamTypicalValue:''};
        
        confParam.serParamName = tableConfParams.rows[i].cells[0].innerHTML;
      
        var td_serParamType = document.getElementsByName('configurationType')[globalConfParamIndex];
        globalConfParamIndex++;
        confParam.serParamType = td_serParamType.value;

        confParam.serParamTypicalValue = tableConfParams.rows[i].cells[2].innerHTML;
        confParam.serParamDescr = tableConfParams.rows[i].cells[3].innerHTML;
        var j = i - 2;
        
        confParams.push(confParam);
        
    }

    // Get Operations
    var operations = new Array();
    var tableOperations = document.getElementById("operationstable");
    tr = tableOperations.getElementsByTagName("tr");
    for (i = 2; i < tr.length; i++) {
        var operation = {serOperationName:'', serOperationEndPoint:'', serOperationDescription:'', serOperationType:'', serOperationInputParams:'', serOperationOutputParams: ''};
    
        operation.serOperationName = tableOperations.rows[i].cells[0].innerHTML;
        operation.serOperationEndPoint = tableOperations.rows[i].cells[3].innerHTML;
        operation.serOperationDescription = tableOperations.rows[i].cells[1].innerHTML;
        
        var td_serParamType = document.getElementsByName('operationType')[i-2];
        
        operation.serOperationType = td_serParamType.value;
        // Get input parameters
        var opInputParams = new Array();
        var inputParamTableId = tableOperations.rows[i].cells[5].innerHTML;
        //console.log("inputParamTableId = " + inputParamTableId);
        var tableInputParams = document.getElementById(inputParamTableId);
        //console.log("tableInputParams = " + tableInputParams);
        var trInput = tableInputParams.getElementsByTagName("tr");
       
        for (j = 2; j < trInput.length; j++) {
            var opInputParam = {serParamName:'', serParamType:'', serParamValue:'', serParamDescr:'', serParamTypicalValue:''};
            //console.log("j = " + j);
            opInputParam.serParamName = tableInputParams.rows[j].cells[0].innerHTML;      
           
            var td_serParamType = document.getElementsByName('configurationType')[globalConfParamIndex];
            globalConfParamIndex++;
            opInputParam.serParamType = td_serParamType.value;
            opInputParam.serParamTypicalValue = tableInputParams.rows[j].cells[2].innerHTML;
            opInputParam.serParamDescr = tableInputParams.rows[j].cells[3].innerHTML;
            //console.log("Operation Input Parameters #" + j + ": " + opInputParam.serParamName);
            
            opInputParams[j-2] = opInputParam; // *** Here, the value of opInputParams[j-2] is assigned also to opInputParams[j-3]!!!!
            k = j - 2;
            console.log("Operation Input Parameters #" + k + ": " + opInputParams[j-2].serParamName);
            
            console.log("##6");

        }

        operation.serOperationInputParams = opInputParams;
        // Get output parameters
        
        var opOutputParams = new Array();
        var outputParamTableId = tableOperations.rows[i].cells[6].innerHTML;
        var tableOutputParams = document.getElementById(outputParamTableId);
//        console.log("tableOutputParams = " + tableOutputParams);
        var trOutput = tableOutputParams.getElementsByTagName("tr");
        for (j = 2; j < trOutput.length; j++) {
            var opOutputParam = {serParamName:'', serParamType:'', serParamValue:'', serParamDescr:'', serParamTypicalValue:''};
            opOutputParam.serParamName = tableOutputParams.rows[j].cells[0].innerHTML;  
            //opOutputParam.serParamType = tableOutputParams.rows[j].cells[1].innerHTML;
            var td_serParamType = document.getElementsByName('configurationType')[globalConfParamIndex];
            globalConfParamIndex++;
            opOutputParam.serParamType = td_serParamType.value;
            opOutputParam.serParamTypicalValue = tableOutputParams.rows[j].cells[2].innerHTML;
            opOutputParam.serParamDescr = tableOutputParams.rows[j].cells[3].innerHTML;
            
            opOutputParams[j-2] = opOutputParam;
        }
        operation.serOperationOutputParams = opOutputParams;
        
        operations[i-2] = operation;
    }
    for (i = 0 ; i < operations.length ; i++) {
        console.log("Operation #" + i + ": " + operations[i].serOperationName + ", " + operations[i].serOperationEndPoint + ", " + operations[i].serOperationDescription + ", " + operations[i].serOperationType);
        for (j = 0 ; j < operations[i].serOperationInputParams.length ; j++) {
            console.log("Operation Input Parameters #" + j + ": " + operations[i].serOperationInputParams[j].serParamName + ", " + operations[i].serOperationInputParams[j].serParamType + ", " + operations[i].serOperationInputParams[j].serParamValue + ", " + operations[i].serOperationInputParams[j].serParamDescr);
        }
        for (j = 0 ; j < operations[i].serOperationOutputParams.length ; j++) {
            console.log("Operation Output Parameters #" + j + ": " + operations[i].serOperationOutputParams[j].serParamName + ", " + operations[i].serOperationOutputParams[j].serParamType + ", " + operations[i].serOperationOutputParams[j].serParamValue + ", " + operations[i].serOperationOutputParams[j].serParamDescr);
        }
    }
    
    // Get Computational & Storage Requirements
    computeReq = {serMemorySize:'', serMemorySizeMU:'', serCPUArchitecture:'', serNumVirtualCPUs:'', serVirtualCPUClock:'', serNumVirtualCPUsMU:'', serNumVirtualGPUs:''};
    storageReq = {serTypeOfStorage:'', serSizeOfStorage:'', serSizeOfStorageMU:''};
    
    var computeReqs = document.getElementById("serComputeReqTable");
    var tr = computeReqs.getElementsByTagName("tr");
    
    computeReq.serMemorySize = computeReqs.rows[2].cells[1].innerHTML;
    computeReq.serMemorySizeMU = computeReqs.rows[2].cells[2].innerHTML;
    computeReq.serNumVirtualCPUs = computeReqs.rows[3].cells[1].innerHTML;
    computeReq.serNumVirtualCPUsMU = computeReqs.rows[3].cells[2].innerHTML;
    computeReq.serNumVirtualGPUs = computeReqs.rows[4].cells[1].innerHTML;
    storageReq.serSizeOfStorage = computeReqs.rows[5].cells[1].innerHTML;
    storageReq.serSizeOfStorageMU = computeReqs.rows[5].cells[2].innerHTML;
    
    // Get Communication Requirements
    latencyReq = {serLatencyTimeUnit:'', serLatencyValue:''};
    throughputReq = {serThroughputMU:'', serThroughputValue:''};
    
    var comunicationReqs = document.getElementById("serCommunicationReqTable");
    var tr = comunicationReqs.getElementsByTagName("tr");
    
    latencyReq.serLatencyTimeUnit = comunicationReqs.rows[2].cells[2].innerHTML;
    latencyReq.serLatencyValue = comunicationReqs.rows[2].cells[1].innerHTML;
    throughputReq.serThroughputMU = comunicationReqs.rows[3].cells[2].innerHTML;
    throughputReq.serThroughputValue = comunicationReqs.rows[3].cells[1].innerHTML;
    
    
    // Get Required Services
    var reqServices = new Array();
    
    var tableReqServices = document.getElementById("reqservicestable");
    var tr = tableReqServices.getElementsByTagName("tr");
    var j = 0;
    for (i = 2 ; i < tr.length ; i++)
    {
        var reqService = {serServiceId:''};
        var reqServiceSelected = document.getElementsByName('reqservicename')[i-2].value;
        if (reqServiceSelected === 'Select')
        {
            continue;
        }
        reqService.serServiceId = reqServiceSelected;
        reqServices[j] = reqService;
        j++;
    }

    // Get Optional Services
    var optServices = new Array();
    
    var tableOptServices = document.getElementById("optservicestable");
    var tr = tableOptServices.getElementsByTagName("tr");
    var k = 0;
    for (i = 2 ; i < tr.length ; i++)
    {
        var optService = {serServiceId:''};
        var optServiceSelected = document.getElementsByName('optservicename')[i-2].value;
        if (optServiceSelected === 'Select')
        {
            continue;
        }
        optService.serServiceId = optServiceSelected;
        optServices[k] = optService;
        k++;
    }

    // Get Required Volumes
    var tableVolumes = document.getElementById("volumestable");
    var tr = tableVolumes.getElementsByTagName("tr");
   
    var volumes = [];

    for (i = 2; i < tr.length; i++) {
        var volume = {name:'', path:'', hostpath:'', storage:''};
        
        volume.name = tableVolumes.rows[i].cells[0].innerHTML;

        volume.path = tableVolumes.rows[i].cells[1].innerHTML;
        volume.hostpath = tableVolumes.rows[i].cells[2].innerHTML; 
        volume.storage = tableVolumes.rows[i].cells[3].innerHTML; 
        volumes.push(volume);
        
    }
    
    // Get Environmental Parameters
    var tableEnvParams = document.getElementById("envparamstable");
    var tr = tableEnvParams.getElementsByTagName("tr");
   
    var envParams = [];

    for (i = 2; i < tr.length; i++) {
        var param = {name:'', value:''};
        
        param.name = tableEnvParams.rows[i].cells[0].innerHTML;     
        param.value = tableEnvParams.rows[i].cells[1].innerHTML; 
        envParams.push(param);
        
    }

    // Get Software Image Parameters
    swImage = {serSWImageId:'', serSWImageName:'', serSWImageContainerFormat:'', serSWImageSizeinMBs:'', serSWImageOS:'', serSWImageURL:''};
    
    var tableSwImage = document.getElementById("swImageParamsTable");
   
    swImage.serSWImageName = tableSwImage.rows[2].cells[1].innerHTML;
    swImage.serSWImageContainerFormat = tableSwImage.rows[3].cells[1].innerHTML;
    swImage.serSWImageSizeinMBs = tableSwImage.rows[4].cells[1].innerHTML;
    swImage.serSWImageOS = tableSwImage.rows[5].cells[1].innerHTML;
    swImage.serSWImageURL = tableSwImage.rows[7].cells[1].innerHTML;
    
    
    // Get other individual parameters
    var autoscalingMetric = document.getElementById("autoscalingmetric").value;
    if (autoscalingMetric === "Select")
    {
        autoscalingMetric = '';
    }
    var consumedLocal = document.getElementById("consumedlocal").value;
    if (consumedLocal === "Select")
    {
        consumedLocal = '';
    }
    var isPrivileged = document.getElementById("isprivileged").value;
    if (isPrivileged === "Select")
    {
        isPrivileged = '';
    }
    var isLocal = document.getElementById("islocal").value;
    if (isLocal === "Select")
    {
        isLocal = '';
    }
    var localityScope = document.getElementById("scopeoflocality").value;
    console.log('Consumed Local = ' + consumedLocal + '\nIs Local = ' + isLocal + '\nScope of locality = ' + localityScope);
    var consumedLocalJson, isLocalJson, isPrivilegedJson;
    if (consumedLocal === "Yes")
    {
        consumedLocalJson = true;
    }
    else if (consumedLocal === "No")
    {
        consumedLocalJson = false;
    }
    else 
    {
        consumedLocalJson = '';
    }
    if (isPrivileged === "Yes")
    {
        isPrivilegedJson = true;
    }
    else 
    {
        isPrivilegedJson = false;
    }
   
    if (isLocal === "Yes")
    {
        isLocalJson = true;
    }
    else if (isLocal === "No")
    {
        isLocalJson = false;
    }
    else 
    {
        isLocalJson = '';
    }

    //Get available autoscaling policies from json and add all of them in the service
    const file = "./data/autoscaling_policies.json";
    var autoscaling_policies = null;
    await fetch(file)
    
        .then(response => response.json())
        .then(data => {
//            console.log("data = " + data);
            autoscaling_policies = data;
//            console.log("autoscaling_policies = " + autoscaling_policies);
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
    
    //below we are binding the input data (json format) in a variable inorder to post it.

    var data = {
        serId: id,
        serName: name,
        serType: type,
        serProvider: provider,
        serDescription: description,
        serCategory: category,
        serVersion: version,
        state: state,
        serAPIDescriptionURL: urls,
        serConfigParams: confParams,
        serOperations: operations,
        serComputeReq: computeReq,
        serStorageReq: storageReq,
        serLatencyReq: latencyReq,
        serThroughputReq: throughputReq,
        serServiceReq: reqServices,
        serServiceOptional: optServices,
        serSwImage: swImage,
        serializer: "",
        transportType: "",
        transportProtocol: "",
        scopeOfLocality: localityScope,
        consumedLocalOnly: consumedLocalJson,
        isLocal: isLocalJson,
        serApplicationPorts: ports,
        serAutoscalingPolicies: autoscaling_policies,
        serRequiredVolumes: volumes,
        serRequiredEnvParameters: envParams,
        serPrivileged: isPrivilegedJson,
        serPaasAutoscalingMetric: autoscalingMetric
    };
    
   
    // Create data to json
    json = JSON.stringify(data);
    console.log("---------------JSON---------------");
    console.log(json);
    
    //Send json
    var url = _BACKENDSERVER+"/servicecatalogue/create/services";
    CallPostUrl(url,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addservice");
}
resultfnct['_addservice'] = function (arg1) {
    dispmess('info','Service was saved');

}
resultfnct['err_addservice'] = function (arg1) {
    dispmess('info','Service was saved');
}
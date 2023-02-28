
function submitServiceRegistration(event) {
  
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
//    console.log("Urls:");
//    for (i = 0; i < urls.length; i++)
//    {
//        console.log(urls[i]);
//    }
    
   
    // Get Configuration Parameters
    var tableConfParams = document.getElementById("configparamstable");
    var tr = tableConfParams.getElementsByTagName("tr");
   
    const confParams = [];
    var td_serParamType;
    console.log("Length of parameters array: " + tr.length);
    for (i = 2; i < tr.length; i++) {
        console.log("i = " + i);
        var confParam = {serParamName:'', serParamType:'', serParamValue:'', serParamDescr:'', serParamTypicalValue:''};
        
        confParam.serParamName = tableConfParams.rows[i].cells[0].innerHTML;
        console.log("Param name: " + confParam.serParamName);
//        td_serParamType = document.getElementsByName('configurationType')[i-2];
        
//        confParam.serParamType = td_serParamType.value;
        confParam.serParamType = tableConfParams.rows[i].cells[1].innerHTML;
        console.log("Param type: " + confParam.serParamType);
        confParam.serParamTypicalValue = tableConfParams.rows[i].cells[2].innerHTML;
        confParam.serParamDescr = tableConfParams.rows[i].cells[3].innerHTML;
        var j = i - 2;
        console.log("j = " + j + ", Conf Param: " + confParam.serParamName + ", " + confParam.serParamType + ", " + confParam.serParamValue + ", " + confParam.serParamDescr + ", " + confParam.serParamTypicalValue);
       
        confParams.push(confParam);
        console.log(confParams.length);

    }

    // Get Operations
    var operations = new Array();
    var operation = {serOperationName:'', serOperationEndPoint:'', serOperationDescription:'', serOperationType:'', serOperationInputParams:'', serOperationOutputParams: ''};
    var tableOperations = document.getElementById("operationstable");
    tr = tableOperations.getElementsByTagName("tr");
    for (i = 2; i < tr.length; i++) {
     
        operation.serOperationName = tableOperations.rows[i].cells[0].innerHTML;
        operation.serOperationEndPoint = tableOperations.rows[i].cells[3].innerHTML;
        operation.serOperationDescription = tableOperations.rows[i].cells[1].innerHTML;
//        td_serOpType = document.getElementsByName('operationType')[i-2];
        
//        operation.serOperationType = td_serOpType.value;
        operation.serOperationType = tableOperations.rows[i].cells[2].innerHTML
        // Get input parameters
        var opInputParams = new Array();
        
        var tableInputParams = document.getElementById("addinputparamstable");
        //console.log("tableInputParams = " + tableInputParams);
        trInput = tableInputParams.getElementsByTagName("tr");
       
        for (j = 2; j < trInput.length; j++) {
            var opInputParam = {serParamName:'', serParamType:'', serParamValue:'', serParamDescr:'', serParamTypicalValue:''};
            console.log("j = " + j);
            opInputParam.serParamName = tableInputParams.rows[j].cells[0].innerHTML;
//            td_serParamType = document.getElementsByName('paramType')[i-2];
        
            opInputParam.serParamType = tableInputParams.rows[j].cells[1].innerHTML;
            opInputParam.serParamTypicalValue = tableInputParams.rows[j].cells[2].innerHTML;
            opInputParam.serParamDescr = tableInputParams.rows[j].cells[3].innerHTML;
            //console.log("Operation Input Parameters #" + j + ": " + opInputParam.serParamName);
            
            opInputParams[j-2] = opInputParam; // *** Here, the value of opInputParams[j-2] is assigned also to opInputParams[j-3]!!!!
            k = j - 2;
            console.log("Operation Input Parameters #" + k + ": " + opInputParams[j-2].serParamName);
            
//            console.log("##6");

        }

        operation.serOperationInputParams = opInputParams;
        // Get output parameters
        
        var opOutputParams = new Array();
        
        var tableOutputParams = document.getElementById("addoutputparamstable");
        trOutput = tableOutputParams.getElementsByTagName("tr");
        for (j = 2; j < trOutput.length; j++) {
            var opOutputParam = {serParamName:'', serParamType:'', serParamValue:'', serParamDescr:'', serParamTypicalValue:''};
            opOutputParam.serParamName = tableOutputParams.rows[j].cells[0].innerHTML;
//            td_serParamType = document.getElementsByName('paramOutType')[i-2];
        
            opOutputParam.serParamType = tableOutputParams.rows[j].cells[1].innerHTML;
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
    for (i = 2 ; i < tr.length ; i++)
    {
        var reqService = {serServiceId:''};
        reqService.serServiceId = tableReqServices.rows[i].cells[0].innerHTML;
        reqServices[i-2] = reqService;
    }
    console.log("Required services:");
    for (i = 0; i < reqServices.length; i++)
    {
        console.log(reqServices[i].serServiceId);
    }
    
    // Get Optional Services
    var optServices = new Array();
    
    var tableOptServices = document.getElementById("optservicestable");
    var tr = tableOptServices.getElementsByTagName("tr");
    for (i = 2 ; i < tr.length ; i++)
    {
        var optService = {serServiceId:''};
        optService.serServiceId = tableOptServices.rows[i].cells[0].innerHTML;
        optServices[i-2] = optService;
    }
//    console.log("Optional services:");
//    for (i = 0; i < optServices.length; i++)
//    {
//        console.log(optServices[i].serServiceId);
//    }
    
    // Get Software Image Parameters
    swImage = {serSWImageId:'', serSWImageName:'', serSWImageContainerFormat:'', serSWImageSizeinMBs:'', serSWImageOS:'', serSWImageURL:''};
    
    var tableSwImage = document.getElementById("swImageParamsTable");
   
    swImage.serSWImageName = tableSwImage.rows[2].cells[1].innerHTML;
    swImage.serSWImageContainerFormat = tableSwImage.rows[3].cells[1].innerHTML;
    swImage.serSWImageSizeinMBs = tableSwImage.rows[4].cells[1].innerHTML;
    swImage.serSWImageOS = tableSwImage.rows[5].cells[1].innerHTML;
    swImage.serSWImageURL = tableSwImage.rows[7].cells[1].innerHTML;
    
    
    // Get other individual parameters
    var consumedLocal = document.getElementById("consumedlocal").value;
    if (consumedLocal === "Select")
    {
        consumedLocal = '';
    }
    var isLocal = document.getElementById("islocal").value;
    if (isLocal === "Select")
    {
        isLocal = '';
    }
    var localityScope = document.getElementById("scopeoflocality").value;
    console.log('Consumed Local = ' + consumedLocal + '\nIs Local = ' + isLocal + '\nScope of locality = ' + localityScope);
    var consumedLocalJson, isLocalJson;
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
        isLocal: isLocalJson
    };
    
   
    // Create data to json
    json = JSON.stringify(data);
    console.log("---------------JSON---------------");
    console.log(json);
    
    //Send json
    var url = _BACKENDSERVER+"/servicecatalogue/create/services";
    CallPostUrl(url,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addservice");
    //console.log("Response: " + response);
}
resultfnct['_addservice'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Service created');

}
resultfnct['err_addservice'] = function (arg1) {
    console.log("ERROR3 in submission");
//    var responseStatus = arg1.getOwnPropertyNames();
//    console.log("response Status = " + responseStatus);
    dispmess('info','Service created');
}
//Function for adding a new row in URLs table
//function addNewRowText(tableId, columnsToReplicate) {
//  var table = document.getElementById(tableId);
// 
//  var rows = table.getElementsByTagName('tr');
//  
//  var row = table.insertRow(rows.length);
//  
//  var cell1 = row.insertCell(0);
//  var cell2 = row.insertCell(1);
//
//  cell1.innerHTML = "<div contenteditable name='url'></div>";
//  
//  cell2.innerHTML = "<a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "')\" style='padding-bottom:5px;color:red;font-size:24px'></i></a>";
//}

//Function for adding a new row in Conf parameters table
//function addNewRowConfParams(tableId) {
//  var table = document.getElementById(tableId);
// 
//  var rows = table.getElementsByTagName('tr');
//  
//  var row = table.insertRow(rows.length);
//  
//  var cell1 = row.insertCell(0);
//  var cell2 = row.insertCell(1);
//  var cell3 = row.insertCell(2);
//  var cell4 = row.insertCell(3);
//  var cell5 = row.insertCell(4);
//
//  cell1.innerHTML = "<textarea name='configurationname'></textarea>";
//  cell2.innerHTML = '<select class="regselect" name="configurationType">'
//                        +'<option>string</option>'
//                        +'<option>number</option>'
//                        +'<option>boolean</option>'
//                        +'<option>null</option>'
//                        +'<option>object</option>'
//                        +'<option>array</option>'
//                    +'</select>';
//  cell3.innerHTML = "<textarea name='configurationvalue'></textarea>";
//  cell4.innerHTML = "<textarea name='configurationdescr'></textarea>";
//  cell5.innerHTML = "<a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "')\" style='padding-bottom:5px;color:red;font-size:24px'></i></a>";
//}

//Function for showing popup window for adding input and output parameters for an operation
function addOpParamsPopup(){
    document.getElementById("addOpParamsPopup").style.display = 'block';
}

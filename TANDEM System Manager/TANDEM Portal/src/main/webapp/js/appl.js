
dispfnct['createstartnode'] = function (ssk) {
    /*ctx1.fillStyle = 'green';
    dispNode(ctx1, ssk[_XPOS] - _border, ssk[_YPOS] - _border, _border * 2, _border * 2);*/
    
    try{
        _LEAVENOW = false;
    } catch (error) {}
    var flst = ctx1.fillStyle;
    ctx1.fillStyle = 'green';
    ctx1.beginPath();
    dispArc(ctx1, ssk[_XPOS], ssk[_YPOS], canvasborder);
    ctx1.fill();
    ctx1.strokeStyle = 'black';
    ctx1.stroke();
    ctx1.fillStyle = flst;
    ssk['description'] = "START";
}

dispfnct['createendnode'] = function (ssk) {
    /*ctx1.fillStyle = 'red';
    dispNode(ctx1, ssk[_XPOS] - _border, ssk[_YPOS] - _border, _border * 2, _border * 2);*/
    
    var flst = ctx1.fillStyle;
    ctx1.fillStyle = 'red';
    ctx1.beginPath();
    dispArc(ctx1, ssk[_XPOS], ssk[_YPOS], canvasborder);
    ctx1.fill();
    ctx1.strokeStyle = 'black';
    ctx1.stroke();
    ctx1.fillStyle = flst;
    ssk['description'] = "END";
}
dispfnct['dispnode'] = function (tsk) { 

        if (tsk[_TYPE] == 'CONDITION') {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = '#152172';
            ctx1.beginPath();
            ctx1.drawRhombus(tsk[_XPOS], tsk[_YPOS], _border*3).stroke();
            //dispArc(ctx1, tsk[_XPOS], tsk[_YPOS]);
            ctx1.fill();
            ctx1.strokeStyle = 'black';
            ctx1.stroke();
            ctx1.fillStyle = flst;
        }
        
        if ((tsk[_TYPE] == _FAAS_TYPE)||(tsk[_TYPE] == _FAAS_TYPE_V1)) {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = '#F5B726';
            ctx1.drawEllipseByCenter(tsk[_XPOS], tsk[_YPOS], _border * 3, _border * 2);
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.stroke();
            ctx1.strokeStyle = 'black';
            ctx1.fillStyle = flst;
        }
        if ((tsk[_TYPE] == _PAAS_TYPE)||(tsk[_TYPE] == _PAAS_TYPE_V1)) {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = 'olive';
            ctx1.roundRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2, 20).fill();
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.fillStyle = flst;
        }
        if ((tsk[_TYPE] == _TANDEM_APP_TYPE)||(tsk[_TYPE] == _TANDEM_APP_TYPE_V1)) {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = '#7FB2FF';
            ctx1.roundRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2, 20).fill();
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.fillStyle = flst;
        }
        if ((tsk[_TYPE] == _USER_APP_TYPE)||(tsk[_TYPE] == _USER_APP_TYPE_V1)) {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = 'purple';
            ctx1.roundRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2, 20).fill();
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.fillStyle = flst;
        }
        if ((tsk[_TYPE] == _DEVICE_TYPE)||(tsk[_TYPE] == _DEVICE_TYPE_V1)) {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = '#734F26';
            var myborder = canvasborder;
            ctx1.fillRect(tsk[_XPOS] - myborder, tsk[_YPOS] - myborder, myborder * 2, myborder * 2);
            ctx1.strokeStyle = 'black';
            ctx1.strokeRect(tsk[_XPOS] - myborder, tsk[_YPOS] - myborder, myborder * 2, myborder * 2);
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.fillStyle = flst;
        }
        dispfnct['dispnodelabel'](tsk,null);
};

dispfnct['dispselnode'] = function (tsk,pid,mflg) { 
    _servicestp = tsk[_TYPE];
    if (tsk[_TYPE] == 'START_NODE') {
        closeOpenNodeForms('tskStrtForm');
        openForm1('tskStrtForm');
    /*    document.getElementById("prcid3").value = pid;*/
    if (tsk.hasOwnProperty('description'))
        document.getElementById("startdescription").value = tsk['description'];
    else
        document.getElementById("startdescription").value = 'START';
    }

    if (tsk[_TYPE] == 'CONDITION') {
        closeOpenNodeForms('tskConForm');
        openForm1('tskConForm');
    //    document.getElementById("prcid1").value = pid;
    if (tsk.hasOwnProperty('description'))
        document.getElementById("condescription").value = tsk['description'];
    else
        document.getElementById("condescription").value = '';
    //    document.getElementById("condescription").value = tsk['description'];
    //    document.getElementById("conscr").value = tsk['script'];
    //    document.getElementById("conb0110").style.display = mflg;
    }
    if ((tsk[_TYPE] == _FAAS_TYPE)||(tsk[_TYPE] == _FAAS_TYPE_V1)) {
        closeOpenNodeForms('tskFaasForm');
        _servicesnm = "faasconservice";
        _paramslbl = 'faasconparams';
        _srvid = tsk['service'];;
        _srvidcode = tsk[_ID];
        _operid = tsk['operation'];
        _operationsnm = "faasconoperation";
        _wrktsk = tsk;
        if (tsk.hasOwnProperty('properties'))
            _wflinputparams[_srvid+_srvidcode]= tsk['properties'];
        listServicesUpd();
        openForm1('tskFaasForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("faasdescription").value = tsk['description'];
    else
        document.getElementById("faasdescription").value = '';
        //_inputparams = tsk['properties'];
        //document.getElementById("faasconparams").value = tsk['properties'];
    //else
        //document.getElementById("faasconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("faasconservice").value = tsk['service'];
    else
        document.getElementById("faasconservice").value = '';
    //    document.getElementById("faasdescription").value = tsk['description'];
    }
    if ((tsk[_TYPE] == _PAAS_TYPE)||(tsk[_TYPE] == _PAAS_TYPE_V1)) {
        closeOpenNodeForms('tskPaasForm');
        _servicesnm = "paasconservice";
        _paramslbl = 'paasconparams';
        _srvid = tsk['service'];;
        _srvidcode = tsk[_ID];
        _operid = tsk['operation'];
        _wrktsk = tsk;
        _operationsnm = "paasconoperation";
        if (tsk.hasOwnProperty('properties'))
            _wflinputparams[_srvid+_srvidcode]= tsk['properties'];
        listServicesUpd();
        openForm1('tskPaasForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("paasdescription").value = tsk['description'];
    else
        document.getElementById("paasdescription").value = '';
    //    document.getElementById("paasdescription").value = tsk['description'];
        //_inputparams = tsk['properties'];
        //document.getElementById("paasconparams").value = tsk['properties'];
    //else
        //document.getElementById("paasconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("paasconservice").value = tsk['service'];
    else
        document.getElementById("paasconservice").value = '';
    }
    if ((tsk[_TYPE] == _TANDEM_APP_TYPE)||(tsk[_TYPE] == _TANDEM_APP_TYPE_V1)) {
        closeOpenNodeForms('tskTandemappForm');
        _servicesnm = "appconservice";
        _paramslbl = 'appconparams';
        _srvid = tsk['service'];;
        _srvidcode = tsk[_ID];
        _operid = tsk['operation'];
        _wrktsk = tsk;
        _operationsnm = "appconoperation";
        if (tsk.hasOwnProperty('properties'))
            _wflinputparams[_srvid+_srvidcode]= tsk['properties'];
        listServicesUpd();
        openForm1('tskTandemappForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("appdescription").value = tsk['description'];
    else
        document.getElementById("appdescription").value = '';
        //_inputparams = tsk['properties'];
        //document.getElementById("appconparams").value = tsk['properties'];
    //else
        //document.getElementById("appconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("appconservice").value = tsk['service'];
    else
        document.getElementById("appconservice").value = '';
    //    document.getElementById("tandemappdescription").value = tsk['description'];
    }
    if ((tsk[_TYPE] == _USER_APP_TYPE)||(tsk[_TYPE] == _USER_APP_TYPE_V1)) {
        closeOpenNodeForms('tskUserappForm');
        _servicesnm = "userconservice";
        _srvid = tsk['service'];;
        _srvidcode = tsk[_ID];
        _paramslbl = 'userconparams';
        _operid = tsk['operation'];
        _wrktsk = tsk;
        _operationsnm = "userconoperation";
        if (tsk.hasOwnProperty('properties'))
            _wflinputparams[_srvid+_srvidcode]= tsk['properties'];
        listServicesUpd();
        openForm1('tskUserappForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("userdescription").value = tsk['description'];
    else
        document.getElementById("userdescription").value = '';
        //_inputparams = tsk['properties'];
        //document.getElementById("userconparams").value = tsk['properties'];
    //else
        //document.getElementById("userconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("userconservice").value = tsk['service'];
    else
        document.getElementById("userconservice").value = '';
    //    document.getElementById("userappdescription").value = tsk['description'];
    }
    if ((tsk[_TYPE] == _DEVICE_TYPE)||(tsk[_TYPE] == _DEVICE_TYPE_V1)) {
        closeOpenNodeForms('tskDevForm');
        _servicesnm = "devconservice";
        _srvid = tsk['service'];;
        _srvidcode = tsk[_ID];
        _paramslbl = 'devconparams';
        _operid = tsk['operation'];
        _wrktsk = tsk;
        _operationsnm = "devconoperation";
        if (tsk.hasOwnProperty('properties'))
            _wflinputparams[_srvid+_srvidcode]= tsk['properties'];
        listServicesUpd();
        openForm1('tskDevForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("devdescription").value = tsk['description'];
    else
        document.getElementById("devdescription").value = '';
        //_inputparams = tsk['properties'];
        //document.getElementById("devconparams").value = tsk['properties'];
    //else
        //document.getElementById("devconparams").value = '';
    if (tsk.hasOwnProperty('service')){
        document.getElementById("devconservice").value = tsk['service'];
    } else
        document.getElementById("devconservice").value = '';
    //    document.getElementById("devdescription").value = tsk['description'];
    }
    marknode(tsk,'blue');
};
dispfnct['dispnodelabel'] = function (kts,_movsel) { 
            var descrtxt = '';
    try{
        _LEAVENOW = false;
    } catch (error) {}
            if (kts.hasOwnProperty('servicedescr')){
                descrtxt = kts['servicedescr'].slice(0, 20);
            }else {
                if (kts.hasOwnProperty('description')){
                    descrtxt = kts['description'].slice(0, 20);
                }else{
                    descrtxt = 'empty';   
                }
            } 
            var strtodisp = '';
                if (kts.hasOwnProperty('description')){
                    strtodisp = kts['description'].slice(0, 20);
                }else{
                    strtodisp = 'empty';   
                }
            var ybor = 30;
            var xbor = 0;
            ctx1.font = "bold 10pt Courier";
            var textMetrics1 = ctx1.measureText(descrtxt);
            var xbor1 = textMetrics1.width;
            //var textMetrics2 = ctx1.measureText(kts[_TYPE]);
            var textMetrics2 = ctx1.measureText(strtodisp);
            var xbor2 = textMetrics2.width;
            if (xbor1 > xbor2) {
                xbor = xbor1 + 20;
            }
            else {
                xbor = xbor2 + 20;
            }

            //if ((_movsel == null) || (kts[_ID] !== _movsel[_ID])) {
            if (true) {
                ctx1.shadowBlur = 10;
                ctx1.shadowColor = "DarkSlateGray";
                ctx1.shadowOffsetX = 10;
                ctx1.shadowOffsetY = 10;

                ctx1.beginPath();
                ctx1.lineWidth = "1";
                ctx1.strokeStyle = "blue";
                ctx1.rect(kts[_XPOS] - _X - 10, kts[_YPOS] - _Y - ybor, xbor, ybor);
                ctx1.stroke();


                ctx1.fillStyle = "DarkSeaGreen";
                ctx1.fillRect(kts[_XPOS] - _X - 10, kts[_YPOS] - _Y - ybor, xbor, ybor);

                sdoff();

                ctx1.fillStyle = "black";
                ctx1.strokeStyle = "green";
                //ctx1.font = "normal 15pt Courier";
                ctx1.font = "bold 10pt Courier";
                //ctx1.fillText(descrtxt, kts[_XPOS] - _X, kts[_YPOS] - _Y - 30);
                ctx1.font = "bold 8pt Courier";
                //ctx1.fillText(kts[_TYPE], kts[_XPOS] - _X, kts[_YPOS] - _Y - 10);
                ctx1.fillText(strtodisp, kts[_XPOS] - _X, kts[_YPOS] - _Y - 10);
            }

            sdon();
            return kts;
            //_movsel = kts;
};

dispfnct['_closeallforms'] = function () {
    closeNodeForm('tskStrtForm');
    closeNodeForm('tskReqForm');
    closeNodeForm('tskConForm');
    closeNodeForm('tskFaasForm');
    closeNodeForm('tskPaasForm');
    closeNodeForm('tskTandemappForm');
    closeNodeForm('tskUserappForm');
    closeNodeForm('tskDevForm');
    closeNodeForm('fieldsUpdatePopup');
    closeNodeForm('opendiagForm');
    closeNodeForm('deletediagForm');
    closeNodeForm('savediagForm');
    closeNodeForm('PropsRelForm');
};
function updateop(desc){
    var varname = desc + 'description';
    try{
        _LEAVENOW = false;
    } catch (error) {}
    if (document.getElementById(varname)!=null)
        changedescr('description',document.getElementById(varname).value);
    varname = desc + 'conparams';
    if (document.getElementById(varname)!=null)
        changedescr('properties',_inputparams);
    varname = desc + 'conoperation';
    if (document.getElementById(varname)!=null){
        var e = document.getElementById(varname);
        if (e.options[e.selectedIndex]!=null){
            var text = e.options[e.selectedIndex].value;
            changedescr('operation',text);
        }
    }
    varname = desc + 'conservice';
    if (document.getElementById(varname)!=null){
        var e = document.getElementById(varname);
        var text = e.options[e.selectedIndex].value;
        changedescr('service',text);
        changedescr('servicedescr',text);
    }
    dispmess('Updates','Updates completed');
    //document.getElementById('fieldsUpdatePopup').style.display='block';
}

function closeNodeForm(id){
    if (document.getElementById(id)!== null){
        document.getElementById(id).style.display = "none";
    }
}

var formIds = ['tskStrtForm', 'tskReqForm', 'tskConForm', 'tskFaasForm', 
    'tskPaasForm', 'tskTandemappForm', 'tskUserappForm', 'tskDevForm'];
function closeOpenNodeForms(openingFormId){
    for (let i = 0; i < formIds.length; i++) {
        if (openingFormId !== formIds[i] && document.getElementById(formIds[i])!== null){
            if (document.getElementById(formIds[i]).style.display === "block"){
                document.getElementById(formIds[i]).style.display = "none";
            }
        }
    }
}

var _DGRMTOSAVE;
function savediagram(){
try {
    var req = JSON.parse("{}")
    var name = //'testkts1';
            document.getElementById('sv_name').value;
    var descr = //'descrkts';
            document.getElementById('sv_descr').value;
    var jsoninfo = getdiagjson();
    var isappl = document.getElementById("op_appl").checked;
    var isappservice = document.getElementById("op_appservice").checked;
    req['name'] = name;
    req['descr'] = descr;
    //req['integration'] = getjsontosend();
    req['json'] = jsoninfo;

    //req['json']['name'] = name;
    //req['json']['descr'] = descr;
    req['json']['integration'] = getjsontosend();
    
            //JSON.stringify(jsoninfo);
    var num = 0;
    if (isappl) num = 1;
    if (isappservice) num = 2;
    req['type'] = num.toString();
    
    // Before saving anything, check if the required fields are filled
    var isoktoadd = true;
    var errorlist = new Array();
    if (name===""){
        isoktoadd = false;
        errorlist.push("name");
    }
    if (isappl || isappservice)
    {
        
    
        if (document.getElementById("appcategoryreg").value==="Select"){
            isoktoadd = false;
            errorlist.push("category");
        }
    
        if (document.getElementById("appproviderreg").value==="Select"){
            isoktoadd = false;
            errorlist.push("provider");
        }
 
        if (document.getElementById("appstatereg").value==="Select"){
            isoktoadd = false;
            errorlist.push("state");
        }
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
    
    // Save the workflow
    var url = _BACKENDSERVER+"/workflows/create";
    _DGRMTOSAVE = req;
    CallPostUrl(url,"POST",req,[],"savediagram");
    
    //Save diagram as application and/or pplication service
    if (isappl || isappservice)
    {
     
    
        // Get additional data
    
        var provider = document.getElementById("appproviderreg").value;
    
        var category = document.getElementById("appcategoryreg").value;
   
        var state = document.getElementById("appstatereg").value;
        if (isappl)
        {
            console.log("About to save the application");
            var application = {
                name: name,
                id: name,
                category: category,
                description: descr,
                provider: provider,
                applicationServices: [],
                supportServices: [],
                serviceChain: name,
                state: state,
                AppURL: '',
                monServicesURL: ''
            };
            
            // Create data to json
            const appjson = JSON.stringify(application);
            console.log("---------------JSON---------------");
            console.log(appjson);
            //Send json
            var url = _BACKENDSERVER+"/applicationcatalogue/create/application";
            CallPostUrl(url,"POST",application,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addapp");
        }
        
        if (isappservice)
        {
            console.log("About to save the application");
            var appservice = {
                serId: name,
                serName: name,
                serType: "User App. Services",
                serProvider: provider,
                serDescription: descr,
                serCategory: {href:'', id:'', name:category, version:''},
                serVersion: '',
                state: state,
                serAPIDescriptionURL: [],
                serConfigParams: [],
                serOperations: [],
                serComputeReq: {serMemorySize:'', serMemorySizeMU:'', serCPUArchitecture:'', serNumVirtualCPUs:'', serVirtualCPUClock:'', serNumVirtualCPUsMU:'', serNumVirtualGPUs:''},
                serStorageReq: {serTypeOfStorage:'', serSizeOfStorage:'', serSizeOfStorageMU:''},
                serLatencyReq: {serLatencyTimeUnit:'', serLatencyValue:''},
                serThroughputReq: {serThroughputMU:'', serThroughputValue:''},
                serServiceReq: [],
                serServiceOptional: [],
                serSwImage: name,
                serializer: "",
                transportType: "",
                transportProtocol: "",
                scopeOfLocality: '',
                consumedLocalOnly: '',
                isLocal: ''
                
            };
    
   
            // Create data to json
            const serjson = JSON.stringify(appservice);
            console.log("---------------JSON---------------");
            console.log(serjson);
            //Send json
            var url = _BACKENDSERVER+"/servicecatalogue/create/services";
            CallPostUrl(url,"POST",appservice,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addser");
        }
   
    }
    
    
    
    
} catch (error) {
  alert(error);
}
    closeNodeForm('savediagForm');
}

resultfnct['_addapp'] = function (arg1) {
    console.log("Status 200");
    //dispmess('info','Application was saved');

}
resultfnct['err_addapp'] = function (arg1) {
    console.log("ERROR3 in submission");
    //dispmess('info','Application was saved');
}

resultfnct['_addser'] = function (arg1) {
    console.log("Status 200");
    //dispmess('info','Application was saved');

}
resultfnct['err_addser'] = function (arg1) {
    console.log("ERROR3 in submission");
}

var _servicesnm = "";
var _operationsnm = "";
var _servicestp = "";

function getlistservices(){
try {
    var url = _BACKENDSERVER+"/servicecatalogue/get/services";
    CallPostUrl(url,"GET",null,[],"listservices");
} catch (error) {
  dispmess('Error',error);
}
}

var srvnames;
var _srvid;
var _srvidcode;
var _operid;
var _wrktsk;
var _paramslbl;
resultfnct['listservices'] = function (arg1) { 
    srvnames = JSON.parse(arg1);
};

resultfnct['errlistservices'] = function (arg1) { 
    dispmess('Error','an error occurs');
    //alert(arg1);
};

function selectService(boxlbl,paramslbl){
    //var selectBox = document.getElementById(boxlbl);
    var e = document.getElementById(boxlbl);
    var text = e.options[e.selectedIndex].value;
    //var ttt = text+"_"+_srvidcode;
    delete _wflinputparams[text+_srvidcode];
    _inputparams = getVisualInput(text,null);
    _operid = null;
    listOperationsUpd (text);
    //var selectedValue = srvnames[selectBox.selectedIndex]['serConfigParams'];
    //document.getElementById(_paramslbl).innerHTML = getVisual(selectedValue);
    //document.getElementById(paramslbl).value = JSON.stringify(selectedValue);

}
function selectOperation(srvboxlbl,boxlbl){
    var selectBox = document.getElementById(srvboxlbl);
    var operselectBox = document.getElementById(boxlbl);
    var serviceid = srvnames[selectBox.selectedIndex]['serId'];
    var opername = srvnames[selectBox.selectedIndex]['serOperations'][operselectBox.selectedIndex]['serOperationName']
    document.getElementById(_paramslbl).innerHTML = getVisualOper(serviceid,_operid);
}

function getlistdiagrams(){
try {
    var url = _BACKENDSERVER+"/workflows/names";
    CallPostUrl(url,"GET",null,[],"listdiagram");
} catch (error) {
  alert(error);
}
}

var _opentype = "";
function opendiagramform(){
    _opentype = "open";
    getlistdiagrams();
    //openForm1('opendiagForm');
}

function deletediagramform(){
    _opentype = "delete";
    getlistdiagrams();
    //openForm1('deletediagForm');
}

const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const urlState = urlPrefixSysManGet + "servicestate";
const urlCategory = urlPrefixSysManGet + "servicecategory";

const urlProvider = urlPrefixSysManGet + "provider";
function savediagramform(){
    _opentype = "save";
    openForm1('savediagForm');
    
    // Fill selection lists
    selectionList('appcategoryreg', urlCategory, null);
                
    selectionList('appproviderreg', urlProvider, null);
    selectionList('appstatereg', urlState, null);
    
    // Add listener for the Application checkbox
    //var checkbox = document.querySelector("input[name=checkbox]");
    var checkbox1 = document.getElementById('op_appl');
    console.log("About to add event listener");
    checkbox1.addEventListener('change', function() {
        if (this.checked) {
            console.log("Checkbox is checked..");
            document.getElementById("hidden_selection_lists").style.display = 'block';
        } else {
            console.log("Checkbox is not checked..");
            document.getElementById("hidden_selection_lists").style.display = 'none';
        }
    });
    var checkbox2 = document.getElementById('op_appservice');
    console.log("About to add event listener");
    checkbox2.addEventListener('change', function() {
        if (this.checked) {
            console.log("Checkbox is checked..");
            document.getElementById("hidden_selection_lists").style.display = 'block';
        } else {
            console.log("Checkbox is not checked..");
            document.getElementById("hidden_selection_lists").style.display = 'none';
        }
    });
}


function opendiagram(){
try {
    var req = JSON.parse("{}")
    var name = document.getElementById('op_name').value;
    var url = _BACKENDSERVER+"/workflows/"+name;
    CallPostUrl(url,"GET",null,[],"opendiagram");
} catch (error) {
  alert(error);
}
    closeNodeForm('opendiagForm');
}
function deletediagram(){
try {
    if (confirm("Delete the workflow?") === false) {
        return;
    }
    var req = JSON.parse("{}")
    var name = document.getElementById('del_name').value;
    var url = _BACKENDSERVER+"/workflows/delete/"+name;
    CallPostUrl(url,"DELETE",null,[],"deletediagram");
} catch (error) {
  alert(error);
}
    closeNodeForm('deletediagForm');
}
var _INTEGRATON;
resultfnct['opendiagram'] = function (arg1) { 
try {
    var ans = JSON.parse(arg1);
    var data = ans['json'];
            //JSON.parse(ans['json']);
    try{
        _LEAVENOW = true;
    } catch (error) {}
    displayDiagram(data);
    //_INTEGRATON = getjsontosend();
} catch (error) {
  alert(error);
}
};
resultfnct['erropendiagram'] = function (arg1) { 
    alert(arg1);
};
resultfnct['savediagram'] = function (arg1) { 
    if (arg1=="200")
        dispmess('Info','Diagram saved');
    //    document.getElementById('fieldsUpdatePopup').style.display='block';
    //alert(arg1);
};
resultfnct['errsavediagram'] = function (arg1) { 
    if (arg1=="409"){
        // already exist--> confirm to update, if ok --> call update
        if (confirm("Workflow already exists. Update with the new one?") === false) {
            return;
        }else{
            var url = _BACKENDSERVER+"/workflows/update";
            CallPostUrl(url,"PUT",_DGRMTOSAVE,[],"updatediagram");
            return;
        }
    }
    if (arg1=="201"){
    try{
        _LEAVENOW = true;
    } catch (error) {}
        dispmess('Info','Diagram saved');
    }
    else
        dispmess('Error',arg1);
    //    document.getElementById('fieldsUpdatePopup').style.display='block';
    //alert(arg1);
};
resultfnct['updatediagram'] = function (arg1) { 
    //if (arg1=="200")
    try{
        _LEAVENOW = true;
    } catch (error) {}
        dispmess('Info','Diagram updated');
};
resultfnct['errupdatediagram'] = function (arg1) { 
        dispmess('Error',arg1);
}
resultfnct['deletediagram'] = function (arg1) { 
    dispmess('Info','Diagram deleted');
    //alert(arg1);
};
resultfnct['errdeletediagram'] = function (arg1) { 
    dispmess('Error',arg1);
    //alert(arg1);
};
resultfnct['listdiagram'] = function (arg1) { 
    var names = JSON.parse(arg1);
    var restxt = "";
    for (let i = 0; i < names.length; i++) {
        restxt += '<option value="'+names[i]+'">'+names[i]+'</option>'; 
    }
    //deletediagForm
    if (_opentype == "open"){
        openForm1('opendiagForm');
        document.getElementById("op_name").innerHTML = restxt;
    }
    if (_opentype == "delete"){
        openForm1('deletediagForm');
        document.getElementById("del_name").innerHTML = restxt;
    }
    //alert(arg1);
};
resultfnct['errlistdiagram'] = function (arg1) { 
    alert(arg1);
};
function openForm1(nm){
    openForm(nm);
    dragElement(document.getElementById(nm));
}
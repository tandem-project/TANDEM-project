/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

dispfnct['createstartnode'] = function (ssk) {
    /*ctx1.fillStyle = 'green';
    dispNode(ctx1, ssk[_XPOS] - _border, ssk[_YPOS] - _border, _border * 2, _border * 2);*/
    
    var flst = ctx1.fillStyle;
    ctx1.fillStyle = 'green';
    ctx1.beginPath();
    dispArc(ctx1, ssk[_XPOS], ssk[_YPOS], canvasborder);
    ctx1.fill();
    ctx1.strokeStyle = 'black';
    ctx1.stroke();
    ctx1.fillStyle = flst;
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
        
        if (tsk[_TYPE] == 'FAAS_NODE') {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = '#F5B726';
            ctx1.drawEllipseByCenter(tsk[_XPOS], tsk[_YPOS], _border * 3, _border * 2);
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.stroke();
            ctx1.strokeStyle = 'black';
            ctx1.fillStyle = flst;
        }
        if (tsk[_TYPE] == 'PAAS_NODE') {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = 'olive';
            ctx1.roundRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2, 20).fill();
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.fillStyle = flst;
        }
        if (tsk[_TYPE] == 'TANDEMAPP_SERVICE') {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = '#7FB2FF';
            ctx1.roundRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2, 20).fill();
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.fillStyle = flst;
        }
        if (tsk[_TYPE] == 'USERAPP_SERVICE') {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = 'purple';
            ctx1.roundRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2, 20).fill();
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.fillStyle = flst;
        }
        if (tsk[_TYPE] == 'DEVICE_SERVICE') {
            var flst = ctx1.fillStyle;
            ctx1.fillStyle = '#734F26';
            var myborder = canvasborder;
            ctx1.fillRect(tsk[_XPOS] - myborder, tsk[_YPOS] - myborder, myborder * 2, myborder * 2);
            ctx1.strokeStyle = 'black';
            ctx1.strokeRect(tsk[_XPOS] - myborder, tsk[_YPOS] - myborder, myborder * 2, myborder * 2);
            //ctx1.fillRect(tsk[_XPOS] - _border, tsk[_YPOS] - _border, _border * 2, _border * 2);
            ctx1.fillStyle = flst;
        }
};
dispfnct['dispselnode'] = function (tsk,pid,mflg) { 
    if (tsk[_TYPE] == 'START_NODE') {
        closeOpenNodeForms('tskStrtForm');
        openForm('tskStrtForm');
    /*    document.getElementById("prcid3").value = pid;*/
    if (tsk.hasOwnProperty('description'))
        document.getElementById("startdescription").value = tsk['description'];
    else
        document.getElementById("startdescription").value = '';
    }

    if (tsk[_TYPE] == 'CONDITION') {
        closeOpenNodeForms('tskConForm');
        openForm('tskConForm');
    //    document.getElementById("prcid1").value = pid;
    if (tsk.hasOwnProperty('description'))
        document.getElementById("condescription").value = tsk['description'];
    else
        document.getElementById("condescription").value = '';
    //    document.getElementById("condescription").value = tsk['description'];
    //    document.getElementById("conscr").value = tsk['script'];
    //    document.getElementById("conb0110").style.display = mflg;
    }
    if (tsk[_TYPE] == 'FAAS_NODE') {
        closeOpenNodeForms('tskFaasForm');
        _servicesnm = "faasconservice";
        getlistservices();
        openForm('tskFaasForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("faasdescription").value = tsk['description'];
    else
        document.getElementById("faasdescription").value = '';
    if (tsk.hasOwnProperty('properties'))
        document.getElementById("faasconparams").value = tsk['properties'];
    else
        document.getElementById("faasconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("faasconservice").value = tsk['service'];
    else
        document.getElementById("faasconservice").value = '';
    //    document.getElementById("faasdescription").value = tsk['description'];
    }
    if (tsk[_TYPE] == 'PAAS_NODE') {
        closeOpenNodeForms('tskPaasForm');
        _servicesnm = "paasconservice";
        getlistservices();
        openForm('tskPaasForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("paasdescription").value = tsk['description'];
    else
        document.getElementById("paasdescription").value = '';
    //    document.getElementById("paasdescription").value = tsk['description'];
    if (tsk.hasOwnProperty('properties'))
        document.getElementById("paasconparams").value = tsk['properties'];
    else
        document.getElementById("paasconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("paasconservice").value = tsk['service'];
    else
        document.getElementById("paasconservice").value = '';
    }
    if (tsk[_TYPE] == 'TANDEMAPP_SERVICE') {
        closeOpenNodeForms('tskTandemappForm');
        _servicesnm = "appconservice";
        getlistservices();
        openForm('tskTandemappForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("tandemappdescription").value = tsk['description'];
    else
        document.getElementById("tandemappdescription").value = '';
    if (tsk.hasOwnProperty('properties'))
        document.getElementById("appconparams").value = tsk['properties'];
    else
        document.getElementById("appconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("appconservice").value = tsk['service'];
    else
        document.getElementById("appconservice").value = '';
    //    document.getElementById("tandemappdescription").value = tsk['description'];
    }
    if (tsk[_TYPE] == 'USERAPP_SERVICE') {
        closeOpenNodeForms('tskUserappForm');
        _servicesnm = "userconservice";
        getlistservices();
        openForm('tskUserappForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("userappdescription").value = tsk['description'];
    else
        document.getElementById("userappdescription").value = '';
    if (tsk.hasOwnProperty('properties'))
        document.getElementById("userconparams").value = tsk['properties'];
    else
        document.getElementById("userconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("userconservice").value = tsk['service'];
    else
        document.getElementById("userconservice").value = '';
    //    document.getElementById("userappdescription").value = tsk['description'];
    }
    if (tsk[_TYPE] == 'DEVICE_SERVICE') {
        closeOpenNodeForms('tskDevForm');
        _servicesnm = "devconservice";
        getlistservices();
        openForm('tskDevForm');
    if (tsk.hasOwnProperty('description'))
        document.getElementById("devdescription").value = tsk['description'];
    else
        document.getElementById("devdescription").value = '';
    if (tsk.hasOwnProperty('properties'))
        document.getElementById("devconparams").value = tsk['properties'];
    else
        document.getElementById("devconparams").value = '';
    if (tsk.hasOwnProperty('service'))
        document.getElementById("devconservice").value = tsk['service'];
    else
        document.getElementById("devconservice").value = '';
    //    document.getElementById("devdescription").value = tsk['description'];
    }
};
dispfnct['dispnodelabel'] = function (kts,_movsel) { 
            var descrtxt = '';
            if (kts.hasOwnProperty('servicedescr')){
                descrtxt = kts['servicedescr'].slice(0, 20);
            }else {
                if (kts.hasOwnProperty('description')){
                    descrtxt = kts['description'].slice(0, 20);
                }else{
                    descrtxt = 'empty';   
                }
            } 
            var ybor = 50;
            var xbor = 0;
            ctx1.font = "bold 10pt Courier";
            var textMetrics1 = ctx1.measureText(descrtxt);
            var xbor1 = textMetrics1.width;
            var textMetrics2 = ctx1.measureText(kts[_TYPE]);
            var xbor2 = textMetrics2.width;
            if (xbor1 > xbor2) {
                xbor = xbor1 + 20;
            }
            else {
                xbor = xbor2 + 20;
            }

            if ((_movsel == null) || (kts[_ID] !== _movsel[_ID])) {
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
                ctx1.fillText(descrtxt, kts[_XPOS] - _X, kts[_YPOS] - _Y - 30);
                ctx1.font = "bold 8pt Courier";
                ctx1.fillText(kts[_TYPE], kts[_XPOS] - _X, kts[_YPOS] - _Y - 10);
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
};
function dispmess(mes){
    document.getElementById("_message").innerHTML = "<p>"+mes+"!</p>";
    document.getElementById('fieldsUpdatePopup').style.display='block';
}
function updateop(desc){
    var varname = desc + 'description';
    if (document.getElementById(varname)!=null)
        changedescr('description',document.getElementById(varname).value);
    varname = desc + 'conparams';
    if (document.getElementById(varname)!=null)
        changedescr('properties',document.getElementById(varname).value);
    varname = desc + 'conservice';
    if (document.getElementById(varname)!=null){
        var e = document.getElementById(varname);
        var text = e.options[e.selectedIndex].text;
        changedescr('service',document.getElementById(varname).value);
        changedescr('servicedescr',text);
    }
    dispmess('Updates completed');
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
function savediagram(){
try {
    var req = JSON.parse("{}")
    var name = //'testkts1';
            document.getElementById('sv_name').value;
    var descr = //'descrkts';
            document.getElementById('sv_descr').value;
    var jsoninfo = getdiagjson();
    var isappl = document.getElementById("op_appl").checked;
    req['name'] = name;
    req['descr'] = descr;
    req['json'] = jsoninfo;
            //JSON.stringify(jsoninfo);
    var num = 0;
    if (isappl) num = 1;
    req['type'] = num.toString();
    var url = "http://146.124.106.209/workflows/create";
    CallPostUrl(url,"POST",req,[],"savediagram");
} catch (error) {
  alert(error);
}
    closeNodeForm('savediagForm');
}
var _servicesnm = "";
function getlistservices(){
try {
    var url = "http://146.124.106.209/servicecatalogue/get/services";
    CallPostUrl(url,"GET",null,[],"listservices");
} catch (error) {
  dispmess(error);
}
resultfnct['listservices'] = function (arg1) { 
    var names = JSON.parse(arg1);
    var restxt = "";
    if (names.length>0){
        for (let i = 0; i < names.length; i++) {
            restxt += '<option value="'+names[i]['serId']+'">'+names[i]['serName']+'</option>'; 
        }
        document.getElementById(_servicesnm).innerHTML = restxt;
    }


    //alert(arg1);
};
resultfnct['errlistservices'] = function (arg1) { 
    dispmess('an error occurs');
    //alert(arg1);
};
}
function getlistdiagrams(){
try {
    var url = "http://146.124.106.209/workflows/names";
    CallPostUrl(url,"GET",null,[],"listdiagram");
} catch (error) {
  alert(error);
}
}
var _opentype = "";
function opendiagramform(){
    _opentype = "open";
    getlistdiagrams();
    //openForm('opendiagForm');
}
function deletediagramform(){
    _opentype = "delete";
    getlistdiagrams();
    //openForm('deletediagForm');
}
function savediagramform(){
    _opentype = "save";
    openForm('savediagForm');
}
function opendiagram(){
try {
    var req = JSON.parse("{}")
    var name = document.getElementById('op_name').value;
    var url = "http://146.124.106.209/workflows/"+name;
    CallPostUrl(url,"GET",null,[],"opendiagram");
} catch (error) {
  alert(error);
}
    closeNodeForm('opendiagForm');
}
function deletediagram(){
try {
    var req = JSON.parse("{}")
    var name = document.getElementById('del_name').value;
    var url = "http://146.124.106.209/workflows/delete/"+name;
    CallPostUrl(url,"DELETE",null,[],"deletediagram");
} catch (error) {
  alert(error);
}
    closeNodeForm('deletediagForm');
}
resultfnct['opendiagram'] = function (arg1) { 
try {
    var ans = JSON.parse(arg1);
    var data = ans['json'];
            //JSON.parse(ans['json']);
    displayDiagram(data);
} catch (error) {
  alert(error);
}
};
resultfnct['erropendiagram'] = function (arg1) { 
    alert(arg1);
};
resultfnct['savediagram'] = function (arg1) { 
    if (arg1=="200")
        dispmess('Diagram saved');
    //    document.getElementById('fieldsUpdatePopup').style.display='block';
    //alert(arg1);
};
resultfnct['errsavediagram'] = function (arg1) { 
    if (arg1=="201")
        dispmess('Diagram saved');
    else
        dispmess(arg1);
    //    document.getElementById('fieldsUpdatePopup').style.display='block';
    //alert(arg1);
};
resultfnct['deletediagram'] = function (arg1) { 
    dispmess('Diagram deleted');
    //alert(arg1);
};
resultfnct['errdeletediagram'] = function (arg1) { 
    dispmess(arg1);
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
        openForm('opendiagForm');
        document.getElementById("op_name").innerHTML = restxt;
    }
    if (_opentype == "delete"){
        openForm('deletediagForm');
        document.getElementById("del_name").innerHTML = restxt;
    }
    //alert(arg1);
};
resultfnct['errlistdiagram'] = function (arg1) { 
    alert(arg1);
};

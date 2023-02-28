var jsonactions = JSON.parse('[]');
var rolesactions = "";
var jsonroles = JSON.parse('[]');
var _ROLE_NAME = "";
var _ROLE_NUMBER = 0;
function submitUpdatedRole(){
    var chr = "";
    var totalactions = "";
    for (var i = 0; i < jsonactions.length; i++) {    
        if (jsonactions[i].status==1) totalactions += "1";
        else totalactions += "0";
    }
    jsonroles[_ROLE_NUMBER].actions = totalactions;
    document.getElementById('_ACTION_LIST_DIV').style.display='none';
}
function addNewRole(){
var txt = "";
    try{
        updateRoleNames();
        for (var i = 0; i < 11; i++) {    
            if (i>=9&&i<=10){
                txt += '<tr><td id="_ROLE_NAME_'+i+'"  style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
</td>\n\
</tr>';
            }else{
                txt += '<tr><td id="_ROLE_NAME_'+i+'"  style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
<a href="#"><i class="fas fa-edit" onclick="openEditRole('+i+')" title="Edit" style="padding:2px;color:black;font-size:22px"></i></a>\n\
\n\
</td>\n\
</tr>';
            }
        }
        for (var i = 11; i < jsonroles.length; i++) {  
                txt += '<tr><td id="_ROLE_NAME_'+i+'" contenteditable style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
<a href="#"><i class="fas fa-edit" onclick="openEditRole('+i+')" title="Edit" style="padding:2px;color:black;font-size:22px"></i></a>\n\
<a href="#"><i class="far fa-trash-alt" onclick="deleteRole('+i+')" title="Delete" style="padding:2px;color:red;font-size:22px"></i></a>\n\
</td>\n\
</tr>';
        }
        var jrole = JSON.parse("{}");
        jrole.userRole = "New Role";
        jrole.actions = "0000000000000000000";
        jsonroles.push(jrole);
        var num = jsonroles.length - 1;
                txt += '<tr><td id="_ROLE_NAME_'+num+'" contenteditable style="text-align:left">New Role</td>\n\
<td>\n\
<a href="#"><i class="fas fa-edit" onclick="openEditRole('+num+')" title="Edit" style="padding:2px;color:black;font-size:22px"></i></a>\n\
<a href="#"><i class="far fa-trash-alt" onclick="deleteRole('+num+')" title="Delete" style="padding:2px;color:red;font-size:22px"></i></a>\n\
</td>\n\
</tr>';
    var gbody = document.getElementById('rolesbody');
    gbody.innerHTML = txt;
    }catch(error){
        
    }
}
function openEditRole(num){
    // example of use
    //if (!checkauth(_USERACTIONS,'g.color.RED')){
    //    dispmess('Info','user not authorized');
    //    return;
    //}
    //document.querySelectorAll('[class="fas fa-edit"]');
    try{
        rolesactions = jsonroles[num].actions;
        document.getElementById('_ACTION_LIST_DIV').style.display='block';
        _ROLE_NAME = document.getElementById('_ROLE_NAME_'+num).innerHTML;
        jsonroles[num].userRole = _ROLE_NAME;
        _ROLE_NUMBER = num;
        initRoleActions();
    }catch(error){
    
    } 
}
function getFlagFromAction(num){
    try{
        var charat = rolesactions.charAt(num);
        if (charat=='1'){
            setflag(num);
            return "checked";
        }
        return "";
    }catch(error){
        
    }
}
function initRoleList(){
    var url = _BACKENDSERVER+"/usercatalogue/aam/getRoles";
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"_getroles");
}
resultfnct['_getroles'] = function (arg1) {
var txt = "";
try {
    if ((arg1!=null)&&(arg1.length>0)){
        jsonroles = JSON.parse(arg1);
        for (var i = 0; i < 11; i++) {    
            if (i>=9&&i<=10){
                txt += '<tr><td id="_ROLE_NAME_'+i+'"  style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
</td>\n\
</tr>';
            }else{
                txt += '<tr><td id="_ROLE_NAME_'+i+'"  style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
<a href="#"><i class="fas fa-edit" onclick="openEditRole('+i+')" title="Edit" style="padding:2px;color:black;font-size:22px"></i></a>\n\
\n\
</td>\n\
</tr>';
            }
        }
        for (var i = 11; i < jsonroles.length; i++) {    
                txt += '<tr><td contenteditable id="_ROLE_NAME_'+i+'" style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
<a href="#"><i class="fas fa-edit" onclick="openEditRole('+i+')" title="Edit" style="padding:2px;color:black;font-size:22px"></i></a>\n\
<a href="#"><i class="far fa-trash-alt" onclick="deleteRole('+i+')" title="Delete" style="padding:2px;color:red;font-size:22px"></i></a>\n\
</td>\n\
</tr>';
        }
    var gbody = document.getElementById('rolesbody');
    gbody.innerHTML = txt;
    }else{
        dispmess('Error','user not authorized');
    }
} catch (error) {
  alert(error);
}
} 
resultfnct['err_getroles'] = function (arg1) {
  alert(arg1);
} 
function initRoleActions(){
    var gbody = document.getElementById('_LABEL_DETAIL');//<b>Action Items</b>
    gbody.innerHTML = "<b>"+_ROLE_NAME+" Action Items</b>";

    var url = _BACKENDSERVER+"/usercatalogue/aam/getActions";
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"_getactions");
}
resultfnct['_getactions'] = function (arg1) {
var txt = "";
try {
    if ((arg1!=null)&&(arg1.length>0)){
        jsonactions = JSON.parse(arg1);
        for (var i = 0; i < jsonactions.length; i++) {    
            if (jsonactions[i].type==0){
                if (jsonactions[i].name=="g.login"){
                jsonactions[i].status = 0;
                txt += '<tr><td style="text-align:left">'+jsonactions[i].name+'</td>\n\
<td  style="text-align:left">'+jsonactions[i].description+'</td>\n\
<td ><input id="guiitem'+i+'" onclick="return false;" type="checkbox" /></td>\n\
</tr>';
                }else
                if (jsonactions[i].name=="g.userinfo"){
                jsonactions[i].status = 1;
                txt += '<tr><td style="text-align:left">'+jsonactions[i].name+'</td>\n\
<td  style="text-align:left">'+jsonactions[i].description+'</td>\n\
<td ><input id="guiitem'+i+'" type="checkbox" onclick="return false;" checked /></td>\n\
</tr>';
                }else
                txt += '<tr><td style="text-align:left">'+jsonactions[i].name+'</td>\n\
<td  style="text-align:left">'+jsonactions[i].description+'</td>\n\
<td contenteditable><input id="guiitem'+i+'" type="checkbox" onclick="setflag('+i+')" '+getFlagFromAction(i)+' /></td>\n\
</tr>';
            }
        }
    var gbody = document.getElementById('guibody');
    gbody.innerHTML = txt;
    }else{
        dispmess('Error','user not authorized');
    }
} catch (error) {
  alert(error);
}
} 
resultfnct['err_getactions'] = function (arg1) {
  alert(arg1);
} 
function setflag(index){
    var num = 0;
    try{
        if (!jsonactions[index].hasOwnProperty("status")){
            jsonactions[index]["status"] = num;
        }else{
            num = jsonactions[index].status;
        }
        if (num==0) num = 1;
        else num = 0;
        jsonactions[index].status = num;
    }catch(error){
        alert(error);
    }
}
function updateRoleNames(){
        for (var i=0;i<jsonroles.length;i++){
            jsonroles[i].userRole = document.getElementById('_ROLE_NAME_'+i).innerHTML;
        }
}
function submitUserRegistration(){
    var jsonreq = JSON.parse('{}');
    jsonreq.doc = "rolesactions";
    var jsoninfo = JSON.parse('[]');
    try{
        for (var i=0;i<jsonroles.length;i++){
            var jsontmp = JSON.parse('{}');
            jsontmp.services = "111111";
            jsontmp.actions = jsonroles[i].actions;
            //jsontmp.role = jsonroles[i].userRole;
            jsontmp.role = document.getElementById('_ROLE_NAME_'+i).innerHTML;
            jsoninfo.push(jsontmp);
        }
        jsonreq.info = jsoninfo;
        var url = _BACKENDSERVER+"/usercatalogue/aam/add/documents";
        CallPostUrl(url,"POST",jsonreq,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"_postroles");
    }catch(error){
        alert(error);
    }
}
resultfnct['_postroles'] = function (arg1) {
  //alert(arg1);
  dispmess('Info','user roles updated');

} 
resultfnct['err_postroles'] = function (arg1) {
  alert(arg1);
} 
function checkall(){
    var num = 0;
    var flg = false;
    if (document.getElementById('_CHECK_ALL').checked){
        num = 1;
        flg = true;
    }
    for (var i=0;i<jsonactions.length;i++){
        jsonactions[i].status = num;
        document.getElementById('guiitem'+i).checked = flg;
    }
    //guiitem
}
function deleteRole(num){
var txt = "";
//if (num>=10) return;
    try{
        if (confirm("Delete Role?") == false) {
            return;
        }
        updateRoleNames();
        for (var i = 0; i < 11; i++) {    
            if (i>=9&&i<=10){
                txt += '<tr><td id="_ROLE_NAME_'+i+'"  style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
</td>\n\
</tr>';
            }else{
                txt += '<tr><td id="_ROLE_NAME_'+i+'"  style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
<a href="#"><i class="fas fa-edit" onclick="openEditRole('+i+')" title="Edit" style="padding:2px;color:black;font-size:22px"></i></a>\n\
\n\
</td>\n\
</tr>';
            }
        }
        for (var i = 11; i < jsonroles.length; i++) {  
            if (i==num) {continue};
                txt += '<tr><td id="_ROLE_NAME_'+i+'" contenteditable style="text-align:left">'+jsonroles[i].userRole+'</td>\n\
<td>\n\
<a href="#"><i class="fas fa-edit" onclick="openEditRole('+i+')" title="Edit" style="padding:2px;color:black;font-size:22px"></i></a>\n\
<a href="#"><i class="far fa-trash-alt" onclick="deleteRole('+i+')" title="Delete" style="padding:2px;color:red;font-size:22px"></i></a>\n\
</td>\n\
</tr>';
        }
    var gbody = document.getElementById('rolesbody');
    gbody.innerHTML = txt;
    jsonroles.splice(num,1);
    }catch(error){
        alert(error);
    }
}

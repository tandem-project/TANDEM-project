
var _option = 0;
var _TOKEN = "0";
var _USERNAME = "";
var _USERROLE = "";
var _COMPANYNAME = "";
var _CDF=0;
var _UNREGISTER_ACTIONS = "1000000000000000010";
var _USERACTIONS = _UNREGISTER_ACTIONS;
var _BACKENDSERVER = "http://146.124.106.209";
//var _BACKENDSERVER = "http://localhost:8080";
var _BACKENDSERVER1 = "http://146.124.106.209";
function gotopage(name,c){
    gotopage_v1(name,c);
    //window.location.href =name+"?c="+c+"&t="+_TOKEN+"&un="+_USERNAME+"&ur="+_USERROLE;
}
function gotopage_v1(name,c){
    const d = new Date();
    let time = d.getTime();
//if (_COMPANYNAME==""){
        window.location.href =name+"?v="+time+"&c="+c+"&t="+_TOKEN;
    //}
    //else{
    //    window.location.href =name+"?c="+c+"&t="+_TOKEN+"&cn="+_COMPANYNAME;
    //}
}
function creatediv(arg1,mid,mycl){
    var mdiv = null;
    if (document.getElementById(mid)==null){
        mdiv = document.createElement("div");
        document.getElementById('savediagForm').appendChild(mdiv);
        mdiv.id = mid;
        mdiv.className = mycl;
        mdiv.iinnerHTML = arg1;
    }
}
function initdiv(option){
try {
    CallPostUrl("data/messdisp.txt","GET",null,[],"getmes");
    CallPostUrl("data/mquestdisp.txt?v=5","GET",null,[],"getquest");
    var url_string = window.location.href;
    var url = new URL(url_string);
    _TOKEN = url.searchParams.get("t");
    if (_TOKEN==null) _TOKEN = "0";
    //_USERNAME = url.searchParams.get("un");
    //_USERROLE = url.searchParams.get("ur");
    _CDF = url.searchParams.get("c");
    _option = option;
    if (option>0&&_TOKEN=="0") gotopage("index.html");
    var url = "data/navinfo4.txt";
    CallPostUrl(url,"GET",null,[],"getnav");
    if (_FUNCTIONS=="")
        CallPostUrl(_BACKENDSERVER+"/usercatalogue/aam/getActions","GET",null,[],"getfunctions");
} catch (error) {
  alert(error);
}
}
function initdiv_v1(option){
try {
    CallPostUrl("data/messdisp.txt?v=2","GET",null,[],"getmes");
    CallPostUrl("data/mquestdisp.txt?v=4","GET",null,[],"getquest");
    var url_string = window.location.href;
    var url = new URL(url_string);
    _TOKEN = url.searchParams.get("t");
    if (_TOKEN==null) _TOKEN = "0";
    //_USERNAME = url.searchParams.get("un");
    //_USERROLE = url.searchParams.get("ur");
    _CDF = url.searchParams.get("c");
    _option = option;
    if (option>0&&_TOKEN=="0") gotopage("index.html");
    var url = "data/navinfo4.txt";
    CallPostUrl(url,"GET",null,[],"getnav");
    if (_FUNCTIONS=="")
        CallPostUrl(_BACKENDSERVER+"/usercatalogue/aam/getActions","GET",null,[],"getfunctions");
} catch (error) {
  alert(error);
}
}
resultfnct['getfunctions'] = function (arg1) {
var txt = '[';
try {
    if ((arg1!=null)&&(arg1.length>0)){
        jsonactions = JSON.parse(arg1);
        for (var i = 0; i < jsonactions.length; i++) {    
            if (jsonactions[i].type==0){
                if (i>0) txt +=',';
                txt += '"'+jsonactions[i].value+'"';
            }
        }
        txt += ']';
        _FUNCTIONS = txt;
    }else{
        dispmess('Error','user not authorized');
    }
} catch (error) {
  alert(error);
}
}
resultfnct['errgetfunctions'] = function (arg1) {
    alert(arg1);
}
resultfnct['getnav'] = function (arg1) {
    document.getElementById('navdivid').innerHTML = arg1;
    userauthor();
    if (_option!=2){
        document.getElementById('_itsave').style.display='none';
        document.getElementById('_itopen').style.display='none';
        document.getElementById('_itdelete').style.display='none';
    }
    if (_TOKEN=="0"){
        document.getElementById('_ituserinfo').style.display='none';
    }else{
        document.getElementById('_ituserinfo').innerHTML = 'Hello, '+_USERNAME+' '+'<i class="fa fa-fw fa-user">';
        document.getElementById('_ituserinfo').style.display='block';
    }
    if (_option!=0){
        document.getElementById('login').style.display='none';
    }
    if (_option==0){
        if (_TOKEN=="0"){
            document.getElementById('login').style.display='block';
        }else{
            document.getElementById('login').style.display='none';
        }
    }    
    if (_CDF==10){
        userinfo();
    }
/*    if (_option!=0){
        document.getElementById('login').style.display='none';
    }
    if (_option==0){
        if (_TOKEN=="0"){
            document.getElementById('login').style.display='block';
        }else{
            document.getElementById('login').style.display='none';
        }
    }
    if (_option!=2){
        document.getElementById('_itsave').style.display='none';
        document.getElementById('_itopen').style.display='none';
        document.getElementById('_itdelete').style.display='none';
    }
    if (_TOKEN=="0"){
        document.getElementById('_ituserinfo').style.display='none';
    }else{
        document.getElementById('_ituserinfo').innerHTML = 'Hello, '+_USERNAME+' ';
        document.getElementById('_ituserinfo').style.display='block';
    }*/
}
resultfnct['errgetnav'] = function (arg1) {
    allert(arg1);
}
var _MESSMODAL = "";
var _QUESTMODAL = "";
resultfnct['getmes'] = function (arg1) {
    //creatediv(arg1,'messagemodal','w3-modal');
    _MESSMODAL = arg1;
    if (document.getElementById('messagemodal')!=null)
        document.getElementById('messagemodal').innerHTML = arg1;
}
resultfnct['errgetmes'] = function (arg1) {
    allert(arg1);
}
resultfnct['getquest'] = function (arg1) {
    _QUESTMODAL = arg1;
}
resultfnct['errgetquest'] = function (arg1) {
    allert(arg1);
}

function dispmess(title,mes){
    document.getElementById('messagemodal').innerHTML = _MESSMODAL;
    document.getElementById("_messagetitle").innerHTML = title;
    document.getElementById("_message").innerHTML = "<p>"+mes+"!</p>";
    document.getElementById('messagemodal').style.display='block';
}
var _OKBUTTON = false;
function _okpress(){
    _OKBUTTON = true;
    document.getElementById('messagemodal').style.display='none';
}
function _cancelpress(){
    document.getElementById('messagemodal').style.display='none';
}
function dispquest(title,mes,okfunction){
    document.getElementById('messagemodal').innerHTML = _QUESTMODAL;
    document.getElementById('_questbuttons').innerHTML = '<button type="button" class="btn" onclick="'+okfunction+';">Ok</button><button type="button" onclick="_cancelpress()" class="btn">Cancel</button>';
    _OKBUTTON = false;
    document.getElementById("_messagetitle").innerHTML = title;
    document.getElementById("_message").innerHTML = "<p>"+mes+"!</p>";
    document.getElementById('messagemodal').style.display='block';
}
function checkfunctions(u, f){
    for (let i = 0; i < f.length; i++) {
        document.getElementById(f[i]).style.display='none';
        for (let j = 0; j < u.length; j++) {
            if (u[j]==f[i]){
                document.getElementById(f[i]).style.display='block';
            }
        }
    }
}
function userauthor(){
try{
    var functs = JSON.parse(_FUNCTIONS);
    checkfunctions_v1(_UNREGISTER_ACTIONS,functs);
    userauthor_v1();
    if (1==0){
    var roles = JSON.parse(_ROLES);
    var functs = JSON.parse(_FUNCTIONS);
    if (_TOKEN=="0"){
        _USERROLE = "000";
        _COMPANYNAME = "";
        _USERACTIONS = _UNREGISTER_ACTIONS;
    }
    var userfuncts = JSON.parse('[]');
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].role==_USERROLE){
            userfuncts = roles[i].functs;
            checkfunctions(userfuncts,functs);
        }
    }
    }
} catch (error) {
  alert(error);
}}
function userauthor_v1(){
try{
    var sendinfo = JSON.parse("{}");
    sendinfo['token'] = _TOKEN;

    CallPostUrl(_BACKENDSERVER+"/usercatalogue/aam/get/gui/user","GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"fuserauth_v1");
} catch (error) {
  alert(error);
}
}
resultfnct['errfuserauth_v1'] = function (arg1) {
    var functs = JSON.parse(_FUNCTIONS);
    checkfunctions_v1(_UNREGISTER_ACTIONS,functs);
    alert(arg1);
}
resultfnct['fuserauth_v1'] = function (arg1) {
try {
    var ans = JSON.parse(arg1);
    var functs = JSON.parse(_FUNCTIONS);
    checkfunctions_v1(_UNREGISTER_ACTIONS,functs);
    if (ans.status==200){
        _TOKEN = ans.result.token;
        _USERNAME = ans.result.name;
        _USERROLE = ans.result.role;
        _COMPANYNAME = ans.result.company;
        document.getElementById('_ituserinfo').innerHTML = 'Hello, '+_USERNAME+' '+'<i class="fa fa-fw fa-user">';
        document.getElementById('_ituserinfo').style.display='block';
        _USERACTIONS = ans.result.actions;
        checkfunctions_v1(_USERACTIONS,functs);
    }
    if (ans.status!=200){
        _USERROLE = "000";
        _COMPANYNAME = "";
        _USERACTIONS = _UNREGISTER_ACTIONS;
        checkfunctions_v1(_UNREGISTER_ACTIONS,functs);
    }
    completeactions();
} catch (error) {
  checkfunctions_v1(_UNREGISTER_ACTIONS,functs);
  document.getElementById('_ituserinfo').style.display='none';
  alert(error);
}
} 
function completeactions(){
    if (document.getElementById('usercompanylist')!=null)
        getcompanies();
    if (document.getElementById('profilename')!=null)
        document.getElementById('profilename').value = _USERNAME;
}
function checkfunctions_v1(u, f){
    for (let i = 0; i < f.length; i++) {
        if (document.getElementById(f[i])==null){
            continue;
        }
        //if (document.getElementById(f[i]).toString.endsWith("ButtonElement"))
        //    document.getElementById(f[i]).disabled = true;
        //else
           document.getElementById(f[i]).style.display='none';
        var letter = u.charAt(i);
        if (letter=='1'){
            //if (document.getElementById(f[i]).toString.endsWith("ButtonElement"))
            //    document.getElementById(f[i]).disabled = false;
            //else
               document.getElementById(f[i]).style.display='block';
        }
    }
}

function userinfo(){
    if (document.getElementById('profileForm')!=null){
        document.getElementById('profilename').value = _USERNAME;
        document.getElementById('profileForm').style.display = "block";
    }else{
        gotopage('index.html',10);
    }
}
function logoutuser(){
    _TOKEN = "0";
    _USERNAME = '';
    _USERROLE = '000';   
    _USERACTIONS = _UNREGISTER_ACTIONS;
    _COMPANYNAME = "";
    document.getElementById('profileForm').style.display = "none";
    userauthor();
}
function checkauth(u,val){
    for (let i = 0; i < f.length; i++) {
        if (f[i]==val){
            var letter = u.charAt(i);
            if (letter=='1') return true;
            else return false;
        }
    }
}
// this info should be received from back end
var _ROLES = '['+  
'{"role":"000","functs":["_ithome","_itapplications","_itservices","_itservmanagement","_itsco","_itopen","_itproducts","_itdevices","_itinfra","login"]},'+
'{"role":"001","functs":["_ithome","_itapplications","_itservices","_itservmanagement","_itsco","_itopen","_itproducts","_itdevices","_itinfra","_ituserinfo"]},'+
'{"role":"002","functs":["_ithome","_itapplications","_itservices","_itservregistration","_itservmanagement","_itsco","_itsave","_itopen","_itdelete","_itproducts","_itusers","_ituserregistration","_itusermanagement","_itdevices","_itinfra","_itbilling","_itconfig","_ituserinfo"]}'+
']';
//var _FUNCTIONS = '["_ithome","_itapplications","_itservices","_itservregistration","_itservmanagement","_itsco","_itsave","_itopen","_itdelete","_itproducts","_itusers","_ituserregistration","_itusermanagement","_itdevices","_itinfra","_itbilling","_itconfig","login","_ituserinfo"]';
var _FUNCTIONS = '["_ithome","_itapplications","_itservices","_itservregistration","_itservmanagement","_itsco","_itsave","_itopen","_itdelete","_itproducts","_itusers","_ituserregistration","_itusermanagement","_itdevices","_itinfra","_itbilling","_itconfig","login","_ituserinfo"]';
//var _MINFUNCTIONS = '["_ithome","_itapplications","_itservices","_itservmanagement","_itsco","_itopen","_itproducts","_itdevices","_itinfra","login"]';
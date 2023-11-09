function addOperationPopup(){
    document.getElementById("addOperationPopup").style.display = 'block';
}


//function addOperation(tableId, columnsToReplicate){
//    var operation_name = document.getElementById("opname").innerText;
//    var operation_description = document.getElementById("opdesc").innerText;
//    var operation_type = document.getElementById("addoperationtypeselectreg").value;
//    var operation_endpoint = document.getElementById("opendpoint").innerText;
//
//    document.getElementById('addOperationPopup').style.display = 'none';
//    addNewRow(tableId, columnsToReplicate);
//    var table = document.getElementById(tableId);
//    var rowsNum = table.rows.length;
//    var cells = table.rows[rowsNum-1].cells;
//    cells[0].innerText = operation_name;
//    cells[1].innerText = operation_description;
//    cells[2].innerText = operation_type;
//    cells[3].innerHTML = operation_endpoint.slice(0,15) + 
//                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
//                operation_endpoint + "'></i></a>";  
//}


function addNewRow(tableId, columnsToReplicate) {
  var table = document.getElementById(tableId);
  var rows = table.getElementsByTagName('tr');
  var row = table.insertRow(rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = '<select class="regselect" name="interest">'
                        +'<option>Location Based Services</option>'
                        +'<option>Internet of Things (IoT)</option>'
                        +'<option>Industrial Internet of Things (IIoT)</option>'
                        +'<option>Video Analytics</option>'
                        +'<option>Augmented Reality</option>'
                        +'<option>Optimized Local Content Distribution</option>'
                        +'<option>Content Caching</option>'
                        +'<option>Vehicle to Vehicle Services</option>'
                        +'<option>Gaming</option>'
                        +'<option>e-Health</option>'
                        +'<option>Smart City</option>'
                        +'<option>Surveillance</option>'
                    +'</select>';
  cell2.innerHTML = "<a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, 'intereststable')\" style='padding-bottom:5px;color:red;font-size:24px'></i></a>";
}


/*function addColumn(tableId) {
    var rows = document.getElementById(tableId).getElementsByTagName('tr'), i = 0, r, c, clone;
        while (r = rows[i++]) {
            c = r.getElementsByTagName('td');
            clone = cloneEl(c[c.length - 1]);
            cleanUpInputs(clone);
            c[0].parentNode.appendChild(clone);
        }
    }*/
    
    
function cloneEl(el) {
    var clo = el.cloneNode(true);
    return clo;
}
    
    
function cleanUpInputs(obj, tableId, columnsToReplicate) {
    var rows = document.getElementById(tableId).getElementsByTagName('tr');
    var rowToClear = rows[rows.length - 1];
    for (var i = 0; i < rowToClear.cells.length; i++){
        var clearCell = true;
        for (var m = 0; m < columnsToReplicate.length; m++){
            if ((columnsToReplicate[m] == i)){
                clearCell = false;
            }
        }
        if (clearCell == true){
            rowToClear.cells[i].innerHTML = ' ';
        }
    }
}


function deleteRow(t, tableId){
    if (confirm("Delete Row?") == false) {
        return;
    }
    var rowsNumber = document.getElementById(tableId).rows.length;
    if (rowsNumber > 3){
        var row = t.parentNode.parentNode.parentNode;
        document.getElementById(tableId).deleteRow(row.rowIndex);
    }
}


function addBillingAddress(){
    document.getElementById('add-billing-address-btn').style.display = 'none';
    document.getElementById('billingaddress').style.display = 'block';   
}
function getcompanies(){
    initRoles();
    var url = _BACKENDSERVER+"/usercatalogue/aam/getCompanies";
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"_getcompanies");
}
function initRoles(){
    var url = _BACKENDSERVER+"/usercatalogue/aam/getRoles";
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"_getuserroles");
}
resultfnct['err_getuserroles'] = function (arg1) {
    
}
resultfnct['_getuserroles'] = function (arg1) {
var txt = '<option value="Select">Select</option>';
try {
    if ((arg1!=null)&&(arg1.length>0)){
        jsonroles = JSON.parse(arg1);
        for (var i = 0; i < jsonroles.length; i++) {    
                txt += '<option value="'+jsonroles[i].userRole+'">'+jsonroles[i].userRole+'</option>';
        }
    var gbody = document.getElementById('userrolereg');
    gbody.innerHTML = txt;
    }else{
        dispmess('Error','user not authorized');
    }
} catch (error) {
  alert(error);
}
} 
resultfnct['_getcompanies'] = function (arg1) {
var txt = '<table><tr><td>';
txt += '<select id="usercomplistreg" name="usercomplistreg">';
txt += '<option value="Select">Select</option>'

try {
    if ((arg1!=null)&&(arg1.length>0)){
        var json = JSON.parse(arg1);
        for (var i = 0; i < json.length; i++) {  
            txt += '<option value="'+json[i].companyName+'">'+json[i].companyName+'</option>'
        }
    txt += '</select></td></tr><tr><td>';
    txt += '<input type="text" id="usercompanynamereg" name="usercompanynamereg" placeholder="New..">';
    txt += '</td></tr></table>';
    var gbody = document.getElementById('usercompanylist');
    //gbody.innerHTML = txt;
    if (_TOKEN=="0"){
        var accountsel = document.getElementById('useraccounttypereg');
        accountsel.innerHTML = '<option value="Professional">Professional</option>';
        var rolesel = document.getElementById('userrolereg');
        rolesel.innerHTML = '<option value="Administrator">Administrator</option>';
        gbody.innerHTML = txt;
    }else{
        var finaltxt = "";
        if (_USERROLE=="Operator"){
            finaltxt = txt;
        }else{
            finaltxt = '<input type="text" id="usercompanynamereg" name="usercompanynamereg" value="'+_COMPANYNAME+'" readonly>';
        }
        gbody.innerHTML = finaltxt;
    }
    }else{
        dispmess('Error','user not authorized');
    }
} catch (error) {
  alert(error);
}
} 
resultfnct['err_getcompanies'] = function (arg1) {
  alert(arg1);
} 




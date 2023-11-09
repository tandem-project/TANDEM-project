function submitUpdatedChargeUnit(num, newChargeUnit){
    var nameId = 'chargeunitnamereg' + num;
    var idId = 'chargeunitidreg' + num;
   
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
   
    var chargeUnit = {
        name: name,
        id: id
    };
   
    jsonchargeunits[num].name = name;
    jsonchargeunits[num].id = id;
    
    //Update charge unit in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/pricingunit";
    CallPostUrl(url,"POST",chargeUnit,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatechargeunit");
    
    
    // If it was a new charge unit, add row in Table
    if (newChargeUnit)
    {
        var table = document.getElementById("chargeunitstable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditChargeUnit('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteChargeUnit('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
       
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_CHARGE_UNIT_NAME_"+num+"' style='text-align:left'>"+jsonchargeunits[num].name+"</td>\
                        <td>"
                            + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update charge unit name in table
        var table = document.getElementById("chargeunitstable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_CHARGE_UNIT_' + num).style.display = 'none';
}

resultfnct['_updatechargeunit'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Charge unit updated!');

};
resultfnct['err_updatechargeunit'] = function (arg1) {
    console.log("ERROR in charge unit submission");
    dispmess('info','Charge unit updated');
};

function addNewChargeUnit(){
    var chargeUnit = {
        name: "",
        id: ""
    };
    var num = jsonchargeunits.length;
    console.log("num = " + num);
    
    jsonchargeunits.push(chargeUnit);
    try{
        openEditChargeUnit(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditChargeUnit(num){
    try{
        var newChargeUnit = false;
        var chargeunitname = jsonchargeunits[num].name;
        if (chargeunitname === "")
        {
            chargeunitname = "New Charge Unit";
            newChargeUnit = true;
        }

        var elemDiv = document.createElement('div');
        var divId = '_EDIT_CHARGE_UNIT_' + num;
        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editChargeUnitTitle' style='text-align: center;'><b>" + chargeunitname + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editchargeunitform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='chargeunitnamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='chargeunitnamereg" + num + "' name='chargeunitnamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='chargeunitidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='chargeunitidreg" + num + "' name='chargeunitidreg'>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedChargeUnit(" + num + ", " + newChargeUnit + ")'>Update</button>\
                                <button type='button' class='btn cancel' onclick=\"document.getElementById('" + divId + "').style.display='none';\">Close</button>\
                            </div>\
                        </div>\
                    </form>\
                    </div>\
                    </div>\
                    </div>\
                     </div>\
                    </div>";
        console.log("txt1 = " + txt1);
        console.log("txt2 = " + txt2);
        var txt = txt1 + txt2;
        elemDiv.innerHTML = txt;
        console.log("elemDiv.innerHTML = " + elemDiv.innerHTML);
        // Insert the div to the document
        document.body.appendChild(elemDiv);
        initChargeUnit(num);
        document.getElementById(divId).style.display = 'block';
        // Make ID editable or not accordingly
        var id = document.getElementById("chargeunitidreg" + num);
        if (chargeunitname === "New Charge Unit")
        {
            id.contenteditable = true;
            
        }
        else{
            id.disabled = true;
        }
        return true;
    }catch(error){
        return false;
    } 
}

function initChargeUnitList(){
    var url = _BACKENDSERVER+"/systemmanager/get/parameters/pricingunit";

    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getchargeunit");
}

resultfnct['getchargeunit'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            jsonchargeunits = JSON.parse(arg1);
            for (var i = 0; i < jsonchargeunits.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditChargeUnit('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteChargeUnit('" + i + "')\"></i>");
       
                iconstab["rows"].push(iconsarr1);
     
                 ////////////////////////////////// construct icons table
                txt += "<tr><td id='_CHARGE_UNIT_NAME_"+i+"' style='text-align:left'>"+jsonchargeunits[i].name+"</td>\
                            <td>"
                                + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
            console.log("html txt = " + txt);
            if (txt !== "")
            {
                var gbody = document.getElementById('chargeunitsbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetchargeunit'] = function (arg1) {
    console.log("#2");
    alert(arg1);
};

function initChargeUnit(num){
    var chargeUnit = jsonchargeunits[num];
    var nameId = 'chargeunitnamereg' + num;
    var idId = 'chargeunitidreg' + num;
   
    var name = document.getElementById(nameId);
    
    name.value = chargeUnit.name;
    var id = document.getElementById(idId);
    
    id.value = chargeUnit.id;
    id.contenteditable = false;
    
}

async function deleteChargeUnit(num){
    try{
        if (confirm("Delete Charge Unit?") === false) {
            return;
        }
        var chargeUnit = jsonchargeunits[num];

        //Remove charge unit from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/pricingunit/" + chargeUnit.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletechargeunit");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deletechargeunit'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Charge unit deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeletechargeunit'] = function (arg1) {
    console.log("ERROR in charge unit deletion");

    dispmess('info','Charge unit deleted');
};
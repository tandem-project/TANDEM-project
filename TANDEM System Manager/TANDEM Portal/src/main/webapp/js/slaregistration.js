function submitUpdatedSLA(num, newSLA){
    var nameId = 'slanamereg' + num;
    var idId = 'slaidreg' + num;
    var descrId = 'sladescrreg' + num;
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    var description = document.getElementById(descrId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
   
    var sla = {
        name: name,
        id: id,
        description: description
    };
   
    jsonslas[num].name = name;
    jsonslas[num].id = id;
    jsonslas[num].description = description;
    
    //Update SLA in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/sla";
    CallPostUrl(url,"POST",sla,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatesla");
    
    
    // If it was a new SLA, add row in Table
    if (newSLA)
    {
        var table = document.getElementById("slastable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditSLA('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteSLA('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
       
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_SLA_NAME_"+num+"' style='text-align:left'>"+jsonslas[num].name+"</td>\
                        <td>" +
                            _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update SLA name in table
        var table = document.getElementById("slastable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_SLA_' + num).style.display = 'none';
}

resultfnct['_updatesla'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','SLA updated!');

};
resultfnct['err_updatesla'] = function (arg1) {
    console.log("ERROR in SLA submission");
    dispmess('info','SLA updated');
};

function addNewSLA(){
    var sla = {
        name: "",
        id: "",
        description: ""
    };
    var num = jsonslas.length;
    console.log("num = " + num);
    
    jsonslas.push(sla);
    try{
        openEditSLA(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditSLA(num){
    try{
        var newSLA = false;
        var slaname = jsonslas[num].name;
        if (slaname === "")
        {
            slaname = "New SLA";
            newSLA = true;
        }

        var elemDiv = document.createElement('div');
        var divId = '_EDIT_SLA_' + num;
        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editSLATitle' style='text-align: center;'><b>" + slaname + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editslaform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='slanamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='slanamereg" + num + "' name='slanamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='slaidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='slaidreg" + num + "' name='slaidreg'>\
                            </div>\
                        </div>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='sladescrreg'>Description</label>\
                            </div>\
                            <div class='col-srvregistration' style='width:57%'>\
                                <textarea style='height:20%;' id='sladescrreg" + num + "' name='sladescrreg'></textarea>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedSLA(" + num + ", " + newSLA + ")'>Update</button>\
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
        initSLA(num);
        document.getElementById(divId).style.display = 'block';
        // Make ID editable or not accordingly
        var id = document.getElementById("slaidreg" + num);
        if (slaname === "New SLA")
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

function initSlaList(){
    var url = _BACKENDSERVER+"/systemmanager/get/parameters/sla";

    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getsla");
}

resultfnct['getsla'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            jsonslas = JSON.parse(arg1);
            for (var i = 0; i < jsonslas.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditSLA('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteSLA('" + i + "')\"></i>");
       
                iconstab["rows"].push(iconsarr1);
     
                 ////////////////////////////////// construct icons table
                txt += "<tr><td id='_SLA_NAME_"+i+"' style='text-align:left'>"+jsonslas[i].name+"</td>\
                            <td>"
                               + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
            //console.log("html txt = " + txt);
            if (txt !== "")
            {
                var gbody = document.getElementById('slasbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetsla'] = function (arg1) {
    console.log("#2");
    alert(arg1);
};

function initSLA(num){
    var sla = jsonslas[num];
    var nameId = 'slanamereg' + num;
    var idId = 'slaidreg' + num;
    var descrid = 'sladescrreg' + num;
    var name = document.getElementById(nameId);
    
    name.value = sla.name;
    var id = document.getElementById(idId);
    
    id.value = sla.id;
    id.contenteditable = false;
    var description = document.getElementById(descrid);
    
    description.value = sla.description;
}


async function deleteSLA(num){
    try{
        if (confirm("Delete SLA?") === false) {
            return;
        }
        var sla = jsonslas[num];

        //Remove SLA from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/sla/" + sla.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletesla");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deletesla'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','SLA deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeletesla'] = function (arg1) {
    console.log("ERROR in SLA deletion");

    dispmess('info','SLA deleted');
};
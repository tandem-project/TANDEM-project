//var element = "";

function submitUpdatedZone(num, newZone){
    var nameId = 'zonenamereg' + num;
    var idId = 'zoneidreg' + num;
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
    var zone = {
        name: name,
        id: id
    };
    jsonzones[num].name = name;
    jsonzones[num].id = id;
   
    
    //Update zone in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/availabilityzone";
    CallPostUrl(url,"POST",zone,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatezone");
    
    
    // If it was a new zone, add row in Table
    if (newZone)
    {
        var table = document.getElementById("zonestable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditZone('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteZone('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_ZONE_NAME_"+num+"' style='text-align:left'>"+jsonzones[num].name+"</td>\
                        <td>"
                            + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update zone name in table
        var table = document.getElementById("zonestable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_ZONE_' + num).style.display = 'none';
}

resultfnct['_updatezone'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Zone updated!');

};
resultfnct['err_updatezone'] = function (arg1) {
    console.log("ERROR in zone submission");
    dispmess('info','Zone updated');
};

function addNewZone(){
    var zone = {
        name: "",
        id: ""
    };
    var num = jsonzones.length;
    console.log("num = " + num);
    
    jsonzones.push(zone);
    console.log("jsonzones = " + jsonzones);
    try{
        console.log("About to open zone");
        openEditZone(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditZone(num){
//    console.log("In openEditProvider!");
    try{
        var newZone = false;
        var zonename = jsonzones[num].name;
        if (zonename === "")
        {
            zonename = "New Zone";
            newZone = true;
        }

//        console.log("providername: " + providername);
        var elemDiv = document.createElement('div');
        var divId = '_EDIT_ZONE_' + num;
        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editZoneTitle' style='text-align: center;'><b>" + zonename + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editzoneform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='zonenamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='zonenamereg" + num + "' name='zonenamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='zoneidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='zoneidreg" + num + "' name='zoneidreg'>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedZone(" + num + ", " + newZone + ")'>Update</button>\
                                <button type='button' class='btn cancel' onclick=\"document.getElementById('" + divId + "').style.display='none';\">Close</button>\
                            </div>\
                        </div>\
                    </form>\
                    </div>\
                    </div>\
                    </div>\
                     </div>\
                    </div>";

        var txt = txt1 + txt2;
        elemDiv.innerHTML = txt;
        // Insert the div to the document
        document.body.appendChild(elemDiv);
        
        initZone(num);
        
        // Make ID editable or not accordingly
        document.getElementById(divId).style.display = 'block';
        var id = document.getElementById("zoneidreg" + num);
        if (zonename === "New Zone")
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

function initZoneList(){

//    element = "provider";
    var url = _BACKENDSERVER+"/systemmanager/get/parameters/availabilityzone";
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getzones");
}

resultfnct['getzones'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            //console.log("arguments received!");
            jsonzones = JSON.parse(arg1);
            for (var i = 0; i < jsonzones.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditZone('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteZone('" + i + "')\"></i>");
                iconstab["rows"].push(iconsarr1);
     
                ////////////////////////////////// construct icons table
                txt += "<tr><td id='_ZONE_NAME_"+i+"' style='text-align:left'>"+jsonzones[i].name+"</td>\
                            <td>"
                                + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
            //console.log("html txt = " + txt);
            if (txt !== "")
            {
                var gbody = document.getElementById('zonesbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetzones'] = function (arg1) {
    alert(arg1);
};

function initZone(num){
    var zone = jsonzones[num];
    var nameId = 'zonenamereg' + num;
    var idId = 'zoneidreg' + num;
   
    var name = document.getElementById(nameId);
    
    name.value = zone.name;
    var id = document.getElementById(idId);
    
    id.value = zone.id;
    id.contenteditable = false;
}

async function deleteZone(num){
    try{
        if (confirm("Delete Zone?") === false) {
            return;
        }
        var zone = jsonzones[num];

        //Remove zone from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/availabilityzone/" + zone.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletezone");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deletezone'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Zone deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeletezone'] = function (arg1) {
    console.log("ERROR in zone deletion");

    dispmess('info','Zone deleted');
};
//var element = "";

function submitUpdatedLocation(num, newLocation){
    var nameId = 'locationnamereg' + num;
    var idId = 'locationidreg' + num;
    var descrId = 'locationdescrreg' + num;
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    var description = document.getElementById(descrId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
    var location = {
        name: name,
        id: id,
        description: description
    };
    jsonlocations[num].name = name;
    jsonlocations[num].id = id;
    jsonlocations[num].description = description;
    
    //Update location in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/location";
    CallPostUrl(url,"POST",location,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatelocation");
    
    
    // If it was a new location, add row in Table
    if (newLocation)
    {
        var table = document.getElementById("locationstable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditLocation('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteLocation('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_LOCATION_NAME_"+num+"' style='text-align:left'>"+jsonlocations[num].name+"</td>\
                        <td>"
                            + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update location name in table
        var table = document.getElementById("locationstable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_LOCATION_' + num).style.display = 'none';
}

resultfnct['_updatelocation'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Location updated!');

};
resultfnct['err_updatelocation'] = function (arg1) {
    console.log("ERROR in location submission");
    dispmess('info','Location updated');
};

function addNewLocation(){
    var location = {
        name: "",
        id: "",
        description: ""
    };
    var num = jsonlocations.length;
    console.log("num = " + num);
    
    jsonlocations.push(location);
    console.log("jsonlocations = " + jsonlocations);
    try{
        console.log("About to open location");
        openEditLocation(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditLocation(num){

    try{
        var newLocation = false;
        var locationname = jsonlocations[num].name;
        if (locationname === "")
        {
            locationname = "New Location";
            newLocation = true;
        }

        var elemDiv = document.createElement('div');
        var divId = '_EDIT_LOCATION_' + num;
//        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editLocationTitle' style='text-align: center;'><b>" + locationname + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editlocationform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='locationnamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='locationnamereg" + num + "' name='locationnamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='locationidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='locationidreg" + num + "' name='locationidreg'>\
                            </div>\
                        </div>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='locationdescrreg'>Description</label>\
                            </div>\
                            <div class='col-srvregistration' style='width:57%'>\
                                <textarea style='height:20%;' id='locationdescrreg" + num + "' name='locationdescrreg'></textarea>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedLocation(" + num + ", " + newLocation + ")'>Update</button>\
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
        
        initLocation(num);
        
        // Make ID editable or not accordingly
        document.getElementById(divId).style.display = 'block';
        var id = document.getElementById("locationidreg" + num);
        if (locationname === "New Location")
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

function initLocationList(){
    var url = _BACKENDSERVER+"/systemmanager/get/parameters/location";
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getlocations");
}

resultfnct['getlocations'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            jsonlocations = JSON.parse(arg1);
            for (var i = 0; i < jsonlocations.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditLocation('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteLocation('" + i + "')\"></i>");
                iconstab["rows"].push(iconsarr1);
     
                ////////////////////////////////// construct icons table
                txt += "<tr><td id='_LOCATION_NAME_"+i+"' style='text-align:left'>"+jsonlocations[i].name+"</td>\
                            <td>"
                                + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }

            if (txt !== "")
            {
                var gbody = document.getElementById('locationsbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetlocations'] = function (arg1) {
    alert(arg1);
};

function initLocation(num){
    var location = jsonlocations[num];
    var nameId = 'locationnamereg' + num;
    var idId = 'locationidreg' + num;
    var descrId = 'locationdescrreg' + num;
    var name = document.getElementById(nameId);
    
    name.value = location.name;
    var id = document.getElementById(idId);
    
    id.value = location.id;
    id.contenteditable = false;
    var description = document.getElementById(descrId);
    
    description.value = location.description;
}

async function deleteLocation(num){
    try{
        if (confirm("Delete Location?") === false) {
            return;
        }
        var location = jsonlocations[num];

        //Remove location from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/location/" + location.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletelocation");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deletelocation'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Location deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeletelocation'] = function (arg1) {
    console.log("ERROR in location deletion");

    dispmess('info','Location deleted');
};
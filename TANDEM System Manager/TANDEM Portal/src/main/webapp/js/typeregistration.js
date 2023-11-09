var element = "";

function submitUpdatedType(num, newType){
    var nameId = 'typenamereg' + num;
    var idId = 'typeidreg' + num;
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
    var type = {
        name: name,
        id: id
    };
    jsontypes[num].name = name;
    jsontypes[num].id = id;
   
    
    //Update type in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/" + element;
    CallPostUrl(url,"POST",type,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatetype");
    
    
    // If it was a new type, add row in Table
    if (newType)
    {
        var table = document.getElementById("typestable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditType('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteType('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
     
                ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_TYPE_NAME_"+num+"' style='text-align:left'>"+jsontypes[num].name+"</td>\
                        <td>"
                            + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update type name in table
        var table = document.getElementById("typestable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_TYPE_' + num).style.display = 'none';
}

resultfnct['_updatetype'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Type updated!');

};
resultfnct['err_updatetype'] = function (arg1) {
    console.log("ERROR in type submission");
    dispmess('info','Type updated');
};

function addNewType(){
    var type = {
        name: "",
        id: ""
    };
    var num = jsontypes.length;
//    console.log("num = " + num);
    
    jsontypes.push(type);
//    console.log("jsontypes = " + jsontypes);
    try{
        console.log("About to open type");
        openEditType(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditType(num){
//    console.log("In openEditType!");
    try{
        var newType = false;
        var typename = jsontypes[num].name;
        if (typename === "")
        {
            typename = "New Type";
            newType = true;
        }

        console.log("typename: " + typename);
        var elemDiv = document.createElement('div');
        var divId = '_EDIT_TYPE_' + num;
//        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editTypeTitle' style='text-align: center;'><b>" + typename + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='edittypeform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='typenamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='typenamereg" + num + "' name='typenamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='typeidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='typeidreg" + num + "' name='typeidreg'>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedType(" + num + ", " + newType + ")'>Update</button>\
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
        
        initType(num);
        
        // Make ID editable or not accordingly
        document.getElementById(divId).style.display = 'block';
        var id = document.getElementById("typeidreg" + num);
        if (typename === "New Type")
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

function initTypeList(arg1){
    if (arg1 === 0)
    {
        var url = _BACKENDSERVER+"/systemmanager/get/parameters/servicetype";
        element = "servicetype";
    }
    else if (arg1 === 1)
    {
        var url = _BACKENDSERVER+"/systemmanager/get/parameters/producttype";
        element = "producttype";
    }
    else if (arg1 === 2)
    {
        var url = _BACKENDSERVER+"/systemmanager/get/parameters/devicetype";
        element = "devicetype";
    }
    else if (arg1 === 3)
    {
        var url = _BACKENDSERVER+"/systemmanager/get/parameters/nodetype";
        element = "nodetype";
    }
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"gettypes");
}

resultfnct['gettypes'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            jsontypes = JSON.parse(arg1);
            for (var i = 0; i < jsontypes.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditType('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteType('" + i + "')\"></i>");
                iconstab["rows"].push(iconsarr1);
     
                ////////////////////////////////// construct icons table
                txt += "<tr><td id='_TYPE_NAME_"+i+"' style='text-align:left'>"+jsontypes[i].name+"</td>\
                            <td>"
                                + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
            if (txt !== "")
            {
                var gbody = document.getElementById('typesbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgettypes'] = function (arg1) {
    alert(arg1);
};

function initType(num){
    var type = jsontypes[num];
    var nameId = 'typenamereg' + num;
    var idId = 'typeidreg' + num;
   
    var name = document.getElementById(nameId);
    
    name.value = type.name;
    var id = document.getElementById(idId);
    
    id.value = type.id;
    id.contenteditable = false;
}

async function deleteType(num){
    try{
        if (confirm("Delete Type?") === false) {
            return;
        }
        var type = jsontypes[num];

        //Remove type from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/" + element + "/" + type.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletetype");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deletetype'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Type deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeletetype'] = function (arg1) {
    console.log("ERROR in type deletion");

    dispmess('info','Type deleted');
};

//----------------------------------------------------

// Gets the types Ids and returns their names
async function validTypes(typeIds) {
    var typeNames = [];
    //console.log("typeIds = " + typeIds);
    if ((typeIds !== null) && Array.isArray(typeIds) && typeIds.length > 0)
    {
        //console.log("About to find the type names")
        const typeUrl = _BACKENDSERVER + "/systemmanager/get/parameters/servicetype";
        await fetch(typeUrl)
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i < data.length; i++)
                {
                    if (typeIds.includes(data[i].id))
                    {
                    
                        typeNames.push(data[i].name);
                    }
                }
            })
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
    }
    if (typeNames.length > 0)
    {
        return typeNames;
    }
    else
    {
        return null;
    }
}
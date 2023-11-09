var element = "";

function submitUpdatedProvider(num, newProvider){
    var nameId = 'providernamereg' + num;
    var idId = 'provideridreg' + num;
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
    var provider = {
        name: name,
        id: id
    };
    jsonproviders[num].name = name;
    jsonproviders[num].id = id;
   
    
    //Update provider in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/" + element;
    CallPostUrl(url,"POST",provider,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updateprovider");
    
    
    // If it was a new provider, add row in Table
    if (newProvider)
    {
        var table = document.getElementById("providerstable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditProvider('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteProvider('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_PROVIDER_NAME_"+num+"' style='text-align:left'>"+jsonproviders[num].name+"</td>\
                        <td>"
                            + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update provider name in table
        var table = document.getElementById("providerstable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_PROVIDER_' + num).style.display = 'none';
}

resultfnct['_updateprovider'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Provider updated!');

};
resultfnct['err_updateprovider'] = function (arg1) {
    console.log("ERROR in provider submission");
    dispmess('info','Provider updated');
};

function addNewProvider(){
    var provider = {
        name: "",
        id: ""
    };
    var num = jsonproviders.length;
    console.log("num = " + num);
    
    jsonproviders.push(provider);
    console.log("jsonproviders = " + jsonproviders);
    try{
        console.log("About to open provider");
        openEditProvider(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditProvider(num){
    console.log("In openEditProvider!");
    try{
        var newProvider = false;
        var providername = jsonproviders[num].name;
        if (providername === "")
        {
            providername = "New Provider";
            newProvider = true;
        }

        console.log("providername: " + providername);
        var elemDiv = document.createElement('div');
        var divId = '_EDIT_PROVIDER_' + num;
        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editProviderTitle' style='text-align: center;'><b>" + providername + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editproviderform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='providernamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='providernamereg" + num + "' name='providernamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='provideridreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='provideridreg" + num + "' name='provideridreg'>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedProvider(" + num + ", " + newProvider + ")'>Update</button>\
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
        
        initProvider(num);
        
        // Make ID editable or not accordingly
        document.getElementById(divId).style.display = 'block';
        var id = document.getElementById("provideridreg" + num);
        if (providername === "New Provider")
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

function initProviderList(){
//    if (arg1 === 0)
//    {
    element = "provider";
    var url = _BACKENDSERVER+"/systemmanager/get/parameters/" + element;
        
//    }
//    else if (arg1 === 1)
//    {
//        var url = _BACKENDSERVER+"/systemmanager/get/parameters/producttype";
//        element = "producttype";
//    }
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getproviders");
}

resultfnct['getproviders'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            //console.log("arguments received!");
            jsonproviders = JSON.parse(arg1);
            for (var i = 0; i < jsonproviders.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditProvider('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteProvider('" + i + "')\"></i>");
                iconstab["rows"].push(iconsarr1);
     
                ////////////////////////////////// construct icons table
                txt += "<tr><td id='_PROVIDER_NAME_"+i+"' style='text-align:left'>"+jsonproviders[i].name+"</td>\
                            <td>"
                                + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
            //console.log("html txt = " + txt);
            if (txt !== "")
            {
                var gbody = document.getElementById('providersbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetproviders'] = function (arg1) {
//    console.log("#2");
    alert(arg1);
};

function initProvider(num){
    var provider = jsonproviders[num];
    var nameId = 'providernamereg' + num;
    var idId = 'provideridreg' + num;
   
    var name = document.getElementById(nameId);
    
    name.value = provider.name;
    var id = document.getElementById(idId);
    
    id.value = provider.id;
    id.contenteditable = false;
}

async function deleteProvider(num){
    try{
        if (confirm("Delete Provider?") === false) {
            return;
        }
        var provider = jsonproviders[num];

        //Remove provider from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/" + element + "/" + provider.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deleteprovider");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deleteprovider'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Provider deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeleteprovider'] = function (arg1) {
    console.log("ERROR in provider deletion");

    dispmess('info','Provider deleted');
};
var element = "";

function submitUpdatedState(num, newState){
    var nameId = 'statenamereg' + num;
    var idId = 'stateidreg' + num;
    var nextId = 'nextstatestable' + num;
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
    var nexts = new Array();
    var tableNexts = document.getElementById(nextId);
    var tr = tableNexts.getElementsByTagName("tr");
    //Reference the CheckBoxes in Table.
    var checkBoxes = tableNexts.getElementsByTagName("INPUT");
    var nextIndex = 0;
    var checkboxIndex = 0;
    for (var i = 2; i < tr.length; i++) {
        var next = "";
        if (checkBoxes[checkboxIndex].checked) {
            
            next = tableNexts.rows[i].cells[0].innerHTML;

            nexts[nextIndex] = next;
            nextIndex++;
        }
        checkboxIndex++;
    }
    var state = {
        name: name,
        id: id,
        next: nexts
    };
    console.log("nexts = " + nexts);
    jsonstates[num].name = name;
    jsonstates[num].id = id;
    jsonstates[num].next = nexts;
    
    //Update state in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/" + element;
    CallPostUrl(url,"POST",state,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatestate");
    
    
    // If it was a new state, add row in Table
    if (newState)
    {
        var table = document.getElementById("statestable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditState('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteState('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_STATE_NAME_"+num+"' style='text-align:left'>"+jsonstates[num].name+"</td>\
                        <td>"
                            + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update state name in table
        var table = document.getElementById("statestable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_STATE_' + num).style.display = 'none';
}

resultfnct['_updatestate'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','State updated!');

};
resultfnct['err_updatestate'] = function (arg1) {
    console.log("ERROR in state submission");
    dispmess('info','State updated');
};

function addNewState(){
    var state = {
        name: "",
        id: "",
        next:[]
    };
    var num = jsonstates.length;
    console.log("num = " + num);
    
    jsonstates.push(state);
//    console.log("jsonstates = " + jsonstates);
    try{
//        console.log("About to open state");
        openEditState(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditState(num){
    try{
        var newState = false;
        var statename = jsonstates[num].name;
        if (statename === "")
        {
            statename = "New State";
            newState = true;
        }

        var elemDiv = document.createElement('div');
        var divId = '_EDIT_STATE_' + num;
//        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editStateTitle' style='text-align: center;'><b>" + statename + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editstateform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='statenamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='statenamereg" + num + "' name='statenamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='stateidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='stateidreg" + num + "' name='stateidreg'>\
                            </div>\
                        </div>\
                        <div class='row regformrow' style='margin-left: 30%'>\
                            <div class='col-srvregistration-tables' style='width:70%'>\
                                <table class='srvregtable' id='nextstatestable" + num + "'>\
                                    <thead>\
                                        <tr>\
                                            <td style='background-color: #9e9e9e;' colspan='100%'><b>Next states</b></td>\
                                        </tr>\
                                        <tr>\
                                            <th>State</th>\
                                            <th>Select</th>\
                                        </tr>\
                                    </thead>\
                                    <tbody>\
                                    </tbody>\
                                </table>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedState(" + num + ", " + newState + ")'>Update</button>\
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
//        console.log("elemDiv.innerHTML = " + elemDiv.innerHTML);
        // Insert the div to the document
        document.body.appendChild(elemDiv);
//        console.log("About to initialise the state...");
        initState(num);
//        console.log("After intState()....");
        document.getElementById(divId).style.display = 'block';
        // Make ID editable or not accordingly
        var id = document.getElementById("stateidreg" + num);
        if (statename === "New State")
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

function initStateList(arg1){
    var url = "#";
    if (arg1 === 0)
    {
        url = _BACKENDSERVER+"/systemmanager/get/parameters/servicestate";
        element = "servicestate";
    }
    else if (arg1 === 1)
    {
        
        url = _BACKENDSERVER+"/systemmanager/get/parameters/productstate";
        element = "productstate";
    }
    else if (arg1 === 2)
    {
        url = _BACKENDSERVER+"/systemmanager/get/parameters/applicationstate";
        element = "applicationstate";
    }
    console.log("Calling URL...");
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getstates");
    console.log("After calling URL!");
}

resultfnct['getstates'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            jsonstates = JSON.parse(arg1);
            for (var i = 0; i < jsonstates.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditState('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteState('" + i + "')\"></i>");
                iconstab["rows"].push(iconsarr1);
     
                ////////////////////////////////// construct icons table
                txt += "<tr><td id='_STATE_NAME_"+i+"' style='text-align:left'>"+jsonstates[i].name+"</td>\
                            <td>"
                                + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
            console.log("html txt = " + txt);
            if (txt !== "")
            {
                var gbody = document.getElementById('statesbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetstates'] = function (arg1) {
    console.log("#2");
    alert(arg1);
};

function initState(num){
    var state = jsonstates[num];
    var nameId = 'statenamereg' + num;
    var idId = 'stateidreg' + num;
    var nextId = 'nextstatestable' + num;
   
    var name = document.getElementById(nameId);
    
    name.value = state.name;
    var id = document.getElementById(idId);
    
    id.value = state.id;
    id.contenteditable = false;
    var statesURL = _BACKENDSERVER+"/systemmanager/get/parameters/" + element;
    //Empty the table before filling it again
    emptyTable(nextId);
    jsonToTable(nextId, statesURL, state.next);
    console.log("statesURL = " + statesURL);
}


async function deleteState(num){
    try{
        if (confirm("Delete State?") === false) {
            return;
        }
        var state = jsonstates[num];

        //Remove state from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/" + element + "/" + state.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletestate");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deletestate'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','State deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeletestate'] = function (arg1) {
    console.log("ERROR in state deletion");

    dispmess('info','State deleted');
};
function submitUpdatedPriceModel(num, newPriceModel){
    var nameId = 'pricemodelnamereg' + num;
    var idId = 'pricemodelidreg' + num;
   
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
   
    var priceModel = {
        name: name,
        id: id
    };
   
    jsonpricemodels[num].name = name;
    jsonpricemodels[num].id = id;
    
    //Update price model in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/pricingmodel";
    CallPostUrl(url,"POST",priceModel,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatepricemodel");
    
    
    // If it was a new price model, add row in Table
    if (newPriceModel)
    {
        var table = document.getElementById("pricemodelstable");
        var row = table.insertRow(-1);
        
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditPriceModel('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deletePriceModel('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
       
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        
        var txt = "<tr><td id='_PRICE_MODEL_NAME_"+num+"' style='text-align:left'>"+jsonpricemodels[num].name+"</td>\
                        <td>" + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update price model name in table
        var table = document.getElementById("pricemodelstable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_PRICE_MODEL_' + num).style.display = 'none';
}

resultfnct['_updatepricemodel'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Price model updated!');

};
resultfnct['err_updatepricemodel'] = function (arg1) {
    console.log("ERROR in price model submission");
    dispmess('info','Price model updated');
};

function addNewPriceModel(){
    var priceModel = {
        name: "",
        id: ""
    };
    var num = jsonpricemodels.length;
    console.log("num = " + num);
    
    jsonpricemodels.push(priceModel);
    try{
        openEditPriceModel(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditPriceModel(num){
    try{
        var newPriceModel = false;
        var pricemodelname = jsonpricemodels[num].name;
        if (pricemodelname === "")
        {
            pricemodelname = "New Price Model";
            newPriceModel = true;
        }

        var elemDiv = document.createElement('div');
        var divId = '_EDIT_PRICE_MODEL_' + num;
        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editPriceModelTitle' style='text-align: center;'><b>" + pricemodelname + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editpricemodelform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='pricemodelnamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='pricemodelnamereg" + num + "' name='pricemodelnamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='pricemodelidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='pricemodelidreg" + num + "' name='pricemodelidreg'>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedPriceModel(" + num + ", " + newPriceModel + ")'>Update</button>\
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
        initPriceModel(num);
        document.getElementById(divId).style.display = 'block';
        // Make ID editable or not accordingly
        var id = document.getElementById("pricemodelidreg" + num);
        if (pricemodelname === "New Price Model")
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

function initPriceModelList(){
    var url = _BACKENDSERVER+"/systemmanager/get/parameters/pricingmodel";

    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getpricemodel");
}

resultfnct['getpricemodel'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            jsonpricemodels = JSON.parse(arg1);
            for (var i = 0; i < jsonpricemodels.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditPriceModel('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deletePriceModel('" +i+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
       
                iconstab["rows"].push(iconsarr1);
     
                 ////////////////////////////////// construct icons table
                txt += "<tr><td id='_PRICE_MODEL_NAME_"+i+"' style='text-align:left'>"+jsonpricemodels[i].name+"</td>\
                            <td>" + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
            //console.log("html txt = " + txt);
            if (txt !== "")
            {
                var gbody = document.getElementById('pricemodelsbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetpricemodel'] = function (arg1) {
    console.log("#2");
    alert(arg1);
};

function initPriceModel(num){
    var priceModel = jsonpricemodels[num];
    var nameId = 'pricemodelnamereg' + num;
    var idId = 'pricemodelidreg' + num;
   
    var name = document.getElementById(nameId);
    
    name.value = priceModel.name;
    var id = document.getElementById(idId);
    
    id.value = priceModel.id;
    id.contenteditable = false;
    
}

////Remode all the elements from an html table
//function emptyTable(htmlTable) {
////    var nexts = new Array();
//    var table = document.getElementById(htmlTable);
//    var tr = table.getElementsByTagName("tr");
//    var length = tr.length;
//
//    var j = 2;
//    for (var i = 2; i < length; i++) {
//        table.deleteRow(j);
//
//    }
//}

async function deletePriceModel(num){
    try{
        if (confirm("Delete Pricing Model?") === false) {
            return;
        }
        var priceModel = jsonpricemodels[num];

        //Remove pricing model from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/pricingmodel/" + priceModel.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletepricemodel");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deletepricemodel'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Pricing model deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeletepricemodel'] = function (arg1) {
    console.log("ERROR in pricing model deletion");

    dispmess('info','Price model deleted');
};
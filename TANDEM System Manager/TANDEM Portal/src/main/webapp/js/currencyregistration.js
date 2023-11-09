function submitUpdatedCurrency(num, newCurrency){
    var nameId = 'currencynamereg' + num;
    var idId = 'currencyidreg' + num;
   
   
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
   
    var currency = {
        name: name,
        id: id
    };
   
    jsoncurrencies[num].name = name;
    jsoncurrencies[num].id = id;
    
    //Update currency in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/currency";
    CallPostUrl(url,"POST",currency,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatecurrency");
    
    
    // If it was a new currency, add row in Table
    if (newCurrency)
    {
        var table = document.getElementById("currenciestable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditCurrency('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteCurrency('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
       
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_CURRENCY_NAME_"+num+"' style='text-align:left'>"+jsoncurrencies[num].name+"</td>\
                        <td>"
                            + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update currency name in table
        var table = document.getElementById("currenciestable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_CURRENCY_' + num).style.display = 'none';
}

resultfnct['_updatecurrency'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Currency updated!');

};
resultfnct['err_updatecurrency'] = function (arg1) {
    console.log("ERROR in currency submission");
    dispmess('info','currency updated');
};

function addNewCurrency(){
    var currency = {
        name: "",
        id: ""
    };
    var num = jsoncurrencies.length;
    console.log("num = " + num);
    
    jsoncurrencies.push(currency);
    try{
        openEditCurrency(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditCurrency(num){
    try{
        var newCurrency = false;
        var currencyname = jsoncurrencies[num].name;
        if (currencyname === "")
        {
            currencyname = "New Currency";
            newCurrency = true;
        }

        var elemDiv = document.createElement('div');
        var divId = '_EDIT_CURRENCY_' + num;
        console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editCurrencyTitle' style='text-align: center;'><b>" + currencyname + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editcurrencyform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='currencynamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='currencynamereg" + num + "' name='currencynamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='currencyidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='currencyidreg" + num + "' name='currencyidreg'>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedCurrency(" + num + ", " + newCurrency + ")'>Update</button>\
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
        initCurrency(num);
        document.getElementById(divId).style.display = 'block';
        // Make ID editable or not accordingly
        var id = document.getElementById("currencyidreg" + num);
        if (currencyname === "New Currency")
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

function initCurrencyList(){
    var url = _BACKENDSERVER+"/systemmanager/get/parameters/currency";

    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getcurrency");
}

resultfnct['getcurrency'] = function (arg1) {
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            jsoncurrencies = JSON.parse(arg1);
            for (var i = 0; i < jsoncurrencies.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditCurrency('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteCurrency('" + i + "')\"></i>");
       
                iconstab["rows"].push(iconsarr1);
     
                 ////////////////////////////////// construct icons table
                txt += "<tr><td id='_CURRENCY_NAME_"+i+"' style='text-align:left'>"+jsoncurrencies[i].name+"</td>\
                            <td>"
                                + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
            console.log("html txt = " + txt);
            if (txt !== "")
            {
                var gbody = document.getElementById('currenciesbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetcurrency'] = function (arg1) {
    console.log("#2");
    alert(arg1);
};

function initCurrency(num){
    var currency = jsoncurrencies[num];
    var nameId = 'currencynamereg' + num;
    var idId = 'currencyidreg' + num;
   
    var name = document.getElementById(nameId);
    
    name.value = currency.name;
    var id = document.getElementById(idId);
    
    id.value = currency.id;
    id.contenteditable = false;
    
}

async function deleteCurrency(num){
    try{
        if (confirm("Delete Currency?") === false) {
            return;
        }
        var currency = jsoncurrencies[num];

        //Remove currency unit from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/currency/" + currency.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletecurrency");
        
    }catch(error){
        alert(error);
    }
}



resultfnct['deletecurrency'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Currency deleted!');
    //Reload page
    window.location.reload();
};

resultfnct['errdeletecurrency'] = function (arg1) {
    console.log("ERROR in currency deletion");
    dispmess('info','Currency deleted');
};
function submitUpdatedCategory(num, newCategory){
    var nameId = 'categorynamereg' + num;
    var idId = 'categoryidreg' + num;
    var versionId = 'categoryversionreg' + num;
    var hrefId = 'categoryhrefreg' + num;
    var name = document.getElementById(nameId).value;
    var id = document.getElementById(idId).value;
    var version = document.getElementById(versionId).value;
    var href = document.getElementById(hrefId).value;
    if ((name === "") || (id === ""))
    {
        window.alert("Invalid input! One of the required parameters is blank.");
        return;
    }
    var category = {
        name: name,
        id: id,
        version: version,
        href: href
    };
    console.log("num = " + num);
    jsoncategories[num].name = name;
    jsoncategories[num].id = id;
    jsoncategories[num].version = version;
    jsoncategories[num].href = href;
    
    //Update category in System Manager
    var url = _BACKENDSERVER+"/systemmanager/create/parameters/productcategory";
    CallPostUrl(url,"POST",category,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updatecategory");
    console.log("num = " + num);
    
    // If it was a new category, add row in Table
    if (newCategory)
    {
        var table = document.getElementById("productcategoriestable");
        var row = table.insertRow(-1);
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]");
        iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditProductCategory('" + num + "')\" data-target=\"" + num + "-{{ task.id }}\"></i>");
        iconsarr1.push("<i class='far fa-trash-alt' onclick=\"deleteProductCategory('" +num+ "')\" title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr1);
     
        ////////////////////////////////// construct icons table
        var txt = "<tr><td id='_CATEGORY_NAME_"+num+"' style='text-align:left'>"+jsoncategories[num].name+"</td>\
                        <td>"
                            + _makeicons(iconstab) +
                        "</td>\
                   </tr>";
        row.innerHTML = txt;
    }
    else
    {
        //Update category name in table
        var table = document.getElementById("productcategoriestable");
        table.rows[num+1].cells[0].innerHTML = name;
    }
    
    // In the end, close the window
    document.getElementById('_EDIT_CATEGORY_' + num).style.display = 'none';
}

resultfnct['_updatecategory'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Category updated!');

};
resultfnct['err_updatecategory'] = function (arg1) {
    console.log("ERROR in category submission");
//    var responseStatus = arg1.getOwnPropertyNames();
//    console.log("response Status = " + responseStatus);
    dispmess('info','Category updated');
};

function addNewProductCategory(){
    var category = {
        name: "",
        id: "",
        version: "",
        href: ""
    };
    var num = jsoncategories.length;
    console.log("num = " + num);
    
    jsoncategories.push(category);
    console.log("jsoncategories = " + jsoncategories);
    try{
        console.log("About to open category");
        openEditProductCategory(num);
        return true;
    }catch(error){
        return false;
    }
}

function openEditProductCategory(num){
    console.log("In openEditProductCategory!");
    try{
        var newCategory = false;
        var categoryname = jsoncategories[num].name;
        if (categoryname === "")
        {
            categoryname = "New Category";
            newCategory = true;
        }

        //console.log("categoryname: " + categoryname);
        var elemDiv = document.createElement('div');
        var divId = '_EDIT_CATEGORY_' + num;
        //console.log('divId = ' + divId);
        var txt1 = "<div class='mw3-container' style=''>\
                        <div class='mw3-modal' id='" + divId +"'>\
                            <div class='mw3-modal-content' style='width:90%;overflow: auto; max-height: 95%;background-color: #9e9e9e;'>\
                                <header class='mw3-container' style='background-color: #9e9e9e;'>\
                                    <span onclick=\"document.getElementById('" + divId +"').style.display='none'\" class='mw3-button mw3-display-topright'>&times;</span>\
                                    <h2 id='editCategoryTitle' style='text-align: center;'><b>" + categoryname + "</b></h2>\
                                </header>\
                                <div class='mw3-container' style='margin: 0 auto; text-align:center; width:100%;'>\
                                    <div class='container' style='background-color: whitesmoke; display:block; margin: auto; width: 100%;'>";
        var txt2 = "<form id='editcategoryform' style='margin: 0 auto; text-align:center; width:100%;'>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='categorynamereg' class='required'>Name</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='categorynamereg" + num + "' name='categorynamereg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='categoryversionreg'>Version</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                 <input type='text' id='categoryversionreg" + num + "' name='categoryversionreg'>\
                            </div>\
                        </div>\
                        <div class='row regformrow'>\
                            <div class='col-srvregistration'>\
                                <label for='categoryidreg' class='required'>ID</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <input type='text' id='categoryidreg" + num + "' name='categoryidreg'>\
                            </div>\
                            <div class='col-srvregistration'>\
                                <label for='categoryhrefreg'>HREF</label>\
                            </div>\
                            <div class='col-srvregistration'>\
                                 <input type='text' id='categoryhrefreg" + num + "' name='categoryhrefreg'>\
                            </div>\
                        </div>\
                        <div class='row' style='margin-left:42%'>\
                            <div class='col-srvregistration'>\
                                <button type='button' class='btn' onclick='submitUpdatedCategory(" + num + ", " + newCategory + ")'>Update</button>\
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
        
        initProductCategory(num);
        
        // Make ID editable or not accordingly
        document.getElementById(divId).style.display = 'block';
        var id = document.getElementById("categoryidreg" + num);
        if (categoryname === "New Category")
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


function initProductCategoryList(){
    console.log("Init categories list!");
    var url = _BACKENDSERVER+"/systemmanager/get/parameters/productcategory";
    CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"getcategories");
}

resultfnct['getcategories'] = function (arg1) {
    //console.log("#1");
    var txt = "";
    try {
        if ((arg1!==null)&&(arg1.length>0)){
            //console.log("arguments received!");
            jsoncategories = JSON.parse(arg1);
            //console.log("jsoncategories.length = " + jsoncategories.length);
            for (var i = 0; i < jsoncategories.length; i++) {    
                /////////////////////////////// construct icons table
                var iconstab = JSON.parse("{}");
                iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
                iconstab["rows"] = JSON.parse("[]");
                var iconsarr1 = JSON.parse("[]");
                iconsarr1.push("<i class='fas fa-edit' title='Edit' style='color:blue;font-size:18px' onclick=\"openEditProductCategory('" + i + "')\" data-target=\"" + i + "-{{ task.id }}\"></i>");
                iconsarr1.push("<i class='far fa-trash-alt' title='Delete' style='color:red;font-size:18px' onclick=\"deleteProductCategory('" + i + "')\"></i>");
                iconstab["rows"].push(iconsarr1);
     
                ////////////////////////////////// construct icons table
                txt += "<tr><td id='_CATEGORY_NAME_"+i+"' style='text-align:left'>"+jsoncategories[i].name+"</td>\
                            <td>"
                                + _makeicons(iconstab) +
                            "</td>\
                        </tr>";
           
            }
           
            if (txt !== "")
            {
                var gbody = document.getElementById('procategoriesbody');
                gbody.innerHTML = txt;
            }
        }else{
            dispmess('Error','user not authorized');
        }
    } catch (error) {
        alert(error);
    }
}; 

resultfnct['errgetcategories'] = function (arg1) {
    console.log("#2");
    alert(arg1);
};

function initProductCategory(num){
    var category = jsoncategories[num];
    var nameId = 'categorynamereg' + num;
    var idId = 'categoryidreg' + num;
    var versionId = 'categoryversionreg' + num;
    var hrefId = 'categoryhrefreg' + num;
    var name = document.getElementById(nameId);
    
    name.value = category.name;
    var id = document.getElementById(idId);
    
    id.value = category.id;
    id.contenteditable = false;
    var version = document.getElementById(versionId);
    
    version.value = category.version;
    var href = document.getElementById(hrefId);
    
    href.value = category.href;
}


async function deleteProductCategory(num){
    try{
        if (confirm("Delete Product Category?") === false) {
            return;
        }
        var category = jsoncategories[num];

        //Remove category from system manager
        var url = _BACKENDSERVER+"/systemmanager/delete/parameters/productcategory/" + category.id;
        let res = await CallPostUrl(url,"DELETE",null,[{"keystr":"AAM-Authorization","valuestr":_TOKEN}],"deletecategory");

        
    }catch(error){
        alert(error);
    }
}

resultfnct['deletecategory'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Category deleted!');
    //Reload page
    window.location.reload();
};
resultfnct['errdeletecategory'] = function (arg1) {
    console.log("ERROR in category deletion");
    dispmess('info','Category deleted');
};
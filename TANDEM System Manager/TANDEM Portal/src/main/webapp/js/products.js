var productCreationURL = 'http://146.124.106.209/static/templates/productRegistration.html';
function displayProducts(action) {
    var length = productsInfo.length;
    var htmltext = "";
  
    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='prodid'>" + "ID" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='prodname'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='prodtype'>" + "Type" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Provider" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Description" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='prodcategory'>" + "Category" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='prodversion'>" + "Version" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "State" + "<a href='#'></a></th>\
                <th class='services-mgmttable-actions'>" + "Actions" + "<a href='#'></a></th>\
            </tr>";

    for (var i = 0; i < length; i++) {  
        var id = 'monIcon';
        var stateId = 'stateIcon';
        var j = i + 1;
        var monIconId = id + j;
        var editIconId = 'editIcon' + j;
        var stateIconId = stateId + j;
        var listId = 'dropDown' + j;
        htmltext +=
            "<tr>\
                <td>" + productsInfo[i].productId + "</td>\
                <td>" + productsInfo[i].productName + "</td>\
                <td>" + productsInfo[i].productType + "</td>\
                <td>" + productsInfo[i].productProvider + "</td>\
                <td>" + productsInfo[i].produtDescription.slice(0,100);
        if (productsInfo[i].produtDescription.length>90) htmltext += 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                productsInfo[i].produtDescription+"'></i></a>";
        htmltext +=
                "</td>\
                <td>" + productsInfo[i].productCategory.name + "</td>\
                <td>" + productsInfo[i].productVersion + "</td>\
                <td>" + productsInfo[i].productLifeCycleStatus + "</td>\
                <td ><table ><tr><td style='padding-bottom: 1px;padding-top: 1px;'>" + "<a href='#'><i id=" + editIconId + " class='fas fa-edit' title='Edit' style='padding-bottom:1px;color:blue;font-size:18px'></i></a>" + 
                "<select id=" + listId + " style='display:none; position: absolute; width:200px; overflow: auto;'>" + "</select>" + "</td>" +
                    " <td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i id=" + stateIconId + " class='fas fa-project-diagram' title='Change state' style='padding-bottom:1px;color:green;font-size:18px'></i></a></td>" +
                    " </tr><tr><td style='padding-bottom: 1px;padding-top: 1px;'><a href='#'><i class='far fa-trash-alt' onclick='deleteProduct(\""+productsInfo[i].productId+"\")' title='Delete' style='padding-bottom:1px;color:red;font-size:18px'></i></a></td>" +
                    "</tr></table></td>\
            </tr>";
        
    }
    document.getElementById("productsTable").innerHTML = htmltext;
}

function addOnClickProductssEvents(tableid){
    document.getElementById('prodid').addEventListener('click', function(event){
        sortTableRows(tableid, 0);
    });
    
    document.getElementById('prodname').addEventListener('click', function(event){
        sortTableRows(tableid, 1);
    });
    
    document.getElementById('prodtype').addEventListener('click', function(event){
        sortTableRows(tableid, 2);
    });
    
    document.getElementById('prodcategory').addEventListener('click', function(event){
        sortTableRows(tableid, 5);
    });
    
    document.getElementById('prodversion').addEventListener('click', function(event){
        sortTableRows(tableid, 6);
    });
}

function addOnClickMonProductsEvent(id, monURL){
    document.getElementById(id).addEventListener('click', function(event){
        window.open(monURL,'_blank');
    });
}

function addOnClickEditProductEvent(editIconId, productId){
 
    console.log("Adding listener to icon " + editIconId + " to edit product " + productId);
    document.getElementById(editIconId).addEventListener('click', function(event){
     
        console.log("Edit Product Event called!!!");
        dispmess('INFO','This button will be implemented on next cycle');
//        // Get variables from the current page
//        const queryString = window.location.search;
//        console.log(queryString);
//
//        // Open the product registration page in new tab
//        var url = productCreationURL + queryString + "&productId=" + productId;
//        window.open(url, '_blank');
    });
}

function addOnClickNextStateEvent(stateId, dropdownId, productId){
 
    document.getElementById(stateId).addEventListener('click', function(event){
        dispmess('INFO','This button will be implemented on next cycle');
        console.log("Event called!!!");
        
//        // Get the status of the product
//        var proStatus = '';
//        var url = "./data/productStatus.json"
//        // Get product's info
//        for (var i= 0; i < productsInfo.length; i++)
//        {
//            if (productsInfo[i].productId === productId)
//            {
//                proStatus = productsInfo[i].productLifeCycleStatus;
//                break;
//            }
//        }
//        if (document.getElementById(dropdownId).style.display === "")
//        {
//            // In this case, the selection list has already opened.
//            // On click, get the selected value and change the status
//            // First check if the status has changed
//            var newStatus = document.getElementById(dropdownId).value;
//            if (newStatus != proStatus)
//            {
//                
//                // Ask for confirmation
//                if (confirm("Change the status?") == false) {
//                    return;
//                }
//                //Change the status of the product
//                console.log("The status will change to " + newStatus);
//                var updateData = {
//                    serId: serviceId,
//      
//                    state: newStatus
//
//                };
//                var updateUrl = _BACKENDSERVER+"/servicecatalogue/update/services/state";
//                CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updateservice");
//                
//                // Change the value in the table
//                var myTable = document.getElementById("myTable");
//                var rowIndex = stateId.substr(9,stateId.length);
//                var cellIndex = 7;
//                myTable.rows[rowIndex].cells[cellIndex].innerHTML = newStatus;
//                
//            }
//            document.getElementById(dropdownId).style.display = "none";
//        }
//        else {
//            
//            
//            // Add the options on the list
//            console.log("Getting possible stauses");
//            let dropdown = document.getElementById(dropdownId);
//            dropdown.length = 0;
//    
//            let defaultOption = document.createElement('option');
//            defaultOption.text = serStatus;
//
//            dropdown.add(defaultOption);
//            dropdown.selectedIndex = 0;
//            console.log("#1");
//    
//            fetch(url)
//    
//                .then(response => response.json())
//                .then(data => {
//                    // Examine the text in the response
//                    console.log("json was read! Length = " + data.length);
//                    let option;
//                    for (let i = 0; i < data.length; i++) {
//                        // find the status
//                        console.log("i = " + i + ", name = " + data[i].name);
//                        if (data[i].name === serStatus)
//                        {
//                            var nextStatuses = data[i].next;
//                            console.log("Next statuses: " + nextStatuses);
//                            for (let j = 0; j < nextStatuses.length; j++)
//                            {
//                                option = document.createElement('option');
//                                option.text = nextStatuses[j];
//                                option.value = nextStatuses[j];
//                                dropdown.add(option);
//                            }
//                            // Show dropdown list
//                            var listSize = document.getElementById(dropdownId).length;
//                            console.log("List size:" + listSize);
//                            document.getElementById(dropdownId).style.display = "";
//                            document.getElementById(dropdownId).size = listSize;
//                            break;
//                        }
//                        
//                    }
//                        
//                })
//                
//              
//                .catch(function(err) {  
//                    console.error('Fetch Error -', err);  
//                });
//           
//        }
//        
    });
}

function deleteProduct(id){
    if (confirm("Delete Product?") === false) {
        return;
    }
    var url = _BACKENDSERVER+"/servicecatalogue/delete/products/"+id;
    CallPostUrl(url,"DELETE",null,[],"productdeleted");
    resultfnct['productdeleted'] = function () {
        //Reload page
        window.location.reload();
    }
}


resultfnct['jsoninfoproducts'] = function (arg1) { 
    productsInfo = JSON.parse(arg1);
    displayProducts("0");
    addOnClickProductssEvents('productsTable');
    
    var IDs = [];
    var editIDs = [];
    var stateIDs = [];
    var dropdownIDs = [];
    var tableLength = document.getElementById('productsTable').rows.length;
    for (var i = 1; i < tableLength; i++){
        var editId = 'editIcon';
        var monIconId = 'monIcon';
        var stateIconId = 'stateIcon';
        var dropDownId = 'dropDown';
        editId = editId + i;
        monIconId = monIconId + i;
        stateIconId = stateIconId + i;
        dropDownId = dropDownId + i;
        editIDs.push(editId);
        IDs.push(monIconId);
       
       
       
        stateIDs.push(stateIconId);
        dropdownIDs.push(dropDownId);
    }
    for (var k = 0; k < productsInfo.length; k++){
        productId = productsInfo[k].productId;
        addOnClickEditProductEvent(editIDs[k], productId);
        addOnClickNextStateEvent(stateIDs[k], dropdownIDs[k], productId);
    }  
};

resultfnct['errjsoninfoproducts'] = function (sts) {
    alert("error="+sts);
} 
       
function getjsoninfo(action){
    productsInfo = "";
//    if (action == "0")
//        CallPostUrl("data/products.json","GET",null,[],"jsoninfo");
    if (action == "1")
    {
        var url = _BACKENDSERVER+"/servicecatalogue/get/products";
        CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"jsoninfoproducts");
    }
}
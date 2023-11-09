var productCreationURL = _GUISERVER + 'productRegistration.html';
const orderCreationURL = _GUISERVER + 'orderRegistration.html';
const getProductURL = _BACKENDSERVER + '/servicecatalogue/get/products/';
const getApplicationURL = _BACKENDSERVER + '/applicationcatalogue/get/applications/';
async function displayProducts(action) {
    productsInfo = await productsToDisplay(productsInfoAll);
    if (productsInfo === null)
    {
        dispmess('INFO','There are no products created from the selected service');
    }
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
        var stateId = 'stateIcon';
        var j = i + 1;

        var editIconId = 'editIcon' + j;
        var stateIconId = stateId + j;
        var instanceIconId = 'instanceIcon' + j;
        var listId = 'dropDown' + j;
        var orderIconId = 'orderIcon' + j;
        
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]"); 
        iconsarr1.push("<i id=" + editIconId + " class='fas fa-edit' title='Edit' style='color:blue;font-size:18px;'></i>");
        iconsarr1.push("<i id=" + stateIconId + " class='fas fa-project-diagram' title='Change state' style='color:green;font-size:18px'></i></a>" +
                    "<select id=" + listId + " style='display:none; position: relative; width:200px; overflow: auto;'>" + "</select>");
        iconsarr1.push("<i id=" + instanceIconId + " class='fa fa-book' title='View instances' style='color:black;font-size:18px'></i>");
        
        iconstab["rows"].push(iconsarr1);
        var iconsarr2 = JSON.parse("[]");
        iconsarr2.push("<i id =" + orderIconId + " class='fas fa-cube' title='Order' style='color:#2BB6C0;font-size:18px'></i>");
        iconsarr2.push("<i class='far fa-trash-alt' onclick='deleteProduct(\""+productsInfo[i].productId+"\")' title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr2);
        
        ////////////////////////////////// construct icons table
        
        //console.log("productsInfo[i].productDescription = " + productsInfo[i].productDescription);
        htmltext +=
            "<tr>\
                <td>" + productsInfo[i].productId + "</td>\
                <td>" + productsInfo[i].productName + "</td>\
                <td>" + productsInfo[i].productType + "</td>\
                <td>" + productsInfo[i].productProvider + "</td>\
                <td>" + productsInfo[i].productDescription.slice(0,100);
        if (productsInfo[i].productDescription.length>90) htmltext += 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                productsInfo[i].productDescription+"'></i></a>";
        htmltext +=
                "</td>\
                <td>" + productsInfo[i].productCategory.name + "</td>\
                <td>" + productsInfo[i].productVersion + "</td>\
                <td>" + productsInfo[i].productLifeCycleStatus + "</td>\
                <td>" + _makeicons(iconstab) +
                "</td>\
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
 
    //console.log("Adding listener to icon " + editIconId + " to edit product " + productId);
    document.getElementById(editIconId).addEventListener('click', function(event){
     
        //console.log("Edit Product Event called!!!");
        //dispmess('INFO','This button will be implemented on next cycle');
        // Get variables from the current page
        const queryString = window.location.search;
        //console.log(queryString);

        // Open the product registration page in new tab
        var url = productCreationURL + queryString + "&productId=" + productId;
        window.open(url, '_blank');
    });
}

function addOnClickNextStateEvent(stateId, dropdownId, productId){
 
    document.getElementById(stateId).addEventListener('click', function(event){
//        console.log("Event called!!!");
//        console.log("stateId = " + stateId);
//        console.log("dropdownId = " + dropdownId);
        // Get the status of the product
        var proStatus = '';
        var url = _BACKENDSERVER+"/systemmanager/get/parameters/productstate";
        // Get product's info
        for (var i= 0; i < productsInfo.length; i++)
        {
            if (productsInfo[i].productId === productId)
            {
                proStatus = productsInfo[i].productLifeCycleStatus;
                break;
            }
        }
        //console.log("proStatus = " + proStatus);
        if (document.getElementById(dropdownId).style.display === "")
        {
            // In this case, the selection list has already been opened.
            // On click, get the selected value and change the status
            // First check if the status has changed
            var newStatus = document.getElementById(dropdownId).value;
            if (newStatus !== proStatus)
            {
                
                // Ask for confirmation
                if (confirm("Change the status?") === false) {
                    return;
                }
                //Change the status of the product
                console.log("The status will change to " + newStatus);
                var updateData = {
                    productId: productId,
                    productLifeCycleStatus: newStatus

                };
                var updateUrl = _BACKENDSERVER+"/servicecatalogue/update/products/state";
                CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updateproduct");
                
                // Change the value in the table
                var myTable = document.getElementById("productsTable");
                var rowIndex = stateId.substr(9,stateId.length);
                var cellIndex = 7;
                myTable.rows[rowIndex].cells[cellIndex].innerHTML = newStatus;
                
            }
            document.getElementById(dropdownId).style.display = "none";
        }
        else {
            
            
            // Add the options on the list
//            console.log("Getting possible statuses");
            let dropdown = document.getElementById(dropdownId);
            dropdown.length = 0;
    
            let defaultOption = document.createElement('option');
            defaultOption.text = proStatus;

            dropdown.add(defaultOption);
            dropdown.selectedIndex = 0;
//            console.log("#1");
    
            fetch(url)
    
                .then(response => response.json())
                .then(data => {
                    // Examine the text in the response
//                    console.log("json was read! Length = " + data.length);
                    let option;
                    for (let i = 0; i < data.length; i++) {
                        // find the status
//                        console.log("i = " + i + ", name = " + data[i].name);
                        if (data[i].name === proStatus)
                        {
                            var nextStatuses = data[i].next;
//                            console.log("Next statuses: " + nextStatuses);
                            for (let j = 0; j < nextStatuses.length; j++)
                            {
                                option = document.createElement('option');
                                option.text = nextStatuses[j];
                                option.value = nextStatuses[j];
                                dropdown.add(option);
                            }
                            // Show dropdown list
                            var listSize = document.getElementById(dropdownId).length;
                            console.log("List size:" + listSize);
                            document.getElementById(dropdownId).style.display = "";
                            document.getElementById(dropdownId).size = listSize;
                            break;
                        }
                        
                    }
                        
                })
                
              
                .catch(function(err) {  
                    console.error('Fetch Error -', err);  
    });
           
}
    });
}

// Opens a pop-up window and shows the instances of the selected product
function addOnClickProductInstancesEvent(instanceIconId, productId){
    document.getElementById(instanceIconId).addEventListener('click', async function(event){
        
        // Regardless of the product status, show the instances (currently shows all the instances)
        // First get the product
  
        const productUrl = getProductURL + productId;
//        console.log("serviceUrl = " + serviceUrl);
        
        await fetch(productUrl)
    
        .then(response => response.json())
        .then(async data => {
            var product = data;
            
//            console.log("service = " + service);
            // Check if the product is defined from a service or an application
            if (product.productServiceId !== "")
            {
                // The product is a single service
                var paasName = await getPaasName(product.productServiceId);
                console.log("Paas Name = " + paasName);

                if (paasName === '')
                {
                    dispmess('INFO', "We cannot get instances for this product, because the PaaS name is not defined in service's configuration parameters!");
                    return;
                }
                // Find the instances
                var getInstancesUrl = _BACKENDSERVER+"/systemmanager/get/service/" + paasName;
                console.log("getInstancesUrl = " + getInstancesUrl);
                await fetch(getInstancesUrl)
                    .then(response => response.json())
                    .then(data => {
                        const instancesPerCluster = data;
                        var instances = reformInstances(instancesPerCluster);
                        if (instances === [])
                        {
                            dispmess('INFO', "There are no instances for this product");
                        }
                        else {
                            displayInstances(instances);
                        }

                    })

                    .catch(function(err) {  
                        console.error('Fetch Error -', err);  
                    });
            }
            else if (product.productApplicationId !== "") {
                // The product is an application
                //Get Application
                const applicationUrl = getApplicationURL + product.productApplicationId;
                var paasName = '';
                await fetch(applicationUrl)
    
                    .then(response => response.json())
                    .then(async data => {
                        var application = data;
            
            
                        if (application.applicationServices.length > 0 || application.supportServices.length > 0)
                        {
                            // The application is defined though a list of independent services
                            var allServices = new Array();
                            for (var i = 0; i < application.applicationServices.length; i++)
                            {
                                allServices.push(application.applicationServices[i]);
                            }
    
                            for (var i = 0; i < application.supportServices.length; i++)
                            {
                                allServices.push(application.supportServices[i]);
                            }
                            var instances = [];
                            for (var i = 0; i < allServices.length; i++) {
                                // For each service
                                var paasName = await getPaasName(allServices[i].serID);
                                console.log("Paas Name = " + paasName);

                                if (paasName === '')
                                {
                                    continue;
                                 
                                }
                                // Find the instances
                                
                                var getInstancesUrl = _BACKENDSERVER+"/systemmanager/get/service/" + paasName;
                                console.log("getInstancesUrl = " + getInstancesUrl);
                                await fetch(getInstancesUrl)
                                    .then(response => response.json())
                                    .then(data => {
                                        const instancesPerCluster = data;
                                        instances = instances.push(reformInstances(instancesPerCluster));
                        

                                    })

                                    .catch(function(err) {  
                                        console.error('Fetch Error -', err);  
                                    });
                                
                            }
                            if (instances === [])
                            {
                                dispmess('INFO', "There are no instances for this product");
                            }
                            else {
                                displayInstances(instances);
                            }
                        }
                        else if (application.serviceChain !== "") {
                            dispmess('INFO', "This is a service chain. Please move to Kubeflow environment to see the instances");
                        }
                        else {
                            dispmess('INFO', "There is an error in product's definition. Please check it.");
                        }
         
                    })
                    .catch(function(err) {  
                        console.error('Fetch Error -', err);  
                    }); 
               
                
            }
            
        
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });        
    });
}

//Function for opening the Order Registration page, in order to place an order for the selected product
function addOnClickCreateOrderEvent(productIconId, productId){
    document.getElementById(productIconId).addEventListener('click', function(event){
        // Check the status of the service

        var myTable = document.getElementById("productsTable");
        var rowIndex = productIconId.substr(9,productIconId.length);
        var cellIndex = 7;
        var proStatus = myTable.rows[rowIndex].cells[cellIndex].innerHTML;

        // If status >= Product Published, open the order registration page (the user can create an order for a selected product)
        if (proStatus === "Product Published") 
        {
            // Get variables from the current page
            const queryString = window.location.search;

            // Open the order registration page in new tab
            var url = orderCreationURL + queryString + "&productId=" + productId;
            window.open(url, '_blank');
        }
        else
        {
            // Otherwise, show a message (the user can't create a product from service)
            dispmess("INFO", "You can't place an order for the selected product. The product state should be 'Published'");
        }
        
        
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

// Extract from all the products gotten from the Catalogue, the ones that should be displayed according to URL queries
async function productsToDisplay(productsAll)
{
    var products = new Array();
    var params = new Array();
    params = getParams();

    
    if (typeof params['productServiceId'] !== 'undefined')
    {
        // If productServiceId is defined, then take only the products created from this service 
        if ((params['productServiceId'] !== null) && (params['productServiceId'] !== '')) {
//        products = productsAll;
//        return products;
            var productIndex = 0;
            for (let i = 0; i < productsAll.length; i++) {
                // find the service id

                if (productsAll[i].productServiceId === params['productServiceId'])
                {
                    products.push(productsAll[i]);
                    productIndex++;
                    console.log("#4");
                }
                        
            }
        }
    
    }
    else if (typeof params['productApplicationId'] !== 'undefined')
    {
        // If productApplicationId is defined, then take only the products created from this application 
        if ((params['productApplicationId'] !== null) && (params['productApplicationId'] !== '')) {
            var productIndex = 0;
            for (let i = 0; i < productsAll.length; i++) {
                // find the service id

                if (productsAll[i].productApplicationId === params['productApplicationId'])
                {
                    products.push(productsAll[i]);
                    productIndex++;
                    console.log("#4");
                }
                        
            }
        }
    
    }
    else
    {
        products = productsAll;
    }


    if (products.length !== 0)
    {
        return products;
    }
    else
    {
        return null;
    }
    
}

// Sets up ad displays the array of products
async function loadProductsArray(){
    await displayProducts("0");
//    console.log("After displayProducts");
    addOnClickProductssEvents('productsTable');
    
    var IDs = [];
    var editIDs = [];
    var stateIDs = [];
    var dropdownIDs = [];
    var orderIDs = [];
    var instancesIDs = [];
    var tableLength = document.getElementById('productsTable').rows.length;
    for (var i = 1; i < tableLength; i++){
        var editId = 'editIcon';
        var monIconId = 'monIcon';
        var stateIconId = 'stateIcon';
        var dropDownId = 'dropDown';
        var orderIconId = 'orderIcon';
        var instanceIconId = 'instanceIcon';
        editId = editId + i;
        monIconId = monIconId + i;
        stateIconId = stateIconId + i;
        dropDownId = dropDownId + i;
        orderIconId = orderIconId + i;
        instanceIconId = instanceIconId + i;
        editIDs.push(editId);
        IDs.push(monIconId);
       
       
       
        stateIDs.push(stateIconId);
        dropdownIDs.push(dropDownId);
        orderIDs.push(orderIconId);
        instancesIDs.push(instanceIconId);
    }
    for (var k = 0; k < productsInfo.length; k++){
        productId = productsInfo[k].productId;
        addOnClickEditProductEvent(editIDs[k], productId);
        addOnClickNextStateEvent(stateIDs[k], dropdownIDs[k], productId);
        addOnClickCreateOrderEvent(orderIDs[k], productId);
        addOnClickProductInstancesEvent(instancesIDs[k], productId);
    }  
}

resultfnct['jsoninfoproducts'] = function (arg1) { 

    productsInfoAll = JSON.parse(arg1);
    loadProductsArray();
};

resultfnct['errjsoninfoproducts'] = function (sts) {
    alert("error="+sts);
} 
       
async function getjsoninfo(action){
    if (action == "1")
    {
        var url = _BACKENDSERVER+"/servicecatalogue/get/products";
        CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"jsoninfoproducts");
    }
}
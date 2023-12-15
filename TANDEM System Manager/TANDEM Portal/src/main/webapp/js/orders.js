
const orderCreationURL = _GUISERVER + 'orderRegistration.html';
const getProductURL = _BACKENDSERVER + '/servicecatalogue/get/products/';
const getApplicationURL = _BACKENDSERVER + '/applicationcatalogue/get/applications/';

async function displayOrders(action) {
    ordersInfo = await ordersToDisplay(ordersInfoAll);
    if (ordersInfo === null)
    {
        dispmess('INFO','There are no orders');
    }
    var length = ordersInfo.length;
    var htmltext = "";
  
    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='orderid'>" + "ID" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='ordername'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Product" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='ordertype'>" + "Type" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Description" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='ordercategory'>" + "Category" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Billing Account" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Agreement" + "<a href='#'></a></th>\
                <th class='services-mgmttable-actions'>" + "Actions" + "<a href='#'></a></th>\
            </tr>";

    for (var i = 0; i < length; i++) {  
       
        var j = i + 1;

        var editIconId = 'editIcon' + j;
       
        var runIconId = 'runIcon' + j;
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]"); 
        iconsarr1.push("<i id=" + editIconId + " class='fas fa-edit' title='Edit' style='color:blue;font-size:18px;'></i>");
        iconsarr1.push("<i id=" + runIconId + " class='fa fa-play' title='Execute product' style='color:#C99D5C;font-size:18px'></i>");
       
        iconstab["rows"].push(iconsarr1);
        var iconsarr2 = JSON.parse("[]");
        iconsarr2.push("<i class='far fa-trash-alt' onclick='deleteOrder(\""+ordersInfo[i].orderId+"\")' title='Delete' style='color:red;font-size:18px'></i>");
        iconstab["rows"].push(iconsarr2);
        
        
        ////////////////////////////////// construct icons table
        
        //console.log("productsInfo[i].productDescription = " + productsInfo[i].productDescription);
        htmltext +=
            "<tr>\
                <td>" + ordersInfo[i].orderId + "</td>\
                <td>" + ordersInfo[i].orderName + "</td>\
                <td>" + ordersInfo[i].orderedProducts[0] + "</td>\
                <td>" + ordersInfo[i].orderType + "</td>\
                <td>" + ordersInfo[i].orderDescription.slice(0,100);
        if (ordersInfo[i].orderDescription.length>90) htmltext += 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                ordersInfo[i].orderDescription+"'></i></a>";
        htmltext +=
                "</td>\
                <td>" + ordersInfo[i].orderCategory + "</td>\
                <td>" + ordersInfo[i].billingAccount + "</td>\
                <td>" + ordersInfo[i].orderAgreement + "</td>\
                <td>" + _makeicons(iconstab) +
                "</td>\
            </tr>";
        
    }
    document.getElementById("ordersTable").innerHTML = htmltext;
}

function addOnClickOrdersEvents(tableid){
    document.getElementById('orderid').addEventListener('click', function(event){
        sortTableRows(tableid, 0);
    });
    
    document.getElementById('ordername').addEventListener('click', function(event){
        sortTableRows(tableid, 1);
    });
    
    document.getElementById('ordertype').addEventListener('click', function(event){
        sortTableRows(tableid, 2);
    });
    
    document.getElementById('ordercategory').addEventListener('click', function(event){
        sortTableRows(tableid, 5);
    });
    
}


function addOnClickEditOrderEvent(editIconId, orderId){
 
    document.getElementById(editIconId).addEventListener('click', function(event){
     
        // Get variables from the current page
        const queryString = window.location.search;
//        console.log("queryString = " + queryString);
        // Open the product registration page in new tab
        var url = orderCreationURL + queryString + "&orderId=" + orderId;
//        console.log("url = " + url);
        window.open(url, '_blank');
    });
}

//Function for executing a product
function addOnClickRunOrderEvent(id, productId){
    document.getElementById(id).addEventListener('click', function(event){
        // Get the product from backend
        var url = getProductURL + productId;
        CallPostUrl(url,"GET",null,[],"jsoninfoproreg");
        // Get json info
        resultfnct['jsoninfoproreg'] = function (arg1) { 
            var product = JSON.parse(arg1);
            if ((product.productServiceId !== '') && (product.productServiceId !== 'Select'))
            {
                // If the product consists of a single service
                // Get the service from backend
                var url2 = getServiceURL + product.productServiceId;
                CallPostUrl(url2, "GET", null, [], "jsoninfoservreg");
                resultfnct['jsoninfoservreg'] = function(arg1) {
                    var service = JSON.parse(arg1);
                    // Open a popup window for configuring the service
                    runServiceAsProductPopUp(id, product, service);
//                    runServicePopUp(id, service, false);
                };
                
            } 
            else if ((product.productApplicationId !== '') && (product.productApplicationId !== 'Select'))
            {
                // If the product consists of an application
                // Get the application from backend
                var url2 = getApplicationURL + product.productApplicationId;
                CallPostUrl(url2, "GET", null, [], "jsoninfoappreg");
                resultfnct['jsoninfoappreg'] = function(arg1) {
                    var application = JSON.parse(arg1);
                    // Open a popup window according to whether the application is defined through services or through a SCO
                    if (application.applicationServices.length > 0 || application.supportServices.length > 0)
                    {
                        runAppFromServicesAsProductPopUp(id, product, application);
                    }
                    else if (application.serviceChain !== '')
                    {
                        runAppFromScoPopUp(id, application, false);
                    }
                    else
                    {
                        dispmess('INFO', "You can't run this application because there are no services or service chain defined.'");
                        return;
                    }   
                };
            }
            else
            {
                dispmess('ERROR', "There is a problem with the product. Please check again later");
                return;
            }
              
        };  
    });
}

function deleteOrder(id){
    if (confirm("Delete Order?") === false) {
        return;
    }
    var url = _BACKENDSERVER+"/servicecatalogue/delete/orders/"+id;
    CallPostUrl(url,"DELETE",null,[],"orderdeleted");
    resultfnct['orderdeleted'] = function () {
        //Reload page
        window.location.reload();
    }
}

// Extract from all the products gotten from the Catalogue, the ones that should be displayed according to URL queries
async function ordersToDisplay(ordersAll)
{
    var orders = new Array();
    var params = new Array();
    params = getParams();

    
    if (typeof params['orderedProductID'] !== 'undefined')
    {
        // If orderedProductID is defined, then take only the orders created from this product 
        if ((params['orderedProductID'] !== null) && (params['orderedProductID'] !== '')) {
            var orderIndex = 0;
            for (let i = 0; i < ordersAll.length; i++) {
                // find the ptoduct id
                
                if (ordersAll[i].orderedProducts[0] === params['orderedProductID'])
                {
                    orders.push(ordersAll[i]);
                    orderIndex++;
                }
                        
            }
        }
    
    }
    
    else
    {
        orders = ordersAll;
    }


    if (orders.length !== 0)
    {
        return orders;
    }
    else
    {
        return null;
    }
    
}

// Sets up at displays the array of products
async function loadOrdersArray(){
    await displayOrders("0");
    addOnClickOrdersEvents('ordersTable');
    
    
    var editIDs = [];
    var runIDs = [];
   
    var tableLength = document.getElementById('ordersTable').rows.length;
    for (var i = 1; i < tableLength; i++){
        var editId = 'editIcon';
       
        var runIconId = 'runIcon';
      
        editId = editId + i;
       
        runIconId = runIconId + i;
        
        editIDs.push(editId);
       
        runIDs.push(runIconId);
    }
//    console.log("ordersInfo.length = " + ordersInfo.length);
    for (var k = 0; k < ordersInfo.length; k++){
//        console.log("k = " + k);
        orderId = ordersInfo[k].orderId;
//        console.log("orderId = " + orderId);
        addOnClickEditOrderEvent(editIDs[k], orderId);
        
        addOnClickRunOrderEvent(runIDs[k], ordersInfo[k].orderedProducts[0]);
    }  
}

resultfnct['jsoninfoorders'] = function (arg1) { 

    ordersInfoAll = JSON.parse(arg1);
    loadOrdersArray();
};

resultfnct['errjsoninfoorders'] = function (sts) {
    alert("error="+sts);
} 
       
async function getjsoninfo(action){
    if (action == "1")
    {
        var url = _BACKENDSERVER+"/servicecatalogue/get/orders";
        CallPostUrl(url,"GET",null,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"jsoninfoorders");
    }
}
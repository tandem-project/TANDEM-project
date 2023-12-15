
const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const urlCategory = urlPrefixSysManGet + "productcategory";
const urlType = urlPrefixSysManGet + "producttype";
const urlSla = urlPrefixSysManGet + "sla";

async function loadingOrderRegistration() {
   
    var params = new Array();
    
    

    
    params = getParams();
    
    if (typeof params['productId'] !== 'undefined') 
    {
        var proId = params['productId'];
        if ((proId !== null) && (proId !== ''))
        {
            // Get the product from backend
            var url = _BACKENDSERVER+"/servicecatalogue/get/products/" + proId;
            CallPostUrl(url,"GET",null,[],"jsoninfoproreg");
            // Get json info
            resultfnct['jsoninfoproreg'] = function (arg1) { 
                var productInfo = JSON.parse(arg1);
                
                // Fill the edit fields
                
                var description = document.getElementById('orderdescriptionreg');              
                description.value = productInfo.productDescription;
                var price = document.getElementById('orderpricereg');              
                price.value = productInfo.productPricePerChargeUnit[0].productPrice;

                // Fill the selection lists
                selectionList('ordercategoryreg', urlCategory, productInfo.productCategory.name);
                selectionList('ordertypereg',urlType, productInfo.productType);
//                console.log("productInfo.productServiceLevelAgreementName = " + productInfo.productServiceLevelAgreementName);
//                console.log("urlSla = " + urlSla);
                selectionList('orderagreementreg', urlSla, productInfo.productServiceLevelAgreementName);

                // Fill the table
              
                addNewProductRow('productstable', 'orderedproduct', productInfo.productId, false); 
            };
            
        }
        
        else
        {
            initializeLists();
        }
    }
    if (typeof params['orderId'] !== 'undefined') 
    {
        var orderId = params['orderId'];
        if ((orderId !== null) && (orderId !== ''))
        {
            // Get the order from backend
            var url = _BACKENDSERVER+"/servicecatalogue/get/orders/" + orderId;
            CallPostUrl(url,"GET",null,[],"jsoninfoorderreg");
            // Get json info
            resultfnct['jsoninfoorderreg'] = function (arg1) { 
                var orderInfo = JSON.parse(arg1);
                
                // Fill the edit fields
                var name = document.getElementById('ordernamereg');
                name.value = orderInfo.orderName;
                var id = document.getElementById('orderidreg');
                id.value = orderInfo.orderId;
                var description = document.getElementById('orderdescriptionreg');              
                description.value = orderInfo.orderDescription;
                var startDate = document.getElementById('orderrreqstartdatereg');
                startDate.value = orderInfo.requestedStartDate;
                console.log("orderInfo.requestedStartDate = " + orderInfo.requestedStartDate);
                console.log("startDate.value = " + startDate.value);
                var endDate = document.getElementById('orderrreqenddatereg');
                endDate.value = orderInfo.requestedCompletionDate;
                var price = document.getElementById('orderpricereg');              
                price.value = orderInfo.totalPrice;
                var priority = document.getElementById('orderpriorityreg');
                priority.value = orderInfo.orderPriority;
                var billingAccount = document.getElementById('orderbillingaccountreg');              
                billingAccount.value = orderInfo.billingAccount;
                var contactInfo = document.getElementById('ordercontactinforeg');              
                contactInfo.value = orderInfo.contactInfo;
                // Fill the selection lists
                selectionList('ordercategoryreg', urlCategory, orderInfo.orderCategory);
                selectionList('ordertypereg',urlType, orderInfo.orderType);
                selectionList('orderagreementreg', urlSla, orderInfo.orderAgreement);

                // Fill the tables
                console.log("About to fill the table ... ");
                addNewProductRow('productstable', 'orderedproduct', orderInfo.orderedProducts[0], true); 
                console.log("orderInfo.orderedProducts[0] = " + orderInfo.orderedProducts[0]);
//                for (var i = 0; i < orderInfo.orderedProducts.length; i++)
//                {    
//                    addNewProductRow('productstable', 'orderedproduct', orderInfo.orderedProducts[i]); 
//                    console.log("orderInfo.orderedProducts[i] = " + orderInfo.orderedProducts[i]);
//                }
                for (var i = 0; i < orderInfo.notes.length; i++)
                {
                    addTableRow('notestable', orderInfo.notes[i]);
                }
            };
            
        }
        
        else
        {
            initializeLists();
        }
    }
    else
    {
        initializeLists();
    }   
}


//Function for initialising lists with default values
function initializeLists() {
    selectionList('ordercategoryreg', urlCategory, null);
    selectionList('ordertypereg',urlType, null);
    selectionList('orderagreementreg', urlSla, null);
}

//Function for adding a new row in Ordered Products
var orderedProductIndex = 0;
async function addNewProductRow(tableId, rowPrefix, productId, ordered) {
    console.log("In addNewProductRow");
    orderedProductIndex++;
    console.log("orderedProductIndex = " + orderedProductIndex);
    var dropdownName = rowPrefix + "name";
    var dropdownId = rowPrefix + "name" + orderedProductIndex;
    console.log("dropdownName = " + dropdownName + ", dropdownId = " + dropdownId);
    
    var table = document.getElementById(tableId);

    var row = table.insertRow(-1);
    
    // -------To be uncommented in the future --------------------
//    row.innerHTML = "<tr>\
//                        <td>\
//                            <select class=\"regselect\" name=\"" + dropdownName + "\" id=\"" + dropdownId + "\"></select>\
//                        </td>\
//                        <td>\
//                            <a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a>\
//                        </td>\
//                    </tr>";
    //------------------------------------------------------------
    row.innerHTML = "<tr>\
                        <td>\
                            <select style='text-align:center' class=\"regselect\" name=\"" + dropdownName + "\" id=\"" + dropdownId + "\"></select>\
                        </td>\
                    </tr>";
    const url = _BACKENDSERVER+"/servicecatalogue/get/products";
    if (ordered)
    {
        //await listProducts(dropdownId, productId, false);
        console.log("Entering listConsumambleProducts");
        let dropdown = document.getElementById(dropdownId);
        dropdown.length = 0;
    
        dropdown.selectedIndex = 0;
   
        const url = _BACKENDSERVER+"/servicecatalogue/get/products/" + productId;
   
        fetch(url)
    
            .then(response => response.json())
            .then(data => {
                // Examine the text in the response
                let option;
               
                option = document.createElement('option');
                option.text = data.productName;
                option.value = data.productId;
                dropdown.add(option);
                dropdown.text = productId;
                dropdown.value = productId;
                console.log('dropdown.value = ' + dropdown.value);
                $('#'+dropdownId).attr('disabled', true);
                dropdown.style.color = 'black';
                
       
           
            })
                
              
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            });
    }
    else
    {
        await listConsumambleProducts(dropdownId, productId);
    }
}
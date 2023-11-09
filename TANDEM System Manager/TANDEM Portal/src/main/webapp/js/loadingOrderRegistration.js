
const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const urlCategory = urlPrefixSysManGet + "productcategory";
const urlType = urlPrefixSysManGet + "producttype";
const urlSla = urlPrefixSysManGet + "sla";

async function loadingProductRegistration() {
   
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
                selectionList('orderagreementreg', urlSla, productInfo.productServiceLevelAgreementName);

                // Fill the table
              
                addNewProductRow('productstable', 'orderedproduct', productInfo.productId); 
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
async function addNewProductRow(tableId, rowPrefix, productId) {
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
    
    await listConsumambleProducts(dropdownId, productId);
   
}
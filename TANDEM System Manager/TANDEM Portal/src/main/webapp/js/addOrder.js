const productOrderedStatusId = "ordered";
const instantiateServiceURL = _BACKENDSERVER + '/systemmanager/instantiate/service';
let getAppUrl = _BACKENDSERVER+"/applicationcatalogue/get/applications/";

async function submitOrderRegistration(event) {
    var id, name, type, description, category, agreement, startDate, endDate, productId, price, priority, billing, contact, user;
    var isoktoadd = true;
    var errorlist = new Array();
    
    // Check if all required fields are completed
    if (document.getElementById("orderidreg").value===""){
        isoktoadd = false;
        errorlist.push("order id");
    }
    if (document.getElementById("ordernamereg").value===""){
        isoktoadd = false;
        errorlist.push("order name");
    }
    if (document.getElementById("ordercategoryreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("order category");
    }
    if (document.getElementById("ordertypereg").value==="Select"){
        isoktoadd = false;
        errorlist.push("order type");
    }
    if (document.getElementById("orderagreementreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("order agreement");
    }
    
    if (document.getElementById("orderpricereg").value===""){
        isoktoadd = false;
        errorlist.push("total price");
    }

    
    if (document.getElementById("orderbillingaccountreg").value===""){
        isoktoadd = false;
        errorlist.push("billing account");
    }
    if (document.getElementById("ordercontactinforeg").value===""){
        isoktoadd = false;
        errorlist.push("contact info");
    }
    
    
    if (!isoktoadd){
        var message = "The next fields are empty:";
        for (i = 0; i < errorlist.length; i++)
        {
            
            if (i === errorlist.length - 1)
            {
                message = message + " " + errorlist[i];
            }
            else
            {
                message = message + " " + errorlist[i] + ",";
            }
        }
        dispmess('ERROR',message);
        return;
    }
  
    
    // Get order data
    id = document.getElementById("orderidreg").value;;
    name = document.getElementById("ordernamereg").value;

    type = document.getElementById("ordertypereg").value;
  
    category = document.getElementById("ordercategoryreg").value;

    agreement = document.getElementById("orderagreementreg").value;
  
   
   
    description = document.getElementById("orderdescriptionreg").value;
   
    startDate = document.getElementById("orderrreqstartdatereg").value;
    endDate = document.getElementById("orderrreqenddatereg").value;   
    // Check the dates before submission
    if (endDate < startDate)
    {
        dispmess('ERROR',"The completion date cannot be set before the start date");
        return;
    }
    
    price = document.getElementById("orderpricereg").value;
    priority = document.getElementById("orderpriorityreg").value;
    billing = document.getElementById("orderbillingaccountreg").value;
    contact = document.getElementById("ordercontactinforeg").value;
 
    // Get ordered product
    var i = 1 ; 
    
    var checklist = document.getElementsByName('orderedproductname')[0];
    var productSelectedName = checklist.options[checklist.selectedIndex].text;
    var productSelectedId = checklist.options[checklist.selectedIndex].value;
    console.log("productSelectedName = " + productSelectedName);
    console.log("productSelectedId = " + productSelectedId);
    if (productSelectedName === 'Select')
    {
        productSelectedName = '';
        productSelectedId = '';
    }
    //product = productSelectedName;
    productId = productSelectedId;
   
    // Get Notes
    var notes = new Array();
    var tableNotes = document.getElementById("notestable");
    var tr = tableNotes.getElementsByTagName("tr");
    for (let i = 2; i < tr.length; i++)
    {
        var note = tableNotes.rows[i].cells[0].innerHTML;
        notes.push(note);
    }
   
    //below we are binding the input data (json format) in a variable in order to post it.
    
    var data = {
        id: id,
        name: name,
        productType: type,
        description: description, 
        category: category,
        agreement: agreement,
        startDate: startDate,       
        endDate: endDate,     
        products: productId,
        totalPrice: price,
        priority: priority,
        billingAccount: billing,
        contactInfo: contact,
        notes: notes

    };

    // Create data to json
    json = JSON.stringify(data);
    console.log("---------------JSON---------------");
    console.log(json);
    
    //Send json
//    var url = _BACKENDSERVER+"/ordercatalogue/create/orders";
//    CallPostUrl(url,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addorder");

    // Change product status
    var newStatus = await findStatusFromId(_BACKENDSERVER + "/systemmanager/get/parameters/productstate/", productOrderedStatusId);
    console.log("newStatus = " + newStatus);
    var updateData = {
        productId: productId,
        productLifeCycleStatus: newStatus
    };
    console.log("updateData = " + updateData);
    var updateUrl = _BACKENDSERVER+"/servicecatalogue/update/products/state";
    CallPostUrl(updateUrl,"PUT",updateData,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_updateproduct");
    console.log("Product should be updated");
    
    // Instantiate Application/Service
    // Get the product's info
    console.log("productId = " + productId);
    const getProUrl = _BACKENDSERVER+"/servicecatalogue/get/products/" + productId;
    console.log("getProUrl = " + getProUrl);
    await fetch(getProUrl)
    
        .then(response => response.json())
        .then(async data => {
            // Examine the text in the response
            const product = data;
            if ((product.productServiceId !== '') && (product.productServiceId !== 'Select'))       
            {
                // Instantiate Service
                // Get service's info
                const getSerUrl = _BACKENDSERVER+"/servicecatalogue/get/services/" + product.productServiceId;
                await fetch (getSerUrl)
                    .then (response => response.json())
                    .then (async data => {
                
                        const service = data;
       
                        // Get configuration parameters from service and create the call's body
                        var instantiateServiceBody = '{';
                        for (var i = 0; i < service.serConfigParams.length; i++)
                        {
                            instantiateServiceBody = instantiateServiceBody + "\"" +service.serConfigParams[i].serParamName + "\": \"" + service.serConfigParams[i].serParamTypicalValue + "\"";
                            if (i < service.serConfigParams.length - 1)
                            {
                                instantiateServiceBody = instantiateServiceBody + ', ';
                            }
                        }
                        instantiateServiceBody = instantiateServiceBody + '}';

                        let r = await fetch(instantiateServiceURL, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: instantiateServiceBody});
                   
                        if (r.status !== 200)
                        {
                            dispmess("ERROR", "Unable to instantiate the service. Please try again later or contact the administrator");
                         
                        }
                    })
                    .catch(function(err) {  
                        console.error('Fetch Error -', err);  
                    }); 
            }
            else if ((product.productApplicationId !== '') && (product.productApplicationId !== 'Select'))
            {
                // Instantiate Application
                // Get application's info
                getAppUrl = getAppUrl + product.productApplicationId;
                await fetch (getAppUrl)
                    .then (response => response.json())
                    .then (async data => {
                
                        const app = data;
       
                        var monURL = app.AppURL;
                        window.open(monURL,'_blank');
            
                    })
                    .catch(function(err) {  
                        console.error('Fetch Error -', err);  
                    }); 
            }
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 
}

resultfnct['_updateproduct'] = function (arg1) {
//    console.log("Status 200");
    dispmess('info','Product status was changed to published');

}
resultfnct['err_updateproduct'] = function (arg1) {
//    console.log("ERROR3 in submission");
    dispmess('info','Product status was changed to published');
}

//resultfnct['_addorder'] = function (arg1) {
////    console.log("Status 200");
//    dispmess('info','Order was saved');
//
//}
//resultfnct['err_addorder'] = function (arg1) {
////    console.log("ERROR3 in submission");
//    dispmess('info','Order was saved');
//}
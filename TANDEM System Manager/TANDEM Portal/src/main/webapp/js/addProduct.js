
var categoriesUrl = "./data/categories.json";
var servicesUrl = "./data/services.json";
var applicationsUrl = "./data/applications.json";
var locationsUrl = "./data/locations.json";
var slasUrl = "./data/slas.json";

async function submitProductRegistration(event) {
    var id, name, type, provider, description, categoryName, version, state, stateReason;
    var isoktoadd = true;
    var errorlist = new Array();
    
    // Check if all required fields are completed
    if (document.getElementById("productidreg").value===""){
        isoktoadd = false;
        errorlist.push("product id");
    }
    if (document.getElementById("productnamereg").value===""){
        isoktoadd = false;
        errorlist.push("product name");
    }
    if (document.getElementById("productcategoryreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("product category");
    }
    if (document.getElementById("producttypereg").value==="Select"){
        isoktoadd = false;
        errorlist.push("product type");
    }
    if (document.getElementById("productproviderreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("product provider");
    }
    
    if (document.getElementById("productversionreg").value===""){
        isoktoadd = false;
        errorlist.push("product version");
    }

    if ((document.getElementById("productservicereg").value==="Select") && (document.getElementById("productapplicationreg").value==="Select")){
        isoktoadd = false;
        errorlist.push("product service");
        errorlist.push("product application");
    }
    
    if (document.getElementById("productstatereg").value==="Select"){
        isoktoadd = false;
        errorlist.push("product state");
    }
    if (document.getElementById("productpricemodelreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("product pricing model");
    }
    if (document.getElementById("productchargeunitreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("product price per charge unit");
    }
    if (document.getElementById("productpricereg").value===""){
        isoktoadd = false;
        errorlist.push("product price");
    }
    if (document.getElementById("productcurrencyreg").value==="Select"){
        isoktoadd = false;
        errorlist.push("product currency");
    }
    if ((document.getElementById("productvalidfromreg").value==="") || (document.getElementById("productvalidtoreg").value==="")){
        isoktoadd = false;
        errorlist.push("product validity period");
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
    
    if ((document.getElementById("productservicereg").value !== "Select") && (document.getElementById("productapplicationreg").value !== "Select")){
        var message = "Please select either a Service or an Application. You can't select both!";
        
        dispmess('ERROR',message);
        return;
    }
    
    // Get product data
    id = document.getElementById("productidreg").value;;
    name = document.getElementById("productnamereg").value;
    type = '';
    type = document.getElementById("producttypereg").value;
    if (type === "Select")
    {
        type = '';
    }
    provider = document.getElementById("productproviderreg").value;
    if (provider === "Select")
    {
        provider = '';
    }
    version = document.getElementById("productversionreg").value;
    description = document.getElementById("productdescriptionreg").value;
    // Get category
    var category;
    categoryName = document.getElementById("productcategoryreg").value;
    if (categoryName === "Select")
    {
        categoryName = '';
    }

//    console.log("Category name = " + categoryName);
    
    await fetch(categoriesUrl)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let i = 0;
            for (i = 0; i < data.length; i++) {
                if (data[i].name === categoryName)
                {
                    category = data[i];
                    break;
                }
            }
            //console.log("After the loop, i = " + i);
            if (i === data.length)
            {
                category = null;
            }
                    
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 

    if (category !== null)
    {
        console.log("Category = " + category.href + ", " + category.id + ", " + category.name + ", " + category.version);
    }
    else
    {
        category = {href:'', id:'', name:'', version:''};
        console.log("category is empty");
    }
//    version = '';
    state = document.getElementById("productstatereg").value;
    if (state === "Select")
    {
        state = '';
    }
    stateReason = '';
    var isBuddle = document.querySelector('#productisbuddlereg');
    var isBuddleJson;
    if (isBuddle.checked)
    {
        isBuddleJson = "true";
    }
    else
    {
        isBuddleJson = "false";
    }
    var isSellable = document.querySelector('#productissellablereg');
    var isSellableJson;
    if (isSellable.checked)
    {
        isSellableJson = "true";
    }
    else
    {
        isSellableJson = "false";
    }
    //var serviceId = '';
    var serviceId = document.getElementById("productservicereg").value;
//    var serviceName = document.getElementById("productservicereg").value;
//    if (serviceName === "Select")
//    {
//        serviceName = '';
//    }
    var serviceName = '';
    if (serviceId === "Select")
    {
        serviceId = '';
//        console.log("No service is selected");
    }

    else
    {
//        console.log("Service id = " + serviceId);

        // Get service from json

        await fetch(servicesUrl)
    
            .then(response => response.json())
            .then(data => {
                // Examine the text in the response
                let i = 0;
                for (i = 0; i < data.length; i++) {
                    if (data[i].serId === serviceId)
                    {
                        serviceName = data[i].serName;
                        break;
                    }
                }
                if (i === data.length)
                {
                    serviceName = '';
                }
                    
            })
                
              
            .catch(function(err) {  
                console.error('Fetch Error -', err);  
            }); 

        
    }

    // Get application
    var applicationId = '';
    var applicationName = document.getElementById("productapplicationreg").value;
    if (applicationName === "Select")
    {
        applicationName = '';
    }
   
    var validFrom = document.getElementById("productvalidfromreg").value;
    var validTo = document.getElementById("productvalidtoreg").value;   
    // +++ Check the dates before submission
    var lastUpdate = '';     
    var pricingModel = document.getElementById("productpricemodelreg").value;
    if (pricingModel === "Select")
    {
        pricingModel = '';
    }
    
//    Get productPricePerChargeUnit
    var pricePerChargeUnit = {ChargeUnit:'', ProductPrice: ''};
    pricePerChargeUnit.ChargeUnit = document.getElementById("productchargeunitreg").value;
    if (pricePerChargeUnit.ChargeUnit === "Select")
    {
        pricePerChargeUnit.ChargeUnit = '';
    }
    //console.log("Charge Unit = " + pricePerChargeUnit.ChargeUnit);
    pricePerChargeUnit.ProductPrice = document.getElementById("productpricereg").value;
   // console.log("Price = " + pricePerChargeUnit.ProductPrice);
    //console.log("Price per Carge Unit = " + pricePerChargeUnit);
    var pricePerChargeUnits = new Array();
    pricePerChargeUnits[0] = pricePerChargeUnit;
    
    // Get Product Currency
    var currency = document.getElementById("productcurrencyreg").value;
    if (currency === "Select")
    {
        currency = '';
    }
    
    // Add Product Availability Zones
    var availabilityZones = new Array();
    var availabilityZone = {AvailabilityZoneId:'', AvailabilityZoneName:''};
  
    var tableZones = document.getElementById("locationstable");
    var tr = tableZones.getElementsByTagName("tr");
    //Reference the CheckBoxes in Table.
    var checkBoxes = tableZones.getElementsByTagName("INPUT");
//    console.log(checkBoxes);
    var zonesIndex = 0;
    var checkboxIndex = 0;
    for (i = 2; i < tr.length; i++) {
        if (checkBoxes[checkboxIndex].checked) {
            
            availabilityZone.AvailabilityZoneName = tableZones.rows[i].cells[0].innerHTML;

            availabilityZones[zonesIndex] = availabilityZone;
            zonesIndex++;
        }
        checkboxIndex++;
    }
    
    // Get Ids for availabity zones
    await fetch(locationsUrl)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            console.log("data length = " + data.length);
           
            for (let j = 0; j < availabilityZones.length; j++)
            {
                for (let i = 0; i < data.length; i++) {
                
                    if (data[i].name === availabilityZones[j].AvailabilityZoneName)
                    {
                        availabilityZones[j].AvailabilityZoneId = data[i].id;
                        break;
                    }
                }
    
            }   
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 
    
   
    // Get SLA Attributes
    var slaId = '';
    var slaName = document.getElementById("productslareg").value;
    if (slaName === "Select")
    {
        slaName = '';
    }
    var slaDescr = '';
    // Get Ids for availabity zones
    await fetch(slasUrl)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            for (let i = 0; i < data.length; i++) { 
                if (data[i].name === slaName)
                {
                    slaId = data[i].id;
                    slaDescr = data[i].description;
                    break;
                }
            }
    
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 
    //below we are binding the input data (json format) in a variable inorder to post it.
    
    var data = {
        productId: id,
        productName: name,
        productType: type,
        productProvider: provider,
        produtDescription: description,
        productCategory: category,
        productVersion: version,
        productLifeCycleStatus: state,
        productLifeCycleStatusReason: stateReason,
        productIsBuddle: isBuddleJson,
        productIsSellable: isSellableJson,
        productServiceId: serviceId,
        productServiceName: serviceName,
        productApplicationId: applicationId,
        productApplicationName: applicationName,
        productValidFrom: validFrom,
        productValidTo: validTo,       
        productLastUpdate: lastUpdate,     
        productPricingModel: pricingModel,
        productPricePerChargeUnit: pricePerChargeUnits,
        productPriceCurrency: currency,
        productAvailabilityZones: availabilityZones,
        productServiceLevelAgreementId: slaId,
        producServiceLevelAggrementName: slaName,
        producServiceLevelAggrementDescription: slaDescr

    };
    
   
    // Create data to json
    json = JSON.stringify(data);
    console.log("---------------JSON---------------");
    console.log(json);
    
    //Send json
    var url = _BACKENDSERVER+"/servicecatalogue/create/products";
    CallPostUrl(url,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_addproduct");
}

resultfnct['_addproduct'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Product created');

}
resultfnct['err_addproduct'] = function (arg1) {
    console.log("ERROR3 in submission");
    dispmess('info','Product created');
}
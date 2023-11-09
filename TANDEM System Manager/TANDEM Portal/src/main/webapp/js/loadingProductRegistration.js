
const urlPrefixSysManGet = _BACKENDSERVER+"/systemmanager/get/parameters/";
const urlState = urlPrefixSysManGet + "productstate";
const urlCategory = urlPrefixSysManGet + "productcategory";
const urlType = urlPrefixSysManGet + "producttype";
const urlPricingModel = urlPrefixSysManGet + "pricingmodel";
const urlChargeUnit = urlPrefixSysManGet + "pricingunit";
const urlCurrency = urlPrefixSysManGet + "currency";
const urlSla = urlPrefixSysManGet + "sla";
const urlProvider = urlPrefixSysManGet + "provider";
const locationsURL = urlPrefixSysManGet + 'location';

async function loadingProductRegistration() {
   
    var params = new Array();
    //Add event to radio buttons
    const radioButtons1 = document.querySelectorAll('input[name="placement"]');
    for (const radioButton of radioButtons1)
    {
        radioButton.addEventListener('change', function() {
            if (this.value === "locations")
            {
                
                if (this.checked)
                {
                    document.getElementById("productlocationstable").style.display = 'block';
                    document.getElementById("productnodestable").style.display = 'none';
                }
                
            }
            else
            {
                if (this.checked)
                {
                    document.getElementById("productlocationstable").style.display = 'none';
                    showNodes('productnodestable', 'nodestable');
                }
            }
        });
    }
    
    params = getParams();
    
    if (typeof params['productId'] !== 'undefined') 
    {
        // productId is defined when we want to edit a product
        var productId = params['productId'];
        if ((productId !== null) && (productId !== ''))
        {
            // Get the product from backend
            var url = _BACKENDSERVER+"/servicecatalogue/get/products/" + productId;
            CallPostUrl(url,"GET",null,[],"jsoninfoprodreg");
            resultfnct['errjsoninfoprodreg'] = function (arg1) { 
                alert(arg1);
            };
            // Get json info
            resultfnct['jsoninfoprodreg'] = async function (arg1) { 
                var productInfo = JSON.parse(arg1);
                
                // Fill the edit fields
                var name = document.getElementById('productnamereg');
                name.value = productInfo.productName;
                var id = document.getElementById('productidreg');
                id.value = productInfo.productId;
                id.contenteditable = false;
                document.getElementById('productidreg').readonly = true;
                var version = document.getElementById('productversionreg');
                version.value = productInfo.productVersion;
                var description = document.getElementById('productdescriptionreg');
                
                description.value = productInfo.productDescription;

                var price = document.getElementById('productpricereg');
                price.value = productInfo.productPricePerChargeUnit[0].productPrice;
                
                var validFrom = document.getElementById('productvalidfromreg');
                validFrom.value = productInfo.productValidFrom;
                var validTo = document.getElementById('productvalidtoreg');
                validTo.value = productInfo.productValidTo;
                var countMin = document.getElementById('productcountminreg');
                countMin.value = productInfo.countMin;
                var countMax = document.getElementById('productcountmaxreg');
                countMax.value = productInfo.countMax;
                
                // Fill the checkboxes
                var isBuddle = document.querySelector('#productisbuddlereg');
                
                isBuddle.checked = productInfo.productIsBuddle;
                
                var isSellable = document.querySelector('#productissellablereg');
                isSellable.checked = productInfo.productIsSellable;
                
                // Fill the tables (Possible options: show only locations table, show only nodes table, show no table)
                if (productInfo.productAvailabilityZones.length > 0)
                {
                    //Check the respective checkbox
                    document.getElementById("productlocationreg").checked = true;
                    // TANDEM Locations
                    document.getElementById("productlocationstable").style.display = 'block';
                    var locations = new Array();
                    for (var i = 0; i < productInfo.productAvailabilityZones.length; i++)
                    {
                        locations.push(productInfo.productAvailabilityZones[i].availabilityZoneName);
                    }
                
                    jsonToTable('locationstable', locationsURL, locations);
                }
                else if (productInfo.productNode !== '')
                {
                    //Check the respective checkbox
                    document.getElementById("productnodereg").checked = true;
                    // TANDEM Locations
                    document.getElementById("productnodestable").style.display = 'block';
                    await showNodes('productnodestable', 'nodestable');
                    document.getElementById(productInfo.productNode).checked = true;
                }
           
                // Fill the selection lists
                selectionList('productcategoryreg', urlCategory, productInfo.productCategory.name);
                selectionList('producttypereg',urlType, productInfo.productType);
                selectionList('productproviderreg', urlProvider, productInfo.productProvider);
                selectionList('productstatereg', urlState, productInfo.productLifeCycleStatus);
           
                selectionList('productpricemodelreg', urlPricingModel, productInfo.productPricingModel);
                
                selectionList('productchargeunitreg', urlChargeUnit, productInfo.productPricePerChargeUnit[0].chargeUnit);
                selectionList('productcurrencyreg', urlCurrency, productInfo.productPriceCurrency);
                selectionList('productslareg', urlSla, productInfo.productServiceLevelAgreementName);
                
                if (productInfo.productServiceName !== '')
                {
                    
                    listProductableServices('productservicereg', productInfo.productServiceId);
                    document.getElementById('productapplicationreg').disabled = true;
                    document.getElementById('productservicereg').disabled = true;
                }
                else
                {
                    listProductableServices('productservicereg', null);
                }
                if (productInfo.productApplicationName !== '')
                {
                    listProductableApplications('productapplicationreg', productInfo.productApplicationId);
                    document.getElementById('productservicereg').disabled = true;
                    document.getElementById('productapplicationreg').disabled = true;
                }
                else
                {
                    listProductableApplications('productapplicationreg', null);
                }
            };
            
        }
        else
        {
            initializeLists();
            selectServiceOrAppEvent('productservicereg', 'productapplicationreg');
        }
    }
    else if (typeof params['serId'] !== 'undefined') 
    {
        var serId = params['serId'];
        if ((serId !== null) && (serId !== ''))
        {
            // Get the service from backend
            var url = _BACKENDSERVER+"/servicecatalogue/get/services/" + serId;
            CallPostUrl(url,"GET",null,[],"jsoninfosrvreg");
            // Get json info
            resultfnct['jsoninfosrvreg'] = function (arg1) { 
                var serviceInfo = JSON.parse(arg1);
                
                // Fill the edit fields
                
                var description = document.getElementById('productdescriptionreg');
                
                description.value = serviceInfo.serDescription;
      

                // Fill the selection lists
                selectionList('productcategoryreg', urlCategory, serviceInfo.serCategory.name);
                selectionList('producttypereg',urlType, serviceInfo.serType);
                selectionList('productproviderreg', urlProvider, serviceInfo.serProvider);
                
                listProductableServices('productservicereg', serviceInfo.serId);

                document.getElementById('productservicereg').style.color = 'black';
                document.getElementById('productservicereg').disabled = true;
                
                selectionList('productstatereg', urlState, null);
           
                selectionList('productpricemodelreg', urlPricingModel, null);
                
                selectionList('productchargeunitreg', urlChargeUnit, null);
                selectionList('productcurrencyreg', urlCurrency, null);
                selectionList('productslareg', urlSla, null);
                
                listProductableApplications('productapplicationreg', null);
                document.getElementById('productapplicationreg').disabled = true;
                jsonToTable('locationstable', locationsURL, null);
            };
            
        }
        
        else
        {
            initializeLists();
            selectServiceOrAppEvent('productservicereg', 'productapplicationreg');
        }
    }
    else if (typeof params['appId'] !== 'undefined') 
    {
        var appId = params['appId'];
        if ((appId !== null) && (appId !== ''))
        {
            // Get the application from backend
            var url = _BACKENDSERVER+"/applicationcatalogue/get/applications/" + appId;
            CallPostUrl(url,"GET",null,[],"jsoninfoappreg");
            // Get json info
            resultfnct['jsoninfoappreg'] = function (arg1) { 
                var appInfo = JSON.parse(arg1);
                
                // Fill the edit fields
                
                var description = document.getElementById('productdescriptionreg');
                
                description.value = appInfo.description;
      

                // Fill the selection lists
                selectionList('productcategoryreg', urlCategory, appInfo.category);
                selectionList('productproviderreg', urlProvider, appInfo.provider);
                
                listProductableApplications('productapplicationreg', appInfo.id);

                document.getElementById('productapplicationreg').style.color = 'black';
                document.getElementById('productapplicationreg').disabled = true;
                selectionList('producttypereg',urlType, null);
                selectionList('productstatereg', urlState, null);
           
                selectionList('productpricemodelreg', urlPricingModel, null);
                
                selectionList('productchargeunitreg', urlChargeUnit, null);
                selectionList('productcurrencyreg', urlCurrency, null);
                selectionList('productslareg', urlSla, null);
                
                listProductableServices('productservicereg', null);
                document.getElementById('productservicereg').disabled = true;
                jsonToTable('locationstable', locationsURL, null);
            };
            
        }
    }
    else
    {
        initializeLists();
        selectServiceOrAppEvent('productservicereg', 'productapplicationreg');
    }   
}


// When a service or application is selected, the other one is deactivated
function selectServiceOrAppEvent(serviceListid, applicationListid) { 
    var srvlistidfnc = "#" + serviceListid;
    var applistidfnc = "#" + applicationListid;
    
    // Event for Services list
    $(document).ready(function(){
	
        $(srvlistidfnc).on("change",function(){
            var serviceId=$(srvlistidfnc).val();
            if (serviceId === "Select") 
            {
                $(applistidfnc).prop("disabled", false);
            }
            else
            {
                $(applistidfnc).prop("disabled", true);
            }
        });

    });
    // Event for Applications list
    $(document).ready(function(){
	
        $(applistidfnc).on("change",function(){
            var appId=$(applistidfnc).val();
            if (appId === "Select") 
            {
                $(srvlistidfnc).prop("disabled", false);
             
            }
            else
            {
                $(srvlistidfnc).prop("disabled", true);
            }
        });

    });
}

//Function for initialising lists with default values
function initializeLists() {
    selectionList('productcategoryreg', urlCategory, null);
    selectionList('producttypereg',urlType, null);
    selectionList('productproviderreg', urlProvider, null);
    selectionList('productstatereg', urlState, null);
    selectionList('productpricemodelreg', urlPricingModel, null);
    selectionList('productchargeunitreg', urlChargeUnit, null);
    selectionList('productcurrencyreg', urlCurrency, null);
    selectionList('productslareg', urlSla, null);
    listProductableServices('productservicereg', null);
    listProductableApplications('productapplicationreg', null);
    jsonToTable('locationstable', locationsURL, null);
}
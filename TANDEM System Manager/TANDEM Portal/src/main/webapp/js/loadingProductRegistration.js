
function loadingProductRegistration() {
   
    var params = new Array();
    
    params = getParams();
//    if (typeof params['productId'] !== 'undefined') {
//        
//        var productId = params['productId'];
//        if ((productId !== null) && (productId !== ''))
//        {
//            console.log("About to fill the fields");
//            // Get the service from backend
//            var url = _BACKENDSERVER+"/servicecatalogue/get/services/" + serId;
//            CallPostUrl(url,"GET",null,[],"jsoninfo");
//            // Get json info
//            resultfnct['jsoninfo'] = function (arg1) { 
//                var serviceInfo = JSON.parse(arg1);
//                console.log(serviceInfo);
//                
//                // Fill fields we want to be pre-edited
//                var provider = document.getElementById('productproviderreg');
//                for (i = 0; i < provider.length; i++)
//                {
//                    if (provider.options[i].value === serviceInfo.serProvider)
//                    {
//                        provider.value = serviceInfo.serProvider;
//                        break;
//                    }
//                }
//                
//                var type = document.getElementById('producttypereg');
//                for (i = 0; i < type.length; i++)
//                {
//                    if (type.options[i].value === serviceInfo.serType)
//                    {
//                        type.value = serviceInfo.serType;
//                        break;
//                    }
//                }
//                
//                var serviceName = document.getElementById('productservicereg');
//                for (i = 0; i < serviceName.length; i++)
//                {
//                    if (serviceName.options[i].value === serviceInfo.serName)
//                    {
//                        serviceName.value = serviceInfo.serName;
//                        serviceName.contenteditable = false;
//                        break;
//                    }
//                }
//                
//                var description = document.getElementById('productdescriptionreg');
//                
//                description.value = serviceInfo.serDescription;
//              
//            };
//            
//        }
//    }
//    else if (typeof params['serId'] !== 'undefined') {
    if (typeof params['serId'] !== 'undefined') {
        var serId = params['serId'];
        if ((serId !== null) && (serId !== ''))
        {
            console.log("About to fill the fields");
            // Get the service from backend
            var url = _BACKENDSERVER+"/servicecatalogue/get/services/" + serId;
            CallPostUrl(url,"GET",null,[],"jsoninfoprdreg");
            // Get json info
            resultfnct['jsoninfoprdreg'] = function (arg1) { 
                var serviceInfo = JSON.parse(arg1);
                console.log(serviceInfo);
                
                // Fill fields we want to be pre-edited
//                var provider = document.getElementById('productproviderreg');
//                for (i = 0; i < provider.length; i++)
//                {
//                    if (provider.options[i].value === serviceInfo.serProvider)
//                    {
//                        provider.value = serviceInfo.serProvider;
//                        break;
//                    }
//                }
                
//                var type = document.getElementById('producttypereg');
//                for (i = 0; i < type.length; i++)
//                {
//                    if (type.options[i].value === serviceInfo.serType)
//                    {
//                        type.value = serviceInfo.serType;
//                        break;
//                    }
//                }
//                console.log("Service name: " + serviceInfo.serName);

                var description = document.getElementById('productdescriptionreg');
                
                description.value = serviceInfo.serDescription;
                
                // Fill selection lists
                listServices('productservicereg', serviceInfo.serName, serviceInfo.serId);
                selectionList('productproviderreg', './data/providers.json', serviceInfo.serProvider);
                selectionList('producttypereg','./data/types.json', serviceInfo.serType);
                selectionList('productcategoryreg', './data/categories.json', serviceInfo.serCategory.name);
                
                selectionList('productapplicationreg', './data/applications.json', null);
                selectionList('productstatereg', './data/productStatus.json', null);
                selectionList('productpricemodelreg', './data/pricingModels.json', null);
                selectionList('productchargeunitreg', './data/chargeUnits.json', null);
                selectionList('productcurrencyreg', './data/currencies.json', null);
                selectionList('productslareg', './data/slas.json', null);
            };
            
        }
        else
        {
            selectionList('productcategoryreg', './data/categories.json', null);
            selectionList('producttypereg','./data/types.json', null);
            selectionList('productproviderreg', './data/providers.json', null);
            selectionList('productapplicationreg', './data/applications.json', null);
            selectionList('productstatereg', './data/productStatus.json', null);
            selectionList('productpricemodelreg', './data/pricingModels.json', null);
            selectionList('productchargeunitreg', './data/chargeUnits.json', null);
            selectionList('productcurrencyreg', './data/currencies.json', null);
            selectionList('productslareg', './data/slas.json', null);
            listServices('productservicereg', null, null);
        }
    }
    else
    {
        selectionList('productcategoryreg', './data/categories.json', null);
        selectionList('producttypereg','./data/types.json', null);
        selectionList('productproviderreg', './data/providers.json', null);
        selectionList('productapplicationreg', './data/applications.json', null);
        selectionList('productstatereg', './data/productStatus.json', null);
        selectionList('productpricemodelreg', './data/pricingModels.json', null);
        selectionList('productchargeunitreg', './data/chargeUnits.json', null);
        selectionList('productcurrencyreg', './data/currencies.json', null);
        selectionList('productslareg', './data/slas.json', null);
        listServices('productservicereg', null, null);
    }
}

// Function for getting the configured services in GUI. This is used in edge-clouds and nodes configurations

function configuredServices (autoConfRadio, manualConfRadioId, confServicesId, installedServicesTableId)
{
    var services = new Array();
    
    // Check the radio buttons to see if it is an existing or a manual configuration
    if (document.getElementById(autoConfRadio).checked)
    {
        
        // Get Configuration Services
        var tableConfServices = document.getElementById(confServicesId);
        var trConfService = tableConfServices.getElementsByTagName("tr");
        for (i = 1 ; i < trConfService.length ; i++)
        {
            var confService = tableConfServices.rows[i].cells[0].innerHTML;
            services[i-1] = confService;
        }
       
    }
    else if (document.getElementById(manualConfRadioId).checked)
    {
        // Get Configuration Services
        var tableConfServices = document.getElementById(installedServicesTableId);
        var trConfService = tableConfServices.getElementsByTagName("tr");
        for (i = 1 ; i < trConfService.length ; i++)
        {
            var confService = tableConfServices.rows[i].cells[0].innerHTML;
            services[i-1] = confService;
        }
    }
    
    if (services.length === 0)
    {
        return null;
    }
    else
    {
        return services;
    }
}

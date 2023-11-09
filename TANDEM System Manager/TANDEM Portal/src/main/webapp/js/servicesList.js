async function listServices(listId, serviceId, descriptionId, showSelectOption) {
    let dropdown = document.getElementById(listId);
    dropdown.length = 0;
    if (showSelectOption === true)
    {
        let defaultOption = document.createElement('option');
        defaultOption.text = 'Select';

        dropdown.add(defaultOption);
    }
    dropdown.selectedIndex = 0;

    const url = _BACKENDSERVER+"/servicecatalogue/get/services";
   
    await fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            let serviceName = "";
            let selectedIndex = 0;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].serName;
                option.value = data[i].serId;
                dropdown.add(option);
               
                if (data[i].serId === serviceId)
                {
//                    console.log("App service was found!");
                    serviceName = data[i].serName;
                    selectedIndex = i + 1;
                }
            }

            dropdown.selectedIndex = selectedIndex;

            if (serviceId !== null)
            {
                
                if (descriptionId !== null)
                {
                    setServiceDescription(listId, descriptionId, url);
                }
            }
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
    console.log("Exiting listServices");
}

//-----------------------------------------------------------------

// Add in a selection list only the application services
async function listServicesGivenType(listId, serviceId, descriptionId, showSelectOption, typeIds) {
//    console.log("serviceId = " + serviceId);
    let dropdown = document.getElementById(listId);
    dropdown.length = 0;
    if (showSelectOption === true)
    {
        let defaultOption = document.createElement('option');
        defaultOption.text = 'Select';

        dropdown.add(defaultOption);
    }
    dropdown.selectedIndex = 0;

    const url = _BACKENDSERVER+"/servicecatalogue/get/services";
   
    await fetch(url)
    
        .then(response => response.json())
        .then(async data => {
            // Examine the text in the response
            let option;
            let serviceName = "";
            let selectedIndex = 0;
            // Get the valid types name 
            if ((typeIds !== null) && (typeIds.length > 0))
            {
                var typeNames = await validTypes(typeIds);
            }
            else
            {
                var typeNames = null;
            }
            console.log("typeNames = " + typeNames);
            var j = 0;
            for (let i = 0; i < data.length; i++) {
                
                if (typeNames !== null)
                {
                    //Check if the service type. If it's an application service, then add it to the selection list
                    var serTypeName = data[i].serType;
    
                    if (typeNames.indexOf(serTypeName) !== -1)
                    {
                        
                        // Add this service in the list
                        option = document.createElement('option');
                        option.text = data[i].serName;
                        option.value = data[i].serId;
                        dropdown.add(option);
                        j++;
                        if (data[i].serId === serviceId)
                        {
                            //console.log("App service was found!");
                            serviceName = data[i].serName;
                            selectedIndex = j;
                        }
                    }
                }
            }

            dropdown.selectedIndex = selectedIndex;

            if (serviceId !== null)
            {
                
                if (descriptionId !== null)
                {
                    setServiceDescription(listId, descriptionId, url);
                }
            }
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
    console.log("Exiting listServices");
}

//------------------------------------------------------------------------

//// Add in a selection list only the PaaS services
//async function listAppServices(listId, serviceId, descriptionId, showSelectOption) {
//    let dropdown = document.getElementById(listId);
//    dropdown.length = 0;
//    if (showSelectOption === true)
//    {
//        let defaultOption = document.createElement('option');
//        defaultOption.text = 'Select';
//
//        dropdown.add(defaultOption);
//    }
//    dropdown.selectedIndex = 0;
//
//    const url = _BACKENDSERVER+"/servicecatalogue/get/services";
//   
//    await fetch(url)
//    
//        .then(response => response.json())
//        .then(async data => {
//            // Examine the text in the response
//            let option;
//            let serviceName = "";
//            let selectedIndex = 0;
//            // Get the valid types name 
//            var typeNames = await validTypes(["TANDEM_App", "User_App"]);
//            console.log("typeNames = " + typeNames);
//            for (let i = 0; i < data.length; i++) {
//                
//                if (typeNames !== null)
//                {
//                    //Check if the service type. If it's an application service, then add it to the selection list
//                    var serTypeName = data[i].serType;
//                    //if (typeNames.includes(serTypeName))
//                    if (typeNames.indexOf(serTypeName) !== -1)
//                    {
//                        // Add this service in the list
//                        option = document.createElement('option');
//                        option.text = data[i].serName;
//                        option.value = data[i].serId;
//                        dropdown.add(option);
//               
//                        if (data[i].serId === serviceId)
//                        {
//                            console.log("App service was found!");
//                            serviceName = data[i].serName;
//                            selectedIndex = i + 1;
//                        }
//                    }
//                }
//            }
//
//            dropdown.selectedIndex = selectedIndex;
//
//            if (serviceId !== null)
//            {
//                
//                if (descriptionId !== null)
//                {
//                    setServiceDescription(listId, descriptionId, url);
//                }
//            }
//        })
//                
//              
//        .catch(function(err) {  
//            console.error('Fetch Error -', err);  
//        });
//    console.log("Exiting listServices");
//}


//------------------------------------------------------------------------

// Lists the services that can be productionized (status >= Launched)
function listProductableServices(listId, serviceId) {
    console.log("Entering listProductableServices");
    let dropdown = document.getElementById(listId);
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
   
    const url = _BACKENDSERVER+"/servicecatalogue/get/services";
   
    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            for (let i = 0; i < data.length; i++) {
                if (data[i].state === "Launched")
                {
                    option = document.createElement('option');
                    option.text = data[i].serName;
                    option.value = data[i].serId;
                    dropdown.add(option);
                    if (serviceId === data[i].serId)
                    {
                        dropdown.text = serviceId;
                        dropdown.value = serviceId;
                
                    }
                }
            }
            
           
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
}


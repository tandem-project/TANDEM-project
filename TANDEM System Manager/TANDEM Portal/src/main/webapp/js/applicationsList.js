function listApplications(listid, applicationName, applicationId) {
//    console.log("Starting listApplications");
    let dropdown = document.getElementById(listid);
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    
    const url = _BACKENDSERVER+"/applicationcatalogue/get/applications";
   
    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            for (let i = 0; i < data.length; i++) {
                
                option = document.createElement('option');
                option.text = data[i].name;
                option.value = data[i].id;
                dropdown.add(option);
            }
            if ((applicationName !== null) || (applicationId !== null))
            {
//                console.log("Found application");
                dropdown.text = applicationName;
                dropdown.value = applicationId;   
            }
//            console.log("dropdown.text = " + dropdown.text);
//            console.log("dropdown.value = " + dropdown.value);
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
}

// Lists the applications that can be productionized (status >= Launched)
function listProductableApplications(listid, applicationId) {
    let dropdown = document.getElementById(listid);
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    
//    const url = "./data/applications.json";
    const url = _BACKENDSERVER+"/applicationcatalogue/get/applications";
   
    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            for (let i = 0; i < data.length; i++) 
            {
                if (data[i].state === "Launched")
                {
                    option = document.createElement('option');
                    option.text = data[i].name;
                    option.value = data[i].id;
                    dropdown.add(option);
                    if (applicationId === data[i].id)
                    {
                        console.log("Found application");
                        dropdown.text = applicationId;
                        dropdown.value = applicationId;   
                    }
                }
            }
            
            console.log("dropdown.text = " + dropdown.text);
            console.log("dropdown.value = " + dropdown.value);
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
}


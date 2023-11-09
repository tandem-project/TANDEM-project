function listClouds(listId, cloudId) {
    console.log("Entering listClouds");
    let dropdown = document.getElementById(listId);
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
 
    const url = _BACKENDSERVER + "/infrastructurecatalogue/get/infrastructure/";
   
    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].edgeCloudName;
                option.value = data[i].edgeCloudId;
                dropdown.add(option);
            }
            
            if (cloudId !== null)
            {
                dropdown.text = cloudId;
                dropdown.value = cloudId;
                
            }
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
}


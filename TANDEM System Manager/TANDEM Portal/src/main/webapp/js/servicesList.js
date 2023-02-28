function listServices(listid, serviceName, serviceId) {
   
    let dropdown = document.getElementById(listid);
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    
//    const url = "./data/services.json";

    const url = _BACKENDSERVER+"/servicecatalogue/get/services";
   
    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].serName;
                option.value = data[i].serId;
                dropdown.add(option);
            }
            if ((serviceName !== null) || (serviceId !== null))
            {
                dropdown.text = serviceName;
                dropdown.value = serviceId;   
            }
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
}


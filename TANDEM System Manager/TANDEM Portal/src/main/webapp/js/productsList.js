async function listProducts(listId, productId, showSelectOption) {
    let dropdown = document.getElementById(listId);
    dropdown.length = 0;
    if (showSelectOption === true)
    {
        let defaultOption = document.createElement('option');
        defaultOption.text = 'Select';

        dropdown.add(defaultOption);
    }
    dropdown.selectedIndex = 0;

    const url = _BACKENDSERVER+"/servicecatalogue/get/products";
   
    await fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            let productName = "";
            let selectedIndex = 0;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].productName;
                option.value = data[i].productId;
                dropdown.add(option);
                //console.log("data[i].serId = " + data[i].serId);
                if (data[i].productId === productId)
                {
                    console.log("Product was found!");
                    productName = data[i].productName;
                    selectedIndex = i + 1;
                }
            }

            dropdown.selectedIndex = selectedIndex;
           
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
    //console.log("Exiting listServices");
}

// Lists the products that can be ordered (status >= Published)
function listConsumambleProducts(listId, productId) {
    console.log("Entering listConsumambleProducts");
    let dropdown = document.getElementById(listId);
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
   
    const url = _BACKENDSERVER+"/servicecatalogue/get/products";
   
    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            for (let i = 0; i < data.length; i++) {
                if (data[i].productLifeCycleStatus === "Product Published")
                {
                    option = document.createElement('option');
                    option.text = data[i].productName;
                    option.value = data[i].productId;
                    dropdown.add(option);
                    if (productId === data[i].productId)
                    {
                        dropdown.text = productId;
                        dropdown.value = productId;
                        //dropdown.readonly = true;
                        console.log('dropdown.value = ' + dropdown.value);
                        $('#'+listId).attr('disabled', true);
                        dropdown.style.color = 'black';
                    }
                }
            }
            
           
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
}


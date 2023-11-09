
function selectionList(listid, url, value) {
//function selectionList(listid, url) {
    console.log("#0");
    let dropdown = document.getElementById(listid);
    dropdown.length = 0;
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    console.log("#1");
    
    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].name;
                option.value = data[i].name;
                dropdown.add(option);
            }
                 
            if (value !== null)
                dropdown.value = value;
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        });
}
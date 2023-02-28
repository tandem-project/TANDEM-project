
function addOperationPopup(){
    document.getElementById("addOperationPopup").style.display = 'block';
}

function addOperation(tableId, columnsToReplicate){
//    var operation_name = document.getElementById("opname").innerText;
//    var operation_description = document.getElementById("opdesc").innerText;
//    var operation_type = document.getElementById("addoperationtypeselectreg").value;
//    var operation_endpoint = document.getElementById("opendpoint").innerText;

    document.getElementById('addOpParamsPopup').style.display = 'none';
    //addNewRow(tableId, columnsToReplicate);
//    var table = document.getElementById(tableId);
//    var rowsNum = table.rows.length;
//    var cells = table.rows[rowsNum-1].cells;
//    cells[0].innerText = operation_name;
//    cells[1].innerText = operation_description;
//    cells[2].innerText = operation_type;
//    cells[3].innerHTML = operation_endpoint.slice(0,15) + 
//                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
//                operation_endpoint + "'></i></a>";  
}

function addNewRow(tableId, columnsToReplicate) {
    var root = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var rows = root.getElementsByTagName('tr');
    var clone = cloneEl(rows[rows.length - 1]);
    root.appendChild(clone);
    cleanUpInputs(clone, tableId, columnsToReplicate);
}
    
function cloneEl(el) {
    var clo = el.cloneNode(true);
    return clo;
}
   
function cleanUpInputs(obj, tableId, columnsToReplicate) {
    var rows = document.getElementById(tableId).getElementsByTagName('tr');
    var rowToClear = rows[rows.length - 1];
    for (var i = 0; i < rowToClear.cells.length; i++){
        var clearCell = true;
        for (var m = 0; m < columnsToReplicate.length; m++){
            if ((columnsToReplicate[m] == i)){
                clearCell = false;
            }
        }
        if (clearCell == true){
            rowToClear.cells[i].innerHTML = ' ';
        }
    }
}

function deleteRow(t, tableId){
    var rowsNumber = document.getElementById(tableId).rows.length;
    if (rowsNumber > 3){
        var row = t.parentNode.parentNode.parentNode;
        document.getElementById(tableId).deleteRow(row.rowIndex);
    }
}

//////////////////////////////////

function jsonToTable(tableId, url) {
    var root = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    
    console.log("#11");
    
    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            
            for (let i = 0; i < data.length; i++) {
                let location = document.createTextNode(data[i].name);
                 
                // creating checkbox element
                var checkbox = document.createElement('input');
                // Assigning the attributes
                // to created checkbox
                checkbox.type = "checkbox";
                checkbox.name = "checklocation";
                console.log(data[i].name);
                var tr = document.createElement('tr');

                var td1 = document.createElement('td');
                var td2 = document.createElement('td');

                td1.appendChild(location);
                td2.appendChild(checkbox);
                tr.appendChild(td1);
                tr.appendChild(td2);
                root.appendChild(tr);
            }
                        
        })
                
              
        .catch(function(err) {  
            console.error('Fetch Error -', err);  
        }); 
}

// Get categories from json
//function getCategory(url, name, callback) {
//    var category = {href:'', id:'', name:'', version:''};
//    console.log("name = " + name);
//    
//    fetch(url)
//    
//        .then(response => response.json())
//        .then(data => {
//            // Examine the text in the response
//            console.log("data length = " + data.length);
//            let i = 0;
//            for (i = 0; i < data.length; i++) {
//                //let location = document.createTextNode(data[i].name);
//                console.log("i = " + i);
//                console.log("data.name = " + data[i].name);
//                if (data[i].name === name)
//                {
//                    category = data[i];
//                    console.log("Found category");
//                    break;
//                }
//            }
//            console.log("After the loop, i = " + i);
//            if (i === data.length)
//            {
//                category = null;
//                console.log("Category will be empty");
//            }
//                    
//        })
//                
//              
//        .catch(function(err) {  
//            console.error('Fetch Error -', err);  
//        }); 
//
//  
//        console.log("exiting from getCategory()");
//        callback(category);
//}

// Get Parameters from current URL
function getParams() {
    
    var idx = document.URL.indexOf('?');
    var params = new Array();
//    const queryString = window.location.search;
//    console.log(queryString);
//    var idx = queryString.indexOf('?');
    if (idx != -1) {
        console.log("idx was found!");
        var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
        console.log("Pairs: " + pairs);
        
        for (var i=0; i<pairs.length; i++) {
            console.log("Pair " + i + " : " + pairs[i]);
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
        }
    }
    else
    {
        console.log("idx = 1!!!");
    }
   
    // Get variables from the current page
    
       
//    const urlParams = new URLSearchParams(queryString);
//    console.log("URL Params" + urlParams);
//    params = urlParams;
    //
    console.log("Parameters: ");
    console.log("Service ID = " + params['serId']);
//    for (i = 0; i < params.length; i++)
//    {
//        for (j = 0; j < params[i].length; j ++)
//            console.log("i = " + i + ": " + params[i][j]);
//    }
    return params;
}


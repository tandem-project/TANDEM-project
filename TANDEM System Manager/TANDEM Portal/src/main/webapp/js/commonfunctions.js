var _GUISERVER = "http://localhost:8080/gui/";


function addNewRow(tableId, columnsToReplicate) {
    var root = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var rows = root.getElementsByTagName('tr');
    var clone = cloneEl(rows[rows.length - 1]);
    root.appendChild(clone);
    cleanUpInputs(clone, tableId, columnsToReplicate);
}

// Add a new row in simple services table showing Name, Description, Action. 
// This is used in serviceRegistration page for "Required" and "Optional" services
var relatedServiceIndex = 1;

async function addNewServiceRow(tableId, rowPrefix, serviceId, typeIds) {
    relatedServiceIndex++;
    var dropdownName = rowPrefix + "name";
    var dropdownId = rowPrefix + "name" + relatedServiceIndex;
    var textId = rowPrefix + "descr" + relatedServiceIndex;
    var root = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var rows1 = root.getElementsByTagName('tr');
    var clone = cloneEl(rows1[rows1.length - 1]);
    root.appendChild(clone);

    rows1[rows1.length - 1].cells[0].innerHTML = "<select class=\"regselect\" name=\"" + dropdownName + "\" id=\"" + dropdownId + "\"></select>";
    rows1[rows1.length - 1].cells[1].innerHTML = "<textarea id=\"" + textId + "\" readonly></textarea>";
    document.getElementById(textId).readOnly = true;
   
    const url = _BACKENDSERVER+"/servicecatalogue/get/services";
    if (typeIds === null)
    {
        //console.log("About to call listServices");
        await listServices(dropdownId, serviceId, textId, true);
    }
    else
    {
        //console.log("About to call listServicesGivenType");
        await listServicesGivenType(dropdownId, serviceId, textId, true, typeIds);
    }
    await setServiceDescriptionEvent(dropdownId, textId, url);
          
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

function deleteRow(t, tableId, zeroRowsPossible=false){
    var rowsNumber = document.getElementById(tableId).rows.length;
    if ((rowsNumber > 3) || (zeroRowsPossible)){
        var row = t.parentNode.parentNode.parentNode;
        document.getElementById(tableId).deleteRow(row.rowIndex);
    }
}

//////////////////////////////////

function jsonToTable(tableId, url, options) {
    var root = document.getElementById(tableId).getElementsByTagName('tbody')[0];

    fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            
            for (let i = 0; i < data.length; i++) {
                let option = document.createTextNode(data[i].name);
                 
                // creating checkbox element
                var checkbox = document.createElement('input');
                // Assigning the attributes
                // to created checkbox
                checkbox.type = "checkbox";
                checkbox.name = "checkoption";
                //console.log(data[i].name);
                if ((options !== null) && (options.includes(data[i].name)))
                {
                    //console.log("Found options!");
                    checkbox.checked = true;
                }
                var tr = document.createElement('tr');

                var td1 = document.createElement('td');
                var td2 = document.createElement('td');

                td1.appendChild(option);
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


// Get Parameters from current URL
function getParams() {
    
    var idx = document.URL.indexOf('?');
    var params = new Array();

    if (idx !== -1) {
        var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
        
        for (var i=0; i<pairs.length; i++) {
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
        }
    }
  
    return params;
}


//Remove all the elements from an html table
function emptyTable(htmlTable, initrow) {
    var table = document.getElementById(htmlTable);
    var tr = table.getElementsByTagName("tr");
    var length = tr.length;
    var startingPoint = 2;
    if (initrow !== 'undefined')
    {
        if ((initrow !== null) && (initrow !== ''))
        {
            startingPoint = initrow;
        }
    }
    var j = startingPoint;
    for (var i = startingPoint; i < length; i++) {
        table.deleteRow(j);

    }
}

//------------------------------------------------------------------------

// Find a specific state name, given the state id, from the backend
async function findStatusFromId(url, id)
{
    let status = '';
    await fetch(url)
    
        .then(response => response.json())
        .then(data => {
            // Examine the text in the response
            
            for (let i = 0; i < data.length; i++) {
                // find the status
                if (data[i].id === id)
                {
                    status = data[i].name;
                            
                    break;
                }
                        
            }
        });
    return status;
}

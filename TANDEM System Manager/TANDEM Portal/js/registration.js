function addOperationPopup(){
    document.getElementById("addOperationPopup").style.display = 'block';
}


function addOperation(tableId, columnsToReplicate){
    var operation_name = document.getElementById("opname").innerText;
    var operation_description = document.getElementById("opdesc").innerText;
    var operation_type = document.getElementById("addoperationtypeselectreg").value;
    var operation_endpoint = document.getElementById("opendpoint").innerText;

    document.getElementById('addOperationPopup').style.display = 'none';
    addNewRow(tableId, columnsToReplicate);
    var table = document.getElementById(tableId);
    var rowsNum = table.rows.length;
    var cells = table.rows[rowsNum-1].cells;
    cells[0].innerText = operation_name;
    cells[1].innerText = operation_description;
    cells[2].innerText = operation_type;
    cells[3].innerHTML = operation_endpoint.slice(0,15) + 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                operation_endpoint + "'></i></a>";  
}


function addNewRow(tableId, columnsToReplicate) {
    var root = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var rows = root.getElementsByTagName('tr');
    var clone = cloneEl(rows[rows.length - 1]);
    
    
    root.appendChild(clone);
    cleanUpInputs(clone, tableId, columnsToReplicate);

}


/*function addColumn(tableId) {
    var rows = document.getElementById(tableId).getElementsByTagName('tr'), i = 0, r, c, clone;
        while (r = rows[i++]) {
            c = r.getElementsByTagName('td');
            clone = cloneEl(c[c.length - 1]);
            cleanUpInputs(clone);
            c[0].parentNode.appendChild(clone);
        }
    }*/
    
    
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


function addBillingAddress(){
    document.getElementById('add-billing-address-btn').style.display = 'none';
    document.getElementById('billingaddress').style.display = 'block';   
}





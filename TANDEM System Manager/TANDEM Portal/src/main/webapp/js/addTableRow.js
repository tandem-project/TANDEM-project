
// Add a new row in a table showing with one collumn for value and another for Action. 

function addTableRow(tableId, value) {
    
    var table = document.getElementById(tableId);

    var row = table.insertRow(-1);
    row.innerHTML = "<tr>\
                        <td contenteditable>" + value + "</td>\
                        <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
                    </tr>";
}
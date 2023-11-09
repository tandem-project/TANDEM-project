
// Add a new row in URLs table showing URL and Action. 
// This is used in serviceRegistration page in "Service Description & APIs URLs" table

function addUrlRow(tableId, value) {
    
    var table = document.getElementById(tableId);
    
    //var rows = document.getElementById(tableId).getElementsByTagName('tr');
    //console.log("rows length = " + rows.length);
//    if (rows.length >= 3)
//    {
//        //Blank row
//        var row = table.insertRow(-1);
//        row.innerHTML = "<tr>\
//                            <td contenteditable></td>\
//                            <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, 'urlstable', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
//                        </tr>";
//    }
//    else
//    {

        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td contenteditable>" + value + "</td>\
                            <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, 'urlstable', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
                        </tr>";
//    }
}
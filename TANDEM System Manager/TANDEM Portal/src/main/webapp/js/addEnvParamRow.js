
// Add a new row in Environmental Parameters table showing Name & Action. 
// This is used in serviceRegistration page 

function addEnvParamRow(tableId, params) {
    var table = document.getElementById(tableId);

    var rows = document.getElementById(tableId).getElementsByTagName('tr');
//    console.log("rows length = " + rows.length);
   
    if (params === null)
    {
        //Blank row
        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td contenteditable></textarea></td>\
                            <td contenteditable></textarea></td>\
                            <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
                        </tr>";
    }
    else
    {
        for (var i = 0; i < params.length; i++)
        {
            var row = table.insertRow(-1);

            row.innerHTML = "<tr>\
                            <td contenteditable>" + params[i].name + "</textarea></td>\
                            <td contenteditable>" + params[i].value + "</textarea></td>\
                            <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
                          </tr>";
        }
    }
}
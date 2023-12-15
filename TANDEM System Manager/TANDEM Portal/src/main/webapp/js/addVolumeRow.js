
// Add a new row in Required Volumes table showing Name, Path, Host Path, Action. 
// This is used in serviceRegistration page 

function addVolumeRow(tableId, volumes) {
    var table = document.getElementById(tableId);

    var rows = document.getElementById(tableId).getElementsByTagName('tr');
//    console.log("rows length = " + rows.length);
   
    if (volumes === null)
    {
        //Blank row
        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td contenteditable></textarea></td>\
                            <td contenteditable></textarea></td>\
                            <td contenteditable></textarea></td>\
                            <td contenteditable></textarea></td>\
                            <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
                        </tr>";
    }
    else
    {
        for (var i = 0; i < volumes.length; i++)
        {
            var row = table.insertRow(-1);
            row.innerHTML = "<tr>\
                            <td contenteditable>" + volumes[i].name + "</textarea></td>\
                            <td contenteditable>" + volumes[i].path + "</textarea></td>\
                            <td contenteditable>" + volumes[i].hostpath + "</textarea></td>\
                            <td contenteditable>" + volumes[i].storage + "</textarea></td>\
                            <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
                          </tr>";
        }
    }
}

// Add a new row in Configuration Parameters table showing Name, Type, Value, Description, Action. 
// This is used in serviceRegistration page 
var paramTypeRowIndex = 0;
function addConfParamRow(tableId, defaultParameter) {
    var table = document.getElementById(tableId);

    var rows = document.getElementById(tableId).getElementsByTagName('tr');
    console.log("rows length = " + rows.length);
   
    if (defaultParameter === null)
    {
        //Blank row
        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td contenteditable></textarea></td>\
                            <td>\
                                <select class='regselect' name='configurationType'>\
                                    <option>string</option>\
                                    <option>number</option>\
                                    <option>boolean</option>\
                                    <option>null</option>\
                                    <option>object</option>\
                                    <option>array</option>\
                                </select>\
                            </td>\
                            <td contenteditable></textarea></td>\
                            <td contenteditable></textarea></td>\
                            <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
                        </tr>";
    }
    else
    {
        console.log("parameters array = " + defaultParameter.length);
        for (var i = 0; i < defaultParameter.length; i++)
        {
            var row = table.insertRow(-1);
            paramTypeRowIndex++;
            var selectListId = "configurationType" + paramTypeRowIndex;
            row.innerHTML = "<tr>\
                            <td contenteditable>" + defaultParameter[i].serParamName + "</textarea></td>\
                            <td>\
                                <select class='regselect' name='configurationType' id='" + selectListId + "'>\
                                    <option>string</option>\
                                    <option>number</option>\
                                    <option>boolean</option>\
                                    <option>null</option>\
                                    <option>object</option>\
                                    <option>array</option>\
                                </select>\
                            </td>\
                            <td contenteditable>" + defaultParameter[i].serParamTypicalValue + "</textarea></td>\
                            <td contenteditable>" + defaultParameter[i].serParamDescr + "</textarea></td>\
                            <td><a href='javascript:void(0)'><i class='far fa-trash-alt' title='Delete' onclick=\"deleteRow(this, '" + tableId + "', true)\" style='padding-bottom:5px;color:red;font-size:24px'></i></a></td>\
                          </tr>";
            // Select the proper value in selection list
            let dropdown = document.getElementById(selectListId);
            dropdown.value = defaultParameter[i].serParamType;
        }
    }
}
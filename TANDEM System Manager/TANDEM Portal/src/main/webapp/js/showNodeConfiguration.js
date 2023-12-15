// Show services that belong to the specific configuration
var confTypeSelected = false;
async function showNodeConfiguration(value, divId, tableId)
{
    if (confTypeSelected)
    {
        //Clean the table in order to reedit it
        emptyTable(tableId, 1);
    }
    else
    {
        //Just change the status of confTypeSelected
        confTypeSelected = true;
    }
        
    //First show the hidden elements
    document.getElementById(divId).style.display = 'block';

    var selectedConf = value;
        
    //Fill the available services table according to selected configuration
    //Get all services
    var availableServices = [];
    const url = _BACKENDSERVER+"/servicecatalogue/get/services";
   
    await fetch(url)
    
        .then(response => response.json())
        .then(data => {
                
            for (let i = 0; i < data.length; i++) {
                    
                var serName = data[i].serName;
                var serType = data[i].serType;
                var serCategory = data[i].serCategory.name;

                //Examin only services of PaaS type
                if (serType.includes("PaaS") === false)
                {
                    continue;
                }
                if (selectedConf === 'basic')
                {
                    if (serCategory.includes("IoT"))
                    {
                        availableServices.push(serName);
                    }
                }
                else
                {
                    availableServices.push(serName);
                }
            }
        
        })
                         
    .catch(function(err) {  
        console.error('Fetch Error -', err);  
    });
        
//        Add configured services in table
    var table = document.getElementById(tableId);
    for (let i = 0; i < availableServices.length; i++) {
        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td>" + availableServices[i] + "</td>\
                        </tr>";
    }
}

/////////////////////////////////////////////////


//// Show and configure hidden elements for manually selecting services for the node(i.e. 1 header and 2 tables that are related to available and installed services
var confManualSelected = false;
async function showManualConfiguration(value, divId, table1, table2, services)
{
//    console.log("param1 = " + value);
//   
//    console.log("about to display hidden elements");
    if (confManualSelected)
    {
        //Clean the table in order to reedit it
        emptyTable(table1, 1);
    }
    else
    {
        //Just change the status of confManualSelected
        confManualSelected = true;
    }
        
    //First show the hidden elements
  
    document.getElementById(divId).style.display = 'block';

    var selectedConf = value;
        
    //Fill the available services table according to selected configuration
    //Get all services
    var availableServices = [];
    const url = _BACKENDSERVER+"/servicecatalogue/get/services";
   
    await fetch(url)
    
        .then(response => response.json())
        .then(data => {
                
            for (let i = 0; i < data.length; i++) {
                    
                var serName = data[i].serName;
                var serType = data[i].serType;
                var serCategory = data[i].serCategory.name;

                //Examin only services of PaaS type
                if (serType.includes("PaaS") === false)
                {
                    continue;
                }
                if (selectedConf === 'basic')
                {
                    if (serCategory.includes("IoT"))
                    {
                        availableServices.push(serName);
                    }
                }
                else
                {
                    availableServices.push(serName);
                }
            }
        
        })
                         
    .catch(function(err) {  
        console.error('Fetch Error -', err);  
    });
        
//        Add available services in table
    const root1 = document.getElementById(table1).getElementsByTagName('tbody')[0];
    for (let i = 0; i < availableServices.length; i++) {
                
        let option = document.createTextNode(availableServices[i]);
        var tr = document.createElement('tr');

        var td = document.createElement('td');
                
        td.appendChild(option);
                
        tr.appendChild(td);
        root1.appendChild(tr);
    }
        
        
    //Fill the installed services table according to existing and newly selected tables
    if (services !== null)
    {
        //Show existing services 
//        const tempServices = ["TBD1", "TBD2"];
        const root2 = document.getElementById(table2).getElementsByTagName('tbody')[0];
        
        for (let i = 0; i < services.length; i++) {
                
            let option = document.createTextNode(services[i]);
        
            //Add new row
            var tr = document.createElement('tr');
            var td = document.createElement('td');
                
            td.appendChild(option);
                
            tr.appendChild(td);
            root2.appendChild(tr);
        }
    }
    //Add event handlers on above table's rows
    $(document).ready(function(){
        var startTable = table1;
        var $tabs=$("#" + startTable);
        $( "tbody.connectedSortable")
        .sortable({
            connectWith: ".connectedSortable",
            items: "> tr:not(:first)",
            appendTo: $tabs,
            helper:"clone",
            cursor:"move",
            zIndex: 999990
        }).disableSelection();
        $($tabs).droppable({
            accept: ".connectedSortable tr",
            hoverClass: "ui-state-hover",
            drop:function(event, ui){
                var start= ui.draggable.attr("id");
                var desTable = $(this).attr("id");
            
            return false;
            }
        });
    
        var startTable2 = table2;
        var $tabs2=$("#" + startTable2);
        $( "tbody.connectedSortable")
        .sortable({
            connectWith: ".connectedSortable",
            items: "> tr:not(:first)",
            appendTo: $tabs2,
            helper:"clone",
            cursor:"move",
            zIndex: 999990
        }).disableSelection();
        $($tabs2).droppable({
            accept: ".connectedSortable tr",
            hoverClass: "ui-state-hover",
            drop:function(event, ui){
                var start= ui.draggable.attr("id");
                var desTable = $(this).attr("id");     
          
                return false;
            }
        });

});
}

////////////////////////////////////////////////////////////////////////
var nodesSelected = false;
// Show all available nodes in a table
async function showNodes(divId, tableId)
{
    
//    console.log("about to display hidden elements");
    if (nodesSelected)
    {
        //Clean the table in order to reedit it
        emptyTable(tableId, 1);
    }
    else
    {
        //Just change the status of nodesSelected
        nodesSelected = true;
    }
        
    //First show the hidden elements
    document.getElementById(divId).style.display = 'block';
    
    //Fill the nodes table
    //Get all nodes
    var availableNodes = [];
    const url = _BACKENDSERVER+"/infrastructurecatalogue/get/infrastructure";
   
    await fetch(url)
    
        .then(response => response.json())
        .then(data => {
                
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].nodes.length; j++) {    
                    availableNodes.push(data[i].nodes[j]);
                }
            }
        
        })
                         
    .catch(function(err) {  
        console.error('Fetch Error -', err);  
    });

//        Add nodes in table
    var table = document.getElementById(tableId);
    for (let i = 0; i < availableNodes.length; i++) {
        var row = table.insertRow(-1);
        row.innerHTML = "<tr>\
                            <td>" + availableNodes[i].nodeName + "</td>\
                            <td><input type='radio' id='" + availableNodes[i].nodeName + "' name='node' value='" + availableNodes[i].nodeName + "'></td>\
                        </tr>";
    }
}

// Add a Node Capacity Table
function fillNodeCapacityTable(tableId, defaultParameter) {
    var table = document.getElementById(tableId);
   
    if (defaultParameter !== null)
    {
      
        table.rows[2].cells[1].innerHTML = defaultParameter.nodeMemoryCap;
        table.rows[2].cells[2].innerHTML = defaultParameter.nodeMemoryCapMU;
        table.rows[3].cells[1].innerHTML = defaultParameter.nodeCPUCap;
        table.rows[4].cells[1].innerHTML = defaultParameter.nodeStorageCap;
        table.rows[4].cells[2].innerHTML = defaultParameter.nodeStorageCapMU;
        table.rows[5].cells[1].innerHTML = defaultParameter.nodeMaxNoofPods;
    }
}

// Add a Node Additional/General Info Table
function fillNodeCapacityTable(tableId, defaultParameter) {
    var table = document.getElementById(tableId);

    if (defaultParameter !== null)
    {
      
        table.rows[2].cells[1].innerHTML = defaultParameter.nodeOS;
       
        table.rows[3].cells[1].innerHTML = defaultParameter.nodeKubernetesVersion;
        table.rows[4].cells[1].innerHTML = defaultParameter.nodeKernelVersion;
        
        table.rows[5].cells[1].innerHTML = defaultParameter.nodeArchitecture;
        table.rows[6].cells[1].innerHTML = defaultParameter.nodecontainerRuntimeVersion;
    }
}
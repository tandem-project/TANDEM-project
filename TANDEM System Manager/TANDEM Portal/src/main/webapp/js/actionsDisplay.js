for (let i = 0; i < document.getElementById("myTable").rows.length - 1; i++){
    var currentId = i + 1;
    var statusId = "status" + currentId;
    var status = document.getElementById(statusId).innerHTML;
    var actionsPrefix = "action"  + currentId + "-";
    if (status == "In Study"){
        //  document.getElementById("act1").style.display = "none";
    }
    else if (status == "In Design"){
    
    }
    else if (status == "In Organization Approve"){
    
    }
    else if (status == "In TANDEM test"){
    
    }
    else if (status == "Launched"){
    
    }
    else if (status == "Active"){
    
    }
    else if (status == "Rejected"){
    
    }
    else if (status == "Retired"){
    
    }
}
alert(statusId);
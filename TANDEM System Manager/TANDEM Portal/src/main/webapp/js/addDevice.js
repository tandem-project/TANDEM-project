
function submitDeviceRegistration(event) {
  
    var id, name, description, labels, adminState, opState, ip, port, type, node;
    
    // Check if all required fields are completed
    var isoktoadd = true;
    var errorlist = new Array();
    if (document.getElementById("deviceidreg").value===""){
        isoktoadd = false;
        errorlist.push("device id");
    }
    if (document.getElementById("devicenamereg").value===""){
        isoktoadd = false;
        errorlist.push("device name");
    }
    if (document.getElementById("deviceadminstate").value==="Select"){
        isoktoadd = false;
        errorlist.push("admin state");
    }
    
    if (document.getElementById("deviceoperatingstate").value==="Select"){
        isoktoadd = false;
        errorlist.push("operating state");
    }
 
    if (document.getElementById("deviceipreg").value===""){
        isoktoadd = false;
        errorlist.push("device ip");
    }
    if (document.getElementById("deviceportreg").value===""){
        isoktoadd = false;
        errorlist.push("device port");
    }
    
//    node = document.querySelector('input[name="node"]:checked');
//    console.log("node = " + node);
    if (document.querySelector('input[name="node"]:checked') === null) {
        isoktoadd = false;
        errorlist.push("TANDEN Node");
    }
    
    if (!isoktoadd){
        var message = "The next fields are empty:";
        for (i = 0; i < errorlist.length; i++)
        {
            
            if (i === errorlist.length - 1)
            {
                message = message + " " + errorlist[i];
            }
            else
            {
                message = message + " " + errorlist[i] + ",";
            }
        }
        dispmess('ERROR',message);
        return;
    }
    
    // Get device data
    id = document.getElementById("deviceidreg").value;
    name = document.getElementById("devicenamereg").value;

    description = document.getElementById("devicedescriptionreg").value;
    adminState = document.getElementById("deviceadminstate").value;
    opState = document.getElementById("deviceoperatingstate").value;

    ip = document.getElementById("deviceipreg").value;
    port = document.getElementById("deviceportreg").value;
    type = document.getElementById("devicetypereg").value;
    if (type === "Select")
    {
        type = '';
    }
    
    // Get labels
    labels = new Array();
    
    var labelsString = document.getElementById("devicelabelsreg").value;
    if (labelsString !== "")
    {
        console.log("labelsString = " + labelsString);
        labels = labelsString.split(",");
        for (var i = 0; i < labels.length; i++)
        {
            labels[i] = labels[i].trim();
        }
    }
 
    console.log("labels = " + labels);

    // Get Tandem Node
    node = document.querySelector('input[name="node"]:checked').value;
    
    //below we are binding the input data (json format) in a variable inorder to post it.

    var data = {
        id: id,
        name: name,
        description: description,
        labels: labels,
        adminState: adminState,
        operatingState: opState,
        ip: ip,
        port: port,
        type: type,
        deviceNode: node
    };
    
   
    //Send json
    var url = _BACKENDSERVER+"/devicecatalogue/create/devices";
    CallPostUrl(url,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_adddev");
}
resultfnct['_adddev'] = function (arg1) {
    console.log("Status 200");
    dispmess('info','Device was saved');

}
resultfnct['err_adddev'] = function (arg1) {
    console.log("ERROR3 in submission");
    dispmess('info','device was saved');
}
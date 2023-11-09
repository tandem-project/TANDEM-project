function submitServicesFiltersForm() {
  
    var name, type, category, provider, status;
    //displayServices();
    name = document.getElementById("servicename").value;
    type = document.getElementById("servicetype").value;
    category = document.getElementById("servicecategory").value;
    provider = document.getElementById("serviceprovider").value;
    status = document.getElementById("servicestatus").value;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        var keepLine = true;
        td_servicename = tr[i].getElementsByTagName("td")[1];
        td_servicetype = tr[i].getElementsByTagName("td")[2];
        td_servicecategory = tr[i].getElementsByTagName("td")[5];
        td_serviceprovider = tr[i].getElementsByTagName("td")[3];
        td_servicestatus = tr[i].getElementsByTagName("td")[7];
        console.log("name = " + name);
//        console.log("td_servicename = " + td_servicename);
        if (name != "" && td_servicename){
            nameTxtValue = td_servicename.textContent || td_servicename.innerText;
            console.log("nameTxtValue = " + nameTxtValue);
            if (nameTxtValue != name){
                keepLine = false;
            }
            else {
                console.log("MAtched!");
            }
        }
        if (type != "Select" && td_servicetype){
            typeTxtValue = td_servicetype.textContent || td_servicetype.innerText;
            if (typeTxtValue != type){
                keepLine = false;
            }
        }
        if (category != "Select" && td_servicecategory){
            categoryTxtValue = td_servicecategory.textContent || td_servicecategory.innerText;
            if (categoryTxtValue != category){
                keepLine = false;
            }
        }
        if (provider != "Select" && td_serviceprovider){
            providerTxtValue = td_serviceprovider.textContent || td_serviceprovider.innerText;
            if (providerTxtValue != provider){
                keepLine = false;
            }
        }
        if (status != "Select" && td_servicestatus){
            statusTxtValue = td_servicestatus.textContent || td_servicestatus.innerText;
                    console.log(status + " " + statusTxtValue);

            if (statusTxtValue != status){
                keepLine = false;
            }
        }
        
        if (keepLine){
            console.log("Keep in line");
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
    document.getElementById('myTable').style.display = "block";
}


function submitApplicationsFiltersForm() {
  
    var name, category, provider, state;
    name = document.getElementById("applicationname").value;
    category = document.getElementById("applicationcategory").value;
    provider = document.getElementById("applicationprovider").value;
    state = document.getElementById("applicationstate").value;
    table = document.getElementById("applicationsTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        var keepLine = true;
        td_applicationname = tr[i].getElementsByTagName("td")[0];
        td_applicationcategory = tr[i].getElementsByTagName("td")[1];
        td_applicationprovider = tr[i].getElementsByTagName("td")[3];
        td_applicationstate = tr[i].getElementsByTagName("td")[7];
        console.log("name = " + name);
        console.log("td_applicationname = " + td_applicationname);
        if (name != "" && td_applicationname){
            applicationnameTxtValue = td_applicationname.textContent || td_applicationname.innerText;
            console.log("applicationnameTxtValue = " + applicationnameTxtValue);
            if (applicationnameTxtValue != name){
                keepLine = false;
            }
        }

        if (category != "Select" && td_applicationcategory){
            applicationcategoryTxtValue = td_applicationcategory.textContent || td_applicationcategory.innerText;
            if (applicationcategoryTxtValue != category){
                keepLine = false;
            }
        }
        
        if (provider != "Select" && td_applicationprovider){
            applicationproviderTxtValue = td_applicationprovider.textContent || td_applicationprovider.innerText;
            if (applicationproviderTxtValue != provider){
                keepLine = false;
            }
        }
        if (state != "Select" && td_applicationstate){
            applicationstateTxtValue = td_applicationstate.textContent || td_applicationstate.innerText;
            if (applicationstateTxtValue != state){
                keepLine = false;
            }
        }
        
        if (keepLine){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
    document.getElementById('applicationsTable').style.display = "block";
}



function submitDevicesFiltersForm(){
    var name, type, manufacturer, labels, opstate, adstate, protocol;
    name = document.getElementById("devname").value;
    labels = document.getElementById("devlabels").value;
    opstate = document.getElementById("devopstate").value;
    adstate = document.getElementById("devadstate").value;
    table = document.getElementById("devicesTable");
    tr = table.getElementsByTagName("tr");
    
    for (i = 0; i < tr.length; i++) {
        var keepLine = true;
        td_devicename = tr[i].getElementsByTagName("td")[0];
        td_devicelabels = tr[i].getElementsByTagName("td")[5];
        td_deviceopstate = tr[i].getElementsByTagName("td")[6];
        td_deviceadstate = tr[i].getElementsByTagName("td")[7];

        if (name != "" && td_devicename){
            nameTxtValue = td_devicename.textContent || td_devicename.innerText;
            if (nameTxtValue != name){
                keepLine = false;
            }
        }
        if (labels != "" && td_devicelabels){
            labelsTxtValue = td_devicelabels.textContent || td_devicelabels.innerText;
            if (labelsTxtValue != name){
                keepLine = false;
            }
        }
        if (opstate != "Select" && td_deviceopstate){
            opstateTxtValue = td_deviceopstate.textContent || td_deviceopstate.innerText;
            console.log(opstate);
            console.log(opstateTxtValue);
            if (opstateTxtValue != opstate){
                keepLine = false;
            }
        }
        if (adstate !== "Select" && td_deviceadstate){
            adstateTxtValue = td_deviceadstate.textContent || td_deviceadstate.innerText;
            if (adstateTxtValue != adstate){
                keepLine = false;
            }
        }
        if (keepLine){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
    document.getElementById('devicesTable').style.display = "block";
}



function submitEdgeCloudsFiltersForm(){
    var name, availabilityZone, provider;
    name = document.getElementById("edgecloudname").value;
    availabilityZone = document.getElementById("edgecloudzone").value;
    provider = document.getElementById("edgecloudprovider").value;
    table = document.getElementById("edgeCloudsTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {       //starting from second row because first is title
        var keepLine = true;
        td_edgecloudname = tr[i].getElementsByTagName("td")[1];
        td_edgecloudzone = tr[i].getElementsByTagName("td")[2];
        td_edgecloudprovider = tr[i].getElementsByTagName("td")[5];

        if (name != "" && td_edgecloudname){
            
            nameTxtValue = td_edgecloudname.textContent || td_edgecloudname.innerText;

            if (nameTxtValue != name){
                keepLine = false;
            }
        }
        if (availabilityZone != "Select" && td_edgecloudzone){
            availabilityZoneTxtValue = td_edgecloudzone.textContent || td_edgecloudzone.innerText;
            if (availabilityZoneTxtValue != availabilityZone){
                keepLine = false;
            }
        }
        if (provider != "Select" && td_edgecloudprovider){
            providerTxtValue = td_edgecloudprovider.textContent || td_edgecloudprovider.innerText;
            if (providerTxtValue != provider){
                keepLine = false;
            }
        }
        if (keepLine){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
    document.getElementById('edgeCloudsTable').style.display = "block";
}



function submitUsersFiltersForm(){
    var firstname, lastname, username, accounttype, companyname, role;
    firstname = document.getElementById("userfirstname").value;
    lastname = document.getElementById("userlastname").value;
    username = document.getElementById("userusername").value;
    accounttype = document.getElementById("useraccounttype").value;
    companyname = document.getElementById("usercompanyname").value;
    role = document.getElementById("userrole").value;
    table = document.getElementById("usersTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {       
        var keepLine = true;
        td_firstname = tr[i].getElementsByTagName("td")[1];
        td_lastname = tr[i].getElementsByTagName("td")[2];
        td_username = tr[i].getElementsByTagName("td")[4];
        td_accounttype = tr[i].getElementsByTagName("td")[7];
        td_companyname = tr[i].getElementsByTagName("td")[5];
        td_role = tr[i].getElementsByTagName("td")[11];

        if (firstname != "" && td_firstname){
            firstnameTxtValue = td_firstname.textContent || td_firstname.innerText;
            if (firstnameTxtValue !== firstname){
                keepLine = false;
            }
        }
        if (lastname != "" && td_lastname){
            lastnameTxtValue = td_lastname.textContent || td_lastname.innerText;
            if (lastnameTxtValue != lastname){
                keepLine = false;
            }
        }
        if (username != "" && td_username){
            usernameTxtValue = td_username.textContent || td_username.innerText;
            if (usernameTxtValue != username){
                keepLine = false;
            }
        }

        if (accounttype != "Select" && td_accounttype){
            accounttypeTxtValue = td_accounttype.textContent || td_accounttype.innerText;
            if (accounttypeTxtValue != accounttype){
                keepLine = false;
            }
        }
                                                
        if (companyname != "Select" && td_companyname){
            companynameTxtValue = td_companyname.textContent || td_companyname.innerText;
            if (companynameTxtValue != companyname){
                keepLine = false;
            }
        }
        if (role != "Select" && td_role){
            roleTxtValue = td_role.textContent || td_role.innerText;
            if (roleTxtValue != role){
                keepLine = false;
            }
        }
        if (keepLine){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
    document.getElementById('usersTable').style.display = "block";
}
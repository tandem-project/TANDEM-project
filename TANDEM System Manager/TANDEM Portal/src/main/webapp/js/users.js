var usersInfo = [
    {
        "userId": "ICOM",
        "userFirstName": "Dimitris",
        "userLastName": "Christou",
        "userEmail": "info@intracom-telecom.com",
        "userName": "ICOMProfessional",
        "userPassword": "******",
        "userAccountType": "Professional",
        "userCompanyName": "INTRACOM S.A. Telecom Solutions",
        "userPhoneNumber": "string",
        "userPaymentInfo": {
            "userCardNumber": "**** **** **** 4344",
            "userExpirationDate": "08/27",
            "userCardname": "INTRACOM",
            "userCVV": "***",
            "userPAN": "***"
        },
        "userPhysicalAddress": {
            "userCountry": "Greece",
            "userAddress": "19,7 Km Markopoulou Ave.",
            "userCity": "Peania, Athens",
            "userState": "Attika",
            "userPostalCode": "19002"
        },
        "userBillingAddress": {
            "userCountry": "Greece",
            "userAddress": "19,7 Km Markopoulou Ave.",
            "userCity": "Peania, Athens",
            "userState": "Attika",
            "userPostalCode": "19002"
        },
        "userRole": "Administrator",
        "userInterests": [{"serCategoryId":"TANDEM_SerCat2", "serCategoryName":"Internet of Things (IoT)"}, {"serCategoryId":"TANDEM_SerCat5", "serCategoryName":"Augmented Reality"}],
        "userOfferedServices": [{"serID":"TANDEM_ser3", "serName":"Object Detection Service"}, {"serID":"TANDEM_ser1", "serName":"Temperature and Humidity Monitoring Service"}],
        "userObtainedServices": [{"serID":"TANDEM_ser5", "serName":"EdgeX Foundry services"}, {"serID":"TANDEM_ser6", "serName":"Grafana Service"}],
        "userInstantiatedServices": [{"serID":"TANDEM_ser3", "serName":"Object Detection Service"}, {"serID":"TANDEM_ser1", "serName":"Temperature and Humidity Monitoring Service"}],
        "userBillingInfo": [{"billingURL": "/ICOM/Billing"}]
    }  
];



  
function displayUsers(action) {
    //if (action=="1")
        //getjsoninfo("1");
    var length = usersInfo.length;
    var htmltext = "";

    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='userid'>" + "ID" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='firstname'>" + "First Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='lastname'>" + "Last Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Email" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='username'>" + "Username" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc'  aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='companyname'>" + "Company Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Phone Number" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Account Type" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Payment Info" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Physical Address" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Billing Address" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Role" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Interests" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Offered Services" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Obtained Services" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Instantiated Services" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Billing Info" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Actions" + "<a href='#'></a></th>\
            </tr>";

    for (var i = 0; i < length; i++) {   
        /////////////////////////////// construct icons table
        var iconstab = JSON.parse("{}");
        iconstab["tdstyle"]="padding-bottom: 1px;padding-top: 1px;border-style: outset;";
        iconstab["rows"] = JSON.parse("[]");
        var iconsarr1 = JSON.parse("[]"); 
        iconsarr1.push("<i class='far fa-trash-alt' onclick='deleteuser(\""+usersInfo[i].userId+"\")' title='Delete' style='color:red;font-size:18px'></i>");
        
        iconstab["rows"].push(iconsarr1);
       
        ////////////////////////////////// construct icons table
    //htmltext +=
        var tmpstr = "<tr><td>" + usersInfo[i].userId + "</td>\
                <td>" ;
        if (!usersInfo[i].userFirstName) usersInfo[i].userFirstName = "";
        if (!usersInfo[i].userLastName) usersInfo[i].userLastName = "";
        if (!usersInfo[i].userName) usersInfo[i].userName = "";
        if (!usersInfo[i].userEmail) usersInfo[i].userEmail = "";
        if (!usersInfo[i].userCompanyName) usersInfo[i].userCompanyName = "";
        if (!usersInfo[i].userPhoneNumber) usersInfo[i].userPhoneNumber = "";
        if (!usersInfo[i].userAccountType) usersInfo[i].userAccountType = "";
                tmpstr += usersInfo[i].userFirstName + "</td>\
                <td>" + usersInfo[i].userLastName + "</td>\
                <td>" ;
                tmpstr += usersInfo[i].userEmail + "</td>\
                <td>" + usersInfo[i].userName + "</td>\
                <td>" + usersInfo[i].userCompanyName + "</td>\
                <td>" + usersInfo[i].userPhoneNumber + "</td>\
                <td>" ;
                tmpstr += usersInfo[i].userAccountType + "</td>\
                <td>" ;
        if (!usersInfo[i].userPaymentInfo)
            tmpstr += "</td>\<td>";
        else
            tmpstr +=
                + usersInfo[i].userPaymentInfo.userCardNumber 
                + "<br>" 
                + usersInfo[i].userPaymentInfo.userExpirationDate +
                "<br>" 
                + usersInfo[i].userPaymentInfo.userCardname 
                + "<br>" 
                + usersInfo[i].userPaymentInfo.userCVV + 
                "<br>" 
                + usersInfo[i].userPaymentInfo.userPAN + "</td>\
                <td>" ;
        if (!usersInfo[i].userBillingAddress)
            tmpstr += "</td>\<td>";
        else
            tmpstr +=
                + usersInfo[i].userBillingAddress.userCountry + 
                "<br>" 
                + usersInfo[i].userBillingAddress.userAddress +
                "<br>" 
                + usersInfo[i].userBillingAddress.userCity + 
                "<br>"
                + usersInfo[i].userBillingAddress.userState +
                "<br>" 
                + usersInfo[i].userBillingAddress.userPostalCode + 
                "</td>\<td>" ;
        if (!usersInfo[i].userPhysicalAddress)
            tmpstr += "</td>\<td>";
        else
            tmpstr +=
                + usersInfo[i].userPhysicalAddress.userCountry + 
                "<br>" 
                + usersInfo[i].userPhysicalAddress.userAddress +
                "<br>" 
                + usersInfo[i].userPhysicalAddress.userCity + 
                "<br>"
                + usersInfo[i].userPhysicalAddress.userState +
                "<br>" 
                + usersInfo[i].userPhysicalAddress.userPostalCode + 
                "</td>\<td>" ;
            tmpstr +=  usersInfo[i].userRole + 
                "</td>\
                <td>";
                htmltext += tmpstr;
                var j=0;
                if (usersInfo[i].userInterests)
                for (j=0; j < usersInfo[i].userInterests.length; j++){
                    htmltext += usersInfo[i].userInterests[j].interestName + ", ";
                }
                else
                    htmltext += "  ";
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td><td>";
                if (usersInfo[i].userOfferedServices)
                for (j=0; j < usersInfo[i].userOfferedServices.length; j++){
                    htmltext += usersInfo[i].userOfferedServices[j].offservName + ", ";
                }
                else
                    htmltext += "  ";
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td><td>";
                
                if (usersInfo[i].userObtainedServices!=null)
                for (j=0; j < usersInfo[i].userObtainedServices.length; j++){
                    htmltext += usersInfo[i].userObtainedServices[j].obtserName + ", ";
                }
                else
                    htmltext += "  ";
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td><td>";
                
                if (usersInfo[i].userInstantiatedServices!=null)
                for (j=0; j < usersInfo[i].userInstantiatedServices.length; j++){
                    htmltext += usersInfo[i].userInstantiatedServices[j].instserName + ", ";
                }
                else
                    htmltext += "  ";
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td><td>";
                
                if (usersInfo[i].userBillingInfo!=null)
                for (j=0; j < usersInfo[i].userBillingInfo.length; j++){
                    htmltext += usersInfo[i].userBillingInfo[j].billingURL + ", ";
                }
                else
                    htmltext += "  ";
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td>\
                <td>" + 
                    _makeicons(iconstab) +
                "</td>\
                </tr>";       
    }
    document.getElementById("usersTable").innerHTML = htmltext;
}



function addOnClickUserEvents(tableid){
    document.getElementById('userid').addEventListener('click', function(event){
        sortTableRows(tableid, 0);
    });
    
    document.getElementById('firstname').addEventListener('click', function(event){
        sortTableRows(tableid, 1);
    });
    
    document.getElementById('lastname').addEventListener('click', function(event){
        sortTableRows(tableid, 2);
    });
    
    
    document.getElementById('username').addEventListener('click', function(event){
        sortTableRows(tableid, 4);
    });
    
    document.getElementById('companyname').addEventListener('click', function(event){
        sortTableRows(tableid, 6);
    });
}


resultfnct['jsoninfo'] = function (arg1) { 
    usersInfo = JSON.parse(arg1);
    displayUsers("0");
    addOnClickUserEvents('usersTable');
};
resultfnct['jsoninfo1'] = function (arg1) { 
    usersInfo = JSON.parse(arg1);
    displayUsers("1");
    addOnClickUserEvents('usersTable');
    document.getElementById('usersTable').style.display = "block";
};
resultfnct['errjsoninfo'] = function (sts) {
    alert("error="+sts);
} 
resultfnct['errjsoninfo1'] = function (sts) {
    alert("error="+sts);
} 

function deleteuser(id){
    if (confirm("Delete User?") == false) {
        return;
    }
    var url = _BACKENDSERVER+"/usercatalogue/delete/users/"+id;
    CallPostUrl(url,"DELETE",null,[],"dummyans");
}
resultfnct['dummyans'] = function (sts) {
    //alert("error="+sts);
    getjsoninfo("1");
} 
resultfnct['errdummyans'] = function (sts) {
    //alert("error="+sts);
} 
function getjsoninfo(action){
    usersInfo = "";
    document.getElementById('usersTable').style.display = "none";
    if (action == "0")
        CallPostUrl("data/users.json","GET",null,[],"jsoninfo");
    if (action == "1"){
        var url = _BACKENDSERVER+"/usercatalogue/search";
        if (_USERROLE=="Administrator")
            url += "?userCompanyName="+_COMPANYNAME;
        else if (_USERROLE!="Operator") return;
        CallPostUrl(url,"GET",null,[],"jsoninfo1");
    }
}
function loginuser(){
    var useremail = document.getElementById('useremail').value;
    var userpassword = document.getElementById('userpassword').value;
    var sendinfo = JSON.parse("{}");
    //sendinfo['email'] = useremail;
    //sendinfo['password'] = userpassword;
    sendinfo['usrnm'] = useremail;
    sendinfo['psw'] = userpassword;
    closeLoginForm();
    //var url = "data/loginans.txt";  // assume this is the answer from back end. if you change the roleid, you will allow to part of the functions
    var url = _BACKENDSERVER+"/usercatalogue/aam/login";
    CallPostUrl(url,"POST",sendinfo,[],"loginans");
}
resultfnct['loginans'] = function (arg1) {
try {
    var ans = JSON.parse(arg1);
    if (ans.status==200){
        _TOKEN = ans.result.token;
        _USERNAME = ans.result.name;
        _USERROLE = ans.result.role;
        document.getElementById('_ituserinfo').innerHTML = 'Hello, '+_USERNAME+' '+'<i class="fa fa-fw fa-user">';
        document.getElementById('_ituserinfo').style.display='block';
        userauthor();
    }
    if (ans.status!=200){
      if (ans.status==400)
          dispmess('Error',"no such user");
      else if (ans.status==402)
          dispmess('Error',"wrong password");
      else
        dispmess('Error',ans.status);
    }
} catch (error) {
  document.getElementById('_ituserinfo').style.display='none';
  alert(error);
}
} 
resultfnct['errloginans'] = function (arg1) {
    alert(arg1);
} 


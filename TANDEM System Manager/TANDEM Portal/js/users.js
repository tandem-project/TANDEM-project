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
    if (action=="1")
        getjsoninfo("1");
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
    htmltext +=
      "<tr>\
                <td>" + usersInfo[i].userId + "</td>\
                <td>" + usersInfo[i].userFirstName + "</td>\
                <td>" + usersInfo[i].userLastName + "</td>\
                <td>" + usersInfo[i].userEmail + "</td>\
                <td>" + usersInfo[i].userName + "</td>\
                <td>" + usersInfo[i].userCompanyName + "</td>\
                <td>" + usersInfo[i].userPhoneNumber + "</td>\
                <td>" + usersInfo[i].userAccountType + "</td>\
                <td>" + usersInfo[i].userPaymentInfo.userCardNumber + "<br>" + usersInfo[i].userPaymentInfo.userExpirationDate +
                "<br>" + usersInfo[i].userPaymentInfo.userCardname + "<br>" + usersInfo[i].userPaymentInfo.userCVV + 
                "<br>" + usersInfo[i].userPaymentInfo.userPAN + "</td>\
                <td>" + usersInfo[i].userPhysicalAddress.userCountry + "<br>" + usersInfo[i].userPhysicalAddress.userAddress +
                "<br>" + usersInfo[i].userPhysicalAddress.userCity + "<br>" + usersInfo[i].userPhysicalAddress.userState + "<br>" + 
                usersInfo[i].userPhysicalAddress.userPostalCode + "</td>\
                <td>" + usersInfo[i].userBillingAddress.userCountry + "<br>" + usersInfo[i].userBillingAddress.userAddress +
                "<br>" + usersInfo[i].userBillingAddress.userCity + "<br>" + usersInfo[i].userBillingAddress.userState +
                "<br>" + usersInfo[i].userBillingAddress.userPostalCode + "</td>\
                <td>" + usersInfo[i].userRole + "</td>\
                <td>";
                var j=0;
                for (j=0; j < usersInfo[i].userInterests.length; j++){
                    htmltext += usersInfo[i].userInterests[j].interestName + ", ";
                }
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td><td>";
                
                for (j=0; j < usersInfo[i].userOfferedServices.length; j++){
                    htmltext += usersInfo[i].userOfferedServices[j].offservName + ", ";
                }
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td><td>";
                
                for (j=0; j < usersInfo[i].userObtainedServices.length; j++){
                    htmltext += usersInfo[i].userObtainedServices[j].obtserName + ", ";
                }
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td><td>";
                
                for (j=0; j < usersInfo[i].userInstantiatedServices.length; j++){
                    htmltext += usersInfo[i].userInstantiatedServices[j].instserName + ", ";
                }
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td><td>";
                
                for (j=0; j < usersInfo[i].userBillingInfo.length; j++){
                    htmltext += usersInfo[i].userBillingInfo[j].billingURL + ", ";
                }
                htmltext = htmltext.substring(0, htmltext.length - 2);
                htmltext += "</td>\
                <td>" + "<a href='#'><i class='fas fa-edit' title='Edit' style='padding-bottom:5px;color:black;font-size:24px'></i></a>" +
                    " <a href='#'><i class='far fa-trash-alt' title='Delete' style='padding-bottom:5px;color:red;font-size:24px'></i></a>" +
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
    //addOnClickServicesEvents('myTable');
};
resultfnct['errjsoninfo'] = function (sts) {
    alert("error="+sts);
} 
resultfnct['errjsoninfo1'] = function (sts) {
    alert("error="+sts);
} 


function getjsoninfo(action){
    usersInfo = "";
    document.getElementById('usersTable').style.display = "none";
    if (action == "0")
        CallPostUrl("data/users.json","GET",null,[],"jsoninfo");
    if (action == "1")
        CallPostUrl("http://146.124.106.209/servicecatalogue/get/services","GET",null,[],"jsoninfo1");
}
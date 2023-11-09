/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

function submitUserRegistration(event) {
  
    var id, username, fname, lname, psw, mail, company, accountType, role;
    var isoktoadd = true;
    var errorlist = "";
    if (document.getElementById("useridreg").value==""){
        isoktoadd = false;
        errorlist += "user id,";
    }
    if (document.getElementById("userusernamereg").value==""){
        errorlist += "username,";
        isoktoadd = false;
    }
    if (document.getElementById("userpasswordreg").value==""){
        errorlist += "password,";
        isoktoadd = false;
    }
    if (document.getElementById("userfirstnamereg").value==""){
        errorlist += "first name,";
        isoktoadd = false;
    }
    if (document.getElementById("userlastnamereg").value==""){
        errorlist += "last name,";
        isoktoadd = false;
    }
    // Get user data
    id = document.getElementById("useridreg").value;
    username = document.getElementById("userusernamereg").value;
    fname = document.getElementById("userfirstnamereg").value;
    lname = document.getElementById("userlastnamereg").value;
    psw = document.getElementById("userpasswordreg").value;
    mail = document.getElementById("useremailreg").value;
    company = document.getElementById("usercompanynamereg").value;
    if (company=="") company = document.getElementById("usercomplistreg").value;
    if (company=="Select") company = "";
    if (company==""){
        errorlist += "company,";
        isoktoadd = false;
    }
    if (!isoktoadd){
        dispmess('error',errorlist + ' EMPTY FIELD(s)');
        return;
    }
    accountType = document.getElementById("useraccounttypereg").value;
    role = document.getElementById("userrolereg").value;
    var physicalAddress = {userCountry:'', userAddress:'', userCity:'', userState:'', userPostalCode:''};
    var billingAddress = {userCountry:'', userAddress:'', userCity:'', userState:'', userPostalCode:''};
    
    // Get Physical address
    tablePhysAddr = document.getElementById("physicaladdresstable");
    physicalAddress.userCountry = tablePhysAddr.rows[1].cells[1].innerHTML;
    physicalAddress.userAddress = tablePhysAddr.rows[2].cells[1].innerHTML;
    physicalAddress.userCity = tablePhysAddr.rows[3].cells[1].innerHTML;
    physicalAddress.userState = tablePhysAddr.rows[4].cells[1].innerHTML;
    physicalAddress.userPostalCode = tablePhysAddr.rows[5].cells[1].innerHTML;

    // Get Billing address
    if (document.getElementById("billingaddress").style.display !== 'none') {
        tableBillAddr = document.getElementById("billingaddresstable");
        billingAddress.userCountry = tableBillAddr.rows[1].cells[1].innerHTML;
        billingAddress.userAddress = tableBillAddr.rows[2].cells[1].innerHTML;
        billingAddress.userCity = tableBillAddr.rows[3].cells[1].innerHTML;
        billingAddress.userState = tableBillAddr.rows[4].cells[1].innerHTML;
        billingAddress.userPostalCode = tableBillAddr.rows[5].cells[1].innerHTML;
    }
    
    //Get Interests
    var interests = new Array();
    var tableInterests = document.getElementById("intereststable");
    tr = tableInterests.getElementsByTagName("tr");
    
    for (i = 2; i < tr.length; i++) {
        
        td_interest = document.getElementsByName('interest')[i-2];
        
        interests[i-2] = td_interest.value;
        console.log("#4");
        
    }
    //interestList = tableInterests.rows[0].cells[0].innerHTML;
    //console.log("InterestList: " + interestList.value);
    //interest = interestList.value;
    console.log("Interest: " + interests);
    interestsJson = new Array();
    for (i = 0; i < interests.length; i++) {
        interestsJson[i] = {
            interestId: "",
            interestName: interests[i]
        };
    }
   
    // Get Edge Cloud
    edgeCloud = "";
            //document.getElementById("useredgecloud").value;
    /*
    // Print in Console
    console.log('#1');
    console.log('id = ' + id + '\nusername = ' + username + '\nfirst name = ' + fname + '\nlast name = ' + lname + '\npassword = ' + psw + '\ne-mail = ' + mail + '\ncompany = ' + company + '\naccount type = ' + accountType + '\nrole = ' + role);
    console.log('Physical Address: Country = ' + physicalAddress.userCountry + ', Address = ' + physicalAddress.userAddress + ', City = ' + physicalAddress.userCity + ', State = ' + physicalAddress.userState + ', Postal Code = ' + physicalAddress.userPostalCode);
    if (billingAddress.country !== '') {
        console.log('Billing Address: Country = ' + billingAddress.userCountry + ', Address = ' + billingAddress.userAddress + ', City = ' + billingAddress.userCity + ', State = ' + billingAddress.userState + ', Postal Code = ' + billingAddress.userPostalCode);
    }
    console.log("#2");
    console.log("Interest: " + interestsJson);
    console.log("Edge Cloud = " + edgeCloud);
    */
    //below we are binding the input data (json format) in a variable inorder to post it.
    userPaymentInfo = {
        userCardNumber: "",
        userExpirationDate: "",
        userCardname: "",
        userCVV: "",
        userPAN: ""
    };
    userBillingInfo = new Array({billingURL: ""});
    var data = {
        userId: id,
        userName: username,
        userFirstName: fname,
        userLastName: lname,
        userPassword: psw,
        userEmail: mail,
        userCompanyName: company,
        userPhoneNumber: "",
        userPaymentInfo: userPaymentInfo,
        userAccountType: accountType,
        userRole: role,
        userPhysicalAddress: physicalAddress,
        userBillingAddress: billingAddress,
        userInterests: interestsJson,
        userBillingInfo: userBillingInfo,
        userEdgeCloud: edgeCloud
    };
    
    // Create data to json
    json = JSON.stringify(data);
    var url = _BACKENDSERVER+"/usercatalogue/create/users";
    CallPostUrl(url,"POST",data,[{"keystr":"AAM-Authorization-Token","valuestr":_TOKEN}],"_adduser");
    //console.log(json);
    
}
resultfnct['_adduser'] = function (arg1) {
    dispmess('info','User was saved');

}
resultfnct['err_adduser'] = function (arg1) {
    dispmess('info','User was saved');
}


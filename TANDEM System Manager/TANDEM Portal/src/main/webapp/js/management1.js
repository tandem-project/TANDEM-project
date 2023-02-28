var servicesInfo = [
    {
        "serId": "TANDEM_ser1",
        "serName": "Temperature Monitoring Service",
        "serType": "FaaS Service",
        "serProvider": "INTRACOM TELECOM S.A.",
        "serDescription": "Receives temperature values and timestamps, undertakes to store them for further analysis as well as to send notifications or to activate an alarm depending on the temperature values",
        "serCategory": {
            "href": "string",
            "id": "serCat1",
            "name": "IoT Services",
            "version": "001"
        },
        "serVersion": "001",
        "state": "string"
    },
    {
        "serId": "TANDEM_ser2",
        "serName": "e-mail Notification Service",
        "serType": "FaaS Service",
        "serProvider": "INTRACOM TELECOM S.A.",
        "serDescription": "The user defines the sender, the recipients and the text of the e-mail message and the service responds whether the sending was successful or not",
        "serCategory": {
            "href": "string",
            "id": "serCat2",
            "name": "Notification Services",
            "version": "001"
        },
        "serVersion": "001",
        "state": "string"
    },
    { 
        "serId": "TANDEM_ser3",
        "serName": "Object Detection Service",
        "serType": "PaaS Service",
        "serProvider": "INTRACOM TELECOM S.A.",
        "serDescription": "The user defines the objects that he wants to be detected in the camera signal and the degree of certainty and the service returns the objects, in what position in the frame they were located and with what degree of certainty",
        "serCategory": {
            "href": "string",
            "id": "serCat1",
            "name": "Object Detection & Tracking Services",
            "version": "001"
        },
        "serVersion": "001",
        "state": "string"
    }
];


function displayServices() {
       
    var length = servicesInfo.length;
    var htmltext = "";
  
    htmltext +=
      "<tr class='header'>\
                <th class='services-mgmttable-headers' id='userid'>" + "ID" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='firstname'>" + "Name" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='lastname'>" + "Type" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Provider" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers' id='username'>" + "Description" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "Category" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers' id='companyname'>" + "Version" + "<a href='#'></a></th>\
                <th class='services-mgmttable-headers'>" + "State" + "<a href='#'><i class='actions-link fa fa-sort-alpha-asc' aria-hidden='true'></i></a></th>\
                <th class='services-mgmttable-headers'>" + "Actions" + "<a href='#'></a></th>\
            </tr>";
    
    for (var i = 0; i < length; i++) {    
    htmltext +=
      "<tr>\
                <td>" + servicesInfo[i].serId + "</td>\
                <td>" + servicesInfo[i].serName + "</td>\
                <td>" + servicesInfo[i].serType + "</td>\
                <td>" + servicesInfo[i].serProvider + "</td>\
                <td>" + servicesInfo[i].serDescription.slice(0,10) + 
                " <a href='javascript:void(0);'><i class='fas fa-ellipsis-h' title='"+
                servicesInfo[i].serDescription+"'></i></a></td>\
                <td>" + servicesInfo[i].serCategory.name + "</td>\
                <td>" + servicesInfo[i].serVersion + "</td>\
                <td>" + servicesInfo[i].state + "</td>\
                <td>" + "<a href='#'><i class='actions-link fa fa-info' aria-hidden='true'></i></a>" +
                    "<a href='#'><i class='actions-link fa fa-tasks actions-icons' aria-hidden='true'></i></a>" +
                    "<a href='#'><i class='actions-link fa fa-sitemap actions-icons' aria-hidden='true'></i></a>" +
                    "<a href='#'><i class='actions-link fa fa-trash-o actions-icons' aria-hidden='true'></i></a>" +"</td>\
            </tr>";
        
    }
    document.getElementById("myTable").innerHTML = htmltext;
}

               
        

    
    
    
function addOnClickServicesEvents(){
   /* document.getElementById('userid').addEventListener('click', function(event){
        sortTableRows('usersTable', 0);
    });
    
    document.getElementById('firstname').addEventListener('click', function(event){
        sortTableRows('usersTable', 1);
    });
    
    document.getElementById('lastname').addEventListener('click', function(event){
        sortTableRows('usersTable', 2);
    });
    
    
    document.getElementById('username').addEventListener('click', function(event){
        sortTableRows('usersTable', 4);
    });
    
    document.getElementById('companyname').addEventListener('click', function(event){
        sortTableRows('usersTable', 6);
    });*/
}
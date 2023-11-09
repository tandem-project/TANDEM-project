/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
resultfnct['testme'] = function (arg1) { 
    var txt = "<tr @@rowid@@><td>@@username@@</td><td>@@session@@</td><td>@@geticon()@@</td>";
    var tblhd = "<tr class='header'><th style='width:60%;'>Name</th><th style='width:20%;'>Session</th><th style='width:20%;'>Status</th></tr>";        
    var ans = createtable(tblhd,txt,arg1,"myTable");
    //alert(ans);
        openForm("lefttablediv");
        openForm("righttablediv");

};

resultfnct['eertestme'] = function (arg1) { 
                alert(arg1);
};

resultfnct['geticon'] = function (arg1) { 
    if (arg1.session=="0001")
    var ans = "<i class=\"fa fa-info-circle \"></i>";
    else
    var ans = "<i class=\"fa fa-video-camera\"></i>";
    
    return ans;
};
function testme(){
    CallPostUrl(_BACKENDSERVER+"/tandemguiv1/resources/get/test","GET","",[],"testme");
}

function loginframe(){
     document.getElementById("myForm").style.display = "block";
}

function clearleft(){
    closeForm("lefttablediv");
}

function clearright(){
    closeForm("righttablediv");
}

function clearother(){
    closeForm("myForm");
}

function clearall(){
    clearleft();
    clearright();
    clearother();
}

function closeForm(myid) {
    if (document.getElementById(myid) != null)
        document.getElementById(myid).style.display = "none";
}

function openForm(myid) {
    document.getElementById(myid).style.display = "block";
}

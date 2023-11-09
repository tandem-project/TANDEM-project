<%-- 
    Document   : bpmdesigner
    Created on : Jan 7, 2019, 12:10:40 PM
    Author     : ktsak
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<script type="text/javascript" src="js/min.js"></script>
<style>
    body {font-family: Arial, Helvetica, sans-serif;}
    * {box-sizing: border-box;}

    /* Button used to open the contact form - fixed at the bottom of the page */
#waitimg {
  position: absolute;
  width: 0px;
  height: 0px;
  z-index: 15;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -150px;
  background: red;
}
.open-button {
	background-color: #555;
	color: white;
	padding: 16px 20px;
	border: none;
	cursor: pointer;
	opacity: 0.8;
	position: fixed;
	bottom: 23px;
	right: 28px;
	width: 280px;
    }

    /* The popup form - hidden by default */
    .form-popup {
	display: none;
	position: fixed;
	bottom: 0;
	right: 15px;
	border: 3px solid #f1f1f1;
	z-index: 9;
    }

    /* Add styles to the form container */
    .iframe-container {
	max-width: 300px;
	padding: 10px;
	background-color: white;
    }
    .form-container {
	max-width: 300px;
	padding: 10px;
	background-color: white;
    }

    /* Full-width input fields */
    .form-container input[type=text], .form-container input[type=password] {
	width: 100%;
	padding: 15px;
	margin: 5px 0 22px 0;
	border: none;
	background: #f1f1f1;
    }
    .form-container textarea {
	width: 100%;
	padding: 15px;
	margin: 5px 0 22px 0;
	border: none;
	background: #f1f1f1;
    }
    .form-container select {
	width: 100%;
	padding: 15px;
	margin: 5px 0 22px 0;
	border: none;
	background: #f1f1f1;
    }
    .form-container table {
	width: 100%;
	padding: 15px;
	margin: 5px 0 22px 0;
	border: none;
	background: #f1f1f1;
    }

    /* When the inputs get focus, do something */
    .form-container input[type=text]:focus, .form-container input[type=password]:focus {
	background-color: #ddd;
	outline: none;
    }

    /* Set a style for the submit/login button */
    .form-container .btn {
	background-color: #4CAF50;
	color: white;
	padding: 16px 20px;
	border: none;
	cursor: pointer;
	width: 100%;
	margin-bottom:10px;
	opacity: 0.8;
    }

    /* Add a red background color to the cancel button */
    .form-container .cancel {
	background-color: red;
    }

    /* Add some hover effects to buttons */
    .form-container .btn:hover, .open-button:hover {
	opacity: 1;
    }
</style>
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

.navbar {
  overflow: hidden;
  background-color: #333; 
}

.navbar a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.subnav {
  float: left;
  overflow: hidden;
}

.subnav .subnavbtn {
  font-size: 16px;  
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.navbar a:hover, .subnav:hover .subnavbtn {
  background-color: green;
}

.subnav-content {
  display: none;
  position: absolute;
  left: 0;
  background-color: green;
  width: 100%;
  z-index: 1;
}

.subnav-content a {
  float: left;
  color: white;
  text-decoration: none;
}

.subnav-content a:hover {
  background-color: #eee;
  color: black;
}

.subnav:hover .subnav-content {
  display: block;
}
</style>
<script src="js/min.js" ></script>
<script src="js/destool.js" ></script>
<script src="js/appl.js" ></script>
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="css/navbar.css">
        <link rel="stylesheet" href="css/panels.css">
        <link rel="stylesheet" href="css/lefttable.css">
        <link rel="stylesheet" href="css/formfilter.css">
        <link rel="stylesheet" href="css/loginForm.css">
    </head>
    <body>
        
        
<div class="title">
    <img src="img/cropped-cropped-tandem_logo.png" id="logo" alt="tandem-logo"/>
    <h1 id="guititle">TANDEM Platform GUI</h1>
</div>
        
 
        
        
<!-- NAVBAR ------------------------------------------------------------------------>
<div class="navbar">
  <a href="index.html">Home</a>
  <a href="#">Applications</a>
  <div class="dropdown">
    <button class="dropbtn">Services
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#">Registration</a>
      <a href="#">Discovery</a>
      <a href="management.html">Management</a>
    </div>
  </div>
  <a href="#">Service Chain Orchestrator</a>
  <a href="#">Products</a>
  <a href="#">Users</a>
  <a href="devices.html">Devices</a>
    <a href="infrastructure.html">Infrastructure</a>
  <a href="#">Pricing & Billing</a>
  <a href="#">Configuration</a>

  <a id="login" href="#" onclick="showLoginForm()">Login</a>
 <!-- <button type="button" id="login">Login</button>-->

</div>
<!-- NAVBAR ------------------------------------------------------------------------>
        


<!-- LOGIN FORM -->
<div class="loginForm-popup" id="loginForm">
  <form action="/action_page.php" class="loginForm-container">
    <h1>Login</h1>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <button type="submit" class="loginBtn">Login</button>
    <button type="button" class="loginBtn cancel" onclick="closeForm()">Close</button>
  </form>
</div>



<div id="mainnavclass" class="navbar">
  <!--<a href='javascript:void(0);'>Home</a>-->
  <div class="subnav">
    <button class="subnavbtn">Diagram <i class="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href='javascript:void(0);' onclick="drawNode('start',null);">+Start</a>
      <a href='javascript:void(0);' onclick="drawNode('operation',null);">+Operation</a>
      <a href='javascript:void(0);' onclick="drawNode('request',null);">+Request</a>
      <a href='javascript:void(0);' onclick="drawNode('end',null);">+End</a>
      <a href='javascript:void(0);' onclick="drawNode('condition',null);">+Condition</a>
      <a href='javascript:void(0);'>Configuration</a>
    </div>
  </div> 
</div>


<style>
    
.workflowsOptions {
  list-style-type: none;
  margin: 0;
  padding: 0;
/*  width: 15%;*/
  background-color: #f1f1f1;
    height: 100%;

  position: relative;
  overflow: auto;
}

li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

li a.active {
  background-color: #04AA6D;
  color: white;
}

li a:hover:not(.active) {
  background-color: #555;
  color: white;
}

.workflowsContainer {
  margin: auto;
  height: 704px;
}


.workflowsMenu {
  width: 15%;
  height: 100%;
  float: left;
}
</style>

<section class="workflowsContainer">
    <div class="workflowsMenu">
        <ul class="workflowsOptions">
            <li><a href='javascript:void(0);'> </a></li>
            <li><a href='javascript:void(0);'> </a></li>
            <li><a href='javascript:void(0);'> </a></li>
            <li><a href='javascript:void(0);'> </a></li>
            <li><a href='javascript:void(0);' onclick="drawNode('start',null);">+Start</a></li>
            <li><a href='javascript:void(0);' onclick="drawNode('operation',null);">+Operation</a></li>
            <li><a href='javascript:void(0);' onclick="drawNode('request',null);">+Request</a></li>
            <li><a href='javascript:void(0);' onclick="drawNode('end',null);">+End</a></li>
            <li><a href='javascript:void(0);' onclick="drawNode('condition',null);">+Condition</a></li>
            <li><a href='javascript:void(0);'>Configuration</a></li>
        </ul>
    </div>

    
    	<div id="CANVASDIV" style="position: relative; margin-left:15%;  float:bottom; background-color: ghostwhite; ">
	    <canvas id="canvasid" ></canvas>
	</div>

</section>
	


	<div class="form-popup" id="tskStrtForm">
	    <form onsubmit="return false;" class="form-container">
		<h1>Start Node Info</h1>

                <button onclick="deleteLinks()"><i class="fas fa-sitemap" style='color:red' title="Delete Links"></i></button>
                <button onclick="addLink('0')"><i class="fas fa-sitemap" style='color:green' title="Add Link"></i></button></BR></BR>
		<label ><b>Description</b></label>
		<input id ="description" type="text" value="taskname" name="description" readonly>
		<label ><b>Input parameters</b></label>
		<input id ="prmtrs" type="text" value="inparameters" name="inparameters">
		<label ><b>Internal parameters</b></label>
		<input id ="prmtrsin" type="text" value="parameters" name="parameters">
		<label ><b>Output parameter</b></label>
		<input id ="prmtrsout" type="text" value="prmtrsout" name="parameterout">
		<button type="button" class="btn cancel" onclick="closeForms()">Close</button>
	    </form>
	</div>
	<div class="form-popup" id="tskReqForm">
	    <form onsubmit="return false;" class="form-container">
		<h1>Request Node Info</h1>

		<label ><b>Current Process ID</b></label>
		<input id ="prcid3" type="text" value="taskname" name="description" readonly>
		<button id="reqb0110" type="button" class="btn" onclick="openPrcForm();">Get Process Info</button>
                <button onclick="deleteLinks()"><i class="fas fa-sitemap" style='color:red' title="Delete Links"></i></button>
                <button onclick="deleteNode()"><i class="fas fa-window-close" style='color:red' title="Delete Node"></i></button></BR></BR>
                <button onclick="addLink('0')"><i class="fas fa-sitemap" style='color:green' title="Add Link"></i></button></BR></BR>
		<label ><b>Description</b></label>
		<input id ="description" type="text" value="taskname" name="description" readonly>
		<label ><b>Average time</b></label>
		<input id ="reqavtim" type="text" value="taskname" name="description" readonly>
		<label ><b>Service</b></label>
		<input id ="sid" type="text" value="taskname" name="description" readonly>

		<button type="button" class="btn cancel" onclick="closeForms()">Close</button>
	    </form>
	</div>
	<div class="form-popup" id="tskConForm">
	    <form onsubmit="return false;" class="form-container">
		<h1>Condition Node Info</h1>

		<label ><b>Current Process ID</b></label>
		<input id ="prcid1" type="text" value="taskname"  name="description" readonly>
		<button id="conb0110" type="button" class="btn" onclick="openPrcForm();">Get Process Info</button>
                <button onclick="deleteLinks()"><i class="fas fas fa-sitemap" style='color:red' title="Delete Links"></i></button>
                <button onclick="deleteNode()"><i class="fas fa-window-close" style='color:red' title="Delete Node"></i></button></BR></BR>
                <button onclick="addLink('1')"><i class="fas fa-sitemap" style='color:green' title="Add Then Link"></i></button></BR></BR>
                <button onclick="addLink('2')"><i class="fas fa-sitemap" style='color:green' title="Add Else Link"></i></button></BR></BR>
		<label ><b>Description</b></label>
		<input id ="condescription" type="text" value="taskname" name="description" readonly>
		<label ><b>Average time</b></label>
		<input id ="conavtim" type="text" value="taskname" name="description" readonly>
		<label ><b>Script</b></label><BR>
		<textarea id="conscr" rows="4" cols="35" readonly="true" value=""></textarea>
		<button type="button" class="btn cancel" onclick="closeForms()">Close</button>
	    </form>
	</div>
	<div class="form-popup" id="tskOpForm">
	    <form onsubmit="return false;" class="form-container">
		<h1>Operation Node Info</h1>

		<label ><b>Current Process ID</b></label>
		<input id ="prcid2" type="text" value="taskname" name="description" readonly>
		<button id="opb0110" type="button" class="btn" onclick="openPrcForm();">Get Process Info</button>
                <button onclick="deleteLinks()"><i class="fas fas fa-sitemap" style='color:red' title="Delete Links"></i></button>
                <button onclick="deleteNode()"><i class="fas fa-window-close" style='color:red' title="Delete Node"></i></button></BR></BR>
                <button onclick="addLink('0')"><i class="fas fa-sitemap" style='color:green' title="Add Link"></i></button></BR></BR>
		<label ><b>Description</b></label>
		<input id ="opdescription" type="text" value="taskname" name="description" readonly>
		<label ><b>Average time</b></label>
		<input id ="opavtim" type="text" value="taskname" name="description" readonly>
		<label ><b>Script</b></label><BR>
		<textarea id="opscr" rows="4" cols="35" readonly="true" value=""></textarea>
		<button type="button" class="btn cancel" onclick="closeForms()">Close</button>
	    </form>
	</div>
	<div class="form-popup" id="uploadForm">
	</div>
<div id="waitimg">
<img src="hand2.gif">
</div>
    </body>
    <script type="text/javascript" src="js/loginForm.js"></script>
    <script>
        initcanvas();
    </script>
</html>

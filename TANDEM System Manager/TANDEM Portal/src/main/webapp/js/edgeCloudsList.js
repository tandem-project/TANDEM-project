/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


function listEdgeClouds(listid) {
    let dropdown = document.getElementById(listid);
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://localhost:8080/infrastructurecatalogue/get/infrastructure';
    $.get(url, function(data, status){
        console.log(data);
        console.log(status);
    });
   }
//    var headers = {};
//
//
//    fetch(url, {
//        method : "GET",
//        mode: 'no-cors',
//        headers: headers
//    })
//    
//        .then(response => response.json())
//        .then(data => {
//            // Examine the text in the response
//            let option;
//            for (let i = 0; i < data.length; i++) {
//                option = document.createElement('option');
//                option.text = data[i].edgeCloudName;
//                option.value = data[i].edgeCloudName;
//                dropdown.add(option);
//            }
//                        
//        })
//                
//              
//        .catch(function(err) {  
//            console.error('Fetch Error -', err);  
//        });
//}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function postCall(url, outdata, headersar) {
    if (headerar!=null)
    $.ajaxSetup({
        headers: headersar
    });   
    $.post(url,outdata)
    .done(function( data ) {
        return data;
  })  
    .error(function(xhr, status) {
        return xhr.status;
    });    
}

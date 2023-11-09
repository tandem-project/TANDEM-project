function setServiceDescription(listid, textid, urlprefix) { 
    var listidfnc = "#" + listid;
    var textidfnc = "#" + textid;
    console.log("#2");
    
    var serviceId=$(listidfnc).val();
    if ((serviceId !== "Select") && (serviceId !== ""))
    {
        console.log("#4");
        var url = urlprefix + "/" + serviceId;
        console.log("URL = " + url);
        fetch(url)
    
            .then(response => response.json())
            .then(data => {
                // Examine the text in the response
                console.log("#5");
                if (serviceId === data.serId)
                {
                    $(textidfnc).val(data.serDescription);
                              
                }
                        
            })
                
              
            .catch(function(err) {  
                console.log("#6");
                console.error('Fetch Error -', err);  
            });   
       
    }
    else
    {
        //console.log("#7");
        $(textidfnc).val("");
    }
}

function setServiceDescriptionEvent(listid, textid, urlprefix) { 
    var listidfnc = "#" + listid;
    //console.log("#2");
    $(document).ready(function(){
	
        $(listidfnc).on("change",function(){
            //console.log("#3");
            setServiceDescription(listid, textid, urlprefix);
            
        });

    });

}
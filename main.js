$(document).ready(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET','data.json');
    xhttp.onload = function(){
     var myData = JSON.parse(xhttp.responseText);
        console.log(myData);
     renderHTML(myData);   
    };
    xhttp.send();

    function renderHTML(data)
    {
      var dataContainer = document.getElementById('PORTFOLIO');
        for(var i=0;i<data.length;i++)
        {
        dataContainer.innerHTML += '<div class="row"><div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2"><div class="thumbnail"><a href=' +data[i].source+ '"><img src="' +data[i].image+ '"></a></div></div></div><br>'
        }
    }

    $('body').scrollspy({ target:".navbar" , offset:50});   
    $("#myNavbar a").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
        // Store hash
        var hash = this.hash;
        // Using $'s animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate(
        {
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }  // End if
    });
});
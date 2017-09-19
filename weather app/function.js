    var map, infoWindow,zoomlevel=14;
    var tempUnit="C";
    var currentTempInC;
    var api = "https://fcc-weather-api.glitch.me/api/current?";
    function initMap() {
      map = new google.maps.Map(document.getElementById('container-map'), 
      {
        center: {lat: -34.397, lng: 150.644},
        zoom: zoomlevel
      });
      infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
     if (navigator.geolocation) 
      {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        },

        function() 
        {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } 
      else 
      {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    $(document).ready(function()
    {
      var latitude,longitude;
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
              x.innerHTML = "Geolocation is not supported by this browser.";
          }
      
      
      function showPosition(position) 
      {
          latitude= position.coords.latitude ; 
          longitude = position.coords.longitude;
          getWeather(latitude,longitude);
      }

     function getWeather(lat,lon)
     {
       var urlString= api + "lat="+latitude+"&lon="+longitude;
      $.ajax({
        url:urlString,
        success:function(result)
        {
          $(".city").text(result.name +" , ");
          $(".country").text(result.sys.country);
          currentTempInC=Math.round(result.main.temp * 10) / 10 ;
          $(".temp").text(currentTempInC+" "+String.fromCharCode(176));
          $("#temp-unit").text(tempUnit);
          $(".desc").text(result.weather[0].main);
          IconGen(result.weather[0].main);
        }
      });
     }

     function IconGen(desc) {
      var desc = desc.toLowerCase()
      switch (desc) {
        case 'drizzle':
          addIcon(desc)
          break;
        case 'clouds':
          addIcon(desc)
          break;
        case 'rain':
          addIcon(desc)
          break;
        case 'snow':
          addIcon(desc)
          break;
        case 'clear':
          addIcon(desc)
          break;
        case 'thunderstom':
          addIcon(desc)
          break;
        default:
          $('div.clouds').removeClass('hide');
      }
    }
    
    function addIcon(desc) {
      $('div.' + desc).removeClass('hide');
    }

    $("#temp-unit").click(function () {
      var currentTempUnit = $("#temp-unit").text();
      var newTempUnit = currentTempUnit == "C" ? "F" : "C";
      $("#temp-unit").text(newTempUnit);
      if (newTempUnit == "F") {
        var fahTemp = Math.round(parseInt($(".temp").text()) * 9 / 5 + 32);
        $(".temp").text(fahTemp + " " + String.fromCharCode(176));
      } else {
        $(".temp").text(currentTempInC + " " + String.fromCharCode(176));
      }
    });


    });





 
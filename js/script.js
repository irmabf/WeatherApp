
$(document).ready(function () {
  $('.short').hide();
  if(navigator.geolocation) {
    var currentPosiiton = '';
    navigator.geolocation.getCurrentPosition(function (position) {
      currentPosiiton = position;
      //Set latitude
      var latitude = currentPosiiton.coords.latitude;
      var longitude = currentPosiiton.coords.longitude;
      console.log(latitude, longitude);
      //console.log(currentPosiiton);
      var url = 'http://api.apixu.com/v1/current.json?key=079c0fe7493547beb4184843182202&q=';
      $.getJSON(url + latitude + ',' + longitude, function (data) {
        //console.log(data);
        var data = JSON.stringify(data);
        var json = JSON.parse(data);
        var country = json.location.country;
        var city = json.location.name;
        var state = json.location.region;
        var temp = json.current.temp_c;
        var temp_f = json.current.temp_f;
        var last_updated = json.current.last_updated.replace('-', '');
        var wind = json.current.wind_kph;
        var humidity = json.current.humidity;
        var time = json.location.localtime.split(' ')[1];
        var cloud = json.current.cloud;

        $('#weather').html(city + ', ' + state + ', ' + country);

        if (temp < 10) {
          $('.grey-jumbo').css({
            'background-image' :  'url(img/cold.jpg)',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
           
          
          });
          $('#temp').html("<h1>It´s a cold day</h1>");
        }else if (temp > 10 && temp <  25){
          $('.grey-jumbo').css({
            'background-image':  'url(img/regular.jpg)',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
       
          });
          $('#temp').html("<h1>It´s a sunny day! You might not need your coat today</h1>");
        }else{
          $('.grey-jumbo').css({
            'background-image':  'url(img/summer.jpg)',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
          
          });
          $('#temp').html("<h1>It´s a pretty sunny day! You should go to the nearest beach!!</h1>");
        }
        //toggle temp
        $('#info1').html(time);
        $('#info2').html('Wind ' + wind + ' kph');
        $('#info3').html(temp + '&#8451');


       $('.short').show();
        
        var yes = true;

        $('#switch').on('click', function () {
          if (yes) {
            $('#info3').html(temp_f + '&#8457');
            $('#switch').html('Show in Celsius');
            yes = false;
          }else {
            $('#info3').html(temp + '&#8451');
            $('#switch').html('Show in Farenheight');
            yes = true;
          }
        });

        //showing sky status
        if (cloud <= 30) {
          $('#info5').html('Clear sky');
        }else {
          $('#info5').html('Cloudy sky');
        }

        $('#info6').html('Humidity ' + humidity + ' %');



      });
      
    });
  }
});



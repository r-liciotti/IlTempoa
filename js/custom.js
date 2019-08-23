var appId = '1b47b20a98ce0a911041548625dbc398';
var data = new Date();
var imgMap = new Map();
imgMap.set(8, 'icone/sole.png');
// imgMap.set(80,'icone/poco_nuvoloso.png');
imgMap.set(80, 'icone/nuvoloso.png');
// imgMap.set(3,'icone/poca_pioggia');
imgMap.set(5, 'icone/pioggia.png');
imgMap.set(2, 'icone/tempesta.png');
imgMap.set(6, 'icone/neve.png');

var currentDay = new Date();


// console.log(currentDay.getHours());
var day = new Map();
day.set(1, 'Lunedì');
day.set(2, 'Martedì');
day.set(3, 'Mercoledì');
day.set(4, 'Giovedì');
day.set(5, 'Venerdì');
day.set(6, 'Sabato');
day.set(7, 'Domenica');

var i = 0;
var j = 0;

function weatherCallback(watherData) {

  i++;
  if (i == 1) {
    $('.citta').toggleClass("hide").toggleClass('fadeInDown');
    $('.container').css("padding-top", "20px").toggleClass('fadeInUp');

  }

  console.log(watherData);

  citta = $('.NomeCitta').html(watherData.city.name);
  // Immagine meteo
  var img = $('.card-img-top').attr("src", imgMap.get(Math.round(watherData.list[1].weather[0].id / 100)));
  for (var j = 3; j < 10; j++) {
    var date = new Date(watherData.list[j].dt_txt).getHours();
    console.log("current " + currentDay.getHours());
    console.log("Open " + date);
    if (date < currentDay.getHours()) {
      console.log("qui:  watherData.list[j].weather.id/100");
      currentday = date;
      var img = $('.card-img-top').attr("src", imgMap.get(Math.round(watherData.list[j].weather[0].id / 100)));
      break;
    }
  }

  var giorno = $('.giorno').html(day.get(data.getDay()) + ", " + data.getDate());
  var orario = $('.orario').html(watherData.list[0].dt);
  var tmin = 999;
  var tmax = -999;
  var k = 0;
  for (var j = 3; j <= 10; j++) {
    k++;
    var ora = $('.ore tr:nth-child(' + k + ') td:nth-child(2)').html(watherData.list[j].main.temp + " °C");
    if (tmin > watherData.list[j].main.temp_min) {
      tmin = watherData.list[j].main.temp_min
      $('.t-min').html(watherData.list[j].main.temp_min + " °C");

    }
    if (tmax < watherData.list[j].main.temp_max) {
      tmax = watherData.list[j].main.temp_max
      $('.t-max').html(watherData.list[j].main.temp_max + " °C");

    }
    console.log("k " + k);
    $('.ore tr:nth-child(' + k + ') td:nth-child(3) img').attr("src", imgMap.get(Math.round(watherData.list[j].weather[0].id / 100)));


  }

  var tempo = $('.tempo').html(watherData.list[0].weather.description);

  var umidita = $('.umidita').html(watherData.list[0].main.humidity);
};

function getWeather() {
  citta = $('#citta').val();
  var apiCall = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citta + '&appid=' + appId + '&lang=it&units=metric';
  $.getJSON(apiCall, weatherCallback);

};

function getWeatherLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var apiCall = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + appId + '&lang=it&units=metric';
      $.getJSON(apiCall, weatherCallback);
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

};


// function moreInfo(){
//   console.log(citta[0].innerText);
//
//   var apiWiki ='https://it.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=' + citta[0].innerText;
//   $.getJSON(apiWiki, wikiCallback);
// }
//
// function wikiCallback(wikiData){
//   console.log(citta + "Wiki: " + wikiData.extract);
//   var extract =  $('.more').html(wikiData.extract);
//
// }

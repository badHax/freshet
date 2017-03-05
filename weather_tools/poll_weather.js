var config = require("./../config/config.js").values;
var weather = require('weather-js');

var exports = module.exports = {};

var bad_weather = [// From MSN weather API list of conditions
        0, 1 ,2, 3 ,4, 17, 35, // thunderstorms
        10, // rain and sleet
        11, // light rain
        12, // rain
        39  // scattered showers
        
    ];

//gets a two day forecast 
var forecast = function(city,country){
    weather.find({search: city+","+country , degreeType: 'C'}, function(err, result) {
      if(err) console.log(err);
      else return result[0].forecast[2];
    });
};

//
var will_rain = function(tomorrow){
    if (bad_weather.indexOf(tomorrow.skycodeday.parseInt) != -1){
          return true;
      }
     return false;
};

exports.will_rain = will_rain;
exports.forecast = forecast;
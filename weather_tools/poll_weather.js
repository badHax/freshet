var config = require("./../config/default.js").values;
var weather = require('weather-js');

var exports = module.exports = {};

var bad_weather = [// From MSN weather API list of conditions
        0, 1 ,2, 3 ,4, 17, 35, // thunderstorms
        10, // rain and sleet
        11, // light rain
        12, // rain
        39  // scattered showers
        
    ];

//gets the forecast for the next day
var forecast = function(city,country,debug){
    weather.find({search: city+","+country , degreeType: 'C'}, function(err, result) {
      if(err) console.log(err);
      else  {
          if(debug) {return result[0].forecast[2].day;}
          return result[0].forecast[2].skycodeday;
      }
      
      //skycodeday
    });
};

var will_rain = function(integer){
    if (bad_weather.indexOf(integer) != -1){
          return true;
      }
     return false;
};

module.exports.will_rain = will_rain;
module.exports.forecast = forecast;
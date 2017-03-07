var CronJob = require("cron").CronJob;
var config = require('./../config/default.js').values;
var db = require("./../db/db");
var messenger = require("./../messages/messages");
var weather = require("./../weather_tools/poll_weather.js");

var role = ["tech","norm"];

var process = function(role){

    // all cities
    db.find_cities().then(function(resp){
        var cities = [];
        var city_weather_bad = {};
            
        //gets unique cities
        //create key-value pairs for city and wetaher
        //hence we do not have to call the weather api for each
        console.log(resp)
        for(var i=0; i<resp[0].length; i++){
            cities.push([resp[0][i].city,resp[0][i].country]);
        }
            
        if(cities.length == []) throw "No cities, something wrong with query";
        
        
        else{
            for(var x=0;x<cities.length;x++){
                city_weather_bad[cities[x]] = weather.will_rain(cities[x][0],cities[x][1]);
            }
        }
        
        //process employees based on roles
        db.find_role(role).then(function(resp){
            for (var i=0; i<resp.length; i++){
                var person = {}; //contact info as an object
                person.name = resp[i].dataValues.first_name;
                person.email = resp[i].dataValues.email;
                person.phone = resp[i].dataValues.telephone;
                var person_city = resp[i].dataValues.city;
                var person_country = resp[i].dataValues.country;
                
                //if the weather is bad in person's city
                if (city_weather_bad[person_city]){
                    messenger.notify(person,role,"rainy");
                }
                else messenger.notify(person,role,"sunny");
                
            }}, function(error){console.log(error);});
        }, function(error){console.log(error)});
};

// 11:30PM on every weekday notifications are processed and sent
module.exports.job = new CronJob('00 30 */23 * * 1-5', function() {
    process(role[0]); //IT person
    process(role[2]); //other
}, null, true, config.region.time_zone);

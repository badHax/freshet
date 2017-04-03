var weather = require("./../weather_tools/poll_weather.js");
var messenger = require("./../messages/messages.js");
var test = require("tape");

/* poll_weather*/
test('should check tomorrows date', (assert) => {
  var forecastday = weather.forecast("Kingston","Jamaica",true);
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  var date = new Date().getDay();
  assert.equal(forecastday,days[date],"should be the same");
<<<<<<< HEAD
=======
  assert.end();
});

test("should return false", function(assert){
  var raincodes = [0, 1 , 2, 3 ,4, 17, 35, 10, 11, 12, 39];
  assert.equal(raincodes.every(weather.will_rain),true,"should both be true");
>>>>>>> cc15e732018c50b58c991435031ee09e2641439f
  assert.end();
});

test("should return false", function(assert){
  var norain = [5,6,7,8,9,13,14,15,16,18,19,
  20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,
  35,36,37,38,40,41,42,43,44,45,46,47]; //all none rain codes
  assert.equal(norain.every(weather.will_rain),false,"should both be true");
  assert.end();
});

/* Messages*/
test("Sending messages",function(assert){
  var mail = {}
  //edit
  mail.from = "example@domain.com";
  mail.to = "example@domain.com";
  
  mail.text = "text";
  var role ="norm"
  var state = "sunny"
  assert.throws(messenger.notify(mail,role,state),"Shouldn't throw if setup");
});

//db
//scheduling

test("should return false", function(assert){
  var norain = [5,6,7,8,9,13,14,15,16,18,19,
  20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,
  35,36,37,38,40,41,42,43,44,45,46,47]; //all none rain codes
  assert.equal(norain.every(weather.will_rain),false,"should both be true");
  assert.end();
});

/* Messages*/
test("Sending messages",function(assert){
  var mail = {}
  //edit
  mail.from = "example@domain.com";
  mail.to = "example@domain.com";
  
  mail.text = "text";
  var role ="norm"
  var state = "sunny"
  assert.throws(messenger.notify(mail,role,state),"Shouldn't throw if setup");
});

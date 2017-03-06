var weather = require("./../weather_tools/poll_weather.js");
var test = require("tape");

test('should check tomorrows date', (assert) => {
  var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  var date = new Date().getDay();
  var forecast = weather.forecast("Kingston","Jamaica");
  
  assert.equal(days[date],forecast.day,"should be the same");
  assert.end();
});





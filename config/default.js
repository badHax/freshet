//this file should probably be global
var config = {}
var exports = module.exports = {};

config.run ={
        "host": "0.0.0.0",
        "port": 8080
    };
    
config.key = {
        "gcm_key" :  "",
        "openweather_key": "",
        "messagebird": ""}

config.text={
        "signature": "\n\nBest regards,\nDefinatelyNotARobot",
        "sunny_subject": "Work: Full Day",
        "sunny_text": "\n\nToday's weather promises to be auspicious and acordingly should be a full days work.",
        "rain_subject" : "Work: Half Day",
        "rain_text": "\n\nDue to expected inclement today's weather \
                you will be scheduled to work half day.\nBest regards,\nDefinatelyNotARobot",
        "rain_text_tech" :"\n\nAdditionally you are NOT expected to hit the streets.",
        "sunny_text_tech" : "\n\nAs usual, you are expected to hit the streets"
};

config.admin = {
        "email" : "",
        "password" : ""
};

config.region = {
        "time_zone": "America/New_York"
}

exports.values = config;
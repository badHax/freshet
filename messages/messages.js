var text = require('textbelt');
var gcm = require('node-gcm');
var sendmail = require('sendmail')();
var config = require('./../config/default.js').values;

// functions in this file you want to expose
var exports = module.exports = {};



/*
    SMS
*/
var send_sms = function(){
        text.sendText('18768444595', 'A sample text message!', 'intl', function(err) {
      if (err) {
        console.log(err);
      }
      console.log("success!")
    });
    
};



/*
    Google Cloud Notifications for Android
*/
// Set up the sender with you API key, prepare your recipients' registration tokens. 
var sender = new gcm.Sender(config.key.gcm_key);
var regTokens = ['YOUR_REG_TOKEN_HERE']; //TODO: App component

var send_gcm = function(){
    var message = new gcm.Message({
    data: { key1: 'msg1' }
    });
    
    //send; retry every 5 seconds if necessary
    sender.send(message, { registrationTokens: regTokens },5, function (err, response) {
        if(err) console.error(err);
        else 	console.log(response);
    });
}



/*
    Email Notifications
*/
// create reusable transporter object using the default SMTP transport
var mail = {
    from: 'no-reply@yourdomain.com',
    to: 'test@qq.com, test@sohu.com, test@163.com ',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }
var send_email = function(email,msg){
    mail.msg = msg;
    mail.to = email;
    sendmail(mail, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
        });
    }

exports.send_sms = send_sms
exports.send_sms = send_gcm
exports.send_sms = send_email
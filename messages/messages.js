'use strict';
const nodemailer = require('nodemailer');
var gcm = require('node-gcm');
var config = require('./../config/default.js').values;
var messagebird = require('messagebird')(config.key.messagebird);

// functions in this file you want to expose
var exports = module.exports = {};



/*
    SMS
*/
var send_sms = function(tel,msg){
 var params = {
  'originator': 'MessageBird',
  'recipients': [
    tel
  ],
  'body': JSON.stringify(msg)
};

messagebird.messages.create(params, function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
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
var transporter = nodemailer.createTransport({
    host: config.run.host,
    port: 25,
    service: 'gmail',
    auth: {
        user: config.admin.email,
        pass: config.admin.password
    }
});

var send_email = function(mail){
    // send mail with defined transport object
    transporter.sendMail(mail, function(error, info){
        if (error) {
            throw (error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    transporter.close();
    }

var notify = function(person,state,role){
    let mail = {};
        mail.from = config.admin.email;
        mail.text = "Good morning "+person.name+",";
    switch(state) {
        case 'rainy':
            mail.to = person.email;
            mail.subject = config.text.rain_subject;
            mail.text += config.text.rain_text
            if(role=='tech') mail.text = config.text.rain_text_tech;
            mail.text += config.text.signature;
            
            send_email(mail);
            send_sms(person.phone,mail);
            break;
        case 'sunny':
            mail.to = person.email;
            mail.subject = config.text.sunny_subject;
            mail.text += config.text.sunny_text
            if(role=='tech') mail.text += config.text.sunny_text_tech;
            mail.text += config.text.signature;
            
            send_email(mail);
            send_sms(person.phone,mail);
            break;
        default:
            break
    }
}

module.exports.notify = function(person,role,state){
    return notify(person,state,role);
};
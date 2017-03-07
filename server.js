var config = require("./config/default.js").values;
var job = require("./jobs/job").job;
var config = require("./config/default.js").values;
var sms = require("./messages/messages.js")
var weather_poll = require("./weather_tools/poll_weather.js");
var db = require("./models")

'use strict';
const Hapi = require('hapi');

//start task
job.start();


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: config.run.host, 
    port: config.run.port 
});

// Originally set up a route so that the GCM <client> could register and save a token
// via an HTTP request
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
        // register the client here
      
        return reply('Not the page you are looking for');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

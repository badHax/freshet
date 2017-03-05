var config = require("./config/default.js").values;
var sms = require("./messages/messages.js")
var weather_poll = require("./weather_tools/poll_weather.js");
var db = require("./models")

'use strict';
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: config.run.host, 
    port: config.run.port 
});

// Add the route
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {

        return reply('hello world');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

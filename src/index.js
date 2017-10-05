'use strict';


//Module dependences//
var express = require('express'),
    helmet = require('helmet'),
    http = require('http');

//Files dependences//
var config = require('./configurations/config.js');


var app = express();
app.use(helmet());
app.use('/', express.static(__dirname + '/../public'));
//app.use('/api', routes);

module.exports = {
    deploy: _deploy,
    undeploy: _undeploy
}

function _deploy(callback) {
    var serverPort = process.env.PORT || config.server.port;
    if (!module.exports.server) {
        module.exports.server = http.createServer(app);
    }
    module.exports.server.timeout = 24 * 3600 * 1000; //24h

    module.exports.server.listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log("API HAS BEEN INITIALIZED");
        if (callback) {
            callback();
        }
    });
}

function _undeploy(callback) {
    module.exports.server.close(function () {
        console.log('Server has been closed');
        callback();
    });
}
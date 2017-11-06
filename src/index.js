'use strict';


//Module dependences//
var express = require('express');
var helmet = require('helmet');
var body_parser = require('body-parser');
var http = require('http');

//var routes = require('./routes.js');

//Files dependences//
var config = require('./configurations/config.js');


var app = express();
app.use(helmet());
app.use(body_parser.json());
app.use('/', express.static(__dirname + '/../public'));
//app.use('/api', routes);

module.exports = {
    deploy: _deploy,
    undeploy: _undeploy
}
/**
 * @function Function that deploy the server after connecto to the DB
 * @param {*} callback 
 */
function _deploy(callback) {

    config.dbConnection(app, function () {
        var serverPort = process.env.PORT || config.server.port;
        if (!module.exports.server) {
            module.exports.server = http.createServer(app);
        }

        app.listen(serverPort, () => {
            console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
            console.log("API HAS BEEN INITIALIZED");
        });

        if (callback) {
            callback();
        }
    });
}

/**
 * @function Function used to undeploy the server, for tests
 * @param {*} callback 
 */
function _undeploy(callback) {
    module.exports.server.close(function () {
        console.log('Server has been closed');
        callback();
    });
}
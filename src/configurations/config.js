'use strict';

var jsyaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');

var MongoClient = require("mongodb").MongoClient;
var controllerMenu = require('../controllers/menuController.js');

var BASE_API_PATH = "/api"

var config = {
    addConfiguration: _addConfiguration,
    dbConnection: _dbConnection
};

module.exports = config;

function _addConfiguration(uri, encoding) {
    var configString = null;

    if (!uri) {
        console.log("Parmeter URI is required.");
    } else {
        configString = fs.readFileSync(path.join(__dirname, uri), encoding);
    }

    var newConfigurations = jsyaml.safeLoad(configString)[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];

    for (var c in newConfigurations) {
        this[c] = newConfigurations[c];
    }
}



var dbuser = process.env.MONGO_USER;
var dbpassword = process.env.MONGO_PASSWORD;

var dbMenu;
/**
 * @function Function that init the connection to the database choosing the collections
 * @param {*} app express module, to pass to the controller
 * @param {*} callback 
 */
function _dbConnection(app,callback) {

    var mdbURL = "mongodb://" + dbuser + ":" + dbpassword + "@ds113915.mlab.com:13915/residence-project";

    MongoClient.connect(mdbURL, { native_parser: true }, function (err, database) {

        if (err) {
            console.log("CAN NOT CONNECT TO DB " + err);
            process.exit(1);
        }

        console.log("CONNECTED TO DB ");
        dbMenu = database.collection("menu");

        ///////////////////Connection with controller////////////////////////////
        controllerMenu.register(app, dbMenu, BASE_API_PATH + "/v1");

    });

    if(callback){
        callback();
    }
}

config.addConfiguration('config.yaml', 'utf8');
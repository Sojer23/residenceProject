'use strict';

var jsyaml = require('js-yaml'),
    fs = require('fs'),
    path = require('path');


var config = {
    addConfiguration: _addConfiguration
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

config.addConfiguration('config.yaml', 'utf8');
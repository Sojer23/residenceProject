'use strict';

var exports = module.exports = {};

exports.register = function (app, dbMenu, BASE_API_PATH) {

    //GET OVER MENU COLLECTION
    app.get(BASE_API_PATH + "/menu", function (request, response) {

        console.log("INFO: New GET request to /menu");
        dbMenu.find({}).toArray(function (err, data) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                response.send(data);
            }
        });
    });



}
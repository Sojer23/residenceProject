'use strict';

var exports = module.exports = {};

exports.menu = function (app, dbMenu, BASE_API_PATH) {

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



    //POST OVER MENU COLLECTION
    app.post(BASE_API_PATH + "menu/insert", function (request, response) {

        var newMenu = request.body;

        if (!newMenu) {
            console.log("WARNING: New POST request to /insert without menu, sending 400...");
            response.sendStatus(400); // bad request
        } else {

            console.log("INFO: New POST request to /insert with body: " + JSON.stringify(newMenu, 2, null));

            //Si le falta algun parámetro al nuevo elemento que queremos introducir con el POST, devolvemos error
            if (!newMenu.mon || !newMenu.tue || !newMenu.wed || !newMenu.thu || !newMenu.fri) {
                console.log("WARNING: The stats " + JSON.stringify(newMenu, 2, null) + " is not well-formed, sending 422...");
                response.sendStatus(422); // bad request

            } else {
                dbMenu.find({}).toArray(function (err, menu) {

                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        response.sendStatus(500); // internal server error
                    } else {
                        console.log("INFO: Adding menu " + JSON.stringify(newMenu, 2, null));
                        dbMenu.insert(newMenu);
                        response.sendStatus(201); // created 
                    }
                });

            }

        }


    });



}
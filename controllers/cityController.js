const db = require("../models");
const CityService = require("../services/cityService");

class CityController {

    cityService = new CityService();


    createCity = (req, res) => {

        // Validate request
        if (!req.body.username || !req.body.key) {
            res.status(400).json({
                message: "Content cannot be empty!"
            });
            return;
        }


        const city = {
            username: req.body.username,
            key: req.body.key,
            name: req.body.name,
            area: req.body.area,
            country: req.body.country
        };
        this.cityService.createCity(city)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err + " Some error occurred while creating the City."
                });
            });
    };

    findAllByUser = (req, res) => {
        const username = req.params.username;
        this.cityService.findAllCitiesByUser(username)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err + " Some error occurred while retrieving cities."
                });
            });
    };

    findAll = (req, res) => {
        this.cityService.findAllCities()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err + " Some error occurred while retrieving cities."
                });
            });
    };


    findOne = (req, res) => {
        const username = req.params.username;
        const key = req.params.key;

        this.cityService.findCity(username, key)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err + " Error retrieving City with key=" + key
                });
            });
    };

    update = (req, res) => {
        const username = req.params.username;
        const key = req.params.key;
        this.cityService.updateCity(username, key, req.body)
            .then(num => {
                if (num == 1) {
                    res.status(201).json({
                        message: "City was updated successfully."
                    });
                } else {
                    res.json({
                        message: `Cannot update city with key=${key}. Maybe City was not found or request body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err + " Error updating city with key=" + key
                });
            });
    };


    delete = (req, res) => {

        const username = req.params.username;
        const key = req.params.key;

        this.cityService.deleteCity(username, key)
            .then(num => {
                if (num == 1) {
                    res.status(200).json({
                        message: "City was deleted successfully!"
                    });
                } else {
                    res.json({
                        message: `Cannot delete City with key=${key}. Maybe City was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).json({

                    message:
                        err + " Could not delete City with key=" + key
                });
            });

    }
}
module.exports = CityController;

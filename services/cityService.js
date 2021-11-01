const db = require("../models");
const City = db.city;
const Op = db.Sequelize.Op;
const bcript = require("bcryptjs");


// Create and Save a new city

exports.create = (req, res) => {
    // Validate request
    if (!req.body.cp) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    // Create an city
    const city = {
        cp: req.body.cp,
        name: req.body.name,
    };

    // Save citi in the database
    City.create(city)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the city."
            });
        });
};

// Retrieve all citis from the database.
exports.findAll = (req, res) => {
    City.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cities."
            });
        });
};

// Find a single City with an id
exports.findOne = (req, res) => {
    const cp = req.params.cp;

    City.findByPk(cp)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving city with CP=" + cp
            });
        });
};

// Update a city by the id in the request
exports.update = (req, res) => {
    const cp = req.params.cp;

    City.update(req.body, {
        where: { cp: cp }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "City was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update city with CP=${cp}. Maybe city was not found or request body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating city with CP=" + cp
            });
        });
};

// Delete a city with the specified id in the request
exports.delete = (req, res) => {
    const cp = req.params.cp;

    City.destroy({
        where: { cp: Cp }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "city was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete city with CP=${cp}. Maybe city was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete city with CP=" + cp
            });
        });
};
const db = require("../models");
const UserService = require("../services/usersService");

class userController {

    userService = new UserService();

    // Create and Save a new user
    createUser = (req, res) => {
            
        // Validate request
        if (!req.body.username) {
            res.status(400).json({
                message: "Content cannot be empty!"
            });
            return;
        }

        // Create an user
        const user = {
            password: req.body.password,
            name: req.body.name,
            username: req.body.username,
            isAdmin: false
        };
       
        // Save user in the database
        this.userService.createUser(user)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    };

    // Retrieve all users from the database.
    findAll = (req, res) => {
        this.userService.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });
    };

    // Find a single user with an id
    findOne = (req, res) => {
        const username = req.params.id;

        this.userService.findOne(username)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message: "Error retrieving user with username=" + username
                });
            });
    };

    // Update a user by the id in the request
    update = (req, res) => {
        const username = req.params.id;
        this.userService.update(req.body, username)
            .then(num => {
                if (num == 1) {
                    res.status(201).json({
                        message: "User was updated successfully."
                    });
                } else {
                    res.json({
                        message: `Cannot update User with username=${username}. Maybe User was not found or request body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Error updating User with username=" + username
                });
            });
    };

    // Delete a user with the specified id in the request
    delete = (req, res) => {

        const username = req.params.id;

        this.userService.deleteOne(username)
            .then(num => {
                if (num == 1) {
                    res.status(200).json({
                        message: "User was deleted successfully!"
                    });
                } else {
                    res.json({
                        message: `Cannot delete User with username=${username}. Maybe user was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Could not delete User with username=" + username
                });
            });

    }
}
module.exports = userController;

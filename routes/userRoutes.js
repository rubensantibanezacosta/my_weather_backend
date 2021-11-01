const express = require("express");
const boom = require("@hapi/boom");
const users = require("../controllers/userController.js");
const UserController = require("../controllers/userController");
const passport = require("passport");
const scopesValidationHandler = require("../utils/middlewares/scopesValidationHandler");

//JWT Strategy
require("../utils/auth/strategies/jwt");

function userRoutes(app){
  const router = express.Router();
  app.use("/api/user",router)
  const userController = new UserController();
    
    // Create a new User
    router.post("/",
    passport.authenticate("jwt", {session: false}),
    scopesValidationHandler(['create:users']),
    userController.createUser);
  
    // Retrieve all User
    router.get("/",
    passport.authenticate("jwt", {session: false}),
    scopesValidationHandler(['read:users']),
    userController.findAll);
    
    // Retrieve a single User with id
    router.get("/:id",
    passport.authenticate("jwt", {session: false}) ,
    scopesValidationHandler(['read:users']),
    userController.findOne);
  
    // Update a User with id
    router.put("/:id",
    passport.authenticate("jwt", {session: false}), 
    scopesValidationHandler(['update:users']),
    userController.update);

    router.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    scopesValidationHandler(['delete:users']),
    userController.delete);


}
module.exports=userRoutes;

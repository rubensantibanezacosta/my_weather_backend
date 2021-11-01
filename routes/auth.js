const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const ApiKeysService = require("../services/apiKeysService");
const UserService = require("../services/usersService");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../config/config')[env];

//Basic strategy

require("../utils/auth/strategies/basic");

function authApi(app) {
    const router = express.Router();
    app.use("/api/auth", router);

    const apiKeysService = new ApiKeysService();
    const userService = new UserService();

    router.post("/sign-in", async function (req, res, next) {
        const { apiKeyToken, rememberMe } = req.body;
        console.log(rememberMe);

        if (!apiKeyToken) {
            next(boom.unauthorized("apiKeyToken is required"));
        }

        passport.authenticate("basic", function (error, user) {

            try {
                if (error || !user) {
                    next(boom.unauthorized())
                }
                req.login(user, { session: false }, async function (error) {
                    if (error) {
                        next(error);
                    }
                    const apiKey = await apiKeysService.findOne(apiKeyToken);

                    if (!apiKey) {
                        next(boom.unauthorized());
                    }

                    const { username, name } = user[0];

                    
                    const payload = {
                        username: username,
                        name,
                        scopes: JSON.stringify(apiKey[0].scopes.split(","))
                    }

                    const token = jwt.sign(payload, config.jwtSecret, {
                        expiresIn: rememberMe?'43800m':'120m'
                    });


                    return res.status(200).json({ token, user: { username, name } })
                })
            } catch (error) {
                next(error);
            }
        })(req, res, next);
    });

    router.post("/sign-up", async function(req, res, next){
        const user = req.body;

        try {
            const createdUser = await userService.createUser(user);

            res.status(200).json({
                data: createdUser.username,
                message: 'User created'
            }
            )
        } catch (error) {
            next(error);
        }

    })
}
module.exports = authApi;
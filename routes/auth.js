const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const ApiKeysService = require("../services/apiKeysService");
const UserService = require("../services/usersService");
const emailValidationHandler = require("../utils/middlewares/emailValidationHandler");
const moment = require("moment");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../config/config')[env];

//Basic strategy

require("../utils/auth/strategies/basic");

function authApi(app) {
    const router = express.Router();
    app.use("/api/auth", router);

    const apiKeysService = new ApiKeysService();
    const userService = new UserService();

    router.post("/sign-in", emailValidationHandler(), async function (req, res, next) {
        const rememberMe = req.body.rememberMe;
        const apiKeyToken = req.body.apiKeyToken || config.publicApiKeyToken;

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
                    const expireTime=rememberMe?43800:120;
                    const expireDate=moment.utc().add(expireTime,"minutes");
                    
                    const payload = {
                        username: username,
                        name,
                        scopes: JSON.stringify(apiKey[0].scopes.split(",")),
                        tokenExpiresIn: expireDate
                    }
                    
                    const token = jwt.sign(payload, config.jwtSecret, {
                        expiresIn: expireTime+"m"
                    });


                    return res.status(200).json({ token, user: { username, name } })
                })
            } catch (error) {
                next(error);
            }
        })(req, res, next);
    });

    router.post("/sign-up", emailValidationHandler(), async function(req, res, next){
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
const passport = require('passport');
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");

const UserService = require("../../../services/usersService");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../../../config/config')[env];

passport.use(
    new Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        async function (tokenPayload, cb) {
            const userService = new UserService();
            console.log(tokenPayload);
            try {
                const user =await userService.findOne( tokenPayload.username);
                console.log(user);
                if (!user) {
                    return cb(boom.unauthorized(), false);
                }

                delete user[0].password;

                cb(null, { ...user[0], scopes: tokenPayload.scopes })

            } catch (error) {
                cb(error);
            }
        }
    ))
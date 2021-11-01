const { BasicStrategy } = require("passport-http");
const passport = require("passport");
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const UsersService = require("../../../services/usersService");

passport.use(new BasicStrategy(function (username, password, cb) {
    const usersService = new UsersService();


    try {
        usersService.findOne(username).then(
            (user) => {
                
                
                if (!user) {
                    return cb(boom.unauthorized(), false);
                }
                
                if (!(bcrypt.compareSync(password, user[0].password))) {
                    return cb(boom.unauthorized(), false);
                }

                delete user.password;

                return cb(null, user);
            }
        );


    } catch (error) {
        return cb(error);
    }
}))

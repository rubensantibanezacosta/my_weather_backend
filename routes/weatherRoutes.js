const express = require("express");
const AccuWeatherController = require("../controllers/accuWeatherController");
const passport = require("passport");
const scopesValidationHandler = require("../utils/middlewares/scopesValidationHandler");

//JWT Strategy
require("../utils/auth/strategies/jwt");

function weatherRoutes(app) {
    const router = express.Router();
    app.use("/api/weather", router)
    const weatherController = new AccuWeatherController();

    router.get("/locations/:searchString",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['read:locations']),
        weatherController.getSearchAutocomplete);

    router.get("/forecast/:key",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['read:weather']),
        weatherController.getWeather);

    router.get("/forecast/:username",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['read:weather']),
        weatherController.getAllWeatherByUser);



}
module.exports = weatherRoutes;

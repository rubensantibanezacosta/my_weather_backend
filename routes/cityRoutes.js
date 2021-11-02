const express = require("express");
const CityController = require("../controllers/cityController");
const passport = require("passport");
const scopesValidationHandler = require("../utils/middlewares/scopesValidationHandler");

//JWT Strategy
require("../utils/auth/strategies/jwt");

function cityRoutes(app) {
    const router = express.Router();
    app.use("/api/city", router)
    const cityController = new CityController();

    router.post("/",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['create:city']),
        cityController.createCity);

/*     router.get("/",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['read:city']),
        cityController.findAll); */

    router.get("/:username",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['read:city']),
        cityController.findAllByUser);

    router.get("/:username/:key",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['read:city']),
        cityController.findOne);

    router.put("/:username/:key",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['update:city']),
        cityController.update);

    router.delete("/:username/:key",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler(['delete:city']),
        cityController.delete);

}
module.exports = cityRoutes;

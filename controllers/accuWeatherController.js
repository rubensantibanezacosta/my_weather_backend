const AccuWeatherService = require("../services/accuWeatherService");

class AccuWeatherController {

    accuWeatherService = new AccuWeatherService();


    getSearchAutocomplete = (req, res) => {
        const searchString = req.params.searchString;
        console.log(req.params);

        this.accuWeatherService.cityAutcomplete(searchString)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err + " Some error occurred retrieving autocomplete items."
                });
            });
    };

    getWeather = (req, res) => {
        const key = req.params.key;

        this.accuWeatherService.weatherForSend(key)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err + " Some error occurred while retrieving weather."
                });
            });
    };

    getAllWeatherByUser = (req, res) => {
        const key = req.params.username;

        this.accuWeatherService.weatherByUserCities(username)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(500).json({
                    message:
                        err + " Some error occurred while retrieving weather."
                });
            });
    };

}
module.exports = AccuWeatherController;

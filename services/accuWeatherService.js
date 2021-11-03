const https = require('https');
const LocationModeler = require('../utils/data/locationModeler');
const TodaysWeatherModeler = require('../utils/data/todaysWeatherModeler');
const ForecastModeler = require('../utils/data/forecastModeler');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../config/config')[env];

class AccuWeatherService {

    apikey = config.apikey;
    language = "es";

    async cityAutcomplete(searchString) {
        const locationModeler = new LocationModeler();
        const endpoint = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?"
        const params = {
            apikey:this.apikey,
            q:encodeURIComponent(searchString),
            language:this.language
        }
        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
        const locationsArray = https.get(endpoint + qs);
        const locationsArrayModeled = [];
        if (locationsArray > 0) {

            await locationsArray.forEach(location => {
                locationsArrayModeled.push(locationModeler(location))
            });
            return locationsArrayModeled;
        } else {
            return locationsArray;
        }
    }

    async todaysWeatherByCode(key) {
        const todaysWeatherModeler = new TodaysWeatherModeler();
        const endpoint = "http://dataservice.accuweather.com/currentconditions/v1/" + key + "?"
        const params = {
            apikey:this.apikey,
            language:this.language
        }
        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
        const todaysWeather = https.get(endpoint + qs);
        if (locationsArray > 0) {

            return todaysWeatherModeler.todaysWeatherModel(todaysWeather);
        } else {
            return todaysWeather;
        }
    }
    async weatherForecast(key) {
        const forecastModeler = new ForecastModeler();
        const endpoint = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + "?"
        const params = {
            apikey:this.apikey,
            language:this.language,
            metric:true
        }
        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');

        const response = https.get(endpoint + qs);
        if (!response.DailyForecasts) {
            return forecastModeler.forecastModel(response);
        } else {
            return response;
        }
    }

    async weatherForSend(key) {
        const weather = {
            today: this.todaysWeatherByCode(key),
            forecast: this.weatherForecast(key)
        }
        return weather;
    }
}
module.exports = AccuWeatherService;
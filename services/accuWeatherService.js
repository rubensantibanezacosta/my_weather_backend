const axios = require('axios');
const LocationModeler = require('../utils/data/locationModeler');
const TodaysWeatherModeler = require('../utils/data/todaysWeatherModeler');
const ForecastModeler = require('../utils/data/forecastModeler');
const CitiesService = require('../services/cityService');
const moment = require("moment");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + './../config/config')[env];

class AccuWeatherService {

    apikey = config.myWeatherApiKey;
    language = "es";

    async cityAutcomplete(searchString) {
        const locationModeler = new LocationModeler();
        const endpoint = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?"
        const params = {
            apikey: this.apikey,
            q: encodeURIComponent(searchString),
            language: this.language
        }
        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');

        let locationsArray = [];
        await axios.get(endpoint + qs).then((response) => {

            locationsArray = response.data;
        });
        let locationsArrayModeled = [];
        if (locationsArray.length > 0) {
            locationsArray.forEach(location => {

                locationsArrayModeled.push(locationModeler.locationModel(location))
            });
            return locationsArrayModeled;
        } else {
            return locationsArray;
        }
    }

    async todaysWeatherByCode(key) {
        moment.locale("es");
        
        console.log();
        const todaysWeatherModeler = new TodaysWeatherModeler();
        const endpoint = "http://dataservice.accuweather.com/currentconditions/v1/" + key + "?"
        const params = {
            apikey: this.apikey,
            language: this.language
        }
        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
        let todaysWeather;
        await axios.get(endpoint + qs).then((response) => {
            todaysWeather = response;
        }).catch(error => {
            console.log(error.message)
            todaysWeather = error.message;
        })
        if (todaysWeather && todaysWeather.data && todaysWeather.data.length > 0) {
            todaysWeather = await todaysWeatherModeler.todaysWeatherModel(todaysWeather.data[0]);
        };
        return todaysWeather;
    }
    async weatherForecast(key) {
        const forecastModeler = new ForecastModeler();
        const endpoint = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key + "?"
        const params = {
            apikey: this.apikey,
            language: this.language,
            metric: true
        }
        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');

        let data= await axios.get(endpoint + qs).then((response) => {
            if (response && response.data && response.data.DailyForecasts) {
                return forecastModeler.forecastModel(response.data);
            }
        }).catch(error => {
            console.log(error.message);
            return error.message;
        })
        return data;
    }

    async weatherForSend(key) {
        const weather = {
            today: await this.todaysWeatherByCode(key),
            forecast: await this.weatherForecast(key)
        }
        return weather;
    }

    async weatherByUserCities(username){
        const citiesService = new CitiesService();
        const userCities = citiesService.findAllCitiesByUser(username);
        const data=[];
        await userCities.forEach((city)=>{
            data.push(this.weatherForSend(city.key));
        });
        return data;

    }
}
module.exports = AccuWeatherService;
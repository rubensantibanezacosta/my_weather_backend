class todaysWeatherModeler {

    todaysWeatherModel(todaysWeather) {
        const todaysWeatherModeled = {
            temperature: todaysWeather.Temperature.Metric.Value + todaysWeather.Temperature.Metric.Unit,
            text: todaysWeather.WeatherText,
            icon: todaysWeather.WeatherIcon,
            mobileLink: todaysWeather.MobileLink,
            link: todaysWeather.Link
        }
        return todaysWeatherModeled;
    }
}
module.exports = todaysWeatherModeler;

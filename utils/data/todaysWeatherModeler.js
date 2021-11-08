class todaysWeatherModeler {

  async todaysWeatherModel(todaysWeather) {
        
        const todaysWeatherModeled = {
            
            temperature: todaysWeather.Temperature.Metric.Value,
            text: todaysWeather.WeatherText,
            icon: todaysWeather.WeatherIcon,
            mobileLink: todaysWeather.MobileLink,
            link: todaysWeather.Link
        }
        
        return todaysWeatherModeled;
    }
}
module.exports = todaysWeatherModeler;

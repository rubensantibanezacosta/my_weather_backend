class ForecastModeler {

    forecastModel(forecast) {
        const forecastModeled = [];
        forecast.DailyForecasts.forEach(element => {
            const day = {
                date: element.Date,
                temperature: element.Temperature.Minimum.Value + "º - " + element.Temperature.Maximun.Value + "º",
                text: element.Day.IconPhrase,
                icon: element.Day.Icon,
                mobileLink: element.MobileLink,
                link: element.Link
            }
            forecastModeled.push(day);
        });

        forecastModeled.shift();
        forecastModeled.pop();
        return forecastModeled;
    }
}
module.exports = ForecastModeler;

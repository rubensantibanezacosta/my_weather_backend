const moment = require("moment");

class ForecastModeler {

    forecastModel(forecast) {
        moment.locale("es");
        const forecastModeled = [];
        forecast.DailyForecasts.forEach(element => {
           
            const day = {
                date:  moment(new Date(element.Date.split("T07")[0])).format("ddd"),
                temperature: element.Temperature.Minimum.Value + "º - " + element.Temperature.Maximum.Value + "º",
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

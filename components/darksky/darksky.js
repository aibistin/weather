/*
 *   Access the darksky.net API  
 */
const dateFns = require('date-fns');
const apiRequest = require("../apiRequest/apiRequest");

const apiKey = "ed46ba474c621c9bb8098476390061a8";
const baseUrl = "https://api.darksky.net/forecast";

const allHourlyLabels = ["time", "summary", "icon", "precipIntensity",
    "precipProbability", "precipType", "temperature", "apparentTemperature",
    "dewPoint", "humidity", "pressure", "windSpeed", "windGust",
    "windBearing", "cloudCover", "uvIndex", "visibility", "ozone"
];
const someHourlyLabels = ["humidity", "windSpeed", "windGust", "windBearing", "visibility"];

const allDailyLabels = [
    "time", "summary", "icon", "sunriseTime", "sunsetTime", "moonPhase", "precipIntensity",
    "precipProbability", "precipType", "temperatureHigh", "temperatureHighTime",
    "temperatureLow", "temperatureLowTime", "apparentTemperatureHigh", "apparentTemperatureHighTime",
    "apparentTemperatureLow", "apparentTemperatureLowTime", "dewPoint", "humidity",
    "pressure", "windSpeed", "windGust", "windGustTime", "windBearing", "cloudCover",
    "uvIndex", "uvIndexTime", "visibility", "ozone"
];

const someDailyLabels = [
    "moonPhase", "precipIntensity", "precipProbability", "precipType", "dewPoint",
    "humidity", "pressure", "windSpeed", "windBearing", "cloudCover", "visibility",
    "ozone",
];

const getWeatherForecast = (location, params, callback) => {
    if (!location.latitude || !location.longitude){
         callback("No location for weather forecast!",null);
    }
    let url = baseUrl + "/" +
        apiKey + "/" + `${location.latitude},${location.longitude}`;
    apiRequest.callApi({
        url,
        json: true
    }, (error, body) => {
        if (error) {
            callback(error, null);
        } else if (!body) {
            callback("Got nothing back from darksky!", null);
        } else {
            //hourlyForecast(body.hourly, someHourlyLabels);
            let forecast = {};
            if (params.hourly) {
                forecast.hourly = body.hourly;
                timeIntervalForecast(body.daily, someDailyLabels);
            }

            if (params.daily){
               forecast.daily = body.daily;
               timeIntervalForecast(body.daily, someDailyLabels);
            }

            if (params.summary) forecast.currently = body.currently;

            callback(null, forecast);
        }
    });
};

function timeIntervalForecast(timeIntervals = {}, labels = []) {
    let firstD = new Date(0);
    let timezoneOffset = firstD.getTimezoneOffset();
    const data = timeIntervals.data;
    console.log(`Summary: ${timeIntervals.summary}`);
    console.log(`Icon: ${timeIntervals.icon}`);

    data.forEach((intervalRec, idx) => {
        addDateFormatToResult(intervalRec);
        displayForTimeInterval(intervalRec, labels);
    });
}


function uCaseFirst(str) {
    return str.substring(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

function displayForTimeInterval(intervalRec, labels = []) {
    console.log("      ------");
    console.log(`Date: ${intervalRec.dateDisplay}`);
    //console.log(`Hour: ${intervalRec.hourDisplay}`);
    console.log(`${intervalRec.summary}`);
    // console.log(`Hour Icon   : ${intervalRec.icon}`);
    if (intervalRec.temperature) {
        console.log(`${intervalRec.temperature}f, feels like ${intervalRec.apparentTemperature}f`);
    } else {
        displayDayTemp(intervalRec);
        displaySun(intervalRec); // Usually goes with the day record
        displayWindUv(intervalRec);
    }

    if (intervalRec.precipProbability !== 0) {
        console.log(`Probability of ${intervalRec.precipType} is ${intervalRec.precipProbability} with intensity of ${intervalRec.precipIntensity}`);
    }

    labels.forEach(label => {
        if (intervalRec[label])
            console.log(`${uCaseFirst(label)}: ${intervalRec[label]}`);
    });
}

function displayDayTemp(intervalRec) {
    console.log(`Lowest temp: ${intervalRec.temperatureLow}f feels like ${intervalRec.apparentTemperatureLow}f on ${intervalRec.lowTimeDisplay}`);
    console.log(`Highest temp: ${intervalRec.temperatureHigh}f feels like ${intervalRec.apparentTemperatureHigh}f on ${intervalRec.highTimeDisplay}`);
}

function displayWindUv(intervalRec) {
    console.log(`Wind Gusts of ${intervalRec.windGust} on ${intervalRec.gustTimeDisplay}`);
    console.log(`UV index of ${intervalRec.windGust} on ${intervalRec.uvTimeDisplay}`);
}

function displaySun(intervalRec) {
    console.log(`Sunrise ${intervalRec.sunriseTimeDisplay}`);
    console.log(`Sunset ${intervalRec.sunsetTimeDisplay}`);
}


function addDateFormatToResult(interval) {
    //d.setUTCSeconds(hour.time - (timezoneOffset * 60));
    if (interval.time) {
        let d = new Date(0);
        d.setUTCSeconds(interval.time);
        interval.date = d; // Create a new field
        interval.dateDisplay = dateFns.format(d, "dddd MMM Do [at] h A");
        interval.hourDisplay = dateFns.format(d, "dddd [at] h A");
    }
    if (interval.temperatureHighTime) {
        let d = new Date(0);
        d.setUTCSeconds(interval.temperatureHighTime);
        interval.highTimeDisplay = dateFns.format(d, "dddd [at] h A");
    }

    if (interval.temperatureLowTime) {
        let d = new Date(0);
        d.setUTCSeconds(interval.temperatureLowTime);
        interval.lowTimeDisplay = dateFns.format(d, "dddd [at] h A");
    }

    if (interval.windGustTime) {
        let d = new Date(0);
        d.setUTCSeconds(interval.windGustTime);
        interval.gustTimeDisplay = dateFns.format(d, "h A");
    }

    if (interval.sunriseTime) {
        let d = new Date(0);
        d.setUTCSeconds(interval.sunriseTime);
        interval.sunriseTimeDisplay = dateFns.format(d, "h A");
        d = new Date(0);
        d.setUTCSeconds(interval.sunsetTime);
        interval.sunsetTimeDisplay = dateFns.format(d, "h A");
    }

    if (interval.uvIndexTime) {
        let d = new Date(0);
        d.setUTCSeconds(interval.uvIndexTime);
        interval.uvTimeDisplay = dateFns.format(d, "h A");
    }
}
/*
 * Exports
 */
module.exports = {
    getWeatherForecast
};

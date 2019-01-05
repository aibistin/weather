const options = require("./components/options");
/* Local */
const geocode = require("./components/geocode/geocode");
const darksky = require("./components/darksky/darksky");
const format  = require( "date-fns/format");


const command = options.argv._[0];
if (command === "weather") {
    geocode.getGeocodeAddress(options.argv.address, (error, location) => {
        if (error) {
            console.log("Schizer, we got an error: ", error);
        } else {
            console.log(location);
            darksky.getWeatherForecast(location,options.argv, (error, weather) => {
                if (error) {
                    console.log("Bejaysus, we can't get the weather!", error);
                } else {
                    //let d = new Date(0);
                    //let timezoneOffset = d.getTimezoneOffset();
                    //d.setUTCSeconds(weather.currently.time - (timezoneOffset * 60));
                    //d.setUTCSeconds(weather.currently.time);
                    //weather.currently.date = d;
                    //console.log("Go Maigh, the weather is, " + JSON.stringify(weather.currently,null,4));
                }
            });
        }
    });
} else if (command) {
    console.log("Unknown command: " + command);
} else {
    console.log("You must give a command");
}





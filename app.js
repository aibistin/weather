const options = require("./components/options");
/* Local */
const geocode = require("./components/geocode/geocode");
const darksky = require("./components/darksky/darksky");

const command = options.argv._[0];
if (command === "weather") {
    geocode.getGeocodeAddress(options.argv.address).then(res => {
        console.log(JSON.stringify(res),null,4);
        return darksky.getWeatherForecast(res, {
            daily: options.argv.daily,
            hourly: options.argv.hourly,
            summary: options.argv.summary,
            today: options.argv.today
        });
    }).then(weather => {
        console.log("Got the weather");
        console.log(JSON.stringify(weather.currently));
        console.log("DONE OK");
    }).
    catch(errorM => {
        console.log("Beejepers");
        console.log(errorM);
        console.log("DONE Badly");
    });
} else if (command) {
    console.log("Unknown command: " + command);
} else {
    console.log("You must give a command");
}

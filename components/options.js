/* 'yargs' options */
const yargs = require("yargs");
const address = {
    describe: "Address that we will get weather forecast for",
    demand: true,
    alias: "a",
    string: true
};

const daily = {
    describe: "Get the daily weather forecast",
    demand: false,
    alias: "d",
};

const hourly= {
    describe: "Get the hourly weather forecast",
    demand: false,
    alias: "h",
};
const summary = {
    describe: "Get the weather forecast summary",
    demand: false,
    alias: "s",
};

const argv = yargs
    .command("weather", "Get the weather forecast", {
        address,
        daily,
        hourly,
        summary
    }).help().alias('help','h').argv;

module.exports = {
    argv
};

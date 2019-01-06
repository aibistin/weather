/* 'yargs' options */
const yargs = require("yargs");
const def = require("../env/config.js").env.default;

const address = {
    describe: "Address that we will get weather forecast for",
    demand: true,
    alias: "a",
    string: true
};
if (def.address){
    address.default = def.address;
}

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
const today = {
    describe: "Get todays weather forecast",
    demand: false,
    alias: "t",
};

const argv = yargs
    .command("weather", "Get the weather forecast", {
        address,
        daily,
        hourly,
        summary,
        today
    }).help().alias('help','h').argv;

module.exports = {
    argv
};

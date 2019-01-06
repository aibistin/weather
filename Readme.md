# NodeJs CLI Weather App

---

#### You will need to set up your own config file 

```javascript
/* Sample Configuration Environment 'env/config.js'*/
const env = {};

env.default = {
    address: "Some default address"
};

env.darkSky = {
    apiKey: "Get your own darksky api key",
};

env.mapQuest = {
    apiKey: "Get your own MapQuest open api key",
};

module.exports = {
    env
};

```

---

[To get your MapQuest open api key](https://darksky.net/dev)

[To get your DarkSky api key](https://developer.mapquest.com/documentation/open/)

---
#### To run

```bash
node app weather --help
app weather

Get the weather forecast

Options:
  --version      Show version number                                   [boolean]
  --help, -h     Show help                                             [boolean]
  --address, -a  Address that we will get weather forecast for
                           [string] [required] [default: "Some default address"]
  --daily, -d    Get the daily weather forecast
  --hourly, -h   Get the hourly weather forecast
  --summary, -s  Get the weather forecast summary
  --today, -t    Get todays weather forecast
  ```
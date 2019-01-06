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

/*
 *   Access the MapQuest Open API  
 */
const axios = require('axios');
/* Local */
const env = require("../../env/config.js");
const envMq = require("../../env/config.js").env.mapQuest;

const getGeocodeAddress = (rawAddress) => {
    return new Promise((resolve, reject) => {
        if (!rawAddress) reject(new Error("No address ", null));
        const location = encodeURIComponent(rawAddress);
        const baseUri = "https://open.mapquestapi.com/geocoding/v1/address";
        const url = baseUri + "?" + `key=${envMq.apiKey}&location=${location}`;

        axios.get(url).then(function(response) {
                if (response.status !== 200) {
                    throw new Error("Bad geo response, " + response.status);
                }
                const address = {};
                let data = response.data.results;
                const geocodeAddress = {
                    providedAddress: data[0].providedLocation.location
                };

                if (data[0].providedLocation) {
                    address.address = data[0].providedLocation.location;
                    address.street = data[0].providedLocation.street;
                    address.postalCode = data[0].locations[0].postalCode;
                    address.street = data[0].locations[0].street;
                }

                /* Mapquest Divides address into adminArea's from 1 to 6 */
                for (var i of [1, 2, 3, 4, 5, 6]) {
                    let adminAreaType = "adminArea" + i + "Type";
                    let adminAreaNu = "adminArea" + i;
                    if (data[0].locations[0][adminAreaNu] !== undefined) {
                        address[data[0].locations[0][adminAreaType]] =
                            data[0].locations[0][adminAreaNu];
                    }
                }

                geocodeAddress.address = address;
                /* Needed For Weather App */
                geocodeAddress.latitude = data[0].locations[0].latLng.lat;
                geocodeAddress.longitude = data[0].locations[0].latLng.lng;
                resolve(geocodeAddress);

            }).catch(function(error) {
                console.log(error);
                reject(error);
            });
    });
};

module.exports = {
    getGeocodeAddress
};

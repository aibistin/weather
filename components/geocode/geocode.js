const apiRequest = require("../apiRequest/apiRequest");

getGeocodeAddress = (rawAddress, callback) => {
    if (!rawAddress){
        //callback(Error("No address provided"), null);
        callback("No address provided", null);
    }
    const address = encodeURIComponent(rawAddress);
    const key = "cb1clVSHlhbNA6ADF8psJxA7uguRPl7s";
   // const baseUri = "https://open.mapquestapi.com/geocoding/v1/address";
    
    const baseUri = "https://open.mapquestapi.com/geocoding/v1/address";
    const url = baseUri + "?" + `key=${key}&location=${address}`;
    apiRequest.callApi({
        url,
        json: true
    }, (error, body) => {
        if (error) {
            callback(error, null);
        } else if (!error && !body) {
            callback("No location found for " + address, null);
        } else {
            const address = {};
            const geocodeAddress = {
                providedAddress: body.results[0].providedLocation.location
            };
            if (body.results[0].providedLocation) {
                address.address = body.results[0].providedLocation.location;
                address.street = body.results[0].providedLocation.street;
                address.postalCode = body.results[0].locations[0].postalCode;
                address.street = body.results[0].locations[0].street;
            }

            /* Mapquest Divides address into adminArea's from 1 to 6 */
            for (var i of [1, 2, 3, 4, 5, 6]) {
                let adminAreaType = "adminArea" + i + "Type";
                let adminAreaNu = "adminArea" + i;
                if (body.results[0].locations[0][adminAreaNu] !== undefined) {
                    address[body.results[0].locations[0][adminAreaType]] =
                        body.results[0].locations[0][adminAreaNu];
                }
            }
            geocodeAddress.address = address;
            geocodeAddress.latitude = body.results[0].locations[0].latLng.lat;
            geocodeAddress.longitude = body.results[0].locations[0].latLng.lng;
            callback(null, geocodeAddress);
        }
    });
};

module.exports = {
    getGeocodeAddress
};

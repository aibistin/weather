/*
 *   Generic API request
 */
const request   = require('request');

/* Params = {url : "someUrl", json: bool} */
const callApi = (params, callback) => {
    request( params ,
        (error, response, body) => {
            if (error) {
                callback(error, null);
            } else if (response.statusCode !== 200) {
                callback(`200: ${response.statusCode}`,null);
            } else {
                callback(null,body);
            }
        }
    );
};

module.exports = {
    callApi
};

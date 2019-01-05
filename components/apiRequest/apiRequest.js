/*
 *   Generic API request
 */
const request = require('request');

const apiKey = "ed46ba474c621c9bb8098476390061a8";
const baseUrl = "https://api.darksky.net/forecast";

/* Params = {url : "someUrl", json: bool} */
const callApi = (params, callback) => {
    request( params ,
        (error, response, body) => {
            //if (response)
           // console.log(`Response status: ${response.statusCode}`);
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

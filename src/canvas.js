module.exports = {getClasses}
const request = require('request');
const baseURL = 'https://timothy.instructure.com/api/v1/'

function getClasses(api) {
    if(api != null){
        console.log("canvas.js - api key not null")
        var apiResponse;
        return fetch(baseURL + "courses", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + api
            }
        })
    }
}
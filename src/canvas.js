module.exports = {getClasses, getAnnouncements, getAssignments}
const https = require('https');
const baseURL = 'https://timothy.instructure.com/api/v1/'
const options = {
    hostname: 'timothy.instructure.com',
    port: 443,
    method: 'GET'
}

async function getClasses(api) {
    if(api != null){
        console.log("canvas.js - api key not null")
        var apiResponse = undefined;
        var status;
        var functionOptions = options;
        functionOptions.headers = {Authorization: ' Bearer ' + api};
        functionOptions.path = baseURL + 'courses'
        var req = https.request(functionOptions, res => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
                apiResponse = d;
                return apiResponse
            })
        })
    }
}

function getAssignments(api, classID) {

}

function getAnnouncements(api, classID) {

}
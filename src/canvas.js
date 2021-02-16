module.exports = {getClasses, getAnnouncements, getAssignments}
const request = require('request');
const fetch = require('node-fetch')
const baseURL = 'https://timothy.instructure.com/api/v1/'

async function getClasses(api) {
    if(api != null){
        console.log("canvas.js - api key not null")
        var apiResponse;
        return await fetch(baseURL + "courses", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + api
            }
        }).then((res) => {
            console.log(res);
        })
    }
}

function getAssignments(api, classID) {

}

function getAnnouncements(api, classID) {

}
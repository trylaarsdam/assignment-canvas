module.exports = {getClasses, getAnnouncements, getAssignments}
const baseURL = 'https://timothy.instructure.com/api/v1/'
const fetch = require('node-fetch');
const options = {
    hostname: 'timothy.instructure.com',
    port: 443,
    method: 'GET'
}

async function getClasses(api) {
    if(api != null){
        console.log("canvas.js - api key not null")
        fetch(baseURL + "courses", {
            'Authorization': ' Bearer ' + api
        }).then(res => {
            res.json()
        }).then(json =>{
            console.log(json);
        })
    }
}

function getAssignments(api, classID) {

}

function getAnnouncements(api, classID) {

}
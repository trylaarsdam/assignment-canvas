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
        return fetch(baseURL + "courses", {
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + api
            }
        })
    }
}

async function getAnnouncements(api, classID, formattedDate) {
    if(api != null){
        console.log("canvas.js - api key not null")
        return fetch(baseURL + "announcements?context_codes[]=course_" + classID + '&start_date=2018-01-01&end_date=', + formattedDate, {
            headers: {
                'Authorization': 'Bearer ' + api
            }
        })
    }
}

function getAssignments(api, classID) {

}
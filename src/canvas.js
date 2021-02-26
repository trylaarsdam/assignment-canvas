module.exports = {getClasses, getAnnouncements, getAssignments, getFeedAnnouncements, createExternalFeed, getCourses}
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

async function getAnnouncements(api, classID) {
    if(api != null){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var formattedDate = yyyy + '-' + mm + '-' + dd
        console.log("canvas.js - api key not null")
        return fetch(baseURL + "announcements?context_codes[]=course_" + classID + '&start_date=2018-01-01&end_date=' + formattedDate, {
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + api
            }
        })
    }
}

async function getFeedAnnouncements(api, perPage) {
    if(api != null){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var formattedDate = yyyy + '-' + mm + '-' + dd
        console.log("canvas.js - api key not null")
        return fetch(baseURL + "announcements?per_page=" + perPage + '&start_date=2018-01-01&end_date=' + formattedDate, {
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + api
            }
        })
    }
}

async function createExternalFeed(api, course_id){
    if(api != null && classID != null){
        console.log("canvas.js - api key and classID not null")
        return fetch(baseURL + "courses/" + classID + '/external_feeds', {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + api
            }
        })
    }
}

function getAssignments(api, classID) {

}
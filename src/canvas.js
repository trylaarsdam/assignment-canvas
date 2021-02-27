module.exports = {getClasses, getAnnouncements, getAssignments, getFeedAnnouncements}
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

async function getFeedAnnouncements(api, courseList) {
    if(api != null){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var formattedDate = yyyy + '-' + mm + '-' + dd
        var courseIDs = [];
        var courseString;
        if(courseList != null){
            console.log(courseList);
            console.log(courseList.length);
            for(var course; course < courseList.length; course++){
                console.log(courseList.length);
                console.log(course);
                console.log(courseList[course].id)
                courseIDs[course] = courseList[course].id;
            }
            console.log("canvas.js - api key not null, courseList provided")
            console.log(courseIDs);
            for(var id; id < courseIDs.length; id++){
                courseString += "context_codes[]=course_" + courseIDs[id] + "&"
            }
            console.log(courseString);
            return fetch(baseURL + "announcements?" + courseString + 'start_date=2018-01-01&end_date=' + formattedDate, {
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + api
                }
            })
        }
        else{
            return {error: "courseList not provided"}
        }
        
    }
}

function getAssignments(api, classID) {

}
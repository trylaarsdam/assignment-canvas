module.exports = {getClasses}
const request = require('request');
const baseURL = 'https://timothy.instructure.com/api/v1/'

function getClasses(api) {
    if(api != null){
        console.log("canvas.js - api key not null")
        request({
            url: baseURL + 'courses',
            headers: {
                'Authorization': 'Bearer ' + api
            }
        },
        function(err,res) {
            if(err) {
                console.error(err);
            }
            else {
                console.log("canvas.js - " + res.body)
                return res.body
            }
        })
    }
}
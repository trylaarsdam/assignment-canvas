module.exports = {getClasses}
const request = require('request');
const baseURL = 'https://timothy.instructure.com/api/vi/'

function getClasses(api) {
    if(api != null){
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
                return res.body
            }
        })
    }
}
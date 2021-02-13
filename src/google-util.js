import {google} from 'googleapis';

const googleConfig = {
    clientId: 'http://130171068509-trjlgvmuuvs1kdu1g1kg8v5nv8cgv0k0.apps.googleusercontent.com/',
    clientSecret: 'XwXE0C6swYLxoxmA7PdkYE17',
    redirect: 'https://canvas.toddr.org/google-auth'
};

function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}
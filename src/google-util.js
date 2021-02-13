import {google} from 'googleapis';

const googleConfig = {
    clientId: 'http://130171068509-trjlgvmuuvs1kdu1g1kg8v5nv8cgv0k0.apps.googleusercontent.com/',
    clientSecret: '',
    redirect: 'https://canvas.toddr.org/google-auth'
};

function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
];

function getConnectionUrl(auth){
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
}

function urlGoogle() {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}
var express = require('express');
var app = express();
const db = require('./src/firestore.js');
app.listen(3000);
app.use(express.static('public'))


var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '130171068509-trjlgvmuuvs1kdu1g1kg8v5nv8cgv0k0.apps.googleusercontent.com',
    clientSecret: 'XwXE0C6swYLxoxmA7PdkYE17',
    callbackURL: "https://canvas.toddr.org/auth/google/callback",
    passReqToCallback: true
    }, (accessToken, refreshToken, profile, done) => {
        db.getFile('auth','users',{googleID: profile.id}).then((currentUser) =>{
            if(currentUser){
                console.log("currentUser "+currentUser);
            }
        })
    }
))

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email','profile'] })
);

app.get("/auth/google/redirect", passport.authenticate('google'));
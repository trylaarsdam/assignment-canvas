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
    callbackURL: "https://canvas.toddr.org/auth/google/redirect",
    passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        console.log("profile "+JSON.stringify(profile))
        
        await db.getFile('auth','users',{googleID: profile.id}).then(async (currentUser) => {
            if(currentUser[0] !== undefined || currentUser[0] != "undefined"){
                console.log("user found");
                console.log(typeof(currentUser[0]))
                console.log("currentUser "+currentUser[0]);
                done(null, currentUser[0])
            }
            else{
                console.log("creating new user");
                await db.insertFile('auth','users',{googleID: profile.id, name: profile.displayName, profilePicture: profile.photos.value, email: profile.emails[0].value}).then(async (id) => {
                    done(null, newUser);
                })
            }
        })
    }
))

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email','profile'] })
);

app.get("/auth/google/redirect", passport.authenticate('google'));
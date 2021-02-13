var express = require('express');
var app = express();
app.listen(3000);
app.use(express.static('public'))

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: '130171068509-trjlgvmuuvs1kdu1g1kg8v5nv8cgv0k0.apps.googleusercontent.com',
    clientSecret: 'XwXE0C6swYLxoxmA7PdkYE17',
    callbackURL: "https://canvas.toddr.org/auth/google/callback",
    passReqToCallback: true
},
function(request, accessToken, refreshToken, profile, done){
    UserRefreshClient.findOrCreate({googleId: profile.id}, function(err, user){
        return done(err, user);
    })
}))

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
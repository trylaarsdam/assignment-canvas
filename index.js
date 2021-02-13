var express = require('express');
var app = express();
app.listen(3000);
//app.use(express.static('public'))

app.configure(function() {
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({secret: 'keyboard cat'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
})

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: '130171068509-trjlgvmuuvs1kdu1g1kg8v5nv8cgv0k0.apps.googleusercontent.com',
    clientSecret: 'XwXE0C6swYLxoxmA7PdkYE17',
    callbackURL: "https://canvas.toddr.org/auth/google/callback",
    passReqToCallback: true
},
function(request, accessToken, refreshToken, profile, done){
    console.log(profile);
    //passport.user.findOrCreate({googleId: profile.id}, function(err, user){
    //    return done(err, user);
    // })
    return done(null, profile);
}))

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
  function(req, res) {
    res.redirect('/');
  });
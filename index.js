var express = require('express');
var app = express();
const cookieSession = require('cookie-session');
const keys = require('./src/keys.js');
const db = require('./src/firestore.js');
const path = require('path')
app.listen(3000);
app.use(express.static('public'))

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(cookieSession({
    maxAge: 24*60*60*1000, //milliseconds in day
    keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "https://canvas.toddr.org/auth/google/redirect",
    passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        console.log("profile "+JSON.stringify(profile))
        
        await db.getFile('auth','users',{googleID: profile.id}).then(async (currentUser) => {
            if(typeof(currentUser[0]) !== "undefined"){
                console.log("user found");
                //console.log(typeof(currentUser[0]))
                console.log("currentUser "+currentUser[0]);
                done(null, profile.id)
            }
            else{
                console.log("creating new user");
                await db.insertFile('auth','users', {googleID: profile.id, name: profile.displayName, profilePicture: profile.photos[0].value, email: profile.emails[0].value}).then(async (id) => {
                    done(null, profile.id);
                })
            }
        })
    }
))

passport.serializeUser((user, done) => {
    console.log('user ' + user);
    done(null, user);
})

passport.deserializeUser( async (id, done) => {
    console.log('id' +id);
    await db.getFile('auth','users',{googleID: id}).then(async (currentUser) => {
        if(typeof(currentUser[0]) !== "undefined"){
            console.log("user found");
            //console.log(typeof(currentUser[0]))
            console.log("currentUser "+currentUser[0]);
            done(null, currentUser[0])
        }
    })
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email','profile'] })
);

app.get("/auth/google/redirect", passport.authenticate('google', {
    successRedirect: '/user',
    failureRedirect: '/'
}),(req,res) => {
    //res.send('/user/' + req.user.googleID);
    res.send("you reached the redirect URI");
});

app.get("/auth/logout", (req,res) => {
    req.logout();
    //req.session.destroy();
    res.redirect('/');
})

app.get("/user", (req,res) => {
    if(typeof(req.user) !== 'undefined'){
        console.log("googleID: " + req.user.googleID);
        res.render('user', {name: req.user.name, profilePictureURL: req.user.profilePiture, googleID: req.user.googleID})
    }
    else{
        res.redirect('/auth/google');
    }
})
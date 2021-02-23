var express = require('express');
var app = express();
const cookieSession = require('cookie-session');
const keys = require('./src/keys.js');
const db = require('./src/firestore.js');
const path = require('path')
const canvas = require('./src/canvas.js');
app.listen(3000);
app.use(express.static('public'));
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
    var toggle = true;
    if(toggle){
        if(typeof(req.user) !== 'undefined'){
            console.log("googleID: " + req.user.googleID);//req.user.googleID);
            res.render('user', {name: req.user.name, profilePictureURL: req.user.profilePicture, databaseUUID: req.user.id.toString()})//{name: req.user.name, profilePictureURL: req.user.profilePiture})
        }
        else{
            res.redirect('/auth/google');
        }
    }
    else{
        if(typeof(req.user) == 'undefined'){
            console.log("googleID: " + "test");//req.user.googleID);
            res.render('user', {name: "todd", profilePictureURL: "https://toddr.org/assets/images/t-transparent-114x108.png", googleID: "1358273572893"})//{name: req.user.name, profilePictureURL: req.user.profilePiture})
        }
        else{
            res.redirect('/auth/google');
        }
    }
})

app.post("/api/setCanvasAPI/:uuid/:canvas", async (req,res) => {
    if(req.user.id == req.params.uuid){
        console.log('REQUEST BODY ' + req.body);
        console.log("uuid from api " + req.params.uuid)
        if(typeof(req.params.uuid) != "undefined"){
            console.log("getting file for user")
            console.log("uuid - " + req.params.uuid);
            console.log("canvaskey - " + req.params.canvas);
            console.log(typeof(req.params.uuid))
            var dbFile = await db.getFile('auth', 'users', {id: req.params.uuid})
            console.log("dbFile + " + dbFile)
            if(dbFile.length == 1){
                console.log("dbFile length was 1")
                dbFile[0].canvasKey = req.params.canvas;
                await db.updateFile('auth', 'users', dbFile[0], dbFile[0].id)
                return res.send({status: "updated"})
            }
            else{
                console.log("db file length was not one" + dbFile.length)
                return res.send({error: "multiple users returned with that id"});
            }
        }
    }
    else{
        return res.send({error: "unauthorized"})
    }
})

app.get('/classes', async (req,res) => {
    if(typeof(req.user) !== "undefined"){
        console.log("user is not undefined")
        userEntry = await db.getFile('auth', 'users', {id: req.user.id});
        if(typeof(userEntry[0]) !== "undefined"){
            console.log("user entry was found")
            console.log(userEntry[0])
            canvas.getClasses(req.user.canvasKey).then(apiRes =>
                apiRes.json()
            ).then(data => {
                console.log('data type ' + typeof(data))
                console.log(data)
                res.render('classes', {result: data, name: req.user.name, profilePictureURL: req.user.profilePicture, databaseUUID: req.user.id.toString()})
            })
        }
        else{
            res.send({error: "user not found in database"})
        }
    }
    else{
        res.redirect("https://canvas.toddr.org/auth/google")
    }
})

app.get('/onboarding', async (req,res) => {
    if(typeof(req.user) !== "undefined"){
        res.render('onboarding', {name: req.user.name, profilePictureURL: req.user.profilePicture, databaseUUID: req.user.id.toString()})
    }
    else{
        res.redirect("https://canvas.toddr.org/auth/google")
    }
})

app.get('/classes/:class', async (req,res) => {
    if(typeof(req.user) !== "undefined"){
        res.send({status: "still in progress"})
    }
    else{
        res.redirect('https://canvas.toddr.org/auth/google')
    }
})
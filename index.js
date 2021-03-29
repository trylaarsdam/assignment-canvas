var express = require('express');
var app = express();
const cookieSession = require('cookie-session');
const keys = require('./src/keys.js');
const db = require('./src/firestore.js');
const path = require('path')
const canvas = require('./src/canvas.js');
const pug = require('pug');


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

app.get('/', (req,res) => {
    if(typeof(req.user) == "undefined"){
        return res.sendFile('./public/index.html')
    }
    else{
        return res.redirect('/user')
    }
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email','profile'] })
);

app.get("/auth/google/redirect", passport.authenticate('google', {
    successRedirect: '/feed',
    failureRedirect: '/'
}),(req,res) => {
    //res.send('/user/' + req.user.googleID);
    res.render('error', {errorText: "You've reached the page of the Google OAuth Redirect, but you should have been redirected. Check that your browser allows redirects and try to sign in again."})
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
    if(typeof(req.user.id).toString() == "undefined"){
        return res.render('error', {errorText: "You aren't authorized to set the Canvas API Key for the selected user. Try logging out and signing in again."})
    }
    else if(req.user.id == req.params.uuid){
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
                return res.render('error', {errorText: 'Multiple users with matching UUIDs were found in our database.'})
            }
        }
    }
    else{
        if(typeof(req.user.id).toString() == "undefined"){
            return res.render('error', {errorText: "You aren't authorized to set the Canvas API Key for the selected user. Try logging out and signing in again."})

        }
        else{
            return res.render('error', {errorText: "You aren't authorized to set the Canvas API Key for the selected user. Try logging out and signing in again.", profilePictureURL: req.user.profilePicture})
        }
    }
})

app.post("/api/setCanvasURL/:uuid/:canvas", async (req,res) => {
    if(typeof(req.user.id).toString() == "undefined"){
        return res.render('error', {errorText: "You aren't authorized to set the Canvas URL for the selected user. Try logging out and signing in again."})
    }
    else if(req.user.id == req.params.uuid){
        console.log('REQUEST BODY ' + req.body);
        console.log("uuid from api " + req.params.uuid)
        if(typeof(req.params.uuid) != "undefined"){
            console.log("getting file for user")
            console.log("uuid - " + req.params.uuid);
            console.log("url - " + req.params.canvas);
            console.log(typeof(req.params.uuid))
            var dbFile = await db.getFile('auth', 'users', {id: req.params.uuid})
            console.log("dbFile + " + dbFile)
            if(dbFile.length == 1){
                console.log("dbFile length was 1")
                dbFile[0].canvasURL = req.params.canvas;
                await db.updateFile('auth', 'users', dbFile[0], dbFile[0].id)
                return res.send({status: "updated"})
            }
            else{
                console.log("db file length was not one" + dbFile.length)
                return res.render('error', {errorText: 'Multiple users with matching UUIDs were found in our database.'})
            }
        }
    }
    else{
        if(typeof(req.user.id).toString() == "undefined"){
            return res.render('error', {errorText: "You aren't authorized to set the Canvas API Key for the selected user. Try logging out and signing in again."})

        }
        else{
            return res.render('error', {errorText: "You aren't authorized to set the Canvas API Key for the selected user. Try logging out and signing in again.", profilePictureURL: req.user.profilePicture})
        }
    }
})


app.get("/api/setCanvasAPI/:uuid/:canvas", async (req,res) => {
    return res.render('error', {errorText: "You cannot GET /api/setCanvasAPI. This endpoint currently supports POST requests."})
})

app.get('/classes', async (req,res) => {
    if(typeof(req.user) !== "undefined"){
        console.log("user is not undefined")
        userEntry = await db.getFile('auth', 'users', {id: req.user.id});
        if(typeof(userEntry[0]) !== "undefined"){
            res.render('classes', {name: req.user.name, profilePictureURL: req.user.profilePicture, databaseUUID: req.user.id.toString(), canvasKey: req.user.canvasKey})
        }
        else{
            res.render('error', {errorText: "User not found in database, but login session is still active. Try clearing cookies and loading this page again.", profilePictureURL: req.user.profilePicture, canvasKey: req.user.canvasKey})
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
        console.log("user is not undefined")
        var currentDate = new Date();
        var formattedDate = currentDate.toISOString();
        userEntry = await db.getFile('auth', 'users', {id: req.user.id});
        if(typeof(userEntry[0]) !== "undefined"){
            console.log("user entry was found")
            console.log(userEntry[0])
            canvas.getAnnouncements(req.user.canvasKey, req.params.class).then(apiRes =>
                apiRes.json()
            ).then(data => {
                console.log('data type ' + typeof(data))
                console.log(data)
                res.render('class', {result: data, classID: req.params.class, name: req.params.class, profilePictureURL: req.user.profilePicture, databaseUUID: req.user.id.toString()})
            })
        }
        else{
            res.render('error', {errorText: "User not found in database, but login session is still active. Try clearing cookies and loading this page again.", profilePictureURL: req.user.profilePicture})
        }
    }
    else{
        res.redirect('https://canvas.toddr.org/auth/google')
    }
})

app.get('/classes/:class/announcement/:announcement', async (req,res) => { //use depreciated, use /announcments/:class/:announcement
    if(typeof(req.user) !== "undefined"){
        res.redirect('https://canvas.toddr.org/announcements/' + req.params.class + '/' + req.params.announcement);
    }
    else{
        res.redirect('https://canvas.toddr.org/auth/google')
    }
})

app.get('/announcements/:class/:announcement', async (req, res) => {
    if(typeof(req.user) !== "undefined"){
        console.log("user is not undefined")

        if(typeof(req.params.class) == "undefined"){
            res.render('headless-error', {errorText: "A class ID was not specified in /announcements/:class/:announcement. This was probably an internal issue, try reloading your classes page and try again."})
        }
        else if(typeof(req.params.announcement) == "undefined"){
            res.render('headless-error', {errorText: "An announcement ID was not specified in /announcements/:class/:announcement. This was probably an internal issue, try reloading your classes page and try again."})
        }
        else{
            var currentDate = new Date();
            var formattedDate = currentDate.toISOString();
            userEntry = await db.getFile('auth', 'users', {id: req.user.id});
            if(typeof(userEntry[0]) !== "undefined"){
                res.render('announcement', {name: req.user.name, profilePictureURL: req.user.profilePicture, databaseUUID: req.user.id.toString(), canvasKey: req.user.canvasKey, announcementID: req.params.announcement, classID: req.params.class})
            }
        }
    }
    else{
        res.redirect('https://canvas.toddr.org/auth/google')
    }
})

app.get('/feed', async (req,res) => {
    if(typeof(req.user) !== "undefined"){
        console.log("user is not undefined")
        var currentDate = new Date();
        var formattedDate = currentDate.toISOString();
        userEntry = await db.getFile('auth', 'users', {id: req.user.id});
        if(typeof(userEntry[0]) !== "undefined"){
            res.render('feed', {name: req.user.name, profilePictureURL: req.user.profilePicture, databaseUUID: req.user.id.toString(), canvasKey: req.user.canvasKey})
        }
    }
    else{
        res.redirect('https://canvas.toddr.org/auth/google')
    }
})

app.get('/api/html/feed/:userid', async (req,res) => {
    var userEntry = await db.getFile('auth', 'users', {canvasKey: req.params.userid});
    if(typeof(userEntry[0]) !== "undefined"){
        canvas.getClasses(req.params.userid).then(apiRes => 
            apiRes.json()
        ).then(courseList => {
            canvas.getFeedAnnouncements(req.params.userid, courseList).then(apiRes => 
                apiRes.json()
            ).then(data => {
                res.send(pug.renderFile('./views/feed-loaded.pug', {result: data}))
            })
        })
    }
    else{
        res.render('error', {errorText: "User not found in database, but login session is still active. Try clearing cookies and loading this page again.", profilePictureURL: req.user.profilePicture})
    }
})

app.get('/api/html/classes/:userid', async (req,res) => {
    var userEntry = await db.getFile('auth', 'users', {canvasKey: req.params.userid});
    if(typeof(userEntry[0]) !== "undefined"){
        console.log("user entry was found")
        console.log(userEntry[0])
        canvas.getClasses(req.user.canvasKey).then(apiRes =>
            apiRes.json()
        ).then(data => {
            console.log('data type ' + typeof(data))
            console.log(data)
            res.send(pug.renderFile('./views/classes-loaded.pug', {result: data}))
        })
    }
    else{
        res.render('error', {errorText: "User not found in database, but login session is still active. Try clearing cookies and loading this page again.", profilePictureURL: req.user.profilePicture})
    }
})

app.get('/api/html/announcement/:class/:announcement/:canvasKey', async (req,res) => {
    var userEntry = await db.getFile('auth', 'users', {canvasKey: req.params.canvasKey});
    if(typeof(userEntry[0]) !== "undefined"){
        console.log("user entry was found")
        console.log(userEntry[0])
        canvas.getAnnouncements(req.user.canvasKey, req.params.class).then(apiRes =>
            apiRes.json()
        ).then(data => {
            console.log('data type ' + typeof(data))
            console.log(data)
            console.log('starting for loop to find announcement')
            console.log(data.length);
            for(var i = 0; i < data.length; i++){
                console.log("compare: " + data[i].id + " " + res.params.announcement.parseInt())
                if(data[i].id == res.params.announcement.parseInt()){
                    console.log('rendering announcement view')
                    res.send(pug.renderFile('./views/announcement-loaded.pug', {result: data[i]}));
                }
            }
            //res.send(pug.renderFile('./views/announcement-loaded.pug', {result: data[res.params.announcement.parseInt()]}))
        })
    }
    else{
        res.render('error', {errorText: "User not found in database, but login session is still active. Try clearing cookies and loading this page again.", profilePictureURL: req.user.profilePicture})
    }
})


app.get('/api/html/classes', async(req,res) => {
    res.render('headless-error', {errorText: "A canvas API key was not specified in /api/html/classes/{canvasAPIkey}. Please make sure you have a canvas API linked to your account. See the onboarding guide at https://canvas.toddr.org/onboarding for more details."})
})

app.get('/api/html/feed', async(req,res) => {
    res.render('headless-error', {errorText: "A canvas API key was not specified in /api/html/feed/{canvasAPIkey}. Please make sure you have a canvas API linked to your account. See the onboarding guide at https://canvas.toddr.org/onboarding for more details."})
})

app.get('/api/html/class', async(req,res) => {
    res.render('headless-error', {errorText: "A canvas API key was not specified in /api/html/class/{canvasAPIkey}. Please make sure you have a canvas API linked to your account. See the onboarding guide at https://canvas.toddr.org/onboarding for more details."})
})

app.get('/api/html/announcement', async(req,res) => {
    res.render('headless-error', {errorText: "A canvas API key was not specified in /api/html/announcement/{canvasAPIkey}. Please make sure you have a canvas API linked to your account. See the onboarding guide at https://canvas.toddr.org/onboarding for more details."})
})

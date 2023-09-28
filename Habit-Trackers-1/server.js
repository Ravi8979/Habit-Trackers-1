//import express module
const passport = require('passport')
const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
require('./config/passport-strategy');
// inlcluding mongodb configuration 
const db = require('./config/mongoose');
// using flash library for showing user action notification
const flash = require('connect-flash');
const customMware = require('./config/flashmiddleware')

//used for session cookie 
const session = require('express-session');
// store user authentication because when seever restart no need to login again
const MongoStore = require('connect-mongo');

const bodyParser = require('body-parser');

// parse application/form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));

//middleware for static file accessing in assets directory
app.use(express.static('./assets'));

// setting view engine as ejs 
app.set('view engine', 'ejs');
app.set('views', './view')


// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

// mongo store is used to store the session cookie in the db 
app.use(session({
    name: "Habit Tracker",
    // change secret during before deployment in production 
    secret: 'testpurpose',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/HabbitTrackerDB',
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());


// app.use(passport.setAuthenticatedUser);
//---------Connect Flash----------//
app.use(flash())
app.use(customMware.setFlash);


// Using Express Router 
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(`error in running on server${port}`)
        return;
    }
    console.log(`Yeah ::)) Server is running on port ${port}`)
})



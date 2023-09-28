const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user-moduls');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {
        // find a user and establish the identity
        let user = await User.findOne({ email: email });
        try {
            if (!user || user.password != password) {
                //console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            console.log('Error in finding user --> Passport', error);
            //return done(err);
        }

    }
))


// serializing the user to decide whick key is kept in the cookies 
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// deserializing the user from the key int the cookies 
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.log('Error in finding user --> Passport');
            done(err);
        });
});

//check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
    // if the user is sign-in , then pass on the request to the next function(controller action )
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not sign-in
    return res.redirect('/users/sign-up');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        // requesr.use contains the current signin user from the session cookie 
        // and we are sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
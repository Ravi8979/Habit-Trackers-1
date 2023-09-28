//import model of db
const User = require('../models/user-moduls');

//render the sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user-sign-up', {
        title: "Sign Up | Habbit Tracker"
    })
}

module.exports.create = async (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    const user = await User.findOne({ email: req.body.email });

    try {
        if (!user) {
            await User.create(req.body);
            return res.redirect('/user/sign-in');

        } else {
            return res.redirect('/user/sign-up');
        }
    } catch (error) {
        console.log('error in creating User in signing up', error);
        return;
    }
}

//sign in and create a session for user
module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged In Sucessfully !')
    return res.redirect('/');
}


module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('user-sign-in', {
        title: "Sign In | Habbit Tracker"
    })
}

//9518815679
//Ankit TA
module.exports.destroySession = (req, res, done) => {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    })
    return res.redirect('/user/sign-in');
}

const User = require('../models/user-moduls');
const Habit = require('../models/habit-moduls');


const getTodayDate= () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}

// get next seven date of week 
function getOneWeekDate() {
    let arr = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        let mm = d.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let dd = d.getDate();
        if (dd < 10) dd = '0' + dd;
        const yyyy = d.getFullYear();
        arr.push(dd + '/' + mm + '/' + yyyy)
    }
    return arr;
}



// home controller
module.exports.home = async (req, res) => {
    try {
        // // if user logged in 
        if (req.user) {
            let habits = await Habit.find({ userRef: req.user._id})    // find habits assosiated to user
        //     // render home page with logged in user and assosiated habits
            return res.render("home", {
                title: "Habit Tracker App",
                habits: habits,
                // user: user.name,
                weeklyDate:await getOneWeekDate()
            });
        } else {    // if user not logged in
        //     // redirect to signin page
            return res.redirect('/user/sign-in');
        }

    } catch (err) {
        console.log(err)
    }
}

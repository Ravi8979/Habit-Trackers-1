const express = require('express');
const passport = require('passport');

const router = express.Router();

// check whether router is loaded  or not
// console.log('router is loaded');

//controller for routing
const homeController = require('../controllers/Home');

router.get('/', homeController.home);

// router.get('/' , homeController.home);
router.use('/user', require('./user'));

module.exports = router;
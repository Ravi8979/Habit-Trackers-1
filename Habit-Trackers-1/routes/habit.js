const express = require('express');
const passport = require('passport');
const habitController = require('../controllers/habit')

const router = express.Router();
router.post('/create', habitController.createHabit);
router.get('/favorite-habit', habitController.favoriteHabit);
router.get('/remove', habitController.destroyHabit);
router.get('/status-update', habitController.statusUpdate);

module.exports = router;
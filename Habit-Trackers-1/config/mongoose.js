const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/HabbitTrackerDB');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connectin DB'));

db.once('open', () => {
    console.log('Succesfully !! Connected to the DataBase');
})
module.export = db;



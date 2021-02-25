const express = require('express');
const router = express.Router();

// Controllers
const AqiController = require('./controllers/aqi_controller').getAqiController;

router.get('/aqi', AqiController);

module.exports = router;

const express = require('express');
const { addTrain, getSeatAvailability } = require('../controllers/trainController');
const router = express.Router();

router.post('/add', addTrain);
router.get('/availability', getSeatAvailability);

module.exports = router;

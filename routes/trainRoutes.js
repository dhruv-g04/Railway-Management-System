const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { adminAuthMiddleware } = require('../middleware/adminMiddleware');

// Routes for user
router.get('/seatAvailability', trainController.getSeatAvailability);

// Routes with admin authentication
router.post('/add', adminAuthMiddleware, trainController.addTrain);

module.exports = router;

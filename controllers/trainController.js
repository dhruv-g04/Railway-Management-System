const Train = require('../models/trainModel');

exports.addTrain = async (req, res) => {
    console.log(req.headers);
    const { name, source, destination, availableSeats } = req.body;

    try {
        const newTrain = new Train({ name, source, destination, availableSeats });
        await newTrain.save();
        res.status(201).json({ message: 'Train added successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getSeatAvailability = async (req, res) => {
    const { source, destination } = req.query;

    try {
        const trains = await Train.find({ source, destination });
        res.json(trains);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

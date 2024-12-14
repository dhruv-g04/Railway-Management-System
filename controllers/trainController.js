const Train = require('../models/trainModel');

exports.addTrain = async (req, res) => {
    const { name, source, destination, availableSeats } = req.body;

    if (!name || !source || !destination || !availableSeats) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await Train.create({
            name,
            source,
            destination,
            availableSeats
        });

        res.status(201).json({ message: 'Train added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getSeatAvailability = async (req, res) => {
    const { source, destination } = req.query;

    if (!source || !destination) {
        return res.status(400).json({ error: 'Source and destination are required' });
    }

    try {
        const trains = await Train.findAll({
            where: {
                source: source,
                destination: destination
            }
        });

        res.json(trains);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const Booking = require('../models/bookingModel');
const Train = require('../models/trainModel');
const db = require('../config/db');  // For database transaction

exports.bookSeat = (req, res) => {
    const { trainId, seatCount } = req.body;
    const connection = db.connectDB();

    connection.beginTransaction((err) => {
        if (err) throw err;

        connection.query('SELECT * FROM trains WHERE train_id = ?', [trainId], (err, result) => {
            if (err) throw err;

            if (result[0].available_seats >= seatCount) {
                connection.query('UPDATE trains SET available_seats = available_seats - ? WHERE train_id = ?', [seatCount, trainId], (err, result) => {
                    if (err) return connection.rollback(() => { throw err; });

                    connection.commit((err) => {
                        if (err) return connection.rollback(() => { throw err; });
                        res.json({ message: 'Booking successful!' });
                    });
                });
            } else {
                res.status(400).json({ message: 'Not enough seats available' });
            }
        });
    });
};

const db = require('../config/db');

const Booking = {
    create: (bookingData, callback) => {
        const query = 'INSERT INTO bookings (user_id, train_id, seats) VALUES (?, ?, ?)';
        db.query(query, [bookingData.user_id, bookingData.train_id, bookingData.seats], callback);
    },
    findByUserId: (userId, callback) => {
        const query = 'SELECT * FROM bookings WHERE user_id = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = Booking;

const db = require('../config/db');

exports.bookSeat = (req, res) => {
    const { trainId, seatsToBook } = req.body;

    // Start a transaction
    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ error: 'Error connecting to database' });
        }

        connection.beginTransaction((err) => {
            if (err) {
                connection.release();
                return res.status(500).json({ error: 'Error starting transaction' });
            }

            // Lock the train row to prevent race conditions
            connection.query(
                'SELECT * FROM trains WHERE id = ? FOR UPDATE',
                [trainId],
                (err, results) => {
                    if (err) {
                        connection.rollback(() => {
                            connection.release();
                        });
                        return res.status(500).json({ error: 'Error fetching train data' });
                    }

                    if (results.length === 0) {
                        connection.rollback(() => {
                            connection.release();
                        });
                        return res.status(404).json({ error: 'Train not found' });
                    }

                    const train = results[0];

                    if (train.available_seats < seatsToBook) {
                        connection.rollback(() => {
                            connection.release();
                        });
                        return res.status(400).json({ error: 'Not enough seats available' });
                    }

                    // Reduce available seats
                    connection.query(
                        'UPDATE trains SET available_seats = available_seats - ? WHERE id = ?',
                        [seatsToBook, trainId],
                        (err, results) => {
                            if (err) {
                                connection.rollback(() => {
                                    connection.release();
                                });
                                return res.status(500).json({ error: 'Error updating train seats' });
                            }

                            // Create a booking entry
                            connection.query(
                                'INSERT INTO bookings (user_id, train_id, seats) VALUES (?, ?, ?)',
                                [req.user.id, trainId, seatsToBook],
                                (err, results) => {
                                    if (err) {
                                        connection.rollback(() => {
                                            connection.release();
                                        });
                                        return res.status(500).json({ error: 'Error creating booking' });
                                    }

                                    // Commit the transaction
                                    connection.commit((err) => {
                                        if (err) {
                                            connection.rollback(() => {
                                                connection.release();
                                            });
                                            return res.status(500).json({ error: 'Transaction commit failed' });
                                        }

                                        connection.release();
                                        res.status(200).json({ message: 'Booking successful!' });
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    });
};

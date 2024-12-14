const db = require('../config/db');

const Train = {
    getAll: (callback) => {
        const query = 'SELECT * FROM trains';
        db.query(query, callback);
    },
    create: (trainData, callback) => {
        const query = 'INSERT INTO trains (train_name, source, destination, available_seats) VALUES (?, ?, ?, ?)';
        db.query(query, [trainData.train_name, trainData.source, trainData.destination, trainData.available_seats], callback);
    }
};

module.exports = Train;

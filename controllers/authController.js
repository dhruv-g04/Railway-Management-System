const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Register user
exports.register = (req, res) => {
    const { username, password, role } = req.body;
    console.log(req.body);
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        // Insert into database
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.query(query, [username, hashedPassword, role], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error registering user' });

            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};


exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err) return res.status(500).send('Error logging in');
        if (results.length === 0) {
            return res.status(401).send('User not found');
        }

        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ id: user.id, rool: user.role }, 'jwt_secret', { expiresIn: '1h' });
        res.send(200).json({ token });
    });
};
const jwt = require('jsonwebtoken');

exports.generateAuthToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
};

require('dotenv').config();

exports.adminAuthMiddleware = (req, res, next) => {
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
        return res.status(400).json({ message: 'Bad Request: API Key missing' });
    }

    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }

    next();
};

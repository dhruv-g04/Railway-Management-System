exports.adminAuthMiddleware = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (apiKey !== 'your_admin_api_key') {
        return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
    next();
};

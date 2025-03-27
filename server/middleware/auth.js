const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Authentication failed: No token provided" });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user to request object
        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed: Invalid token" });
    }
};

module.exports = auth; 
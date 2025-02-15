const User=require('../models/User');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Adjust path based on your structure

const auth = async (req, res, next) => {
    try {
        // Extract token from body, query, or headers
        let token = req.body.token || req.query.token || req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // If token is in Bearer format, extract it
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        // Ensure JWT_SECRET is available
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Server misconfiguration: JWT secret missing."
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ grNumber: decoded.grNumber });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Attach user data to request
        req.user = user;
        next();

    } catch (error) {
        console.error(error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again."
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = auth;

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// HTTP request logger
app.use(morgan("dev"));

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        service: "API Gateway",
        message: "Gateway is running successfully"
    });
});

module.exports = app;
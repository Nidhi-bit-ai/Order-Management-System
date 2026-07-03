const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();
app.use((req, res, next) => {
    console.log("Gateway:", req.method, req.originalUrl);
    next();
});
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Gateway Service",
    timestamp: new Date().toISOString(),
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// 👉 ALL ROUTES GO THROUGH /api
app.use("/api", routes);

module.exports = app;
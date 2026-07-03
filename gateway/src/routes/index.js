const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();
console.log("Routes file loaded");
// AUTH SERVICE
const axios = require("axios");

router.post("/auth/register", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5001/api/auth/register",
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || { error: err.message }
    );
  }
});
router.post("/auth/login", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5001/api/auth/login",
      req.body
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || { error: err.message }
    );
  }
});

// USER ROUTES
router.get("/user/profile", async (req, res) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5001/api/user/profile",
      {
        headers: req.headers,
      }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(
      err.response?.data || { error: err.message }
    );
  }
});

module.exports = router;
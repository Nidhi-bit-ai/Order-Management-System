import express from "express";
import axios from "axios";

const router = express.Router();

console.log("Auth routes loaded");

// =========================
// AUTH SERVICE
// =========================

router.post("/auth/register", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/auth/register",
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
      "http://localhost:5001/api/auth/login",
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

// =========================
// USER SERVICE
// =========================

router.get("/user/profile", async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/user/profile",
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

export default router;
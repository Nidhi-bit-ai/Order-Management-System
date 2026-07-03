import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

// Connect Database FIRST
await connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});
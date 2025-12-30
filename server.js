const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== TEST ROUTE ==================
app.get("/", (req, res) => {
  res.send("🚀 SaaS Backend is Running Successfully");
});

// ================== PORT ==================
const PORT = process.env.PORT || 5000;

// ================== DATABASE CONNECT ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    // Server start only after DB connect
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

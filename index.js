require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { OK } = require("./utils/response");
const { API_PORT, MONGODB_URL } = process.env;

const app = express();
const PORT = API_PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Koneksi ke MongoDB langsung di sini
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
// Routing
const routes = require("./routes/index.route");
app.use(routes);

// Health check
app.get("/", (req, res) => {
  OK(
    res,
    201,
    {
      isRunning: true,
      serverVersion: "1.0.0",
    },
    "success getting server main endpoint..."
  );
});

module.exports = app;

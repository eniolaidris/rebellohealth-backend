const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Test Route
app.get('/', (req, res) => {
  res.send("Rebello Health Backend is Running");
});

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/appointments", require("./routes/appointmentRoutes"));

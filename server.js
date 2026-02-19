const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS (temporary allow all origins for now)
app.use(cors({
  origin: true,
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

// ✅ Test Route
app.get('/', (req, res) => {
  res.send("Rebello Health Backend is Running");
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  serviceType: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    default: "booked"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);

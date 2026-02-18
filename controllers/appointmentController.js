const Appointment = require("../models/Appointment");

// Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { date, time, serviceType } = req.body;

    // 🔍 Check if slot already exists
    const existingAppointment = await Appointment.findOne({ date, time });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked. Please choose another time."
      });
    }

    const appointment = new Appointment({
      patient: req.user.id,
      date,
      time,
      serviceType
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Patient Appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id
    });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Appointments (Admin)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("patient", "name email");

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Allow only owner or admin
    if (
      appointment.patient.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to cancel this appointment"
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

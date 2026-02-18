const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  cancelAppointment
} = require("../controllers/appointmentController");

router.post("/book", auth, bookAppointment);
router.get("/my", auth, getMyAppointments);
router.get("/all", auth, getAllAppointments);
router.patch("/cancel/:id", auth, cancelAppointment);

module.exports = router;

// app/bookingDB/models/bookingModel.js
const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  diseaseType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Store time as HH:MM format
  location: { type: String, required: true },
  vaccineType: { type: String, required: true },
  status: { type: String, required: true}
});

// Create a Booking model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

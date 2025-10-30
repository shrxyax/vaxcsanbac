// app/bookingDB/bookingRoutes.js
const express = require('express');
const {
  connect,
  addBooking,
  getAllBookings,
  getBookingById,
  modifyBooking,
  deleteBooking
} = require('./mongodb'); // Import functions from mongodb.js

const router = express.Router();

// Connect to MongoDB when the routes are initialized
connect();

// Create a new booking
router.post('/addBooking', async (req, res) => {
  try {
    const { email, diseaseType, date, time, location, vaccineType, status } = req.body;

    // Ensure all required fields are provided
    if (!email || !diseaseType || !date || !time || !location || !vaccineType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBooking = await addBooking(email, diseaseType, date, time, location, vaccineType, status || 'upcoming');
    
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking: " + error.message });
  }
});


// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings: ' + error.message });
  }
});

// Get a booking by ID
router.get('/bookings/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await getBookingById(bookingId);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking: ' + error.message });
  }
});

// Modify a booking
router.put('/bookings/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updates = req.body; // Get the updates from the request body
    const updatedBooking = await modifyBooking(bookingId, updates);
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking: ' + error.message });
  }
});

// Delete a booking
router.delete('/bookings/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await deleteBooking(bookingId);
    res.status(200).json(deletedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking: ' + error.message });
  }
});

router.get('/test', (req, res) => {
  res.send("✅ Booking route working!");
});


module.exports = router;

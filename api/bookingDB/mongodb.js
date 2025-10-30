// app/bookingDB/mongodb.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Booking = require('./models/bookingModel'); // Your booking model

dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGO_URI; // MongoDB URI from .env

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if connection fails
  }
};

// Function to add a booking
const addBooking = async (email, diseaseType, date, time, location, vaccineType, status = 'upcoming') => {
  try {
    const newBooking = new Booking({ email, diseaseType, date, time, location, vaccineType, status });
    await newBooking.save();
    return newBooking;
  } catch (error) {
    throw new Error('Error adding booking: ' + error.message);
  }
};


// Function to get all bookings
const getAllBookings = async () => {
  try {
    const bookings = await Booking.find();
    return bookings;
  } catch (error) {
    throw new Error('Error fetching bookings: ' + error.message);
  }
};

// In the MongoDB API
const getBookingById = async (email) => {
  try {
    // Use userId for querying (not _id)
    const bookings = await Booking.find({ email: email });  // Use userId as the query field
    if (!bookings || bookings.length === 0) {
      throw new Error('No bookings found for this user');
    }
    return bookings;
  } catch (error) {
    throw new Error('Error fetching booking: ' + error.message);
  }
};

// Function to modify a booking
const modifyBooking = async (bookingId, updates) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });
    if (!updatedBooking) throw new Error('Booking not found');
    return updatedBooking;
  } catch (error) {
    throw new Error('Error updating booking: ' + error.message);
  }
};

// Function to delete a booking
const deleteBooking = async (bookingId) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) throw new Error('Booking not found');
    return deletedBooking;
  } catch (error) {
    throw new Error('Error deleting booking: ' + error.message);
  }
};

// Export the functions
module.exports = { connect, addBooking, getAllBookings, getBookingById, modifyBooking, deleteBooking };

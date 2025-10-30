// app/app.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./api/authDB/authRoutes');  // Import the authRoutes
const bookingRoutes = require('./api/bookingDB/bookingRoutes');  // Import the bookingRoutes

dotenv.config();  // Load environment variables from env

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
const cors = require("cors");

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies & authorization headers
  })
);
//authentication routes
app.use('/api/auth', authRoutes);

//booking routes
app.use('/api/booking', bookingRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const {
  authenticateUser,
  deleteUser,
  addUser,
  modifyPassword,
  updateUserDetails,
  connectToDB
} = require('./mysql.js');  // renamed mysql.js → db.js

const router = express.Router();

// Connect to MongoDB
connectToDB();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, age, idNumber, phone } = req.body;
    const newUser = await addUser(email, password, fullName, age, idNumber, phone);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = await deleteUser(email);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Modify password
router.put('/user/password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    await modifyPassword(email, oldPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user details
router.put('/user/update', async (req, res) => {
  try {
    const { email, newFullName, newPhone } = req.body;
    await updateUserDetails(email, newFullName, newPhone);
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

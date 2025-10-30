const bcrypt = require('bcrypt');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Authenticate user
const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid password');

  return user;
};

// Add a new user
const addUser = async (email, password, fullName, age, idNumber, phone) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    fullName,
    age,
    idNumber,
    phone
  });

  await newUser.save();
  return newUser;
};

// Delete user
const deleteUser = async (email) => {
  const result = await User.deleteOne({ email });
  if (result.deletedCount === 0) throw new Error('User not found');
  return { message: 'User deleted successfully' };
};

// Modify password
const modifyPassword = async (email, oldPassword, newPassword) => {
  const user = await authenticateUser(email, oldPassword);
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return { message: 'Password updated successfully' };
};

// Update fullName & phone
const updateUserDetails = async (email, newFullName, newPhone) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  user.fullName = newFullName;
  user.phone = newPhone;
  await user.save();

  return { message: 'User details updated successfully' };
};

module.exports = { connectToDB, authenticateUser, addUser, deleteUser, modifyPassword, updateUserDetails };

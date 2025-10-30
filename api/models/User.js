const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  idNumber: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true, unique: true},
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
User.createIndexes();

module.exports = User;

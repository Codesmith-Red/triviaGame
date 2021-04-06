const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Session Schema creates a new schema with a cookie ID and has an expiration date set after 1440 minutes
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: '1440m', default: Date.now }
});



module.exports = mongoose.model('Session', sessionSchema);''
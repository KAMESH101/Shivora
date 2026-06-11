const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
}

module.exports = connectDB;

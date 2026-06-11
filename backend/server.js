require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');

const { clerkMiddleware } = require('@clerk/express');

const app = express();

// connect to MongoDB
connectDB();

// middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(clerkMiddleware());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);

// health check
app.get('/', function(req, res) {
  res.json({ message: 'Shivora API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});

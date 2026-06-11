const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    }
  ],
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

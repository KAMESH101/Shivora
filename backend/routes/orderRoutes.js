const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// Validation errors middleware handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

// Validation rules
const orderValidation = [
  body('items')
    .isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.id')
    .trim()
    .notEmpty().withMessage('Item ID is required')
    .escape(),
  body('items.*.name')
    .trim()
    .notEmpty().withMessage('Item name is required')
    .escape(),
  body('items.*.price')
    .isNumeric().withMessage('Item price must be a number'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Item quantity must be at least 1'),
  body('items.*.size')
    .trim()
    .notEmpty().withMessage('Item size is required')
    .escape(),
  body('items.*.image')
    .optional()
    .trim(),
  body('total')
    .isNumeric().withMessage('Order total must be a number'),
  body('address')
    .trim()
    .notEmpty().withMessage('Delivery address is required')
    .escape()
];

// POST /api/orders - Create a new order (Protected)
router.post('/', protect, orderValidation, handleValidationErrors, async function(req, res) {
  const { items, total, address } = req.body;

  try {
    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      address
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating order', error: err.message });
  }
});

// GET /api/orders/my-orders - Get all orders for the current user (Protected)
router.get('/my-orders', protect, async function(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching orders', error: err.message });
  }
});

module.exports = router;

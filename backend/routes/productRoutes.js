const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - get all products, supports ?category= and ?search= filters
router.get('/', async function(req, res) {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products/:id - get single product
router.get('/:id', async function(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const { Customer } = require('../models');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// CRUD routes for customers (only authenticated users)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, trust_score, credit_limit } = req.body;
    const customer = await Customer.create({
      name, phone, address, trust_score, credit_limit, userId: req.user.id
    });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Error creating customer', error: err.message });
  }
});

// Other CRUD operations (get, update, delete) go here...
module.exports = router;

const express = require('express');
const { Loan, Customer } = require('../models');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a loan
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { customerId, item_description, loan_amount, issue_date, due_date, frequency, interest, grace_days } = req.body;
    const customer = await Customer.findOne({ where: { id: customerId, userId: req.user.id } });

    if (!customer) {
      return res.status(400).json({ message: 'Customer not found or does not belong to you.' });
    }

    const loan = await Loan.create({
      customerId,
      item_description,
      loan_amount,
      issue_date,
      due_date,
      frequency,
      interest,
      grace_days
    });

    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ message: 'Error creating loan', error: err.message });
  }
});

// Get all loans for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.findAll({
      where: { userId: req.user.id },
      include: [{ model: Customer, attributes: ['name', 'phone'] }]
    });
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching loans', error: err.message });
  }
});

// Get loan details (by loan ID)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: Customer, attributes: ['name', 'phone'] }]
    });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json(loan);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching loan', error: err.message });
  }
});

module.exports = router;

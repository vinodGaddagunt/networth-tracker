const express = require('express');
const { Loan } = require('../models');
const moment = require('moment');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all overdue loans for the user
router.get('/overdue', authMiddleware, async (req, res) => {
  try {
    const overdueLoans = await Loan.findAll({
      where: {
        userId: req.user.id,
        due_date: {
          [Sequelize.Op.lt]: moment().format('YYYY-MM-DD'),
        },
        loan_amount: {
          [Sequelize.Op.gt]: 0, // Only include loans with outstanding balances
        },
      },
      include: [{ model: Customer, attributes: ['name', 'phone'] }],
    });

    if (overdueLoans.length === 0) {
      return res.status(200).json({ message: 'No overdue loans found.' });
    }

    res.status(200).json(overdueLoans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching overdue loans', error: err.message });
  }
});

module.exports = router;

const { Repayment, Loan } = require('../models');

// Record a repayment
exports.recordRepayment = async (req, res) => {
  try {
    const { loanId, repayment_amount, repayment_date } = req.body;

    // Fetch loan by ID
    const loan = await Loan.findOne({ where: { id: loanId, userId: req.user.id } });

    if (!loan) {
      return res.status(400).json({ message: 'Loan not found or does not belong to you.' });
    }

    // Record repayment
    const repayment = await Repayment.create({
      loanId,
      repayment_amount,
      repayment_date
    });

    // Update loan balance after repayment
    loan.loan_amount -= repayment_amount;
    await loan.save();

    res.status(201).json({ repayment, remaining_balance: loan.loan_amount });
  } catch (err) {
    res.status(500).json({ message: 'Error recording repayment', error: err.message });
  }
};

// Get all repayments for a loan
exports.getRepaymentsByLoan = async (req, res) => {
  try {
    const repayments = await Repayment.findAll({
      where: { loanId: req.params.loanId }
    });

    res.status(200).json(repayments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching repayments', error: err.message });
  }
};

const { Customer } = require('../models');

// Create a customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, address, trust_score, credit_limit } = req.body;

    const customer = await Customer.create({
      name,
      phone,
      address,
      trust_score,
      credit_limit,
      userId: req.user.id // Ensure customer belongs to the authenticated user
    });

    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Error creating customer', error: err.message });
  }
};

// Get all customers for the authenticated user
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({ where: { userId: req.user.id } });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customers', error: err.message });
  }
};

// Get a specific customer
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customer', error: err.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, phone, address, trust_score, credit_limit } = req.body;

    const customer = await Customer.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.name = name || customer.name;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;
    customer.trust_score = trust_score || customer.trust_score;
    customer.credit_limit = credit_limit || customer.credit_limit;

    await customer.save();

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Error updating customer', error: err.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting customer', error: err.message });
  }
};

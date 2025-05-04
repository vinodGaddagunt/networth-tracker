const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const CustomerModel = require('./customer');
const LoanModel = require('./loan');
const RepaymentModel = require('./repayment');

// Secure connection for Render PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Load models
const User = UserModel(sequelize);
const Customer = CustomerModel(sequelize);
const Loan = LoanModel(sequelize);
const Repayment = RepaymentModel(sequelize);

// Define associations
User.hasMany(Customer);
Customer.belongsTo(User);

Customer.hasMany(Loan);
Loan.belongsTo(Customer);

Loan.hasMany(Repayment);
Repayment.belongsTo(Loan);

module.exports = {
  sequelize,
  User,
  Customer,
  Loan,
  Repayment,
};
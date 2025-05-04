const { Sequelize, DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
    const Loan = sequelize.define('Loan', {
      item_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      loan_amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      issue_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      frequency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      interest: Sequelize.FLOAT,
      grace_days: Sequelize.INTEGER
    });
  
    return Loan;
  };
  
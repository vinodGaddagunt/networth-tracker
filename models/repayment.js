const { Sequelize, DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
    const Repayment = sequelize.define('Repayment', {
      repayment_amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      repayment_date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  
    return Repayment;
  };
  
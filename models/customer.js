const { Sequelize, DataTypes } = require('sequelize');  // Import Sequelize and DataTypes

module.exports = (sequelize) => {
  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,  // Use DataTypes from Sequelize
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,  // Use DataTypes from Sequelize
      allowNull: false,
      unique: true
    },
    address: DataTypes.STRING,  // Use DataTypes from Sequelize
    trust_score: {
      type: DataTypes.INTEGER,  // Use DataTypes from Sequelize
      allowNull: false,
      validate: {
        min: 0,
        max: 10
      }
    },
    credit_limit: {
      type: DataTypes.FLOAT,  // Use DataTypes from Sequelize
      allowNull: false
    }
  });

  return Customer;
};

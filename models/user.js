const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');  // Import Sequelize and DataTypes

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,  // Use DataTypes from Sequelize
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,  // Use DataTypes from Sequelize
      allowNull: false
    }
  });

  // Hash password before saving
  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  return User;
};

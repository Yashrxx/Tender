const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // your Sequelize instance

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

// --- Add associations ---
const Company = require('./Company');
const Tender = require('./Tender');

User.hasMany(Company, { foreignKey: 'user_id' });
User.hasMany(Tender, { foreignKey: 'user_id' });

module.exports = User;
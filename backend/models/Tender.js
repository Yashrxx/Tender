// models/Tender.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // your Sequelize instance

const Tender = sequelize.define('Tender', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  budget: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'General',
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: 'Not Specified',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Open',
  },
  // You’ll create associations separately using belongsTo
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'tenders',
  timestamps: false // since you’re managing `createdAt` manually
});

module.exports = Tender;
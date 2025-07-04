const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Application = sequelize.define('Application', {
  tender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Applications',
  timestamps: true
});

module.exports = Application;
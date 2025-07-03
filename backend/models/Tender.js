const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // if not always provided
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'tenders',
  timestamps: false
});

// associations
const User = require('./User');
const Company = require('./Company');

Tender.belongsTo(User, { foreignKey: 'user_id' });
Tender.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = Tender;
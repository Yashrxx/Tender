const express = require('express');
const router = express.Router();
const Tender = require('../models/Tender');
const Company = require('../models/Company');
const Application = require('../models/Application');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const totalTenders = await Tender.count();
    const openTenders = await Tender.count({ where: { stage: 'open' } });
    const totalCompanies = await Company.count();
    const totalApplications = await Application.count();

    res.json({ totalTenders, openTenders, totalCompanies, totalApplications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

module.exports = router;
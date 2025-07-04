const express = require('express');
const router = express.Router();

const fetchUser = require('../middleware/fetchUser');
const Application = require('../models/Application');
const Company = require('../models/Company');
const Tender = require('../models/Tender');

// POST route to apply
router.post('/', fetchUser, async (req, res) => {
  try {
    const { tenderId, message } = req.body;
    const userId = req.user.id;

    const company = await Company.findOne({ where: { user_id: userId } });
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const tenderExists = await Tender.findByPk(tenderId); // ✅ NEW
    if (!tenderExists) return res.status(404).json({ error: 'Tender not found' });

    const newApp = await Application.create({
      tender_id: tenderId,
      company_id: company.id,
      message
    });

    res.json(newApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while applying' });
  }
});

// routes/applicationRoutes.js
router.get('/byTender/:tenderId', async (req, res) => {
  try {
    const { tenderId } = req.params;
    const apps = await Application.findAll({
      where: { tender_id: tenderId },
      include: [{ model: Company }]
    });

    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

module.exports = router;
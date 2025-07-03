const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

// ✅ Import Sequelize models
const Tender = require("../models/Tender");
const Company = require("../models/Company");
const User = require('../models/User');

// ✅ POST /api/tenderRoutes/application
router.post('/application', fetchUser, async (req, res) => {
  try {
    const { title, description, deadline, budget, category, location } = req.body;

    if (!title || !description || !deadline || !budget) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Get user by ID
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Get company by user's email (assumes JWT token has email)
    const company = await Company.findOne({ where: { email: req.user.email } });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // ✅ Create new tender
    const newTender = await Tender.create({
      title,
      description,
      deadline,
      budget,
      category,
      location,
      status: 'Open',
      user_id: user.id,
      company_id: company.id,
    });

    res.status(201).json({
      message: "Tender published successfully",
      tender: newTender
    });

  } catch (error) {
    console.error("Error publishing tender:", error);
    res.status(500).json({ error: "Failed to publish tender" });
  }
});

// ✅ GET /api/tenderRoutes/newTender
router.get('/newTender', fetchUser, async (req, res) => {
  try {
    const tenders = await Tender.findAll({
      where: { user_id: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    res.json(tenders);
  } catch (err) {
    console.error("Error fetching tenders:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/allTenders', async (req, res) => {
  try {
    const tenders = await Tender.findAll({
      include: [
        {
          model: Company,
          attributes: ['name', 'phone'], // add other fields if needed
        }
      ],
      order: [['createdAt', 'DESC']] // optional: newest first
    });

    res.json(tenders);
  } catch (err) {
    console.error("Error fetching all tenders:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
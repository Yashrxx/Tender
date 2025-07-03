const express = require('express');
const upload = require('../middleware/upLoad');
const fetchUser = require('../middleware/fetchUser');
const supabase = require('../supabaseClient');
const Company = require("../models/Company");
const path = require('path');

const router = express.Router();

// ✅ UPDATED Upload to Supabase from memory (no fs)
const uploadToSupabase = async (file, folder = 'logos') => {
  if (!file) return null;

  const { buffer, originalname, mimetype } = file;
  const fileExt = path.extname(originalname);
  const fileName = `${folder}/${Date.now()}${fileExt}`;

  const { data, error } = await supabase.storage
    .from('company-logos') // ✅ Replace with your actual bucket name
    .upload(fileName, buffer, {
      contentType: mimetype,
      upsert: true
    });

  if (error) {
    console.error("❌ Supabase upload error:", error.message);
    throw error;
  }

  const publicUrl = supabase
    .storage
    .from('company-logos')
    .getPublicUrl(fileName).data.publicUrl;

  return publicUrl;
};

// ✅ CREATE company profile
router.post('/companyProfile/create',
  fetchUser,
  upload.fields([{ name: 'logo' }, { name: 'coverImage' }]),
  async (req, res) => {
    try {
      const { name, website, industry, description, address, phone } = req.body;
      const userId = req.user.id;

      const existing = await Company.findOne({ where: { user_id: userId } });
      if (existing) {
        return res.status(400).json({ error: "Company profile already exists" });
      }

      const logo = req.files?.logo?.[0] ? await uploadToSupabase(req.files.logo[0], 'logos') : null;
      const coverImage = req.files?.coverImage?.[0] ? await uploadToSupabase(req.files.coverImage[0], 'covers') : null;

      const newCompany = await Company.create({
        user_id: userId,
        email: req.user.email,
        name,
        website,
        industry,
        description,
        address,
        phone,
        logo,
        cover_image: coverImage
      });

      res.status(201).json({ message: "Company profile created", company: newCompany });
    } catch (err) {
      console.error("Error creating company:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ✅ UPDATE company profile
router.put('/companyProfile/update',
  fetchUser,
  upload.fields([{ name: 'logo' }, { name: 'coverImage' }]),
  async (req, res) => {
    try {
      const { name, website, industry, description, address, phone } = req.body;
      const userId = req.user.id;

      const company = await Company.findOne({ where: { user_id: userId } });
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }

      const logo = req.files?.logo?.[0] ? await uploadToSupabase(req.files.logo[0], 'logos') : company.logo;
      const coverImage = req.files?.coverImage?.[0] ? await uploadToSupabase(req.files.coverImage[0], 'covers') : company.cover_image;

      await company.update({
        name,
        website,
        industry,
        description,
        address,
        phone,
        logo,
        cover_image: coverImage
      });

      res.status(200).json({ message: "Company profile updated", company });
    } catch (err) {
      console.error("Error updating company:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ✅ GET company by email
router.get('/companyProfile', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const company = await Company.findOne({ where: { email } });
    if (!company) return res.status(404).json({ error: "Company not found" });

    res.json(company);
  } catch (err) {
    console.error("Error fetching company:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all companies
router.get('/all', async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ SEARCH companies
router.get('/search', async (req, res) => {
  const query = req.query.query || '';
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Company.findAndCountAll({
      where: {
        [require('sequelize').Op.or]: [
          { name: { [require('sequelize').Op.iLike]: `%${query}%` } },
          { industry: { [require('sequelize').Op.iLike]: `%${query}%` } },
          { description: { [require('sequelize').Op.iLike]: `%${query}%` } },
        ],
      },
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);
    res.json({ results: rows, totalPages });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
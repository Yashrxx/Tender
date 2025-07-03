require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const path = require('path'); // ✅ You forgot to require 'path' earlier!

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase credentials missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ MAIN FUNCTION: Upload to Supabase Storage
const uploadToSupabase = async (file, folder) => {
  if (!file) return null;

  const { buffer, originalname, mimetype } = file;
  const fileExt = path.extname(originalname);
  const fileName = `${folder}/${Date.now()}${fileExt}`;

  const { data, error } = await supabase.storage
    .from('company-assets') // 🔁 Replace with your actual bucket name
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
    .from('company-assets') // 🔁 Same bucket name
    .getPublicUrl(fileName).data.publicUrl;

  return publicUrl;
};

module.exports = uploadToSupabase;
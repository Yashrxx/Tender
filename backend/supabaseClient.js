require('dotenv').config(); 

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase credentials missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

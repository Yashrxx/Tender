const multer = require('multer');

const storage = multer.memoryStorage(); // ✅ Store files in memory (buffer)

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = file.originalname.toLowerCase();
    const valid = allowed.test(ext);
    if (valid) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, or PNG images are allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Optional: limit file size to 5MB
});

module.exports = upload;
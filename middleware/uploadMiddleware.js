const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).single('image'); // 'image' is the field name in the form-data

// Middleware to upload to Cloudinary
const uploadToCloudinary = (req, res, next) => {
  // Use the 'upload' middleware first to process the file
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
       // If no file is being uploaded (e.g., just updating text), proceed.
      return next();
    }

    // Convert buffer to a readable stream and upload to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'ritman-college' }, // Optional: organize uploads in a folder
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary upload failed', error });
        }
        // Attach Cloudinary info to the request object
        req.cloudinaryResult = result;
        next();
      }
    );
    stream.end(req.file.buffer);
  });
};

module.exports = { uploadToCloudinary, cloudinary };
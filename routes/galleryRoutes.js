const express = require('express');
const router = express.Router();
const { getGalleryImages, addGalleryImage, deleteGalleryImage } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

router.route('/').get(getGalleryImages).post(protect, uploadToCloudinary, addGalleryImage);
router.route('/:id').delete(protect, deleteGalleryImage);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getArticles, addArticle, deleteArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

router.route('/').get(getArticles).post(protect, uploadToCloudinary, addArticle);
router.route('/:id').delete(protect, deleteArticle);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getApplications, deleteApplication } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getApplications);
router.route('/:id').delete(protect, deleteApplication);

module.exports = router;
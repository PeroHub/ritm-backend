const express = require('express');
const router = express.Router();
const { getPrograms, addProgram, deleteProgram } = require('../controllers/programController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPrograms).post(protect, addProgram);
router.route('/:id').delete(protect, deleteProgram);

module.exports = router;
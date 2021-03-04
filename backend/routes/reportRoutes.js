const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getReport, createReport } = require('../controllers/reportController');

router.route('/').get(protect, getReport).post(protect, createReport);

module.exports = router;

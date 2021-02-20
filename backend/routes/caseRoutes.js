const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getCases, createCase, updateCase } = require('../controllers/caseController');

router.route('/').get(protect, getCases).post(protect, createCase).put(protect, updateCase);

module.exports = router;

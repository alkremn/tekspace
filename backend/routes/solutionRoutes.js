const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getSolutions,
  createSolution,
} = require('../controllers/SolutionController');

router.route('/').get(protect, getSolutions).post(protect, createSolution);

module.exports = router;

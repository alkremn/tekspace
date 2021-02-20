const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getSolutions,
  createSolution,
  removeSolution,
  updateSolution,
} = require('../controllers/SolutionController');

router
  .route('/')
  .get(protect, getSolutions)
  .post(protect, createSolution)
  .put(protect, updateSolution);
router.delete('/:id', protect, removeSolution);

module.exports = router;

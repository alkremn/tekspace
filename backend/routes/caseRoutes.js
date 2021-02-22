const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCases,
  createCase,
  updateCase,
  removeCase,
} = require('../controllers/caseController');

router
  .route('/')
  .get(protect, getCases)
  .post(protect, createCase)
  .put(protect, updateCase);

router.delete('/:id', protect, removeCase);

module.exports = router;

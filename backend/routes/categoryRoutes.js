const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCategories,
  createCategory,
} = require('../controllers/CategoryController');

router.route('/').get(protect, getCategories).post(protect, createCategory);

module.exports = router;

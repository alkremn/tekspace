const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getUsers,
  createUser,
  updateUser,
} = require('../controllers/UserController');

router.route('/').get(protect, getUsers).put(protect, updateUser);
router.post('/createUser', protect, createUser);

module.exports = router;

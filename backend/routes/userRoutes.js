const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getUsers,
  loginUser,
  logoutUser,
} = require('../controllers/UserController');

router.post('/login', loginUser);
router.get('/logout', protect, logoutUser);
router.get('/', protect, getUsers);

module.exports = router;

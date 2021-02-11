const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsers, loginUser } = require('../controllers/UserController');

router.post('/login', loginUser);
router.get('/', protect, getUsers);

module.exports = router;

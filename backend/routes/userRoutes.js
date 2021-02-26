const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsers, createUser } = require('../controllers/UserController');

router.get('/', protect, getUsers);
router.post('/createUser', protect, createUser);

module.exports = router;

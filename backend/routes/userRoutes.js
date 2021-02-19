const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsers } = require('../controllers/UserController');

router.get('/', protect, getUsers);

module.exports = router;

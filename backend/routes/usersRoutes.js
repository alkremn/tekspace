const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsers } = require('../controllers/UsersController');

router.get('/', protect, getUsers);

module.exports = router;

const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getMessages } = require('../controllers/messageController.js');

router.get('/', protect, getMessages);

module.exports = router;

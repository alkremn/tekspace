const router = require('express').Router();
const { loginUser, loginWithGoogle } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/google', loginWithGoogle);

module.exports = router;

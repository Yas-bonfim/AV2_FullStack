const express = require('express');
const router = express.Router();
const { protectedAccess } = require('../controllers/protectedController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/protected', authenticateToken, protectedAccess);

module.exports = router;

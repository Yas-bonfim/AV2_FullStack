const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.verifyToken, (req, res) => {
  res.json({ message: 'Acesso autorizado!' });
});

module.exports = router;
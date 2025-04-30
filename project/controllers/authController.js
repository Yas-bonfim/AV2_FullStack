const authService = require('../services/authService');

exports.register = async (req, res) => {
  const result = await authService.register(req.body);
  res.status(result.status).json(result.data);
};

exports.login = async (req, res) => {
  const result = await authService.login(req.body);
  res.status(result.status).json(result.data);
};

exports.protected = (req, res) => {
  res.json({ message: 'Acesso autorizado' });
};


module.exports = {
  register,
  login,
  protected: protectedRoute,
};
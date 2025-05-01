const authService = require('../services/authService');

const register = async (req, res) => {
  const result = await authService.register(req.body);
  res.status(result.status).json(result.data);
};

const login = async (req, res) => {
  const result = await authService.login(req.body);
  res.status(result.status).json(result.data);
};

const protected = (req, res) => {
  res.json({ message: 'Acesso autorizado' });
};

module.exports = {
  register,
  login,
  protected
};
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ({ name, email, password }) => {
  if (!name || !email || !password) return { status: 400, data: { message: 'Dados inválidos' } };

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return { status: 409, data: { message: 'E-mail já registrado' } };

    const user = new User({ name, email, password });
    await user.save();
    return { status: 201, data: { message: 'Usuário criado com sucesso' } };
  } catch (err) {
    return { status: 500, data: { message: 'Erro no servidor' } };
  }
};

exports.login = async ({ email, password }) => {
  if (!email || !password) return { status: 400, data: { message: 'Dados inválidos' } };

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return { status: 401, data: { message: 'Credenciais inválidas' } };

    const match = await bcrypt.compare(password, user.password);
    if (!match) return { status: 401, data: { message: 'Senha incorreta' } };

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { status: 200, data: { token } };
  } catch (err) {
    return { status: 500, data: { message: 'Erro no servidor' } };
  }
};

module.exports = {
  register,
  login,
};
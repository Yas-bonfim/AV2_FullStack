const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 6;

// Registro de novo usuário
const register = async ({ name, email, password }) => {
  console.log('Dados de login recebidos:', { email, password });
  if (!name || !email || !password) {
    return { status: 400, data: { message: 'Todos os campos são obrigatórios' } };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: 400, data: { message: 'Por favor, insira um e-mail válido' } };
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return { status: 400, data: { message: `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres` } };
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 409, data: { message: 'E-mail já registrado' } };
    }

    const user = new User({ name, email, password }); // <-- sem hash aqui
    await user.save();

    return {
      status: 201,
      data: {
        message: 'Usuário criado com sucesso',
        user: { id: user._id, name: user.name, email: user.email }
      }
    };
  } catch (err) {
    console.error('Erro no registro:', err);
    return {
      status: 500,
      data: {
        message: 'Erro no servidor ao registrar usuário',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      }
    };
  }
};

// Login de usuário existente
const login = async ({ email, password }) => {
  
  if (!email || !password) {
    return { status: 400, data: { message: 'E-mail e senha são obrigatórios' } };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: 400, data: { message: 'Por favor, insira um e-mail válido' } };
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return { status: 401, data: { message: 'Credenciais inválidas' } };
    }
    console.log('Senha fornecida para comparação:', password);
    const match = await bcrypt.compare(password, user.password);
    console.log('Resultado da comparação de senha:', match);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, data: { message: 'Credenciais inválidas' } };
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não definido nas variáveis de ambiente');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      status: 200,
      data: {
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    };
  } catch (err) {
    console.error('🔥 Erro capturado no login:', err.name, err.message, err.stack); // ← esse log é essencial
  return {
    status: 500,
    data: {
      message: 'Erro no servidor ao fazer login',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    }
  };
  }
};

module.exports = {
  register,
  login
};

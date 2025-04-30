const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes'); // login e register
const protectedRoutes = require('./routes/protectedRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use(authRoutes);
app.use(protectedRoutes);

// Middleware de erro (deve vir após as rotas)
app.use(errorMiddleware);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🟢 Conectado ao MongoDB');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Servidor rodando na porta ${process.env.PORT || 3000}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
});

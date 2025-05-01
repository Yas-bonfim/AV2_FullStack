const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path'); 


const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/api/auth',authRoutes);
app.use('/api/protected',protectedRoutes);

// Middleware de erro
app.use(errorMiddleware);

// Conexão com o MongoDB (local e produção)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🟢 Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
});


// Inicia o servidor localmente (não executado na Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor local rodando na porta ${PORT}`);
  });
}

// Exporta o app para uso na Vercel
module.exports = app;
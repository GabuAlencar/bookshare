require("dotenv").config();

const express = require("express");
const sequelize = require('./config/database'); // Certifique-se que este caminho está correto
const cors = require("cors");
const bookRoutes = require('./routes/booksRoutes');
const clientsRoutes = require('./routes/clientesRoutes')
// const Book = require('./models/Book') // Não precisa importar o Model se ele já estiver em outro lugar
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const protectedRoutes = require("./routes/protectedRoutes");
const borrowRoutes= require('./routes/emprestimosRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Use a porta do .env

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Rotas (Mantenha este bloco)
app.get("/", (req, res) => {
  res.send("API da Biblioteca está online!");
});

app.use('/', bookRoutes);
app.use('/', clientsRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/auth', authRoutes);
app.use('/', borrowRoutes);

// Exemplo de rota protegida
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Bem-vindo à área protegida", user: req.user });
});


// --- NOVO BLOCO DE CONEXÃO ASYNC/AWAIT (LIMPO) ---
async function connectAndSync() {
  try {
    // 1. Testa a conexão com o banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com PostgreSQL estabelecida com sucesso.');

    // 2. Sincroniza os modelos (cria as tabelas se não existirem)
    // Se você tiver relacionamentos, eles serão criados aqui
    await sequelize.sync(); 
    console.log('✅ Banco sincronizado e Modelos criados/atualizados.');

    // 3. Inicia o servidor Node.js
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Falha na conexão com o banco de dados:', error.message);
    // Este erro deve ser o seu erro SCRAM ou credenciais.
    process.exit(1); 
  }
}

connectAndSync();

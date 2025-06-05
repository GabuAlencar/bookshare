require("dotenv").config();

const express = require("express");
const sequelize = require('./config/database');
const cors = require("cors");
const bookRoutes = require('./routes/booksRoutes');
const clientsRoutes = require('./routes/clientesRoutes')
const Book = require('./models/Book')
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const protectedRoutes = require("./routes/protectedRoutes");
const borrowRoutes= require('./routes/emprestimosRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Rotas
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


sequelize.sync().then(() => {
  console.log('Banco sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});

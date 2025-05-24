const express = require("express");
const sequelize = require('./config/database');
const cors = require("cors");
const bookRoutes = require('./routes/books');
const clientsRoutes = require('./routes/clientesRoutes')
const Book = require('./models/Book')

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.send("API da Biblioteca está online!");
});

app.use('/', bookRoutes);
app.use('/', clientsRoutes);


sequelize.sync().then(() => {
  console.log('Banco sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});

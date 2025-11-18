// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  // 1. Nome do BD (DB_NAME)
  process.env.DB_NAME,
  // 2. Usuário (DB_USER)
  process.env.DB_USER,
  // 3. Senha (DB_PASS)
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Usará 5432
    dialect: process.env.DB_DIALECT, // Usará 'postgres'
    // O 'storage' é ignorado quando o dialect não é 'sqlite'
    logging: false,
  }
);

module.exports = sequelize;
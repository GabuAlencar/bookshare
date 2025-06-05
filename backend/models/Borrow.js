const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Borrow = sequelize.define(
  'Borrow',
  {
    id_emprestimo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_livro: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_solicitacao: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    data_aprovacao: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    data_prevista_devolucao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pendente",
    },
  },
  {
    tableName: 'borrows',
    timestamps: false,
  }
);

module.exports = Borrow;

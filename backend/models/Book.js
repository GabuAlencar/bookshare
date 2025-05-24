const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  author: {
    type: DataTypes.STRING,
    allowNull: false
  },

  year: {
    type: DataTypes.STRING,
  },

  category: {
    type: DataTypes.STRING,
  },

  description: {
    type: DataTypes.TEXT,
  }

});

module.exports = Book;

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.post('/books', async (req, res) => {
  const { title, author, year, category, description } = req.body;

   try {
    const newBook = await Book.create({ title, author, year, category, description });
    res.status(201).json(newBook);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar livro' });
  }
});

router.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

module.exports = router;

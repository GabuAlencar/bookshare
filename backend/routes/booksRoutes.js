// booksRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Rota para cadastrar novo livro (já existente)
router.post('/books', async (req, res) => {
  const { title, author, year, category, description } = req.body;
  try {
    const newBook = await Book.create({ title, author, year, category, description });
    return res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar livro' });
  }
});

// Rota para listar todos os livros (já existente)
router.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// NOVA ROTA: devolve o próximo ID a ser usado (max(id) + 1)
router.get('/books/next-id', async (req, res) => {
  try {
    // Encontra o livro de maior ID
    const lastBook = await Book.findOne({
      order: [['id', 'DESC']], // ordena por id decrescente
      attributes: ['id'],       // só precisamos do campo id
    });

    // Se não houver nenhum livro ainda, nextId = 1
    const nextId = lastBook ? lastBook.id + 1 : 1;
    return res.json({ nextId });
  } catch (error) {
    console.error('Erro ao buscar próximo ID:', error);
    return res.status(500).json({ error: 'Erro ao buscar próximo ID' });
  }
});

module.exports = router;

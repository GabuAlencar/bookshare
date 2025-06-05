// booksRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// POST: Criar um ou mais livros
router.post('/books', async (req, res) => {
  const data = req.body;

  try {
    let createdBooks;

    if (Array.isArray(data)) {
      // Adiciona status: 'disponivel' para cada item
      const booksWithStatus = data.map(book => ({
        ...book,
        status: 'disponivel'
      }));
      createdBooks = await Book.bulkCreate(booksWithStatus);
    } else {
      // Adiciona status: 'disponivel' para um único livro
      const bookWithStatus = {
        ...data,
        status: 'disponivel'
      };
      createdBooks = await Book.create(bookWithStatus);
    }

    res.status(201).json(createdBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar livro' });
  }
});

// GET: Listar todos os livros
router.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// GET: Devolver o próximo ID disponível
router.get('/books/next-id', async (req, res) => {
  try {
    const lastBook = await Book.findOne({
      order: [['id', 'DESC']],
      attributes: ['id'],
    });

    const nextId = lastBook ? lastBook.id + 1 : 1;
    return res.json({ nextId });
  } catch (error) {
    console.error('Erro ao buscar próximo ID:', error);
    return res.status(500).json({ error: 'Erro ao buscar próximo ID' });
  }
});

module.exports = router;

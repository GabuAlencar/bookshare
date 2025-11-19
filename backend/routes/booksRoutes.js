// booksRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Borrow = require('../models/Borrow');

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

// GET: Listar todos os livros com status de empréstimo
router.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll({
      order: [['createdAt', 'DESC']], // Mais recente primeiro
    });
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Buscar todos os empréstimos pendentes de uma vez
    const emprestimosPendentes = await Borrow.findAll({
      where: {
        status: 'pendente',
      },
      order: [['id_livro', 'ASC'], ['data_prevista_devolucao', 'DESC']],
    });

    // Criar um mapa de livro_id => empréstimo mais recente
    const emprestimoPorLivro = {};
    emprestimosPendentes.forEach(emp => {
      if (!emprestimoPorLivro[emp.id_livro]) {
        emprestimoPorLivro[emp.id_livro] = emp;
      }
    });

    // Adicionar status para cada livro
    const booksWithStatus = books.map((book) => {
      const emprestimoPendente = emprestimoPorLivro[book.id];
      let statusEmprestimo = 'disponivel';

      if (emprestimoPendente) {
        const dataDevolucao = new Date(emprestimoPendente.data_prevista_devolucao);
        dataDevolucao.setHours(0, 0, 0, 0);
        
        if (dataDevolucao < today) {
          statusEmprestimo = 'emprestado_atraso';
        } else {
          statusEmprestimo = 'emprestado';
        }
      } else if (book.status === 'emprestado') {
        statusEmprestimo = 'emprestado';
      }

      return {
        ...book.toJSON(),
        statusEmprestimo,
      };
    });

    // Garantir ordenação por data de cadastro (mais recente primeiro)
    booksWithStatus.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Ordem decrescente
    });

    res.status(200).json(booksWithStatus);
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

// PUT: Atualizar um livro
router.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year, category, description } = req.body;

    // Verificar se o livro existe
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    // Atualizar o livro
    await book.update({
      title,
      author,
      year,
      category,
      description,
    });

    return res.status(200).json({ message: 'Livro atualizado com sucesso', book });
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
});

// DELETE: Excluir um livro
router.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o livro existe
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    // Verificar se o livro está emprestado
    const emprestimoPendente = await Borrow.findOne({
      where: {
        id_livro: id,
        status: 'pendente',
      },
    });

    if (emprestimoPendente) {
      return res.status(400).json({ error: 'Não é possível excluir um livro que está emprestado' });
    }

    // Excluir o livro
    await book.destroy();
    
    return res.status(200).json({ message: 'Livro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    return res.status(500).json({ error: 'Erro ao excluir livro' });
  }
});

module.exports = router;

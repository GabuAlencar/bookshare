const express = require('express');
const router = express.Router();

const Borrow = require('../models/Borrow');
const Client = require('../models/Client');
const Book = require('../models/Book');

// Define relacionamentos para incluir Book e Client quando necessário
Borrow.belongsTo(Client, { foreignKey: 'id_usuario' });
Borrow.belongsTo(Book, { foreignKey: 'id_livro' });

// POST: Registrar empréstimo
router.post('/borrow', async (req, res) => {
  const { id_usuario, id_livro, data_prevista_devolucao } = req.body;

  if (!id_usuario || !id_livro || !data_prevista_devolucao) {
    return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
  }

  try {
    // Verifica cliente
    const client = await Client.findByPk(id_usuario);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verifica livro
    const book = await Book.findByPk(id_livro);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    if (book.status !== 'disponivel') {
      return res.status(400).json({ error: 'Livro não disponível para empréstimo' });
    }

    // Cria empréstimo
    const newBorrow = await Borrow.create({
      id_usuario,
      id_livro,
      data_solicitacao: new Date(),
      data_prevista_devolucao,
      status: 'pendente',
    });

    // Atualiza status do livro
    await book.update({ status: 'emprestado' });

    return res.status(201).json(newBorrow);
  } catch (error) {
    console.error("Erro ao registrar empréstimo:", error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST: Registrar devolução
router.post('/return', async (req, res) => {
  const { id_usuario, id_livro } = req.body;

  if (!id_usuario || !id_livro) {
    return res.status(400).json({ error: 'Cliente e livro são obrigatórios' });
  }

  try {
    // Encontra empréstimo pendente para esse cliente e livro
    const emprestimo = await Borrow.findOne({
      where: {
        id_usuario,
        id_livro,
        status: 'pendente',
      },
    });

    if (!emprestimo) {
      return res.status(404).json({ error: 'Empréstimo não encontrado ou já devolvido' });
    }

    // Atualiza status do empréstimo para devolvido
    await emprestimo.update({ status: 'devolvido' });

    // Atualiza status do livro para disponível
    const livro = await Book.findByPk(id_livro);
    if (livro) {
      await livro.update({ status: 'disponivel' });
    }

    return res.status(200).json({ message: 'Devolução registrada com sucesso' });
  } catch (error) {
    console.error("Erro ao registrar devolução:", error);
    return res.status(500).json({ error: 'Erro interno ao registrar devolução' });
  }
});

// GET: Listar todos os livros
router.get('/books', async (req, res) => {
  try {
    const livros = await Book.findAll();
    return res.status(200).json(livros);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// GET: Listar livros emprestados ativos de um cliente
router.get('/borrow/ativos/:id_usuario', async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const emprestimos = await Borrow.findAll({
      where: {
        id_usuario,
        status: 'pendente',
      },
      include: [{ model: Book }],
    });

    const livros = emprestimos.map(e => ({
      id_livro: e.id_livro,
      titulo_livro: e.Book?.title || e.Book?.titulo,
    }));

    return res.status(200).json(livros);
  } catch (error) {
    console.error("Erro ao buscar empréstimos ativos:", error);
    return res.status(500).json({ error: 'Erro ao buscar empréstimos ativos' });
  }
});

module.exports = router;

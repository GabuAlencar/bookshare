// clientsRoutes.js
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Borrow = require('../models/Borrow');

router.post('/clients', async (req, res) => {
  const data = req.body;

   try {  
    if (Array.isArray(data)) {  
      newClient = await Client.bulkCreate(data);
    } else {
      newClient = await Client.create(data);
    }

    res.status(201).json(newClient);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar livro' });
  }
});

router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.findAll({
      order: [['createdAt', 'DESC']], // Mais recente primeiro
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Rota para cadastrar cliente (já existente)
router.post('/clients', async (req, res) => {
  const { name, email, phone, cpf, address } = req.body;
  try {
    const newClient = await Client.create({ name, email, phone, cpf, address });
    return res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

// Rota para listar todos os clientes (já existente)
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.findAll({
      order: [['createdAt', 'DESC']], // Mais recente primeiro
    });
    return res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// === ROTA NOVA: devolve o próximo ID (maior ID + 1) ===
router.get('/clients/next-id', async (req, res) => {
  try {
    // Busca o cliente com maior ID (ORDER BY id DESC LIMIT 1)
    const lastClient = await Client.findOne({
      order: [['id', 'DESC']],
      attributes: ['id'],
    });
    const nextId = lastClient ? lastClient.id + 1 : 1;
    return res.json({ nextId });
  } catch (error) {
    console.error('Erro ao buscar próximo ID de cliente:', error);
    return res.status(500).json({ error: 'Erro ao buscar próximo ID de cliente' });
  }
});

// DELETE: Excluir um cliente
router.delete('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o cliente existe
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar se o cliente tem empréstimos pendentes
    const emprestimosPendentes = await Borrow.findAll({
      where: {
        id_usuario: id,
        status: 'pendente',
      },
    });

    if (emprestimosPendentes.length > 0) {
      return res.status(400).json({ error: 'Não é possível excluir um cliente que possui livros emprestados' });
    }

    // Excluir todos os empréstimos finalizados (devolvidos) do cliente
    // para evitar violação de chave estrangeira no banco de dados
    await Borrow.destroy({
      where: {
        id_usuario: id,
        status: 'devolvido',
      },
    });

    // Excluir o cliente
    await client.destroy();
    
    return res.status(200).json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    return res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
});

module.exports = router;

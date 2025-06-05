// clientsRoutes.js
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

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
    const clients = await Client.findAll();
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
    const clients = await Client.findAll();
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

module.exports = router;

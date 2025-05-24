const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.post('/clients', async (req, res) => {
  const { id, name, email, phone, cpf, address } = req.body;

   try {
    const newClient = await Client.create({ id, name, email, phone, cpf, address });
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

module.exports = router;

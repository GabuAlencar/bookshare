const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { Sequelize } = require("sequelize")

const SECRET = process.env.JWT_SECRET;

// ------------------------
// Rota de registro
// ------------------------
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validar campos mínimos
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Nome, e-mail e senha são obrigatórios." });
  }

  try {
    // 2. Verificar se já existe usuário com esse e-mail
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "E-mail já cadastrado. Escolha outro e-mail." });
    }

    // 3. Se não existir, criar hash da senha e inserir no BD
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hash });

    // 4. Responder com sucesso (não envie a senha)
    res
      .status(201)
      .json({ message: "Usuário registrado com sucesso", userId: newUser.id });
  } catch (error) {
    console.error("Erro no registro:", error);

    // 5. Caso o unique constraint ainda seja violado (race condition),
    //    trate o erro específico do Sequelize
    if (
      error instanceof Sequelize.UniqueConstraintError ||
      (error.errors && error.errors[0].type === "unique violation")
    ) {
      return res
        .status(400)
        .json({ error: "E-mail já cadastrado. Escolha outro e-mail." });
    }

    // 6. Para qualquer outro erro, retorne 500
    res.status(500).json({ error: "Erro interno ao registrar usuário." });
  }
});

// ------------------------
// Rota de login
// ------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. Validar campos mínimos
  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  try {
    // 2. Buscar usuário pelo e-mail
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // 3. Comparar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // 4. Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "2h" }
    );

    // 5. Retornar token
    res.json({ message: "Login bem-sucedido", token,  name: user.name});
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no login." });
  }
});

module.exports = router;
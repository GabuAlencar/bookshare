const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "Rota protegida acessada com sucesso!", user: req.user });
});

module.exports = router;

const express = require("express");
const router = express.Router();

const livrosLocacoesHandler = require("./livros_locacoes.handler");

router.get("/", async (req, res) => {
    res.json(await livrosLocacoesHandler.buscarLivrosLocacoes());
});

router.get("/:id", async (req, res) => {
    res.json(await livrosLocacoesHandler.buscarLivroLocacao(req.params.id));
});

module.exports = router;
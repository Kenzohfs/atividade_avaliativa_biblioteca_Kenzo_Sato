const express = require("express");
const router = express.Router();

const livrosAutoresHandler = require("./livros_autores.handler");

router.get("/", async (req, res) => {
    res.json(await livrosAutoresHandler.buscarLivrosAutores());
});

router.get("/:id", async (req, res) => {
    res.json(await livrosAutoresHandler.buscarLivroAutor(req.params.id));
});

router.delete("/:id", async (req, res) => {
    res.json(await livrosAutoresHandler.deletarLivroAutor(req.params.id));
});

module.exports = router;
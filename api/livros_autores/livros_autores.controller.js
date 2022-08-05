const express = require("express");
const router = express.Router();

const livrosAutoresHandler = require("./livros_autores.handler");

router.get("/", async (req, res) => {
    res.json(await livrosAutoresHandler.buscarLivrosAutores());
});

module.exports = router;
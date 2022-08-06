const express = require("express");
const router = express.Router();

const livrosHandler = require("./livros.handler");

router.get("/", async (req, res) => {
    res.json(await livrosHandler.buscarLivros());
});

router.get("/:isbn", async (req, res) => {
    res.json(await livrosHandler.buscarLivro(req.params.isbn));
})

router.post("/", async (req, res) => {
    res.json(await livrosHandler.cadastrarLivro(req.body));
})

router.put("/:isbn", async (req, res) => {
    res.json(await livrosHandler.atualizarLivro(req.params.isbn, req.body));
})

router.delete("/:isbn", async (req, res) => {
    res.json(await livrosHandler.deletarLivro(req.params.isbn));
})

module.exports = router;
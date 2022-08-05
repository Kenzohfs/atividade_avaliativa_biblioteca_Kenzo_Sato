const express = require("express");
const router = express.Router();

const livrosHandler = require("./livros.handler");

router.get("/", async (req, res) => {
    res.json(await livrosHandler.buscarLivros());
});

router.post("/", async (req, res) => {
    res.json(await livrosHandler.cadastrarLivro(req.body));
})

module.exports = router;
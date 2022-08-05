const express = require("express");
const router = express.Router();

const autoresHandler = require("./autores.handler");

router.get("/", async (req, res) => {
    res.json(await autoresHandler.buscarAutores());
});

router.post("/", async (req, res) => {
    res.json(await autoresHandler.cadastrarAutor(req.body));
});

router.delete("/:cpf", async (req, res) => {
    res.json(await autoresHandler.deletarAutor(req.params.cpf));
})

router.put("/:cpf", async(req, res) => {
    res.json(await autoresHandler.atualizarAutor(req.params.cpf, req.body));
})

module.exports = router;
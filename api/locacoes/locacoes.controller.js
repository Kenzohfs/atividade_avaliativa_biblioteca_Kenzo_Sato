const express = require("express");
const router = express.Router();

const locacoesHandler = require("./locacoes.handler");

router.get("/", async (req, res) => {
    res.json(await locacoesHandler.buscarLocacoes());
});

router.post("/", async (req, res) => {
    res.json(await locacoesHandler.cadastrarLocacao(req.body));
})

router.delete("/", async (req, res) => {
    res.json(await locacoesHandler.deletarLocacao(req.body));
})

module.exports = router;
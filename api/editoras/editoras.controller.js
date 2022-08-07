const express = require("express");
const router = express.Router();

const editorasHandler = require("./editoras.handler");

router.get("/", async (req, res) => {
    res.json(await editorasHandler.buscarEditoras());
});

router.get("/:cnpj", async (req, res) => {
    res.json(await editorasHandler.buscarEditora(req.params.cnpj));
});

router.post("/", async (req, res) => {
    res.json(await editorasHandler.cadastrarEditora(req.body));
})

router.put("/:cnpj", async (req, res) => {
    res.json(await editorasHandler.atualizarEditora(req.params.cnpj, req.body));
})

router.delete("/:cnpj", async (req, res) => {
    res.json(await editorasHandler.deletarEditora(req.params.cnpj));
})

module.exports = router;
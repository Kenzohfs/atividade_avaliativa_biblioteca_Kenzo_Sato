const express = require("express");
const router = express.Router();

const editorasHandler = require("./editoras.handler");

router.get("/", async (req, res) => {
    res.json(await editorasHandler.buscarEditoras());
});

router.post("/", async (req, res) => {
    res.json(await editorasHandler.cadastrarEditora(req.body));
})

module.exports = router;
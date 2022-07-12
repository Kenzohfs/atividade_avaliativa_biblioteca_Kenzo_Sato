const express = require("express");
const router = express.Router();

const autoresHandler = require("./autores.handler");

router.get("/", async (req, res) => {
    res.json(await autoresHandler.buscarAutores());
});

router.post("/", async (req, res) => {
    res.json(await autoresHandler.cadastrarAutor(req.body));
})

module.exports = router;
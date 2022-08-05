const express = require("express");
const router = express.Router();

const clientesHandler = require("./clientes.handler");

router.get("/", async (req, res) => {
    res.json(await clientesHandler.buscarClientes());
});

router.post("/", async (req, res) => {
    res.json(await clientesHandler.cadastrarCliente(req.body))
})

module.exports = router;
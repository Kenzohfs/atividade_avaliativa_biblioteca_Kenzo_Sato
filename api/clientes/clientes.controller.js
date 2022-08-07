const express = require("express");
const router = express.Router();

const clientesHandler = require("./clientes.handler");

router.get("/", async (req, res) => {
    res.json(await clientesHandler.buscarClientes());
});

router.get("/:cpf", async (req, res) => {
    res.json(await clientesHandler.buscarCliente(req.params.cpf));
});

router.post("/", async (req, res) => {
    res.json(await clientesHandler.cadastrarCliente(req.body))
})

router.put("/:cpf", async (req, res) => {
    res.json(await clientesHandler.atualizarCliente(req.params.cpf, req.body));
})

router.delete("/:cpf", async (req, res) => {
    res.json(await clientesHandler.deletarCliente(req.params.cpf));
})

module.exports = router;
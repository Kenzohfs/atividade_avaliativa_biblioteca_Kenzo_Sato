const express = require("express");
const router = express.Router();

const clientes = require("./api//clientes/clientes.controller");
const locacoes = require("./api/locacoes/locacoes.controller");
const livros = require("./api/livros/livros.controller");
const editoras = require("./api/editoras/editoras.controller");
const livrosAutores = require("./api/livros_autores/livros_autores.controller");
const autores = require("./api/autores/autores.controller");

router.use("/clientes", clientes);
router.use("/locacoes", locacoes);
router.use("/livros", livros);
router.use("/editoras", editoras);
router.use("/livrosAutores", livrosAutores);
router.use("/autores", autores);

module.exports = router;
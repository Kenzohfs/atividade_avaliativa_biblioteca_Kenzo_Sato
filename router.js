const express = require("express");
const router = express.Router();

const clientes = require("./api/clientes.controller");
const locacoes = require("./api/locacoes.controller");
const livros = require("./api/livros.controller");
const editoras = require("./api/editoras.controller");
const livrosAutores = require("./api/livros_autores.controller");
const autores = require("./api/autores.controller");

router.use("/clientes", clientes);
router.use("/locacoes", locacoes);
router.use("/livros", livros);
router.use("/editoras", editoras);
router.use("/livrosAutores", livrosAutores);
router.use("/autores", autores);

module.exports = router;
const crud = require("../crud");

async function buscarEditoras() {
    return crud.get("Editoras");
}

async function cadastrarEditora(editora) {
    return crud.save("Editoras", null, editora);
}

module.exports = {
    buscarEditoras,
    cadastrarEditora
}
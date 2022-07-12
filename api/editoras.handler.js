const crud = require("../crud");

async function buscarEditoras() {
    return crud.get("Editoras");
}

async function cadastrarEditora(editora) {
    return crud.save("Editoras", editora.id, editora);
}

module.exports = {
    buscarEditoras,
    cadastrarEditora
}
const crud = require('../crud');

async function buscarAutores() {
    return crud.get("Autores");
}

function cadastrarAutor(autor) {
    return crud.save("Autores", null, autor);
}

module.exports = {
    buscarAutores,
    cadastrarAutor
}
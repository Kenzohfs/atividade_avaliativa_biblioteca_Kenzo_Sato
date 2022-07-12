const crud = require('../crud');

async function buscarAutores() {
    return crud.get("Autores");
}

function cadastrarAutor(autor) {
    const id = autor.cpf;
    delete autor.cpf;
    return crud.save("Autores", id, autor);
}

module.exports = {
    buscarAutores,
    cadastrarAutor
}
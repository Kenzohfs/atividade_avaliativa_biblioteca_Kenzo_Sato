const crud = require('../crud');

async function cadastrarLivroAutor(livroAutor, idLivro) {
    livroAutor.livros_id = idLivro;

    return crud.save("Livros_Autores", null, livroAutor);
}

module.exports = {
    cadastrarLivroAutor
}
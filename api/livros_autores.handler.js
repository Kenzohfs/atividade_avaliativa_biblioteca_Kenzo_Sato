const crud = require('../crud');

async function cadastrarLivroAutor(livroAutor, isbn) {
    livroAutor.isbn = isbn;
    return crud.save("Livros_Autores", null, livroAutor)
}

module.exports = {
    cadastrarLivroAutor
}
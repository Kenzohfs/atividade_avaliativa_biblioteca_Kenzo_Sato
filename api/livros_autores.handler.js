const crud = require('../crud');

async function buscarLivrosAutores() {
    return await crud.get("Livros_Autores");
}

async function cadastrarLivroAutor(idAutor, idLivro) {
    const livro_autor = { idAutor, idLivro };
    return await crud.save("Livros_Autores", null, livro_autor);
}

module.exports = {
    buscarLivrosAutores,
    cadastrarLivroAutor
}
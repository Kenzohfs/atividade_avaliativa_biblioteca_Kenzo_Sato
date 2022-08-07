const crud = require('../../crud');

const tabelaLivrosAutores = "Livros_Autores";

async function buscarLivrosAutores() {
    return await crud.get(tabelaLivrosAutores);
}

async function buscarLivroAutor(id) {
    return { ...await crud.getById(tabelaLivrosAutores, id), id};
}

async function cadastrarLivroAutor(idAutor, idLivro) {
    const livro_autor = { autores_id: idAutor, livros_id: idLivro };
    return await crud.save(tabelaLivrosAutores, null, livro_autor);
}

async function deletarLivroAutor(id) {
    const livroAutorDeletado = await crud.remove(tabelaLivrosAutores, id);

    return livroAutorDeletado;
}

module.exports = {
    buscarLivrosAutores,
    buscarLivroAutor,
    cadastrarLivroAutor,
    deletarLivroAutor
}
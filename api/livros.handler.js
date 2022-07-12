const crud = require('../crud');
const livros_autores = require('./livros_autores.handler');

async function buscarLivros() {
    return crud.get("Livros");
}

async function cadastrarLivro(livro) {
    const autores = livro.lista_autores;
    console.log("Autores: ", autores);
    autores.forEach(async (autor) => {
        await livros_autores.cadastrarLivroAutor(autor, livro.isbn);
    });
    delete livro.lista_autores;
    return crud.save("Livros", livro.isbn, livro);
}

async function atualizarLivro(livro, locacoes_id) {
    const novoLivro = await crud.get("Livros", livro);
    novoLivro.locacoes_id = locacoes_id;
    await crud.save("Livros")
}

module.exports = {
    buscarLivros,
    cadastrarLivro,
    atualizarLivro
}
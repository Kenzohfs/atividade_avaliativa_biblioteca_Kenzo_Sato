const crud = require('../../crud');
const livros_autores = require('../livros_autores/livros_autores.handler');

const tabelaLivros = "Livros"
const tabelaLivrosAutores = "Livros_Autores"
const tabelaAutores = "Autores";
const tabelaEditoras = "Editoras";

async function buscarLivros() {
    return await crud.get(tabelaLivros);
}

async function buscarLivro(isbn) {
    const livro = await crud.returnSelect(tabelaLivros, "isbn", isbn);
    const livrosAutores = await crud.returnSelect(tabelaLivrosAutores, "livros_id", livro[0].id);
    const editora = await crud.getById(tabelaEditoras, livro[0].editoras_id);
    const dadosLivro = await crud.getById(tabelaLivros, livro[0].id)

    delete dadosLivro.editoras_id;

    const autores = []
    for (let livroAutor of livrosAutores)
        autores.push(await crud.getById(tabelaAutores, livroAutor.autores_id));

    return { id: livro[0].id, ...dadosLivro, editora, autores };
}

async function cadastrarLivro(livro) {
    const autores = livro.lista_autores;
    const novoLivro = await fazerNovoLivro(livro);

    const livroSalvo = await crud.save(tabelaLivros, null, novoLivro);

    await cadastrarLivroAutor(autores, livroSalvo.id);

    return livroSalvo;
}

async function fazerNovoLivro(livro) {
    const editora = livro.editoras_cnpj;

    delete livro.lista_autores;
    delete livro.editoras_cnpj;

    livro.editoras_id = await buscarEditoraId(editora);

    return livro;
}

async function atualizarLivro(isbn, livro) {
    const livros = await crud.returnSelect(tabelaLivros, "isbn", isbn);

    livro.isbn = isbn;
    const autores = livro.lista_autores;
    const novoLivro = await fazerNovoLivro(livro);
    const livroSalvo = await crud.save(tabelaLivros, livros[0].id, novoLivro);

    const livrosAutores = await crud.returnSelect(tabelaLivrosAutores, "livros_id", livros[0].id);
    for (let livroAutor of livrosAutores)
        await livros_autores.deletarLivroAutor(livroAutor.id)

    await cadastrarLivroAutor(autores, livroSalvo.id);

    return livroSalvo;
}

async function buscarEditoraId(editoraCnpj) {
    const editoraDado = await crud.returnSelect(tabelaEditoras, "cnpj", editoraCnpj);
    return editoraDado[0].id;
}

async function cadastrarLivroAutor(autores, idLivro) {
    for (let autor of autores) {
        const autorRef = await crud.returnSelect(tabelaAutores, "cpf", autor.cpf);
        await livros_autores.cadastrarLivroAutor(autorRef[0].id, idLivro);
    }
}

async function deletarLivro(livroIsbn) {
    const livro = await crud.returnSelect(tabelaLivros, "isbn", livroIsbn);
    const livroDeletado = await crud.remove(tabelaLivros, livro[0].id);

    const listaAutores = await crud.returnSelect(tabelaLivrosAutores, "livros_id", livro[0].id);

    for (let autor of listaAutores) {
        await crud.remove(tabelaLivrosAutores, autor.id);
    }

    return livroDeletado;
}

module.exports = {
    buscarLivros,
    buscarLivro,
    cadastrarLivro,
    atualizarLivro,
    deletarLivro
}
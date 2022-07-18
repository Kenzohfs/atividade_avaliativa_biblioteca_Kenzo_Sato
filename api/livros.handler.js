const crud = require('../crud');
const livros_autores = require('./livros_autores.handler');

async function buscarLivros() {
    return crud.get("Livros");
}

async function cadastrarLivro(livro) {
    const autores = livro.lista_autores;
    const editora = livro.editoras_nome;

    delete livro.lista_autores;
    delete livro.editoras_nome;

    /*
        falta verificação se existe os autores
        falta verificação se exite editora
    */

    livro.editoras_id = await buscarEditoraId(editora);
    const livroSalvo = await crud.save("Livros", null, livro);
    await cadastrarLivroAutor(autores, livroSalvo.id);

    return livroSalvo;
}

async function atualizarLivro(livroIsbn, locacao_id) {
    const livro = await crud.returnSelect("Livros", "isbn", livroIsbn);
    
    const livroAtualizado = await crud.save("Livros", livro[0].id, { ...livro[0], locacoes_id: locacao_id });
    return livroAtualizado;
}

async function buscarEditoraId(editoraNome) {
    const editoraDado = await crud.returnSelect("Editoras", "nome", editoraNome);
    return editoraDado[0].id;
}

async function cadastrarLivroAutor(autores, idLivro) {
    autores.forEach(async (autor) => {
        const autorRef = await crud.returnSelect("Autores", "cpf", autor.cpf);
        await livros_autores.cadastrarLivroAutor(autorRef[0].id, idLivro);
    });
}

module.exports = {
    buscarLivros,
    cadastrarLivro,
    atualizarLivro
}
const crud = require('../../crud');
const livros_autores = require('../livros_autores/livros_autores.handler');

async function buscarLivros() {
    return await crud.get("Livros");
}

async function buscarLivro(isbn) {
    const livro = await crud.returnSelect("Livros", "isbn", isbn);
    return await crud.getById("Livros", livro[0].id);
}

async function cadastrarLivro(livro) {
    const autores = livro.lista_autores;
    const editora = livro.editoras_nome;

    delete livro.lista_autores;
    delete livro.editoras_nome;

    /*
        falta verificação se existe os autores
        falta verificação se existe editora
    */

    livro.editoras_id = await buscarEditoraId(editora);
    let livroSalvo;

    if (livro.id) {
        let livroId = livro.id;
        delete livro.id;

        livroSalvo = await crud.save("Livros", livroId, livro)
    } else {
        livroSalvo = await crud.save("Livros", null, livro);
    }
    await cadastrarLivroAutor(autores, livroSalvo.id);
    return livroSalvo;
}

// Função de atualizar livro quando no livro ainda tinha status (se ele ainda estava em uma locação)
// async function atualizarLivro(livroIsbn, locacao_id) {
//     const livros = await crud.returnSelect("Livros", "isbn", livroIsbn);

//     if (await livroAlugado(livros[0])) {
//         return { erro: `O livro ${livros.titulo} já foi alugado!` }
//     }

//     const livroAtualizado = await crud.save("Livros", livros[0].id, 
//         { ...livros[0], locacoes_id: locacao_id });
//     return livroAtualizado;
// }

//function atualizar meio estranha, falta testes
async function atualizarLivro(isbn, livro) {
    const livros = await crud.returnSelect("Livros", "isbn", isbn);

    livro.id = livros[0].id;
    livro.isbn = livros[0].isbn;

    await deletarLivro(isbn);
    const livroAtualizado = await cadastrarLivro(livro);

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

async function deletarLivro(livroIsbn) {
    const livroObj = await crud.returnSelect("Livros", "isbn", livroIsbn);
    console.log(livroObj)
    crud.remove("Livros", livroObj[0].id);

    const listaAutores = await crud.returnSelect("Livros_Autores", "livro_id", livroObj[0].id);

    for (let autor of listaAutores) {
        await crud.remove("Livros_Autores", autor.id);
    }
}

module.exports = {
    buscarLivros,
    buscarLivro,
    cadastrarLivro,
    atualizarLivro,
    deletarLivro
}
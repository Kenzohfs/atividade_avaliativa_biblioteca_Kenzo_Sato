const crud = require('../crud');
const livros_autores = require('./livros_autores.handler');

async function buscarLivros() {
    return crud.get("Livros");
}

async function cadastrarLivro(livro) {
    const autores = livro.lista_autores;
    delete livro.lista_autores;

    const livroSalvo = await crud.save("Livros", null, livro);
    console.log("livrosalvo.id: ", livroSalvo.id);

    // const autoresRef = db.collection('Autores');

    autores.forEach(async (autor) => {
        // const linhaRef = autoresRef.where('cpf', '==', autor.id_autor);
        // console.log("resultado select: ", linhaRef);
        const linhaRef = await crud.returnSelect("Autores", "cpf", autor.cpf);
        await livros_autores.cadastrarLivroAutor(linhaRef.id, livroSalvo.id);
    });
    return livroSalvo;
}

async function atualizarLivro(livro, locacoes_id) {
    const novoLivro = await crud.get("Livros", livro);
    novoLivro.locacoes_id = locacoes_id;
    await crud.save("Livros");
}

module.exports = {
    buscarLivros,
    cadastrarLivro,
    atualizarLivro
}
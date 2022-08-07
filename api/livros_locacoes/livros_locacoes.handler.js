const crud = require('../../crud');

const tabelaLivrosLocacoes = "Livros_Locacoes";

async function buscarLivrosLocacoes() {
    return await crud.get(tabelaLivrosLocacoes);
}

async function buscarLivroLocacao(id) {
    return { ...await crud.getById(tabelaLivrosLocacoes, id), id};
}

async function cadastrarLivroLocacao(idLocacao, idLivro) {
    const livro_locacao = { locacoes_id: idLocacao, livros_id: idLivro };
    return await crud.save(tabelaLivrosLocacoes, null, livro_locacao);
}

async function deletarLivroLocacao(id) {
    const livroLocacaoDeletado = await crud.remove(tabelaLivrosLocacoes, id);

    return livroLocacaoDeletado;
}

module.exports = {
    buscarLivrosLocacoes,
    buscarLivroLocacao,
    cadastrarLivroLocacao,
    deletarLivroLocacao
}
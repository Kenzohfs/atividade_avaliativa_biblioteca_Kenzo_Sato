const crud = require('../crud');
const livros = require('./livros.handler');

async function buscarLocacoes() {
    return crud.get("Locacoes");
}

async function cadastrarLocacao(locacao) {
    const listaLivros = locacao.listaLivros;
    listaLivros.forEach(async livro => {
        await livros.atualizarLivro(livro);
    });
    delete locacao.listaLivros;
    //Trocar para a data do firebase
    //Talvez trocar o dado clientes_cpf do locações para uma chave secundária em clientes
    locacao.data_locacao = new Date();
    return crud.save("Locacoes", null, locacao);
}

module.exports = {
    buscarLocacoes,
    cadastrarLocacao
}
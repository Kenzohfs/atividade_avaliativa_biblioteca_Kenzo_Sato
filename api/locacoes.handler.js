const { serverTimestamp } = require('firebase/firestore/lite');

const crud = require('../crud');
const livros = require('./livros.handler');

async function buscarLocacoes() {
    return crud.get("Locacoes");
}

async function cadastrarLocacao(locacao) {
    const listaLivros = locacao.lista_livros;
    delete locacao.lista_livros;

    const cliente = await crud.returnSelect("Clientes", "cpf", locacao.clientes_cpf);

    delete locacao.clientes_cpf;
    locacao.clientes_id = cliente[0].id;
    locacao.data_locacao = serverTimestamp();

    const locacaoSalva = await crud.save("Locacoes", null, locacao);

    listaLivros.forEach(async livroIsbn => {
        await livros.atualizarLivro(livroIsbn.isbn, locacaoSalva.id);
    });
    
    return locacaoSalva;
}

module.exports = {
    buscarLocacoes,
    cadastrarLocacao
}
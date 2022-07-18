const { serverTimestamp } = require('firebase/firestore/lite');

const crud = require('../crud');
const livros = require('./livros.handler');

async function buscarLocacoes() {
    return crud.get("Locacoes");
}

async function cadastrarLocacao(locacao) {
    const clientes = await crud.returnSelect("Clientes", "cpf", locacao.clientes_cpf);
    delete locacao.clientes_cpf;

    if (await clienteTemLocacao(clientes[0])) {
        return { erro: "Client already has a rent!" }
    }
    
    locacao.clientes_id = clientes[0].id;
    locacao.data_locacao = serverTimestamp();

    const listaLivros = locacao.lista_livros;
    delete locacao.lista_livros;
    
    const locacaoSalva = await crud.save("Locacoes", null, locacao);

    listaLivros.forEach(async livroIsbn => {
        await livros.atualizarLivro(livroIsbn.isbn, locacaoSalva.id);
    });
    
    return locacaoSalva;
}

async function clienteTemLocacao(cliente) {
    console.log("cliente: ", cliente)
    const dados = await crud.returnSelect("Locacoes", "clientes_id", cliente.id);
    console.log("dados locacoes: ", dados);
    if (dados) {
        return true;
    } 
    return false;
}

module.exports = {
    buscarLocacoes,
    cadastrarLocacao
}
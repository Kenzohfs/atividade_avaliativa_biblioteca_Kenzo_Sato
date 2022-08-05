const { serverTimestamp } = require('firebase/firestore/lite');

const crud = require('../../crud');
const livros = require('../livros/livros.handler');

async function buscarLocacoes() {
    return crud.get("Locacoes");
}

async function cadastrarLocacao(locacao) {
    const clientes = await crud.returnSelect("Clientes", "cpf", locacao.clientes_cpf);
    delete locacao.clientes_cpf;

    if (await clienteTemLocacao(clientes[0]))
        return { erro: `O cliente ${clientes[0].nome} já tem um aluguel em andamento!` };

    locacao.clientes_id = clientes[0].id;
    locacao.data_locacao = serverTimestamp();

    const listaLivros = locacao.lista_livros;
    delete locacao.lista_livros;

    //trocar livro.locacoes_id para sempre ter no livro, só trocar o valor
    const livrosAlugaveis = await veriricarLivrosAlugaveis(listaLivros);

    if (livrosAlugaveis.length == 0)
        return { erro: `Não há nenhum livro disponível!` };

    const locacaoSalva = await crud.save("Locacoes", null, locacao);

    for (let livroIsbn of livrosAlugaveis)
        await livros.atualizarLivro(livroIsbn.isbn, locacaoSalva.id);

    return locacaoSalva;
}

async function clienteTemLocacao(cliente) {
    console.log("cliente: ", cliente)
    const dados = await crud.returnSelect("Locacoes", "clientes_id", cliente.id);
    console.log("dados locacoes: ", dados);
    if (dados.length > 0)
        return true;
    return false;
}

async function veriricarLivrosAlugaveis(listaLivros) {
    const livrosAlugaveis = [];

    for (let livroIsbn of listaLivros) {
        let livros = await crud.returnSelect("Livros", "isbn", livroIsbn.isbn);
        console.log(!livros[0].locacoes_id)
        if (!livros[0].locacoes_id) {
            livrosAlugaveis.push(livros[0]);
        }
    }

    return livrosAlugaveis;
}

module.exports = {
    buscarLocacoes,
    cadastrarLocacao
}
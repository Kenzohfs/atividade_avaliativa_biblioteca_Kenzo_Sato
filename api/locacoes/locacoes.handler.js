const { serverTimestamp } = require('firebase/firestore/lite');

const crud = require('../../crud');
const livrosLocacoes = require("../livros_locacoes/livros_locacoes.handler")

const statusAberto = "ABERTO";
const tabelaLocacoes = "Locacoes";
const tabelaClientes = "Clientes"
const tabelaLivrosLocacoes = "Livros_Locacoes";
const tabelaLivros = "Livros";


async function buscarLocacoes() {
    return await crud.get(tabelaLocacoes);
}

async function buscarLocacao(id) {
    const locacao = await crud.getById(tabelaLocacoes, id);
    const livrosLocacoesDados = await crud.returnSelect(tabelaLivrosLocacoes, "locacoes_id", id);
    const cliente = await crud.getById(tabelaClientes, locacao.clientes_id);

    delete locacao.clientes_id;

    const livros = [];

    for (let livroLocacaoDado of livrosLocacoesDados)
        livros.push(await crud.getById(tabelaLivros, livroLocacaoDado.livros_id));

    return { id, cliente, ...locacao, livros };
}

async function cadastrarLocacao(locacao) {
    const clientes = await crud.returnSelect(tabelaClientes, "cpf", locacao.clientes_cpf);
    delete locacao.clientes_cpf;

    if (clientes.length == 0)
        return { erro: `Cliente inválido!` }
        
    if (await clienteTemLocacao(clientes[0]))
        return { erro: `O cliente ${clientes[0].nome} já tem um aluguel em andamento!` };

    locacao.clientes_id = clientes[0].id;
    locacao.data_locacao = serverTimestamp();
    locacao.status = statusAberto;

    const listaLivros = locacao.lista_livros;
    delete locacao.lista_livros;

    if (await livrosInvalido(listaLivros))
        return { erro: `Há livros inválidos!` }

    const livrosAlugaveis = await veriricarLivrosAlugaveis(listaLivros);

    if (livrosAlugaveis.length == 0)
        return { erro: `Não há nenhum livro disponível!` };

    const locacaoSalva = await crud.save(tabelaLocacoes, null, locacao);

    for (let livro of livrosAlugaveis)
        await crud.save(tabelaLivrosLocacoes, null, { livros_id: livro.id, locacoes_id: locacaoSalva.id });

    return locacaoSalva;
}

async function livrosInvalido(listaLivros) {
    for (let livro of listaLivros) {
        let livroDado = await crud.returnSelect(tabelaLivros, "isbn", livro.isbn);
        if (livroDado.length == 0)
            return true;
    }
    return false;
}

async function atualizarLocacao(id, status) {
    const locacao = await crud.getById(tabelaLocacoes, id);
    locacao.status = status;

    return await crud.save(tabelaLocacoes, id, locacao);
}

async function clienteTemLocacao(cliente) {
    const locacoes = await crud.returnSelect(tabelaLocacoes, "clientes_id", cliente.id);

    for (let locacao of locacoes) {
        if (locacao.status == statusAberto) {
            return true;
        }
    }
    return false;
}

async function veriricarLivrosAlugaveis(listaLivros) {
    const livrosAlugaveis = [];

    for (let livroIsbn of listaLivros) {
        const livro = await crud.returnSelect(tabelaLivros, "isbn", livroIsbn.isbn);

        const livros_locacoes = await crud.returnSelect(tabelaLivrosLocacoes, "livros_id", livro[0].id);

        if (!(await livroEstaAlugado(livros_locacoes))) {
            livrosAlugaveis.push(livro[0]);
        }
    }

    return livrosAlugaveis;
}

async function livroEstaAlugado(livros_locacoes) {
    let livroEstaAlugado = false;

    for (let livro_locacao of livros_locacoes) {
        const locacao = await crud.getById(tabelaLocacoes, livro_locacao.locacoes_id);

        if (locacao.status == statusAberto)
            livroEstaAlugado = true;
    }

    return livroEstaAlugado;
}

async function deletarLocacao(id) {
    const livros_locacoes = await crud.returnSelect(tabelaLivrosLocacoes, "locacoes_id", id);

    for (let livro_locacao of livros_locacoes)
        await livrosLocacoes.deletarLivroLocacao(livro_locacao.id);

    return await crud.remove(tabelaLocacoes, id);
}

module.exports = {
    buscarLocacoes,
    buscarLocacao,
    cadastrarLocacao,
    atualizarLocacao,
    deletarLocacao
}
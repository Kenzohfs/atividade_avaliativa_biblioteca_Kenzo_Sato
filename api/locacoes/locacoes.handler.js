const { serverTimestamp } = require('firebase/firestore/lite');

const crud = require('../../crud');

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
    locacao.status = "ABERTO";

    const listaLivros = locacao.lista_livros;
    delete locacao.lista_livros;

    const livrosAlugaveis = await veriricarLivrosAlugaveis(listaLivros);

    if (livrosAlugaveis.length == 0)
        return { erro: `Não há nenhum livro disponível!` };

    const locacaoSalva = await crud.save("Locacoes", null, locacao);

    for (let livro of livrosAlugaveis)
        await crud.save("Livros_Locacoes", null, { livros_id: livro.id, locacoes_id: locacaoSalva.id });

    return locacaoSalva;
}

async function clienteTemLocacao(cliente) {
    // console.log("cliente: ", cliente)
    const locacoes = await crud.returnSelect("Locacoes", "clientes_id", cliente.id);
    // console.log("dados locacoes: ", locacoes);
    for (let locacao of locacoes) {
        if (locacao.status == "ABERTO") {
            console.log("if true locações")
            return true;
        }
    }
    console.log("if false locações")
    return false;
}

async function veriricarLivrosAlugaveis(listaLivros) {
    const livrosAlugaveis = [];

    for (let livroIsbn of listaLivros) {
        const livro = await crud.returnSelect("Livros", "isbn", livroIsbn.isbn);
        console.log("livro: ", livro);

        const livros_locacoes = await crud.returnSelect("Livros_Locacoes", "livros_id", livro[0].id);
        console.log("livros_locacoes: ", livros_locacoes);

        if (!(await livroEstaAlugado(livros_locacoes))) {
            livrosAlugaveis.push(livro[0]);
        }
    }

    return livrosAlugaveis;
}

async function livroEstaAlugado(livros_locacoes) {
    let livroEstaAlugado = false;

    for (let livro_locacao of livros_locacoes) {
        console.log("for livros_locacoes");
        console.log(livro_locacao);
        const locacao = await crud.getById("Locacoes", livro_locacao.locacoes_id);
        console.log("livro_locacao.locacoes_id", livro_locacao.locacoes_id);
        console.log("locacao: ", locacao);

        if (locacao.status == "ABERTO")
            livroEstaAlugado = true;
    }

    return livroEstaAlugado;
}

module.exports = {
    buscarLocacoes,
    cadastrarLocacao
}
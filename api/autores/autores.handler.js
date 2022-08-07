const crud = require('../../crud');

const tabelaAutores = "Autores";

async function buscarAutores() {
    return await crud.get(tabelaAutores);
}

async function buscarAutor(cpf) {
    const autores = await crud.returnSelect(tabelaAutores, "cpf", cpf); 
    return autores[0];
}

async function cadastrarAutor(autor) {
    if (!(autor.cpf && autor.nome && autor.sobrenome))
        return { erro: `Para cadastrar um autor é preciso que tenha um CPF, nome e sobrenome!` }
        
    if (await cpfValido(autor.cpf))
        return await crud.save(tabelaAutores, null, autor);
    return { erro: `CPF inválido!` }
}

async function cpfValido(cpf) {
    const autores = await crud.returnSelect(tabelaAutores, "cpf", cpf);

    if (autores.length == 0) 
        return true;
    return false;
}

async function deletarAutor(autorCpf) {
    const autor = await crud.returnSelect(tabelaAutores, "cpf", autorCpf);
    return await crud.remove(tabelaAutores, autor[0].id);
}

async function atualizarAutor(autorCpf, autorAtualizado) {
    const autores = await crud.returnSelect(tabelaAutores, "cpf", autorCpf);
    const id = autores[0].id;

    autorAtualizado.cpf = autores[0].cpf;

    return await crud.save(tabelaAutores, id, autorAtualizado);
}

module.exports = {
    buscarAutores,
    buscarAutor,
    cadastrarAutor,
    deletarAutor,
    atualizarAutor
}
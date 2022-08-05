const crud = require('../../crud');

async function buscarAutores() {
    return crud.get("Autores");
}

async function cadastrarAutor(autor) {
    return crud.save("Autores", null, autor);
}

async function deletarAutor(autorCpf) {
    const autor = await crud.returnSelect("Autores", "cpf", autorCpf);
    console.log("autor ", autor);
    return await crud.remove("Autores", autor[0].id);
}

async function atualizarAutor(autorCpf, autorAtualizado) {
    const autor = await crud.returnSelect("Autores", "cpf", autorCpf);
    autorAtualizado.id = autor[0].id;
    autorAtualizado.cpf = autor[0].cpf;
    return await crud.save("Autores", autorAtualizado.id, autorAtualizado);
}

module.exports = {
    buscarAutores,
    cadastrarAutor,
    deletarAutor,
    atualizarAutor
}
const crud = require('../crud');

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

module.exports = {
    buscarAutores,
    cadastrarAutor,
    deletarAutor
}
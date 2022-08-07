const crud = require('../../crud');

const tabelaEditoras = "Editoras"

async function buscarEditoras() {
    return crud.get(tabelaEditoras);
}

async function buscarEditora(cnpj) {
    const editoras = await crud.returnSelect(tabelaEditoras, "cnpj", cnpj); 
    return editoras[0];
}

async function cadastrarEditora(editora) {
    if (!(editora.cnpj && editora.nome))
        return { erro: `Para cadastrar uma editora é preciso que tenha um CNPJ e nome!` }

    if (await cnpjValido(editora.cnpj))
        return crud.save(tabelaEditoras, null, editora);
    return { erro: `CNPJ inválido!` }
}

async function cnpjValido(cnpj) {
    const editoras = await crud.returnSelect(tabelaEditoras, "cnpj", cnpj);

    if (editoras.length == 0) 
        return true;
    return false;
}

async function deletarEditora(cnpj) {
    const editoras = await crud.returnSelect(tabelaEditoras, "cnpj", cnpj);
    return await crud.remove(tabelaEditoras, editoras[0].id);
}

async function atualizarEditora(cnpj, editoraAtualizada) {
    const editoras = await crud.returnSelect(tabelaEditoras, "cnpj", cnpj);
    const id = editoras[0].id;

    editoraAtualizada.cnpj = cnpj;

    return await crud.save(tabelaEditoras, id, editoraAtualizada);
}

module.exports = {
    buscarEditoras,
    buscarEditora,
    cadastrarEditora,
    deletarEditora,
    atualizarEditora
}
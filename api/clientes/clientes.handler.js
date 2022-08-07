const crud = require('../../crud');

const tabelaClientes = "Clientes";

async function buscarClientes() {
    return crud.get("Clientes");
}

async function buscarCliente(cpf) {
    const clientes = await crud.returnSelect(tabelaClientes, "cpf", cpf); 
    return clientes[0];
}

async function cadastrarCliente(cliente) {
    if (!(cliente.cpf && cliente.nome && cliente.sobrenome))
        return { erro: `Para cadastrar um cliente é preciso que tenha um CPF, nome e sobrenome!` }

    if (await cpfValido(cliente.cpf))
        return crud.save(tabelaClientes, null, cliente);
    return { erro: `CPF inválido!` }
}

async function cpfValido(cpf) {
    const clientes = await crud.returnSelect(tabelaClientes, "cpf", cpf);

    if (clientes.length == 0) 
        return true;
    return false;
}

async function deletarCliente(cpf) {
    const clientes = await crud.returnSelect(tabelaClientes, "cpf", cpf);
    return await crud.remove(tabelaClientes, clientes[0].id);
}

async function atualizarCliente(cpf, clienteAtualizado) {
    const clientes = await crud.returnSelect(tabelaClientes, "cpf", cpf);
    const id = clientes[0].id;

    clienteAtualizado.cpf = cpf;

    return await crud.save(tabelaClientes, id, clienteAtualizado);
}

module.exports = {
    buscarClientes,
    buscarCliente,
    cadastrarCliente,
    deletarCliente,
    atualizarCliente
}
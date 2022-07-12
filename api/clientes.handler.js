const crud = require('../crud');

async function buscarClientes() {
    return crud.get("Clientes");
}

async function cadastrarCliente(cliente) {
    const id = cliente.cpf;
    delete cliente.cpf;
    return crud.save("Clientes", id, cliente);
}

module.exports = {
    buscarClientes,
    cadastrarCliente
}
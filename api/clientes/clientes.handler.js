const crud = require('../../crud');

async function buscarClientes() {
    return crud.get("Clientes");
}

async function cadastrarCliente(cliente) {
    return crud.save("Clientes", null, cliente);
}

module.exports = {
    buscarClientes,
    cadastrarCliente
}
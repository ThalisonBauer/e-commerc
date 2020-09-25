const db = require('./db');

const Cliente = db.sequelize.define('clientes', {
    nameCliente: {
        type: db.Sequelize.STRING
    },
    phoneCliente: {
        type: db.Sequelize.STRING
    },
    emailCliente: {
        type: db.Sequelize.STRING
    },
    passwordCliente: {
        type: db.Sequelize.STRING
    },
    nameBD: {
        type: db.Sequelize.STRING
    }
});

module.exports = ('clientes', Cliente);
//Cliente.sync({ force: true });
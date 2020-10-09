var mysql      = require('mysql');
const Sequelize = require('sequelize');
var connection;

function openDB() {
    connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
  });
  }

const sequelize = new Sequelize('myapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
function createDB (nameBD) {
    openDB();
    connection.connect();
    connection.query('CREATE DATABASE '+nameBD+'');
}

module.exports = {
    createDB,
    Sequelize: Sequelize,
    sequelize: sequelize
}
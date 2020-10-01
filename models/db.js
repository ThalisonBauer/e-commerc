var mysql      = require('mysql');
var connection;
function openDB() {
  connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});
}
const Sequelize = require('sequelize');
const sequelize = new Sequelize('myapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

function createDB(name) {
    openDB();
    connection.connect();
    connection.query('CREATE DATABASE IF NOT EXISTS '+name+'');
        connection.end();
}
var name = "ticssso";
createDB(name);
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
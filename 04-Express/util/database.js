const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-compleat', 'root', 'dupa.8', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
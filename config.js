const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('expertez', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const testConnection = async() => {

    try {
        await sequelize.authenticate();
        console.log('DB Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sequelize = new Sequelize('expertez', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.TEXT
    },
    senderId: {
        type: DataTypes.INTEGER
    },
    recieverId: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },

}, { timestamps: false });

// sequelize.sync();

// exports.default = Chat;
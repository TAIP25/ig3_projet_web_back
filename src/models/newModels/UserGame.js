const Sequelize = require('sequelize');

const sequelize = require('../../database/sequelize');

const UserGame = sequelize.define('UserGame', {
    userGameId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'userId'
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    userMoney: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0
    },
    userToken: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = UserGame;
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
    userGameName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    userGameCropLimit: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 100
    },
    userGameMoney: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0
    },
    userGameToken: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0
    },
    userGameLastRequest: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.NOW
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = UserGame;
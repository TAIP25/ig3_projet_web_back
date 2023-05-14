const Sequelize = require('sequelize');

const sequelize = require('../database/sequelize');

const UserStat = sequelize.define('UserStat', {
    userStatId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    statId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        references: {
            model: 'Stat',
            key: 'statId'
        }
    },
    userGameId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        references: {
            model: 'UserGame',
            key: 'userGameId'
        }
    },
    statValue: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = UserStat;




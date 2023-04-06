const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const UserStat = sequelize.define('UserStat', {
    userStatId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    statId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        reference: {
            model: 'Stat',
            key: 'statId'
        }
    },
    userGameId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        reference: {
            model: 'UserGame',
            key: 'userGameId'
        }
    },
    statValue: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = UserStat




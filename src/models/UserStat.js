const Sequelize = require('sequelize')
//const validator = require('validator')

const db = require('../../../database/sequelize')
const User = require('./User')
const Stats = require('./Stat')

const UserStat = db.define('UserStat', {
    userStatsId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    statsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        reference: {
            model: Stat,
            key: 'statsId'
        }
    },
    userGameId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        reference: {
            model: UserGame,
            key: 'userGameId'
        }
    },
    statsValue: {
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

UserGame.hasMany(UserStat, {foreignKey: 'userGameId'})
Stat.hasMany(UserStat, {foreignKey: 'statsId'})

module.exports = UserStat




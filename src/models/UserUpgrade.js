const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const UserUpgrade = sequelize.define('UserUpgrade', {
    userUpgradeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userGameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: 'UserGame',
            key: 'userGameId'
        }
    },
    upgradeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: 'Upgrade',
            key: 'upgradeId'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = UserUpgrade
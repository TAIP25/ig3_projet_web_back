const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const Upgrade = sequelize.define('Upgrade', {
    upgradeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: 'UserUpgrade',
            key: 'upgradeId'
        }
    },
    upgradeTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'UpgradeType',
            key: 'upgradeTypeId'
        }
    },
    upgradeName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    upgradeLevelRequired: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            min: 0
        }
    },
    upgradeGrade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            min: 0
        }
    },
    upgradePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            min: 0
        }
    },
    upgradeDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            len: [0, 255]
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Upgrade
const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const UpgradeType = sequelize.define('UpgradeType', {
    upgradeTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: 'Upgrade',
            key: 'upgradeTypeId'
        }
    },
    upgradeTypeName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    upgradeTypePriceType: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = UpgradeType
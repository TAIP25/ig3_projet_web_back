const Sequelize = require('sequelize');

const sequelize = require('../database/sequelize');

const Upgrade = sequelize.define('Upgrade', {
    upgradeId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        references: {
            model: 'UserUpgrade',
            key: 'upgradeId'
        }
    },
    upgradeTypeId: {
        type: Sequelize.UUID,
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
        unique: false
    },
    upgradeGrade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    upgradePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    upgradeDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Upgrade;
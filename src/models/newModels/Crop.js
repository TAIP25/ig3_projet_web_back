const Sequelize = require('sequelize');

const sequelize = require('../../database/sequelize');

const Crop = sequelize.define('Crop', {
    cropId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        references: {
            model: 'UserCrop',
            key: 'cropId'
        }
    },
    cropName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cropPNGName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cropTier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    cropMoneyPrice: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false
    },
    cropTokenPrice: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false
    },
    cropMoneyEarning: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false
    },
    cropAmountEarningOneToken: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Crop;
/*
const Sequelize = require('sequelize');

const sequelize = require('../../database/sequelize');

const CropType = sequelize.define('CropType', {
    cropTypeId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        references: {
            model: 'Crop',
            key: 'cropTypeId'
        }
    },
    cropTypeName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cropTypeLevelRequired: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    cropTypePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    cropTypeEarnings: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    cropTypeExperience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    cropTypeTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    cropTypeDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: "No description"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = CropType;
*/
const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const CropType = sequelize.define('CropType', {
    cropTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
        unique: false,
        validate: {
            min: 0
        }
    },
    cropTypePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            min: 0
        }
    },
    cropTypeEarnings: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            min: 0
        }
    },
    cropTypeExperience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            min: 0
        }
    },
    cropTypeTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validator: {
            min: 0
        }
    },
    cropTypeDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: "No description" /*,
        validate: {
            len: [0, 100]
        }
        */
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = CropType
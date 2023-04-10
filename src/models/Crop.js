const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const Crop = sequelize.define('Crop', {
    cropId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Plot',
            key: 'plotId'
        }
    },
    cropTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: 'CropType',
            key: 'cropTypeId'
        }
    },
    cropLocX: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    cropLocY: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Crop
const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const CropType = sequelize.define('CropType', {
    cropTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cropTypeName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cropTypePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0
    },
    cropTypeTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    }
})

module.exports = CropType
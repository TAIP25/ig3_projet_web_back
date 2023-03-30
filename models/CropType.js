const Sequelize = require('sequelize');
//const validator = require('validator');

const db = require('../database/sequelize')

const CropType = db.define('CropType', {
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
});
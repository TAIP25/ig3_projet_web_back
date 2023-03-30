const Sequelize = require('sequelize');
//const validator = require('validator');

const db = require('../database/sequelize')

const Crop = db.define('Crop', {
    cropId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    },
    cropType: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: CropType,
            key: 'cropTypeName'
        }
    },
    cropStage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 3
        }
    },
    cropTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 1,
            max: 100
        }
    }
});
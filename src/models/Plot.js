const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const Plot = sequelize.define('Plot', {
    plotId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'userId'
        }
    },
    plotWidth: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    plotHeight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    plotHaste: {
        type: Sequelize.FLOAT,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    plotEfficiency: {
        type: Sequelize.FLOAT,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    plotBoost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    }
})

module.exports = Plot


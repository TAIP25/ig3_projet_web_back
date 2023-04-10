const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const Plot = sequelize.define('Plot', {
    plotId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: 'UserGame',
            key: 'userGameId'
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
    plotSpeed: {
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
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Plot


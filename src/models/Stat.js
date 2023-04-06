const Sequelize = require('sequelize');
//const validator = require('validator');

const db = require('../../../database/sequelize')

const Stat = db.define('Stat', {
    statsId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    statsName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    statsType: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        
    },
    statsDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: "No description",
        validate: {
            len: [0, 100]
        }
    },
    statsCreatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    statsUpdatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    statsDeletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
        defaultValue: null
    }
})

module.exports = Stat

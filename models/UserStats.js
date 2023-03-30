const Sequelize = require('sequelize');
//const validator = require('validator');

const db = require('../database/sequelize')

const User = db.define('UserStats', {
    userStatsId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    statsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        reference: {
            model: Stats,
            key: 'statsId'
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        reference: {
            model: User,
            key: 'userId'
        }
    },
    statsValue: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
});

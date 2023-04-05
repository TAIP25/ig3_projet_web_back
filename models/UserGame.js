const Sequelize = require('sequelize');
//const validator = require('validator');

const db = require('../database/sequelize')

const UserGame = db.define('UserGame', {
    userGameId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        reference: {
            model: User,
            key: 'userId'
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false /*,
        // Vérifier ce paramètre avant de l'activer
        validate: {
            len: [3, 20]
        }
        */
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 1 /*,
        validate: {
            min: 1,
            max: 10
        }
        */
    },
    experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0 /*,
        validate: {
            min: 0,
            max: 100
        }
        */
    },
    gold: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    gems: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
});

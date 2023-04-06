const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const UserGame = sequelize.define('UserGame', {
    userGameId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'User',
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
            min: 0
        }
        */
    },
    gold: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0 /*,
        validate: {
            min: 0
        }
        */
    },
    gem: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false,
        defaultValue: 0 /*,
        validate: {
            min: 0
        }
        */
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = UserGame
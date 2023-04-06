const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const User = sequelize.define('User', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
            model: 'UserGame',
            key: 'userGameId'
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true /*,
        // Vérifier ce paramètre avant de l'activer
        validate: {
            isEmail: true
        }
        */
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false /*,
        // Est ce le hashage du mot de passe ou le mot de passe en clair ?
        validate: {
            len: [8, 20]
            isHashed: true
        }
        */
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false
    },
    userCreatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    userUpdatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    userDeletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
        defaultValue: null
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = User
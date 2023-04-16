const Sequelize = require('sequelize');

const sequelize = require('../database/sequelize');

const User = sequelize.define('User', {
    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        references: {
            model: 'UserGame',
            key: 'userGameId'
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false
    },
    userCreatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    userUpdatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = User;
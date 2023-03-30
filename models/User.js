const Sequelize = require('sequelize');
//const validator = require('validator');

const db = require('../database/sequelize')

const User = db.define('User', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
        // Est ce le hashage du mot de passe ou le mot de passe en clair ?
        /*validate: {
            len: [8, 20]
            isHashed: true
        }*/
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
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
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false
    }
});

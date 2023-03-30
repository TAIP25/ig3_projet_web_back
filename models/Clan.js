const Sequelize = require('sequelize');
//const validator = require('validator');

const db = require('../database/sequelize')

const User = db.define('Clan', {
    clanId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    leaderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'userId'
        }
    },
    clanName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    clanLevel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
            min: 1,
            max: 10
        }
    },
    clanDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: "No description",
        validate: {
            len: [0, 100]
        }
    },
    clanCreatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    clanUpdatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    clanDeletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
        defaultValue: null
    }
});

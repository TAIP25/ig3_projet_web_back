const Sequelize = require('sequelize');
//const validator = require('validator');

const db = require('../database/sequelize')

const UserClan = db.define('UserClan', {
    userClanId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    clanId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        reference: {
            model: Clan,
            key: 'clanId'
        }
    },
    levelPermission: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 1,
        validate: {
            min: 1,
            max: 3
        }
    },
    userClanCreatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    decrepated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false
    }
});

/*
const MyModel = sequelize.define('MyModel', {
  attribute1: { type: DataTypes.STRING, unique: 'compositeIndex' },
  attribute2: { type: DataTypes.STRING, unique: 'compositeIndex' },
  attribute3: { type: DataTypes.INTEGER }
}, {
  indexes: [
    {
      unique: true,
      fields: ['attribute1', 'attribute2'],
      name: 'compositeIndex'
    }
  ]
});
*/

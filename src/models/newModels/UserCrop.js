const Sequelize = require('sequelize');

const sequelize = require('../../database/sequelize');

const UserCrop = sequelize.define('UserCrop', {
    userCropId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userGameId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'UserGame',
            key: 'userGameId'
        }
    },
    cropId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        references: {
            model: 'Crop',
            key: 'cropId'
        }
    },
    userCropQuantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = UserCrop;
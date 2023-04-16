const Sequelize = require('sequelize');

const sequelize = require('../database/sequelize');

const Crop = sequelize.define('Crop', {
    cropId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    plotId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'Plot',
            key: 'plotId'
        }
    },
    cropTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        references: {
            model: 'CropType',
            key: 'cropTypeId'
        }
    },
    cropLocX: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cropLocY: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Crop;
const Sequelize = require('sequelize');

const sequelize = require('../../database/sequelize');

const Stat = sequelize.define('Stat', {
    statId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        references: {
            model: 'UserStat',
            key: 'statId'
        }
    },
    statName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    statDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: "Pas de description"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Stat;
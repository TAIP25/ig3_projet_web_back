const Sequelize = require('sequelize')

const sequelize = require('../database/sequelize')

const Stat = sequelize.define('Stat', {
    statId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
        defaultValue: "No description" /*,
        validate: {
            len: [0, 100]
        }
        */
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Stat


const User = require('./User');
const UserGame = require('./UserGame');
const UserStat = require('./UserStat');
const UserCrop = require('./UserCrop');
const Stat = require('./Stat');
const Crop = require('./Crop');

// User one or zero -- 1 UserGame: "plays with"
UserGame.belongsTo(User, { foreignKey: 'userGameId' });
User.hasOne(UserGame, { foreignKey: 'userGameId' });

// UserGame 0+ -- 1 UserStat: "has"
UserStat.belongsTo(UserGame, { foreignKey: 'userGameId' });
UserGame.hasMany(UserStat, { foreignKey: 'userGameId' });

// UserGame 0+ -- 1 UserCrop: "owns"
UserCrop.belongsTo(UserGame, { foreignKey: 'userGameId' });
UserGame.hasMany(UserCrop, { foreignKey: 'userGameId' });

// UserStat 1 -- 0+ Stat: "relates to"
Stat.hasMany(UserStat, { foreignKey: 'statId' });
UserStat.belongsTo(Stat, { foreignKey: 'statId' });

// UserCrop 1 -- 0+ Crop: "relates to"
Crop.hasMany(UserCrop, { foreignKey: 'cropId' });
UserCrop.belongsTo(Crop, { foreignKey: 'cropId' });


module.exports = {
    User,
    UserGame,
    UserStat,
    UserCrop,
    Stat,
    Crop
};
const User = require('./User')
const UserGame = require('./UserGame')
const UserStat = require('./UserStat')
const Stat = require('./Stat')
const Plot = require('./Plot')
const Crop = require('./Crop')
const CropType = require('./CropType')
const UserUpgrade = require('./UserUpgrade')
const Upgrade = require('./Upgrade')
const UpgradeType = require('./UpgradeType')

//Probleme foreign key
//User one or zero -- 1 UserGame: "plays"
UserGame.belongsTo(User, { foreignKey: 'userId' })
User.hasOne(UserGame, { foreignKey: 'userId' })

//Stat 0+ -- 1 UserStat: "relates to"
UserStat.belongsTo(Stat, { foreignKey: 'statId' })
Stat.hasMany(UserStat, { foreignKey: 'statId' })

//Probleme foreign key
//UserGame 1 -- 1 Plot: "owns"
Plot.belongsTo(UserGame, { foreignKey: 'userGameId' })
UserGame.hasOne(Plot, { foreignKey: 'userGameId' })

//CropType 0+ -- 1 Crop: "has"
Crop.belongsTo(CropType, { foreignKey: 'cropTypeId' })
CropType.hasMany(Crop, { foreignKey: 'cropTypeId' })

//UserGame 0+ -- 1 UserStat: "has"
UserStat.belongsTo(UserGame, { foreignKey: 'userGameId' })
UserGame.hasMany(UserStat, { foreignKey: 'userGameId' })

//Plot 0+ -- 1 Crop: "contains"
Crop.belongsTo(Plot, { foreignKey: 'plotId' })
Plot.hasMany(Crop, { foreignKey: 'plotId' })

//UpgradeType 0+ -- 1 Upgrade: "relates to"
Upgrade.belongsTo(UpgradeType, { foreignKey: 'upgradeTypeId' })
UpgradeType.hasMany(Upgrade, { foreignKey: 'upgradeTypeId' })

//UserGame 0+ -- 1 UserUpgrade: "has"
UserUpgrade.belongsTo(UserGame, { foreignKey: 'userGameId' })
UserGame.hasMany(UserUpgrade, { foreignKey: 'userGameId' })

//Upgrade 0+ -- 1 UserUpgrade: "has"
UserUpgrade.belongsTo(Upgrade, { foreignKey: 'upgradeId' })
Upgrade.hasMany(UserUpgrade, { foreignKey: 'upgradeId' })
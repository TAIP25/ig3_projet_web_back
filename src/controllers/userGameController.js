const { UserGame, Crop, UserCrop } = require('../models/newModels/index');
const Sequelize = require('sequelize');

const tick = 6000;

const differenceTick = (lastRequest, date) => {
    return Math.floor((date - lastRequest)/tick);
}

const leftTick = (lastRequest, date) => {
    return (date - lastRequest) - differenceTick(lastRequest, date)*tick;
}

const calcMoneyEarnedPerTick = (crops) => {
    return crops.reduce((acc, crop) => {
        return acc + crop.cropMoneyEarning * crop.userCropQuantity;
    }, 0);
}

const calcTokenEarnedPerTick = (crops) => {
    return crops.reduce((acc, crop) => {
        return acc + Math.floor(crop.userCropQuantity / crop.cropAmountEarningOneToken) ;
    }, 0);
}

const getAllCrops = (userGame) => {
    return Crop.findAll({
        attributes: [
            'cropName',
            'cropPNGName',
            'cropTier',
            'cropMoneyPrice',
            'cropTokenPrice',
            'cropMoneyEarning',
            'cropAmountEarningOneToken'
        ],
        include: [
            {
                model: UserCrop,
                attributes: [
                    'userCropQuantity'
                ],
                where: {
                    userGameId: userGame.userGameId
                }
            }
        ]
    })
    .then(crops => {
        const cropsData = crops.map(crop => {
            const { cropName, cropPNGName, cropTier, cropMoneyPrice, cropTokenPrice, cropMoneyEarning, cropAmountEarningOneToken, UserCrops } = crop.dataValues;
            const { userCropQuantity } = UserCrops[0].dataValues;
            return {
                cropName,
                cropPNGName,
                cropTier,
                cropMoneyPrice,
                cropTokenPrice,
                cropMoneyEarning,
                cropAmountEarningOneToken,
                userCropQuantity
            };
        });
        return cropsData;
    })
    .catch(err => {
        return Promise.reject({
            code: 500,
            severity: "error",
            result: "Erreur lors de la récupération des crops"
        });
    });
}

const calcAmountCrop = (userGame) => {
    return UserCrop.findOne({
        attributes: [
            'userGameId',
            [Sequelize.fn('SUM', Sequelize.col('userCropQuantity')), 'total']
        ],
        where: {
            userGameId: userGame.userGameId
        },
        group: ['UserCrop.userGameId']
    })
    .then(result => {
        if(!result || result.dataValues.total === null){
            return 0;
        }
        return parseInt(result.dataValues.total);
    })
    .catch(err => {
        return err;
    });
}

exports.updateUserGame = (req, res, next) => {
    UserGame.findByPk(req.userId)
    .then(userGame => {
        if(!userGame){
            return Promise.reject({
                code: 400,
                severity: "error",
                result: "Utilisareur en jeu non trouvé"
            });
        }
        return userGame;
    })
    .then(userGame => {
        return getAllCrops(userGame)
        .then(crops => {
            return {
                userGame: userGame,
                crops: crops
            };
        });
    })
    .then(result => {
        const date = Date.now();
        const moneyEarnedPerTick = calcMoneyEarnedPerTick(result.crops);
        const tokenEarnedPerTick = calcTokenEarnedPerTick(result.crops);

        return Promise.all([moneyEarnedPerTick, tokenEarnedPerTick])
        .then( () => {
            result.userGame.userGameMoney = parseInt(result.userGame.userGameMoney) + differenceTick(new Date(result.userGame.userGameLastRequest), date)*moneyEarnedPerTick;
            result.userGame.userGameToken = parseInt(result.userGame.userGameToken) + differenceTick(new Date(result.userGame.userGameLastRequest), date)*tokenEarnedPerTick;
            result.userGame.userGameLastRequest = parseInt(date - leftTick(new Date(result.userGame.userGameLastRequest), date));
            return result.userGame.save().then( userGame => {
                return {
                    userGame: userGame,
                    crops: result.crops
                };
            });
        });
    })
    .then(result => {
        return calcAmountCrop(result.userGame).then(amountCrop => {
            return {
                userGame: result.userGame,
                crops: result.crops,
                amountCrop: amountCrop
            };
        });
    })
    .then(result => {
        // Si la requête est une requête POST alors il se comporte comme un middleware
        if(req.method === "POST"){
            
            // On ajoute les données à la requête
            req.locals = {
                money: result.userGame.dataValues.userGameMoney,
                token: result.userGame.dataValues.userGameToken,
                amountCrop: result.amountCrop,
                crops: result.crops
            };
            
            next();
        }
        // Sinon on renvoie une réponse
        else if(req.method === "PUT"){
            const currentTick = leftTick(new Date(result.userGame.userGameLastRequest), Date.now());
            return res.status(200).json({
                severity: "success",
                result: "Utilisateur en jeu mis à jour",
                money: result.userGame.dataValues.userGameMoney,
                token: result.userGame.dataValues.userGameToken,
                amountCrop: result.amountCrop,
                crops: result.crops,
                currentTick: currentTick
            });
        }
    })
    .catch(err => {
        if(err.code !== undefined){
            return res.status(err.code).json({
                severity: err.severity,
                result: err.result
            });
        }
        // Si l'erreur n'est pas gérée alors on renvoie une erreur interne du serveur
        // TODO: Ajouter un système de log pour enregistrer les erreurs dans un fichier
        console.log(err);
        console.log(err.name);
        return res.status(500).json({
            severity: "error",
            result: "Erreur interne du serveur, veuillez réessayer"
        });
    });
}

exports.upgradeUserGame = (req, res, next) => {
    UserGame.findByPk(req.userId)
    .then(userGame => {
        if(!userGame){
            return res.status(400).json({
                severity: "error",
                result: "Utilisareur en jeu non trouvé"
            });
        }
        return userGame;
    })
    .then(userGame => {
        if(req.body.tier === undefined || req.body.amount === undefined || req.body.tier === null || req.body.amount === null || isNaN(req.body.tier) || isNaN(req.body.amount)){
            return res.status(400).json({
                severity: "error",
                result: "Les champs obligatoires ne sont pas remplis, veuillez réessayer"
            });
        }
        else if(req.body.tier === 20){
            return res.status(200).json({
                severity: "warning",
                result: "Vous avez atteint le niveau maximum"
            });
        }
        else if(req.body.tier >= 0 && req.body.tier <= 19){
            return Crop.findOne({
                where: {
                    cropTier: parseInt(req.body.tier) + 1
                }
            })
            .then(crop => {
                if(!crop){
                    return Promise.reject({
                        code: 400,
                        severity: "error",
                        result: "Mauvaise requête, veuillez réessayer"
                    });
                }
                else if(parseInt(userGame.userGameMoney) < parseInt(crop.cropMoneyPrice)*parseInt(req.body.amount)){
                    return Promise.reject({
                        code: 400,
                        severity: "error",
                        result: "Vous n'avez pas assez d'argent pour acheter cette amélioration"
                    });
                }
                else if(parseInt(userGame.userGameToken) < parseInt(crop.cropTokenPrice)*parseInt(req.body.amount)){
                    return Promise.reject({
                        code: 400,
                        severity: "error",
                        result: "Vous n'avez pas assez de tokens pour acheter cette amélioration"
                    });
                }
                else if(parseInt(userGame.userGameCropLimit) < parseInt(calcAmountCrop(userGame)) + parseInt(crop.cropLimit)){
                    return Promise.reject({
                        code: 400,
                        severity: "error",
                        result: "Vous n'avez pas assez de place pour acheter cette amélioration"
                    });
                }
                else if(req.body.tier !== 0 && req.locals.crops.find(crop => crop.cropTier === parseInt(req.body.tier)) === undefined){
                    return Promise.reject({
                        code: 400,
                        severity: "error",
                        result: "Vous n'avez pas assez de cultures du niveau précédent pour acheter cette amélioration"
                    });
                }
                else if(req.body.tier !== 0 && req.locals.crops.find(crop => crop.cropTier === parseInt(req.body.tier)).userCropQuantity < parseInt(req.body.amount)){
                    return Promise.reject({
                        code: 400,
                        severity: "error",
                        result: "Vous n'avez pas assez de cultures du niveau précédent pour acheter cette amélioration"
                    });
                }
                else{
                    userGame.userGameMoney = parseInt(userGame.userGameMoney) - parseInt(crop.cropMoneyPrice)*parseInt(req.body.amount);
                    userGame.userGameToken = parseInt(userGame.userGameToken) - parseInt(crop.cropTokenPrice)*parseInt(req.body.amount);
                    return UserCrop.findOne({
                        where: {
                            userGameId: req.userId,
                            cropId: crop.cropId
                        }
                    })
                    .then(userCrop => {
                        if(!userCrop){
                            return UserCrop.create({
                                userGameId: req.userId,
                                cropId: crop.cropId,
                                userCropQuantity: req.body.amount
                            });
                        }
                        else{
                            userCrop.userCropQuantity = parseInt(userCrop.userCropQuantity) + parseInt(req.body.amount);
                            return userCrop.save();
                        }
                    })
                    .then( () => {
                        if(req.body.tier !== 0){
                            return Crop.findOne({
                                where: {
                                    cropTier: parseInt(req.body.tier)
                                }
                            })
                            .then(crop => {
                                if(!crop){
                                    return Promise.reject({
                                        code: 500,
                                        severity: "error",
                                        result: "Culture non trouvée, veuillez réessayer"
                                    });
                                }
                                return UserCrop.findOne({
                                    where: {
                                        userGameId: req.userId,
                                        cropId: crop.cropId
                                    }
                                });
                            })
                            .then(userCrop => {
                                userCrop.userCropQuantity = (parseInt(userCrop.userCropQuantity) - parseInt(req.body.amount)).toString();
                                return userCrop.save();
                            });
                        }
                    })
                    .then( () => {
                        return userGame.save();
                    });
                }
            })
        }
    })
    .then(result => {
        const crops = req.locals.crops;
        // On ajoute les nouvelles données à la liste des cultures
        if(crops.find(crop => crop.cropTier === parseInt(req.body.tier) + 1) === undefined){
            return Crop.findOne({
                where: {
                    cropTier: parseInt(req.body.tier) + 1
                }
            })
            .then(crop => {
                crops.push({
                    cropName: crop.cropName,
                    cropPNGName: crop.cropPNGName,
                    cropTier: crop.cropTier,
                    cropMoneyPrice: crop.cropMoneyPrice,
                    cropTokenPrice: crop.cropTokenPrice,
                    cropAmountEarningOneToken: crop.cropAmountEarningOneToken,
                    userCropQuantity: req.body.amount.toString(),
                });
                return crops;
            });
        }
        else{
            crops.find(crop => crop.cropTier === parseInt(req.body.tier) + 1).userCropQuantity = (parseInt(crops.find(crop => crop.cropTier === parseInt(req.body.tier) + 1).userCropQuantity) + parseInt(req.body.amount)).toString();
            return crops;
        }
    })
    .then(crops => {
        // Dans le cas où l'utilisateur a fait une amélioration cad req.body.tier != 0 il faut retirer les cultures du tier précédent
        if(req.body.tier !== 0){
            crops.find(crop => crop.cropTier === parseInt(req.body.tier)).userCropQuantity = (parseInt(crops.find(crop => crop.cropTier === parseInt(req.body.tier)).userCropQuantity) - parseInt(req.body.amount)).toString();
        }
        return res.status(200).json({
            severity: "success",
            result: "Amélioration de l'utilisateur en jeu réussie",
            money: req.locals.money,
            token: req.locals.token,
            amountCrop: req.locals.amountCrop,
            crops: req.locals.crops
        });
    })
    .catch(err => {
        if(err.code !== undefined){
            return res.status(err.code).json({
                severity: err.severity,
                result: err.result
            });
        }
        // Si l'erreur n'est pas gérée alors on renvoie une erreur interne du serveur
        // TODO: Ajouter un système de log pour enregistrer les erreurs dans un fichier
        console.log(err);
        console.log(err.name);
        return res.status(500).json({
            severity: "error",
            result: "Erreur interne du serveur, veuillez réessayer"
        });
    });
}
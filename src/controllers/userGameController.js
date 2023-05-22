const { UserGame } = require('../models/newModels/index');

differenceTick = (lastRequest, date) => {
    console.log("differenceTick: " + (date - lastRequest)/1000);
    return (date - lastRequest)/1000;
}

moneyEarnedPerTick = (userGame) => {
    return userGame.cropLimit/100;
}

tokenEarnedPerTick = (userGame) => {
    return userGame.cropLimit/100;
}

exports.updateUserGame(req, res, next){
    UserGame.findByPk(req.userId)
    .then(userGame => {
        if(!userGame){
            return res.status(400).json({
                severity: "error",
                result: "Utilisareur en jeu non trouvé"
            });
        }

        const date = Date.now();
        const moneyEarnedPerTick = moneyEarnedPerTick(userGame);
        const tokenEarnedPerTick = tokenEarnedPerTick(userGame);

        return Promise.all([moneyEarnedPerTick, tokenEarnedPerTick])
        .then(result => {
            userGame.money += differenceTick(userGame.lastRequest, date)*moneyEarnedPerTick;
            userGame.token += differenceTick(userGame.lastRequest, date)*tokenEarnedPerTick;
            console.log("lastRequestBefore: " + userGame.lastRequest + " lastRequestAfter: " + date);
            userGame.lastRequest = date;
            return userGame.save();
        });
    })
    .then(result => {
        return res.status(200).json({
            severity: "success",
            result: result
        });
    })
    .catch(err => {
        return res.status(500).json({
            severity: "error",
            result: "Erreur interne du serveur, veuillez réessayer"
        });
    });
}


const { UserGame } = require('../models/index');

// TODO: faire du async/await

exports.createUserGame = (req, res, next) => {
    UserGame
        .create({
            userGameId: req.body.userGameId,
            username: req.body.username
        })
        .then(result => {
            res.status(201).json({
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.earnExperience = (req, res, next) => {
    UserGame
        .findByPk(req.params.id)
        .then(userGame => {
            if(userGame.experience + req.body.experience >= userGame.level * 1000) {
                userGame.experience -= 1000 * userGame.level;
                userGame.level += 1;
                res.status(200).json({
                    levelUp: true,
                    experience: userGame.experience
                });
            }
            else {
                userGame.experience += req.body.experience;
                res.status(200).json({
                    levelUp: false,
                    experience: userGame.experience
                });
            }
            return userGame.save();
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.earnGold = (req, res, next) => {
    UserGame
        .findByPk(req.params.id)
        .then(userGame => {
            userGame.gold += req.body.gold;
            res.status(200).json({
                gold: userGame.gold
            });
            return userGame.save();
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.earnDiamond = (req, res, next) => {
    UserGame
        .findByPk(req.params.id)
        .then(userGame => {
            userGame.diamond += req.body.diamond;
            return userGame.save();
        })
        .then(result => {
            res.status(200).json({
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


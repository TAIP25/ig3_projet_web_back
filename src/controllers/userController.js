const { User } = require('../models/index');

//const bcrypt = require('bcrypt');

//const jwt = require('jsonwebtoken');

//const validator = require('validator');

// TODO:
// Utiliser User.create() pour créer un administrateur (avec les attributs dans le .env)
// Utiliser les modules si dessus pour hasher le mot de passe, créer un token d'authentification et vérifier l'email etc.

exports.createUser = (req, res, next) => {
    if(!req.body.email && !req.body.password) {
        return res.status(400).json({
            error: "Missing email or password parameter"
        });
    }
    
    User
        .create({
            email: req.body.email,
            password: req.body.password
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

exports.getUser = (req, res, next) => {
    if(!req.params.email) {
        return res.status(400).json({
            error: "Missing email parameter"
        });
    }

    User
        .findByPk(req.params.email)
        .then(user => {
            res.status(200).json({
                user: user
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.updateUser = (req, res, next) => {
    if(!req.params.email) {
        return res.status(400).json({
            error: "Missing email parameter"
        });
    }
    else if (!req.body.password || !req.body.newEmail) {
        return res.status(400).json({
            error: "Missing password or newEmail parameter"
        });
    }
    
    User
        .findOne({
            where: {
                email: req.params.email
            }
        })
        .then(user => {
            if(req.body.password){
                user.password = req.body.password;
            }
            if(req.body.newEmail){
                user.email = req.body.newEmail;
            }
            user.userUpdatedAt = Sequelize.literal('NOW()');
            return user.save();
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
};


//Ici pas encore de protection
exports.addAmin = (req, res, next) => {
    if(!req.params.email) {
        return res.status(400).json({
            error: "Missing email parameter"
        });
    }
    
    User
        .findOne({
            where: {
                email: req.params.email
            }
        })
        .then(user => {
            user.isAdmin = true;
            return user.save();
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
};

exports.deleteUser = (req, res, next) => {
    if(!req.params.email) {
        return res.status(400).json({
            error: "Missing email parameter"
        });
    }

    User
        .findOne({
            where: {
                email: req.params.email
            }
        })
        .then(user => {
            return user.destroy();
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
};
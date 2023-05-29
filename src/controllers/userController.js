const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User, UserGame } = require('../models/newModels/index');

require('dotenv').config();

//const validator = require('validator');

// TODO:
// vérifier l'email etc., sécuriser les cookies et les cors.

// status 200 = OK
// status 201 = Created
// status 400 = Bad Request
// status 409 = Conflict
// status 500 = Internal Server Error

// Fonction qui permet de créer un cookie d'authentification
createAuthCookie = (res, userId) => {
    // Création d'un token d'authentification
    const payload = { userId: userId };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1w' });

    //TODO: {secure: true,httpOnly: true, sameSite: 'strict' (sameSite n'est pas obligatoire si le cors est bien configuré)}
    // Envoi du cookie avec le token d'authentification
    res.cookie('authcookie', token, {
        //httpOnly: true,
        secure: true,
        //domain: process.env.COOKIE_DOMAIN,
        path: '/',
        //sameSite: 'None',
    });
}


exports.createUser = (req, res, next) => {

    // Vérification des champs obligatoires
    if(req.body.email === ""  || req.body.password === "") {
        return res.status(400).json({
            severity: "error",
            result: "Les champs obligatoires ne sont pas remplis, veuillez réessayer"
        });
    }

    // Création d'un compte
    else if(req.body.adminCode === "" || req.body.adminCode === process.env.ADMIN_PASSWORD) {
        // Longueur du sel pour le hashage du mot de passe
        const bcryptSalt = 10;

        // Hashage du mot de passe
        bcrypt.hash(req.body.password, bcryptSalt)
        .then(hash => {
            return User.create({
                email: req.body.email,
                password: hash,
                isAdmin: req.body.adminCode === process.env.ADMIN_PASSWORD
            })
        })
        .then(result => {
            // Création d'un UserGame
            return UserGame.create({
                userGameId: result.dataValues.userId,
                userGameName: "Joueur",
                userGameCropLimit: 100,
                userGameMoney: 10000,
                userGameToken: 1000
            }).then(() => {
                return result;
            });
        })
        .then(result => {
            // Création d'un cookie d'authentification
            createAuthCookie(res, result.dataValues.userId);

            return result;
        })
        .then(result => {
            if(result.dataValues.isAdmin){
                console.log("Compte administrateur créé avec succès");
                return res.status(201).json({
                    severity: "success",
                    result: "Compte administrateur créé avec succès"
                });
            }
            else{
                console.log("Compte utilisateur créé avec succès");
                return res.status(201).json({
                    severity: "success",
                    result: "Compte utilisateur créé avec succès"
                });
            }
        })
        .catch(err => {
            if(err.name === "SequelizeUniqueConstraintError"){
                if(err.errors[0].message === "email must be unique"){
                    return res.status(409).json({
                        severity: "error",
                        result: "Cet email est déjà utilisé, veuillez réessayer"
                    });
                }
            }
            // Si l'erreur n'est pas gérée alors on renvoie une erreur interne du serveur
            // TODO: Ajouter un système de log pour enregistrer les erreurs dans un fichier
            console.log(err);
            console.log(err.name)
            return res.status(500).json({
                severity: "error",
                result: "Erreur interne du serveur, veuillez réessayer"
            });
        });
    }

    // Si le code administrateur n'est pas bon
    else if(req.body.adminCode !== process.env.ADMIN_PASSWORD){
        return res.status(400).json({
            severity: "error",
            result: "Le code administrateur n'est pas bon, veuillez réessayer"
        });
    }

    // Si aucun des cas précédent n'est valide alors c'est une mauvaise requête
    else{
        return res.status(400).json({
            severity: "error",
            result: "Mauvaise requête, veuillez réessayer"
        });
    }
};

exports.loginUser = (req, res, next) => {

    // Vérification des champs obligatoires
    if(req.body.email === ""  || req.body.password === "") {
        return res.status(400).json({
            severity: "error",
            result: "Les champs obligatoires ne sont pas remplis, veuillez réessayer"
        });
    }

    else{
        User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if(!user){
                // On rejette la promesse, le catch s'occupe de renvoyer l'erreur
                return Promise.reject({
                    code: 400,
                    severity: "error",
                    result: "Cet email n'existe pas, veuillez réessayer"
                });
            }
            return bcrypt.compare(req.body.password, user.dataValues.password)
            .then(correctPassword => {
                return { correctPassword: correctPassword, userId: user.dataValues.userId };
            });
        })
        .then(({correctPassword, userId}) => {
            if(!correctPassword){
                // On rejette la promesse, le catch s'occupe de renvoyer l'erreur
                return Promise.reject({
                    code: 400,
                    severity: "error",
                    result: "Le mot de passe est incorrect, veuillez réessayer"
                });
            }
            else{
                // Création d'un token d'authentification
                createAuthCookie(res, userId);
                return res.status(200).json({
                    severity: "success",
                    result: "Connexion réussie"
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